import { WeatherData } from "@/api/types";

interface WeatherAnimationProps {
  weatherData: WeatherData;
}

function WeatherAnimation({ weatherData }: WeatherAnimationProps) {
  const weatherMain = weatherData.weather[0].main.toLowerCase();
  const weatherId = weatherData.weather[0].id;

  // Rain animation
  if (weatherMain.includes('rain') || weatherId >= 200 && weatherId < 600) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-blue-400/60 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Snow animation
  if (weatherMain.includes('snow') || weatherId >= 600 && weatherId < 700) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/80 rounded-full animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Cloud animation
  if (weatherMain.includes('cloud') || weatherId >= 801 && weatherId <= 899) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-8 bg-white/30 rounded-full animate-cloud"
            style={{
              left: `${-20 + i * 40}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '8s'
            }}
          />
        ))}
      </div>
    );
  }

  // Clear sky animation (sun rays)
  if (weatherMain.includes('clear') || weatherId === 800) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-yellow-400/40 animate-pulse"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}

export default WeatherAnimation; 