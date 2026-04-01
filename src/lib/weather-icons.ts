import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  type LucideIcon,
  SunDim,
} from 'lucide-react';

interface WeatherInfo {
  label: string;
  icon: LucideIcon;
}

export const weatherCodeMap: Record<number, WeatherInfo> = {
  0: { label: 'Clear sky', icon: Sun },
  1: { label: 'Mainly clear', icon: CloudSun },
  2: { label: 'Partly cloudy', icon: Cloud },
  3: { label: 'Overcast', icon: Cloud },
  45: { label: 'Fog', icon: CloudFog },
  48: { label: 'Depositing rime fog', icon: CloudFog },
  51: { label: 'Light drizzle', icon: CloudDrizzle },
  53: { label: 'Moderate drizzle', icon: CloudDrizzle },
  55: { label: 'Dense drizzle', icon: CloudDrizzle },
  61: { label: 'Slight rain', icon: CloudRain },
  63: { label: 'Moderate rain', icon: CloudRain },
  65: { label: 'Heavy rain', icon: CloudRain },
  71: { label: 'Slight snow fall', icon: CloudSnow },
  73: { label: 'Moderate snow fall', icon: CloudSnow },
  75: { label: 'Heavy snow fall', icon: CloudSnow },
  80: { label: 'Slight rain showers', icon: CloudRain },
  81: { label: 'Moderate rain showers', icon: CloudRain },
  82: { label: 'Violent rain showers', icon: CloudRain },
  95: { label: 'Thunderstorm', icon: CloudLightning },
};

export const getWeatherInfo = (code: number): WeatherInfo => {
  return weatherCodeMap[code] || { label: 'Unknown', icon: SunDim };
};
