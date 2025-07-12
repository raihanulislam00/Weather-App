import { AlertTriangle, Info, CloudRain, Sun, Wind } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface WeatherAlertProps {
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  icon?: "alert" | "info" | "rain" | "sun" | "wind";
}

function WeatherAlert({ type, title, description, icon = "alert" }: WeatherAlertProps) {
  const getIcon = () => {
    switch (icon) {
      case "info":
        return <Info className="w-5 h-5" />;
      case "rain":
        return <CloudRain className="w-5 h-5" />;
      case "sun":
        return <Sun className="w-5 h-5" />;
      case "wind":
        return <Wind className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case "warning":
        return "destructive";
      case "success":
      case "info":
      default:
        return "default";
    }
  };

  return (
    <Alert variant={getVariant()} className="glass-effect border-white/20 dark:border-slate-700/50">
      {getIcon()}
      <AlertTitle className="text-base font-semibold">{title}</AlertTitle>
      <AlertDescription className="text-sm mt-1">{description}</AlertDescription>
    </Alert>
  );
}

export default WeatherAlert; 