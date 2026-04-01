import type { FormattedDailyForecast } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { Droplets } from "lucide-react";
import { formatDay } from "@/lib/utils";

interface ForecastCardProps {
    day: FormattedDailyForecast;
}

export function ForecastCard({ day }: ForecastCardProps) {
    const date = new Date(day.date);

    return (
        <Card className="flex flex-col items-center p-4 text-center">
            <p className="font-semibold">{formatDay(date)}</p>
            <p className="text-sm text-muted-foreground">{date.toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
            <WeatherIcon code={day.weatherCode} className="w-12 h-12 my-2 text-primary" />
            <div className="flex gap-2 font-semibold">
                <span>{day.tempMax}°</span>
                <span className="text-muted-foreground">{day.tempMin}°</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span>{day.precipProbability}%</span>
            </div>
        </Card>
    );
}
