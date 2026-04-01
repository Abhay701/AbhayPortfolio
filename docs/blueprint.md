# **App Name**: KB Weather Forecast

## Core Features:

- Current Weather Dashboard: Display current temperature, weather conditions, 'feels like,' humidity, wind, cloud cover, precipitation, and sunrise/sunset, accompanied by a large weather icon and live date.
- 7-Day Forecast View: Present a detailed forecast for the next seven days, showing day, date, min/max temperature, rain probability, and a concise condition label for each day.
- City Search & Selection: Allow users to search for weather by city name, utilizing the Open-Meteo Geocoding API to find and display location-specific forecasts.
- Geolocation Detection with Fallback: Offer an option to use the browser's current location, automatically fetching weather data, with a fallback to a default city (Ludhiana, India) if permission is denied or location is unavailable.
- Dynamic Weather Data Fetching: Integrate with Open-Meteo's APIs to dynamically fetch real-time geocoding and weather forecast data based on user input or location.
- Responsive UI & Modern Aesthetics: Provide a seamless and intuitive user experience across desktop and mobile devices, characterized by a clean design, soft gradients, rounded cards, and glassmorphism effects.
- Loading & Error State Handling: Implement loading skeletons for data fetching and user-friendly error messages with retry options, preventing raw JSON displays and ensuring a smooth user journey.

## Style Guidelines:

- Primary color: A clear, calming blue (#339ACC) to evoke a bright, open sky, providing a fresh yet professional anchor for the UI.
- Background color: A very light, ethereal off-white with a subtle blue tint (#F2F5F7) for a pristine, clean light theme, enhancing readability and spaciousness.
- Accent color: A fresh, deep cyan-green (#2D9F8F) for highlights and calls to action, offering vitality and clear contrast without being overly dominant.
- Body and headline font: 'Inter' (sans-serif) for its modern, neutral, and objective aesthetic, ensuring clear readability across all content types.
- Utilize 'lucide-react' for weather condition icons, mapping API weather codes to clean, vector-based symbols that enhance clarity and the overall modern aesthetic.
- Implement a fluid responsive layout, adapting gracefully from mobile to desktop. Incorporate 'rounded 2xl' cards with subtle borders, soft shadows, and balanced spacing to achieve a modern 'glassmorphism' aesthetic, with primary content centered within the app shell.
- Include subtle animations for state transitions (e.g., loading, data updates) and interactive elements, enhancing the app's perceived responsiveness and premium feel.