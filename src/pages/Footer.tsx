import { useContext } from 'react';
import { PortfolioContext } from '../App';
export function Footer()
{
    const content = useContext(PortfolioContext);

    return (
        <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-100 shadow">
            <div className="flex justify-between items-center">
                <div>
                    <span className="align-bottom">{content.Footer.Message}</span>
                </div>
                <div className="flex items-center">
                    {content.Footer.SocialMedia.map((social, key) => (
                        <a key={key} target="_blank" rel="noreferrer" href={social.Link} className="p-0.5">
                            <img src={social.Icon} alt="social icon" className="w-10 h-10"/>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}