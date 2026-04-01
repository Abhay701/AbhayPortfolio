import type { LucideIcon } from "lucide-react";

interface WeatherStatProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
}

export function WeatherStat({ icon: Icon, label, value }: WeatherStatProps) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}
