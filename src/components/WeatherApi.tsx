import { fetchWeatherData } from "@/redux/features/weatherApiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Button, LinearProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const WeatherApi = () => {


  const { weatherData, isLoading, isSuccess, isError, error } = useAppSelector(state => state.weatherApi);
  const dispatch = useAppDispatch()

  const [city, setCity] = useState<string>("kurnool");

  const handleClick = () => {
    dispatch(fetchWeatherData(city))
    setCity("");
  };

  useEffect(() => {
    dispatch(fetchWeatherData(city))
  }, []);

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </Box>
      ) : isError ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <h1>{error}</h1>
        </Box>
      ) : isSuccess ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h1 style={{ marginBottom: "10px" }}>Weather Api</h1>

            <TextField
              id="outlined-basic"
              label="Enter City Name"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <br />
            <br />
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
            <br />
            <h1>City: {weatherData?.name}</h1>
            <h2>Temperature: {weatherData?.main?.temp}°C</h2>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WeatherApi;
