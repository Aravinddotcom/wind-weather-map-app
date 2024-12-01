# Weather Map Application

An interactive weather visualization application built using the Windy API, providing real-time weather data and forecasts through an intuitive map interface.

## Features

- Real-time weather data visualization
- Multiple weather overlay options:
  - Wind patterns
  - Temperature
  - Pressure
  - Humidity
- Interactive timeline with playback controls
- Responsive design for desktop and mobile devices
- Dark mode support
- Smooth overlay transitions
- Location-based weather information

## Technologies Used

- JavaScript (ES6+)
- Windy API
- Leaflet.js
- HTML5
- CSS3

## Prerequisites

Before you begin, ensure you have:
- A Windy API key (Get it from [Windy API](https://api.windy.com/))
- Node.js installed (for local development)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-map-app.git
cd weather-map-app
```
2. Create a .env file in the root directory and add your Windy API key:
   WINDY_API_KEY=your_api_key_here
3. Install dependencies
   npm install
4. Run by node index.js or npm start
   default: localhost:3000

**Project Structure**

weather-map-app/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/
│   └── index.js
├── .env
├── package.json
└── README.md

**Project Structure**

API key caching using sessionStorage
Debounced event handlers
Optimized overlay transitions
Minimal API calls
Compressed assets

**Browser Support**
Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)
Mobile browsers



