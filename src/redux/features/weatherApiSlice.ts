// weatherApiSlice.ts

import {
  CityType,
  WeatherData,
  WeatherErrorResponse,
  WeatherState,
} from "@/types/weather.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  createAsyncThunkWithTokenRefresh,
  createAxiosConfig,
} from "../commonFunction";

// Initial state
const initialState: WeatherState = {
  weatherData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",
};

// Thunk for fetching weather data
export const fetchWeatherData = createAsyncThunkWithTokenRefresh(
  "employeeTable/getEmployeeProfileData",
  async (token: string, payload: CityType) => {
    const headers = {}; // Adjust the value as needed
    return axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?q=${payload}&units=metric&appid=045875faf6500e2b08e352de604e5d85`,
      headers
    );
  }
);

// Slice
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.weatherData = null;
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload as WeatherData;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.weatherData = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message
          ? action.error.message
          : "An unknown error occurred";
      });
  },
});

export default weatherSlice.reducer;
