import { GeocodingResponse, WeatherData } from "@/api/types";
import { ArrowDown, ArrowUp, Droplets, Wind, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import WeatherAnimation from "./WeatherAnimation";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  
  return (
    <Card className="overflow-hidden glass-effect border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] relative">
      <WeatherAnimation weatherData={data} />
      <CardContent className="p-8 relative z-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Current Location</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {locationName?.name}
                  </h2>
                  {locationName?.state && (
                    <span className="text-lg text-muted-foreground">
                      , {locationName.state}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {locationName?.country}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <p className="font-bold tracking-tighter text-8xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {formatTemp(temp)}
                </p>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-3 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                    <ArrowDown className="w-3 h-3" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                    <ArrowUp className="w-3 h-3" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Humidity</p>
                  <p className="text-lg font-bold">{humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Wind Speed</p>
                  <p className="text-lg font-bold">{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex w-full aspect-square max-w-[250px] items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-50"></div>
              <img
                src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                alt={CurrentWeather.description}
                className="relative object-contain w-full h-full drop-shadow-2xl animate-pulse"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-lg font-semibold capitalize bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                  {CurrentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CurrentWeather;
