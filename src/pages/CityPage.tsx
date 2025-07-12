import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherLoadSkeleton from "@/components/WeatherLoadSkeleton";
import { useWeatherQuery, useForecastQuery, useLocationSearch } from "@/hooks/useWeather";
import type { Coordinates } from "@/api/types";

function CityPage() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(cityName || "");

  const locationSearchQuery = useLocationSearch(searchQuery);
  const coordinates: Coordinates | null = locationSearchQuery.data?.[0] 
    ? { lat: locationSearchQuery.data[0].lat, lon: locationSearchQuery.data[0].lon }
    : null;
  
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/city/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (locationSearchQuery.isLoading || weatherQuery.isLoading || forecastQuery.isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
        <WeatherLoadSkeleton />
      </div>
    );
  }

  if (locationSearchQuery.error || !locationSearchQuery.data?.length) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <Card className="glass-effect border-white/20 dark:border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              City Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We couldn't find weather information for "{searchQuery}". Please try searching for a different city.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <Card className="glass-effect border-white/20 dark:border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-red-600">Weather Data Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Failed to fetch weather data for this location. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherLoadSkeleton />;
  }

  const locationName = locationSearchQuery.data[0];

  return (
    <div className="space-y-8">
      {/* Header with search */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Weather content */}
      <div className="space-y-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}

export default CityPage;
