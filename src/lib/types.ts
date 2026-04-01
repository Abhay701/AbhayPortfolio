export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface GeocodingAPIResponse {
  results: GeocodingResult[];
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  wind_speed_10m: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherAPIResponse {
  latitude: number;
  longitude: number;
  current: CurrentWeather;
  daily: DailyForecast;
}

export interface FormattedDailyForecast {
  date: Date;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipProbability: number;
  sunrise: string;
  sunset: string;
}

export interface CombinedWeatherData {
  city: GeocodingResult;
  current: CurrentWeather;
  daily: FormattedDailyForecast[];
}
