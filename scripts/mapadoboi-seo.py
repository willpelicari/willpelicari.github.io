#!/usr/bin/env python3
"""Fix what Google Search Console flags on the Mapa do Boi cut pages.

The pages come from tools/build_site.py in the MapaDoBoi repo; this patches its
output in public/mapadoboi until that generator does the same. It is idempotent.

1. Alias pages (cut/<chart>/<id>/<alias>/) repeat the same text under every
   chart that has the cut: the T-bone alias exists seven times with the same
   words. Google picked its own canonical among them ("Duplicate, Google chose
   different canonical than user"). One page per alias is now the canonical,
   the copies point at it, and only it stays in the sitemap. The copies still
   exist, so share links into the app keep working.
2. Section pages (us-round, pt-aba, ...) said only "Cuts 12, 13, 14" and the
   American ones shared one generic description. They now list their cuts as
   links, and the American ones describe themselves, so they are not empty
   and Google reaches the cut pages through them.
"""
import html
import os
import re
import sys
from collections import defaultdict

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "mapadoboi")
SITE = "https://www.wiltonpelicari.com/mapadoboi/"
LANGS = {"pt": "", "en": "en/", "fr": "fr/"}
HREFLANG = {"pt": "pt-BR", "en": "en", "fr": "fr"}
CHART_ORDER = ["br", "ar", "pt", "us"]

SECTION = {
    "pt": ("Cortes desta parte", "Os cortes de {name} no mapa {chart}: {cuts}."),
    "en": ("Cuts in this section", "The {name} section of the {chart} chart: {cuts}."),
    "fr": ("Pièces de cette partie", "La partie {name} du schéma {chart} : {cuts}."),
}
CHART_ADJ = {
    "pt": {"us": "americano", "pt": "português"},
    "en": {"us": "American", "pt": "Portuguese"},
    "fr": {"us": "américain", "pt": "portugais"},
}
AND = {"pt": " e ", "en": " and ", "fr": " et "}


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def write(path, text):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def page(lang, rel):
    return os.path.join(ROOT, LANGS[lang] + rel, "index.html")


def meta(text, name):
    m = re.search(r'<meta name="%s" content="([^"]*)">' % name, text)
    return m.group(1) if m else None


def chart_key(rel):
    # rel = cut/<chart>/<id>/<alias>
    _, chart, cid, _ = rel.split("/")
    num = int(re.sub(r"\D", "", cid) or 0)
    return (CHART_ORDER.index(chart) if chart in CHART_ORDER else 99, num, cid)


def set_links(text, canonical_rel):
    """Point canonical and hreflang alternates at canonical_rel."""
    text = re.sub(
        r'<link rel="canonical" href="%s(en/|fr/)?cut/[^"]*">' % re.escape(SITE),
        lambda m: '<link rel="canonical" href="%s%s%s/">' % (SITE, m.group(1) or "", canonical_rel),
        text,
    )
    for lang, prefix in LANGS.items():
        text = re.sub(
            r'<link rel="alternate" hreflang="%s" href="[^"]*">' % HREFLANG[lang],
            '<link rel="alternate" hreflang="%s" href="%s%s%s/">' % (HREFLANG[lang], SITE, prefix, canonical_rel),
            text,
        )
    return text


def fix_aliases():
    """Returns the alias URLs that are no longer canonical."""
    # Group by alias and by the Portuguese text, so only true copies merge.
    groups = defaultdict(list)
    base = os.path.join(ROOT, "cut")
    for chart in sorted(os.listdir(base)):
        for cid in sorted(os.listdir(os.path.join(base, chart))):
            d = os.path.join(base, chart, cid)
            for alias in sorted(os.listdir(d)):
                if os.path.isdir(os.path.join(d, alias)):
                    rel = "cut/%s/%s/%s" % (chart, cid, alias)
                    desc = meta(read(page("pt", rel)), "description")
                    groups[(alias, desc)].append(rel)
    dropped = []
    for members in groups.values():
        if len(members) < 2:
            continue
        members.sort(key=chart_key)
        primary = members[0]
        for lang in LANGS:
            # The copies must be copies in every language, or they stay apart.
            descs = {meta(read(page(lang, r)), "description") for r in members}
            if len(descs) != 1:
                sys.exit("alias pages differ in %s: %s" % (lang, members))
        for rel in members:
            for lang, prefix in LANGS.items():
                p = page(lang, rel)
                write(p, set_links(read(p), primary))
                if rel != primary:
                    dropped.append(SITE + prefix + rel + "/")
    return dropped


def cut_index(lang, chart):
    """Number on the chart -> (id, name), from the cut pages' subtitles."""
    out = {}
    d = os.path.join(ROOT, LANGS[lang] + "cut", chart)
    for cid in os.listdir(d):
        if "-" in cid:
            continue
        text = read(os.path.join(d, cid, "index.html"))
        sub = re.search(r'<p class="sub">[^<]*?(\d+)', text)
        name = re.search(r"<h1>([^<]*)</h1>", text).group(1)
        out[int(sub.group(1))] = (cid, name)
    return out


def join(lang, names):
    return names[0] if len(names) == 1 else ", ".join(names[:-1]) + AND[lang] + names[-1]


def fix_sections():
    for lang, prefix in LANGS.items():
        for chart in ("us", "pt"):
            index = cut_index(lang, chart)
            d = os.path.join(ROOT, prefix + "cut", chart)
            for cid in sorted(os.listdir(d)):
                if "-" not in cid:
                    continue
                p = os.path.join(d, cid, "index.html")
                text = read(p)
                if 'class="cuts"' in text:
                    continue
                name = re.search(r"<h1>([^<]*)</h1>", text).group(1)
                sub = re.search(r'<p class="sub">([^<]*)</p>', text).group(1)
                nums = [int(n) for n in re.findall(r"\d+", sub.split("·")[0])]
                cuts = [index[n] for n in nums if n in index]
                title, sentence = SECTION[lang]
                items = "".join(
                    '<li><a href="/mapadoboi/%scut/%s/%s/">%s</a></li>' % (prefix, chart, c, n) for c, n in cuts
                )
                block = '<h2>%s</h2>\n<ul class="cuts">%s</ul>\n' % (title, items)
                text = text.replace('<div class="actions">', block + '<div class="actions">', 1)
                if chart == "us":
                    plain = [html.unescape(n) for _, n in cuts]
                    desc = sentence.format(name=html.unescape(name), chart=CHART_ADJ[lang][chart], cuts=join(lang, plain))
                    desc = html.escape(desc, quote=True)
                    text = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + desc, text, count=1)
                    text = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + desc, text, count=1)
                    # Show the description on the page too, as the other pages do.
                    text = re.sub(r'(<p class="sub">[^<]*</p>\n)', r"\1<p>%s</p>\n" % desc.replace("\\", "\\\\"), text, count=1)
                write(p, text)


def fix_sitemap(dropped):
    p = os.path.join(ROOT, "sitemap.xml")
    gone = set(dropped)
    lines = [
        l for l in read(p).splitlines(keepends=True)
        if not any(("<loc>%s</loc>" % u) in l for u in gone)
    ]
    write(p, "".join(lines))


if __name__ == "__main__":
    dropped = fix_aliases()
    fix_sections()
    fix_sitemap(dropped)
    print("alias copies pointed at their canonical: %d" % len(dropped))
