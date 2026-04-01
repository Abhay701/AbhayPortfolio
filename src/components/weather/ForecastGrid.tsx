import type { FormattedDailyForecast } from "@/lib/types";
import { ForecastCard } from "./ForecastCard";
import { Skeleton } from "../ui/skeleton";

interface ForecastGridProps {
    daily: FormattedDailyForecast[];
}

export function ForecastGrid({ daily }: ForecastGridProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {daily.map((day, i) => (
                    <ForecastCard key={i} day={day} />
                ))}
            </div>
        </div>
    );
}


export function ForecastGridSkeleton() {
    return (
        <div>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center p-4 border rounded-2xl">
                       <Skeleton className="h-6 w-20 mb-2" />
                       <Skeleton className="h-4 w-16 mb-2" />
                       <Skeleton className="w-12 h-12 my-2 rounded-full" />
                       <Skeleton className="h-6 w-16 mb-2" />
                       <Skeleton className="h-4 w-12" />
                    </div>
                ))}
            </div>
        </div>
    );
}
