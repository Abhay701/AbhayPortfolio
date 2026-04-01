import type {
  GeocodingAPIResponse,
  GeocodingResult,
  WeatherAPIResponse,
  CombinedWeatherData,
  FormattedDailyForecast,
} from './types';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchCity(city: string): Promise<GeocodingResult[]> {
  const response = await fetch(
    `${GEOCODING_API_URL}?name=${city}&count=5&language=en&format=json`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch city data');
  }
  const data: GeocodingAPIResponse = await response.json();
  return data.results || [];
}

export async function getForecastByCoords(
  lat: number,
  lon: number
): Promise<WeatherAPIResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${FORECAST_API_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }
  return response.json();
}

function formatDailyForecast(daily: WeatherAPIResponse['daily']): FormattedDailyForecast[] {
  return daily.time.map((date, i) => ({
    date: new Date(date),
    weatherCode: daily.weather_code[i],
    tempMax: Math.round(daily.temperature_2m_max[i]),
    tempMin: Math.round(daily.temperature_2m_min[i]),
    precipProbability: daily.precipitation_probability_max[i],
    sunrise: daily.sunrise[i],
    sunset: daily.sunset[i],
  }));
}

export async function getWeatherByCity(city: GeocodingResult): Promise<CombinedWeatherData> {
    const weatherData = await getForecastByCoords(city.latitude, city.longitude);
    return {
        city,
        current: weatherData.current,
        daily: formatDailyForecast(weatherData.daily),
    };
}
