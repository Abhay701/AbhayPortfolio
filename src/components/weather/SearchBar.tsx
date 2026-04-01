'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCity } from '@/lib/weather';
import type { GeocodingResult } from '@/lib/types';
import { Input } from '../ui/input';

interface SearchBarProps {
  onCitySelect: (city: GeocodingResult) => void;
}

export function SearchBar({ onCitySelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestions } = useQuery({
    queryKey: ['citySearch', query],
    queryFn: () => searchCity(query),
    enabled: query.length > 2,
  });

  const handleSelect = (city: GeocodingResult) => {
    setQuery('');
    setShowSuggestions(false);
    
    // Update URL without navigating
    const params = new URLSearchParams(window.location.search);
    params.set('lat', city.latitude.toString());
    params.set('lon', city.longitude.toString());
    params.set('name', city.name);
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);

    onCitySelect(city);
  };

  return (
    <div className="relative w-full md:w-64">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Search for a city..."
        className="w-full"
      />
      {showSuggestions && suggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg">
          <ul>
            {suggestions.map((city) => (
              <li
                key={city.id}
                onMouseDown={() => handleSelect(city)}
                className="px-4 py-2 hover:bg-accent cursor-pointer"
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
