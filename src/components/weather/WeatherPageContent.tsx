'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import {
  MapPin,
} from 'lucide-react';
import { getWeatherByCity } from '@/lib/weather';
import type { GeocodingResult } from '@/lib/types';
import { CurrentWeatherCard, CurrentWeatherSkeleton } from './CurrentWeatherCard';
import { ForecastGrid, ForecastGridSkeleton } from './ForecastGrid';
import { SearchBar } from './SearchBar';
import { EmptyState } from '../EmptyState';
import { Button } from '../ui/button';
import { toast } from '../ui/toaster';
import { WeatherBackground } from './WeatherBackground';

// Default to Ludhiana, India
const defaultCity: GeocodingResult = {
  id: 1264728,
  name: 'Ludhiana',
  latitude: 30.91,
  longitude: 75.85,
  country: 'India',
};

function LiveDate() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!date) return <div className="h-6 w-72 rounded-md bg-white/20 animate-pulse" />;
  
  return <p className="text-muted-foreground">{date}</p>;
}

export function WeatherPageContent() {
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const name = searchParams.get('name');

  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null);

  useEffect(() => {
    if (lat && lon && name) {
      setSelectedCity({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        name: decodeURIComponent(name),
        id: 0, // Not essential for query, but part of the type
        country: '',
      });
    } else {
      setSelectedCity(defaultCity);
    }
  }, [lat, lon, name]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', selectedCity?.latitude, selectedCity?.longitude],
    queryFn: () => {
      if (!selectedCity) throw new Error('No city selected');
      return getWeatherByCity(selectedCity);
    },
    enabled: !!selectedCity,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const params = new URLSearchParams(window.location.search);
          params.set('lat', latitude.toString());
          params.set('lon', longitude.toString());
          params.set('name', 'Your Location');
          window.history.pushState({}, '', `${window.location.pathname}?${params}`);
          setSelectedCity({ latitude, longitude, name: "Your Location", id: 0, country: "" });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Geolocation Error",
            description: "Could not access your location. Please enable it in your browser settings.",
          });
        }
      );
    } else {
        toast({
            variant: "destructive",
            title: "Unsupported",
            description: "Geolocation is not supported by this browser.",
          });
    }
  };


  return (
    <div className="relative min-h-screen">
      {data && <WeatherBackground weatherCode={data.current.weather_code} isDay={!!data.current.is_day} />}
      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">KB Weather Forecast</h1>
            <LiveDate />
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <SearchBar onCitySelect={setSelectedCity} />
              <Button variant="outline" onClick={handleUseMyLocation} className='shrink-0 bg-transparent hover:bg-white/10'>
                  <MapPin className="mr-2 h-4 w-4" />
                  Use My Location
              </Button>
          </div>
        </header>

        <main>
          {isLoading && (
              <div className="space-y-8">
                  <CurrentWeatherSkeleton />
                  <ForecastGridSkeleton />
              </div>
          )}
          {error && (
              <EmptyState 
                  message="Could not fetch weather data for the selected location."
                  onRetry={refetch}
              />
          )}
          {data && (
              <div className="space-y-8">
                  <CurrentWeatherCard weather={data} />
                  <ForecastGrid daily={data.daily} />
              </div>
          )}
        </main>
      </div>
    </div>
  );
}
