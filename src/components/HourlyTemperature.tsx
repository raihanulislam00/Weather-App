import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface HourlyTemperatureProps {
  data: ForecastData;
}

function HourlyTemperature({ data }: HourlyTemperatureProps) {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  
  return (
    <Card className="flex-1 glass-effect border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Today's Temperature Forecast
        </CardTitle>
        <p className="text-base text-muted-foreground mt-2">
          Hourly temperature changes throughout the day
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="feelsLikeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={14}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={14}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                content={({ payload, active }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-4 border rounded-xl shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-white/20 dark:border-slate-700/50">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs uppercase text-muted-foreground font-medium">
                              Temperature
                            </span>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs uppercase text-muted-foreground font-medium">
                              Feels Like
                            </span>
                            <span className="text-lg font-bold text-slate-600 dark:text-slate-400">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="url(#tempGradient)"
                strokeWidth={4}
                dot={{ fill: '#3b82f6', strokeWidth: 3, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 3 }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="url(#feelsLikeGradient)"
                strokeWidth={3}
                dot={{ fill: '#64748b', strokeWidth: 3, r: 5 }}
                activeDot={{ r: 7, stroke: '#64748b', strokeWidth: 3 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Additional forecast info */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <p className="text-sm text-muted-foreground mb-1">Highest Today</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {Math.max(...chartData.map(d => d.temp))}°
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <p className="text-sm text-muted-foreground mb-1">Lowest Today</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.min(...chartData.map(d => d.temp))}°
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HourlyTemperature;
