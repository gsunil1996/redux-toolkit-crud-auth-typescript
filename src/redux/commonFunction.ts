import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseUrl } from "./baseUrl";
import { ErrorResponseType, payloadTypes } from "@/types/crud.types";

export const createAxiosConfig = (token: string, additionalHeaders = {}) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...additionalHeaders,
  },
});

// Separate function for token refresh
export const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");

    const refreshResponse = await axios.get(`${baseUrl}/refresh`, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    });

    localStorage.setItem("token", refreshResponse.data.token);

    return refreshResponse.data;
  } catch (refreshError) {
    return refreshError;
  }
};

// Create an async thunk with token refresh functionality
export const createAsyncThunkWithTokenRefresh = <
  PayloadType extends payloadTypes,
  ReturnType
>(
  type: string,
  requestFunction: (
    token: string,
    payload: PayloadType
  ) => Promise<AxiosResponse<ReturnType>>
) =>
  createAsyncThunk(`${type}`, async (payload: PayloadType, thunkAPI) => {
    try {
      // Get the token from the local storage
      const token = localStorage.getItem("token") || "";

      // Make the initial request using the provided function and token
      const response = await requestFunction(token, payload);

      // Return the response data
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;

      if (axiosError.response && axiosError.response.status === 504) {
        throw new Error("Gateway Timeout");
      } else if (axiosError.response && axiosError.response.status === 404) {
        throw new Error("Resource not found");
      } else if (axiosError.response && axiosError.response.status === 500) {
        throw new Error(
          "There was an error with the internal server. Please contact your site administrator."
        );
      } else if (axiosError.response && !axiosError.response.data.error) {
        throw new Error(
          "There was an error with the internal server. Please contact your site administrator."
        );
      }

      // Handle unauthorized (401) error (access token expired)
      else if (axiosError.response && axiosError.response.status === 401) {
        // Attempt to refresh the access token
        const refreshedToken = await refreshAccessToken();

        if (refreshedToken.response && refreshedToken.response.status === 504) {
          throw new Error("Gateway Timeout");
        } else if (
          refreshedToken.response &&
          refreshedToken.response.status === 404
        ) {
          throw new Error("Resource not found");
        } else if (
          refreshedToken.response &&
          refreshedToken.response.status === 500
        ) {
          throw new Error(
            "There was an error with the internal server. Please contact your site administrator."
          );
        }
        // Check if the server is stopped and no specific error message after token refresh
        else if (
          refreshedToken.response &&
          !refreshedToken.response.data.error
        ) {
          throw new Error(
            "There was an error with the internal server. Please contact your site administrator."
          );
        }

        // Handle unauthorized (401) error after token refresh (refresh token expired)
        else if (
          refreshedToken.response &&
          refreshedToken.response?.status === 401
        ) {
          // Manually set an error in the Redux state that refresh token expires

          throw new Error(refreshedToken.response?.data?.error);
        } else if (refreshedToken?.token) {
          // If token refresh is successful, retry the original request with the new access token
          try {
            const retryResponse = await requestFunction(
              refreshedToken?.token,
              payload
            );

            // Return the response data from the retry
            return retryResponse.data;
          } catch (error) {
            // Handle errors in the retry request
            const refreshAxiosError = error as AxiosError<ErrorResponseType>;
            throw new Error(
              refreshAxiosError.response?.data?.error || "An error occurred"
            );
          }
        }
      } else if (axiosError.message == "Network Error") {
        throw new Error(
          "There was an error with the internal server. Please contact your site administrator."
        );
      } else if (!axiosError.response) {
        throw new Error(
          "There was an error with the internal server. Please contact your site administrator."
        );
      } else {
        // Throw a generic error if none of the specific error conditions are met
        throw new Error(
          axiosError.response?.data?.error || "An error occurred"
        );
      }
    }
  });
