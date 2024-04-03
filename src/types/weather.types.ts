// weatherTypes.ts

export type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
};

export type WeatherErrorResponse = {
  message: string;
};

export type CityType = string;

export type WeatherState = {
  weatherData: WeatherData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;
};
