import type { CombinedWeatherData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherInfo } from '@/lib/weather-icons';
import { WeatherStat } from './WeatherStat';
import { Wind, Droplets, Thermometer, Sunrise, Sunset, Cloud } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface CurrentWeatherCardProps {
  weather: CombinedWeatherData;
}

export function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  const { city, current, daily } = weather;
  const weatherInfo = getWeatherInfo(current.weather_code);
  const today = daily[0];

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="text-2xl">
          Current Weather in {city.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <WeatherIcon
              code={current.weather_code}
              isDay={!!current.is_day}
              className="w-24 h-24 text-white"
            />
            <div>
              <p className="text-6xl font-bold">
                {Math.round(current.temperature_2m)}°
              </p>
              <p className="text-lg text-muted-foreground">{weatherInfo.label}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
            <WeatherStat
              icon={Thermometer}
              label="Feels like"
              value={`${Math.round(current.apparent_temperature)}°`}
            />
            <WeatherStat
              icon={Droplets}
              label="Humidity"
              value={`${current.relative_humidity_2m}%`}
            />
            <WeatherStat
              icon={Wind}
              label="Wind"
              value={`${current.wind_speed_10m.toFixed(1)} km/h`}
            />
             <WeatherStat
              icon={Cloud}
              label="Cloud Cover"
              value={`${current.cloud_cover}%`}
            />
            <WeatherStat
              icon={Sunrise}
              label="Sunrise"
              value={new Date(today.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <WeatherStat
              icon={Sunset}
              label="Sunset"
              value={new Date(today.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CurrentWeatherSkeleton() {
    return (
        <Card variant="glass">
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-24 h-24 rounded-full" />
                        <div>
                            <Skeleton className="h-16 w-24 mb-2" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
