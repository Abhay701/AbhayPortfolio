'use client';

import { Suspense } from 'react';
import { WeatherPageContent } from '@/components/weather/WeatherPageContent';

export default function WeatherPage() {
  return (
    <Suspense fallback={<WeatherPageContentSkeleton />}>
      <WeatherPageContent />
    </Suspense>
  );
}

function WeatherPageContentSkeleton() {
  // You can create a more detailed skeleton if you want
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
        <div className="h-96 bg-gray-300 rounded-2xl w-full"></div>
      </div>
    </div>
  )
}
