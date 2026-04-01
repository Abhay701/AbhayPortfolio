import { getWeatherInfo } from "@/lib/weather-icons";
import React from "react";
import Image from "next/image";
import imageData from "@/lib/placeholder-images.json";

interface WeatherBackgroundProps {
    weatherCode: number;
    isDay: boolean;
}

export function WeatherBackground({ weatherCode, isDay }: WeatherBackgroundProps) {
    const { label } = getWeatherInfo(weatherCode);
    const lowerLabel = label.toLowerCase();

    let imageKey: keyof typeof imageData.weather;

    if (lowerLabel.includes('clear')) {
        imageKey = isDay ? 'clear_day' : 'clear_night';
    } else if (lowerLabel.includes('cloud') || lowerLabel.includes('overcast')) {
        imageKey = isDay ? 'cloudy_day' : 'cloudy_night';
    } else if (lowerLabel.includes('rain') || lowerLabel.includes('drizzle')) {
        imageKey = isDay ? 'rain_day' : 'rain_night';
    } else if (lowerLabel.includes('snow')) {
        imageKey = isDay ? 'snow_day' : 'snow_night';
    } else if (lowerLabel.includes('thunderstorm')) {
        imageKey = isDay ? 'thunderstorm_day' : 'thunderstorm_night';
    } else if (lowerLabel.includes('fog')) {
        imageKey = isDay ? 'fog_day' : 'fog_night';
    } else {
        imageKey = isDay ? 'clear_day' : 'clear_night'; // Default
    }

    const { src, hint } = imageData.weather[imageKey];

    return (
        <div className="absolute inset-0 -z-10">
            <Image
                src={src}
                alt={hint}
                data-ai-hint={hint}
                fill
                quality={80}
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>
    );
}
