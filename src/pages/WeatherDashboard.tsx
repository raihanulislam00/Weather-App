import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherMap from "@/components/WeatherMap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherLoadSkeleton from "@/components/WeatherLoadSkeleton";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCcw, CloudRain, Sun } from "lucide-react";

function WeatherDashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <h2 className="text-xl font-semibold text-muted-foreground">
            Getting your location...
          </h2>
        </div>
        <WeatherLoadSkeleton />
      </div>
    );
  }
  
  if (locationError) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Alert variant={"destructive"} className="glass-effect border-red-200 dark:border-red-800">
          <AlertTriangle className="w-5 h-5" />
          <AlertTitle className="text-lg">Location Access Required</AlertTitle>
          <AlertDescription className="space-y-4">
            <p className="text-sm">
              {locationError}
            </p>
            <Button 
              onClick={getLocation} 
              variant={"outline"} 
              className="w-fit bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Enable Location Access
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!coordinates) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Alert variant={"destructive"} className="glass-effect border-red-200 dark:border-red-800">
          <MapPin className="w-5 h-5" />
          <AlertTitle className="text-lg">Location Required</AlertTitle>
          <AlertDescription className="space-y-4">
            <p className="text-sm">
              Please enable location access to see your local weather information
            </p>
            <Button 
              onClick={getLocation} 
              variant={"outline"} 
              className="w-fit bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Enable Location Access
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Alert variant={"destructive"} className="glass-effect border-red-200 dark:border-red-800">
          <CloudRain className="w-5 h-5" />
          <AlertTitle className="text-lg">Weather Data Error</AlertTitle>
          <AlertDescription className="space-y-4">
            <p className="text-sm">
              Failed to fetch weather data! Please check your connection and try again.
            </p>
            <Button 
              onClick={handleRefresh} 
              variant={"outline"} 
              className="w-fit bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherLoadSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Weather Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time weather information for your location
          </p>
        </div>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          className="bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-700/50 border-white/20 dark:border-slate-700/50"
        >
          <RefreshCcw
            className={`w-5 h-5 ${
              weatherQuery.isFetching || forecastQuery.isFetching
                ? "animate-spin"
                : ""
            }`}
          />
        </Button>
      </div>

      {/* Weather Cards */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Current Weather and Map */}
        <div className="flex flex-col gap-6">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          {coordinates && (
            <WeatherMap
              lat={coordinates.lat}
              lon={coordinates.lon}
              locationName={locationName?.name}
            />
          )}
        </div>
        {/* Temperature Forecast */}
        <div>
          <HourlyTemperature data={forecastQuery.data} />
        </div>
      </div>
      
      {/* Additional Weather Info Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="glass-effect p-6 rounded-xl border-white/20 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
              <Sun className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="font-semibold">UV Index</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            Moderate
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Wear sunscreen and protective clothing
          </p>
        </div>
        
        <div className="glass-effect p-6 rounded-xl border-white/20 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <CloudRain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold">Precipitation</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            20%
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Light rain expected
          </p>
        </div>
        
        <div className="glass-effect p-6 rounded-xl border-white/20 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold">Visibility</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            10 km
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Good visibility conditions
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
