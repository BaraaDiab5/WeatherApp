# 🌤️ Glassmorphism Weather App

A modern, responsive weather web application crafted with Vanilla JavaScript, HTML5, and CSS3. The project features an elegant glassmorphism aesthetic enhanced with neon visual accents, delivering real-time weather metrics and upcoming multi-day forecasts seamlessly.

## ✨ Features

- **Real-Time Weather Data**: Displays current temperature, weather conditions, dynamic SVG weather illustrations, wind speed, and humidity using the OpenWeatherMap API.
- *5-Day Weather Forecast**: Provides upcoming daily forecasts filtered specifically for midday conditions, displayed in a smooth horizontal scroll container.
- **Robust Error Handling**: Comprehensive HTTP status management (e.g., `404` for invalid cities, `401` for API authorization issues, `500+` for server downtime) with dedicated neon error states and informative user messaging.
- **Responsive Glassmorphism UI**: High-fidelity dark mode interface built with frosted glass effects (`backdrop-filter`), neon ambient lighting, and fluid layouts optimized across screen sizes.
- **Keyboard Navigation**: Instant city search with both mouse click and `Enter` key listeners for an intuitive user experience.

## 🛠️ Built With

- **JavaScript (ES6+)**: Asynchronous operations (`async`/`await`), Fetch API, dynamic DOM manipulation, and error boundaries.
- **CSS3**: Custom glassmorphism styling, flexbox layouts, media queries, and neon glow filters.
- **HTML5**: Semantic web markup.
- **OpenWeatherMap API**: Current Weather & 5-Day / 3-Hour Forecast services.