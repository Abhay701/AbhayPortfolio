import { getWeatherInfo } from "@/lib/weather-icons";
import React from "react";

interface WeatherBackgroundProps {
    weatherCode: number;
    isDay: boolean;
}

const Rain = () => (
    <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
            <div
                key={i}
                className="rain-drop"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${0.5 + Math.random() * 0.3}s`,
                }}
            />
        ))}
    </div>
);

const Snow = () => (
    <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
            <div
                key={i}
                className="snow-flake"
                style={{
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random(),
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                }}
            />
        ))}
    </div>
);

const Clouds = () => (
    <div className="absolute inset-0 overflow-hidden">
        <div className="cloud slow" style={{ top: '10%', width: '200px', height: '60px', left: '-200px' }} />
        <div className="cloud medium" style={{ top: '30%', width: '300px', height: '90px', left: '-300px', animationDelay: '-10s' }} />
        <div className="cloud fast" style={{ top: '60%', width: '150px', height: '45px', left: '-150px', animationDelay: '-20s' }} />
        <div className="cloud slow" style={{ top: '75%', width: '250px', height: '75px', left: '-250px', animationDelay: '-35s' }} />
    </div>
);


export function WeatherBackground({ weatherCode, isDay }: WeatherBackgroundProps) {
    const { label } = getWeatherInfo(weatherCode);

    const isRaining = label.toLowerCase().includes('rain') || label.toLowerCase().includes('drizzle');
    const isSnowing = label.toLowerCase().includes('snow');
    const isCloudy = label.toLowerCase().includes('cloud') || label.toLowerCase().includes('overcast') || label.toLowerCase().includes('fog');
    
    let backgroundClass = '';
    if (isDay) {
        backgroundClass = 'bg-gradient-to-br from-sky-400 to-sky-600';
    } else {
        backgroundClass = 'bg-gradient-to-br from-gray-800 to-gray-900';
    }


    return (
        <div className={`absolute inset-0 -z-10 transition-colors duration-1000 ${backgroundClass}`}>
            {isCloudy && <Clouds />}
            {isRaining && <Rain />}
            {isSnowing && <Snow />}
        </div>
    );
}
