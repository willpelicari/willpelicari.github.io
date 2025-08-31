# Wilton Pelicari's Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features include dark/light theme switching, multi-language support (English, French, Portuguese), and interactive filtering of work experiences.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes with system preference detection
- **Multi-language Support**: Available in English, French, and Portuguese
- **Interactive Filtering**: Filter work experiences by technology tags
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized with service worker for offline support
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages
- **Icons**: React Icons
- **Internationalization**: react-i18next

## 📁 Project Structure

```
src/
├── @types/          # TypeScript type definitions
├── components/      # Reusable UI components
├── contexts/        # React contexts (Theme, Portfolio, Filter)
├── i18n/           # Internationalization configuration
├── pages/          # Main page components
└── App.tsx         # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/willpelicari/willpelicari.github.io.git
cd willpelicari.github.io
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Build for production:

```bash
npm run build
```

5. Deploy to GitHub Pages:

```bash
npm run deploy
```

## 📝 Content Management

The portfolio content is managed through JSON files located in `public/data/`:

- `portfolio-en.json` - English content
- `portfolio-fr.json` - French content
- `portfolio-pt.json` - Portuguese content

Each file contains all the text content, links, and experience data for the respective language.

## 🎨 Customization

### Adding New Languages

1. Create a new JSON file in `public/data/` (e.g., `portfolio-es.json`)
2. Add the language to the i18n configuration in `src/i18n/config.ts`
3. Add language buttons to the header component

### Styling

The project uses Tailwind CSS for styling. Custom styles can be added in:

- `src/index.css` - Global styles
- Component-specific CSS classes

## 🔧 Recent Improvements

### Performance & Accessibility

- ✅ Added proper error handling for data fetching
- ✅ Implemented image error fallbacks
- ✅ Added loading states
- ✅ Enhanced accessibility with ARIA labels
- ✅ Improved keyboard navigation
- ✅ Added service worker for offline support

### SEO & Social Media

- ✅ Enhanced meta tags and descriptions
- ✅ Added Open Graph and Twitter Card support
- ✅ Created sitemap.xml
- ✅ Improved robots.txt
- ✅ Fixed manifest.json typo

### Code Quality

- ✅ Removed unused props and interfaces
- ✅ Added proper TypeScript types
- ✅ Improved error handling
- ✅ Updated browserslist database

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Wilton Pelicari**

- GitHub: [@willpelicari](https://github.com/willpelicari)
- LinkedIn: [Wilton Pelicari](https://www.linkedin.com/in/wiltonpelicari/)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- React Icons for the beautiful icon library
