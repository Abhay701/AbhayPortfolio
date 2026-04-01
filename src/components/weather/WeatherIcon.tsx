import { getWeatherInfo } from '@/lib/weather-icons';
import { cn } from '@/lib/utils';
import { Moon } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  className?: string;
}

export function WeatherIcon({ code, isDay = true, className }: WeatherIconProps) {
  const weatherInfo = getWeatherInfo(code);

  // Handle clear sky at night
  if (code === 0 && !isDay) {
    return <Moon className={cn("w-6 h-6", className)} />;
  }

  const Icon = weatherInfo.icon;
  return <Icon className={cn("w-6 h-6", className)} />;
}
