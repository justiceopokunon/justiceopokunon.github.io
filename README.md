# Justice Opoku Nontwiri - Portfolio

[![Live Site](https://img.shields.io/badge/Live-Site-blue)](https://justiceopokunon.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black)](https://github.com/justiceopokunon)

## 🚀 Modern Portfolio Website

A cutting-edge portfolio website showcasing my journey as a Full-Stack Developer, AI Enthusiast, and Creative Technologist. Built with modern web technologies and best practices.

## ✨ Features

- **🎨 Modern Design**: Clean, professional design with smooth, GPU-accelerated animations
- **🌓 Dark/Light Mode**: Toggle between themes with localStorage persistence
- **📱 Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **⚡ Performance Optimized**: 
  - Fast loading with lazy loading images
  - GPU-accelerated animations using `will-change` and `backface-visibility`
  - Optimized transforms for desktop & mobile browsers
  - Reduced motion preferences respected
- **♿ Accessible**: ARIA labels, keyboard navigation, semantic HTML, and focus-visible states
- **🎯 Interactive Elements**:
  - Typing animation for dynamic text
  - Animated skill progress bars with smooth transitions
  - Particle background effects with GPU optimization
  - Smooth scroll navigation
  - Scroll-to-top button
  - Form validation

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **Font Awesome**: Icons
- **Google Fonts**: Inter & Space Grotesk

## 📂 Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # Styling with CSS variables for theming
├── script.js           # Interactive functionality
├── FBX_7410.JPG       # Profile image
└── README.md          # This file
```

## 🎯 Key Sections

1. **Hero Section**: Dynamic typing animation showcasing roles
2. **About**: Personal introduction and tech stack
3. **Skills**: Categorized skills with animated progress bars
4. **Experience**: Timeline of education and projects
5. **Projects**: Featured work with descriptions and tech stacks
6. **Contact**: Working contact form with validation

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/justiceopokunon/justiceopokunon.github.io.git
```

2. Open `index.html` in your browser or use a local server:
```bash
python3 -m http.server 8000
# or
npx serve
```

3. Visit `http://localhost:8000`

## 🌟 Features in Detail

### Theme Toggle
- Persistent theme selection using localStorage
- Smooth transitions between light and dark modes
- System preference detection (optional)

### Animations
- Intersection Observer API for scroll animations
- CSS animations for micro-interactions
- Typing effect for hero section

### Performance
- Lazy loading for images
- Optimized CSS with minimal reflows
- Service Worker ready (commented out)

### Accessibility
- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Skip to main content link
- Focus indicators

## 🎬 Animation Optimizations

- **GPU Acceleration**: All animations use `will-change`, `backface-visibility`, and `perspective` for hardware acceleration
- **Cross-browser Support**: Optimized for desktop (Chrome, Firefox, Safari, Edge) and mobile browsers
- **Performance First**: 
  - Animations disabled for users with `prefers-reduced-motion` set
  - Smooth 60fps animations using CSS3 transforms
  - Separate transitions for opacity and transform properties
  - WebKit prefixes for broader browser compatibility

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile devices
- Flexible layouts using CSS Grid and Flexbox
- Optimized typography scaling
- Touch-friendly interactive elements

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)

## 📄 License

© 2025 Justice Opoku Nontwiri. All rights reserved.

---

**Built with 💜 and lots of ☕**
