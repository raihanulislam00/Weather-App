# Weather App

A beautiful, modern weather dashboard built with **Vite + React + TypeScript**. Get real-time weather, hourly forecasts, and interactive maps for your location or any city worldwide.

---

## 🌟 Features

- **Current Weather**: See temperature, feels like, humidity, wind, and conditions for your location or any city.
- **Hourly Temperature Forecast**: Interactive chart with high/low summary.
- **Location Map**: Animated map with a custom marker and city label.
- **Responsive Design**: Looks great on desktop and mobile.
- **Dark/Light Mode**: Toggle between beautiful themes.
- **Glassmorphism & Animations**: Modern UI with smooth effects.
- **City Search**: Instantly search weather for any city.
- **Error Handling**: Friendly messages for location and network issues.

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/raihanulislam00/weather-app.git
cd weather-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Tech Stack
- [Vite](https://vitejs.dev/) (build tool)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
- [React Query](https://tanstack.com/query/latest) (data fetching)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/) (charts)
- [React Leaflet](https://react-leaflet.js.org/) (maps)
- [OpenWeatherMap API](https://openweathermap.org/api) (weather data)

---

## 🌐 API Setup
This app uses the OpenWeatherMap API. To use your own API key:
1. Sign up at [openweathermap.org](https://openweathermap.org/).
2. Add your API key in `src/api/config.ts`:
   ```ts
   export const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
   ```

---

## 📸 Screenshots

![Weather App Screenshot](./screenshot.png)

---

## 🙏 Credits
- UI/UX: Inspired by modern glassmorphism and weather dashboards.
- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Map tiles: [CartoDB](https://carto.com/attributions)

---

## 🧑‍💻 Author
**raihanulislam00**  
[GitHub](https://github.com/raihanulislam00)

---

## 📄 License
MIT
