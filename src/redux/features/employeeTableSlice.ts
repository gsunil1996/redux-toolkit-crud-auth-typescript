import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createAsyncThunkWithTokenRefresh,
  createAxiosConfig,
} from "../commonFunction";
import { baseUrl } from "../baseUrl";
import {
  AddSuccessApiResponse,
  CrudInitialState,
  DeleteEmployeeTableApiResponse,
  DeleteEmployeeProps,
  EditEmployeeProfileApiResponse,
  EditEmployeeTableProps,
  GetEmployeeProfileApiResponse,
  GetEmployeeProfileProps,
  GetEmployeeTableAPIResponse,
  GetEmployeeTableDataProps,
  InputDataType,
} from "@/types/crud.types";

const initialState: CrudInitialState = {
  // get employee table data
  data: null,
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,

  // get employee profile
  employeeProfileData: null,
  employeeProfileIsLoading: false,
  employeeProfileIsError: false,
  employeeProfileError: "",
  employeeProfileIsSuccess: false,

  // add employee table data
  employeeAddedData: null,
  employeeAddDataLoading: false,
  employeeAddedDataIsError: false,
  employeeAddedDataError: "",
  employeeAddedDataIsSuccess: false,

  // edit employee table data
  employeeEditedData: null,
  employeeEditDataLoading: false,
  employeeEditDataIsError: false,
  employeeEditDataError: "",
  employeeEditDataIsSuccess: false,

  // delete employee table data
  employeeDeletedData: null,
  employeeDeleteDataLoading: false,
  employeeDeleteDataIsError: false,
  employeeDeleteDataError: "",
  employeeDeleteDataIsSuccess: false,
};

export const getEmployeeTableData = createAsyncThunkWithTokenRefresh(
  "employeeTable/getEmployeeTableData",
  async (token: string, payload: GetEmployeeTableDataProps) => {
    const { search, gender, status, sort, page } = payload;
    const headers = {}; // Adjust the value as needed
    return axios.get<GetEmployeeTableAPIResponse>(
      `${baseUrl}/employeesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
      createAxiosConfig(token, headers)
    );
  }
);

export const getEmployeeProfileData = createAsyncThunkWithTokenRefresh(
  "employeeTable/getEmployeeProfileData",
  async (token: string, payload: GetEmployeeProfileProps) => {
    const headers = {}; // Adjust the value as needed
    return axios.get<GetEmployeeProfileApiResponse>(
      `${baseUrl}/employeesTable/${payload.id}`,
      createAxiosConfig(token, headers)
    );
  }
);

export const addEmployeeTableData = createAsyncThunkWithTokenRefresh(
  "employeeTable/addEmployeeTableData",
  async (token: string, payload: InputDataType) => {
    const headers = {}; // Adjust the value as needed
    return axios.post<AddSuccessApiResponse>(
      `${baseUrl}/addEmployee`,
      payload,
      createAxiosConfig(token, headers)
    );
  }
);

export const editEmployeeTableData = createAsyncThunkWithTokenRefresh(
  "employeeTable/editEmployeeTableData",
  async (token: string, payload: EditEmployeeTableProps) => {
    const { tableRowId, data } = payload;
    const headers = {}; // Adjust the value as needed
    return axios.patch<EditEmployeeProfileApiResponse>(
      `${baseUrl}/updateEmployeeDetails/${tableRowId}`,
      data,
      createAxiosConfig(token, headers)
    );
  }
);

export const deleteEmployeeTableData = createAsyncThunkWithTokenRefresh(
  "employeeTable/deleteEmployeeTableData",
  async (token: string, payload: DeleteEmployeeProps) => {
    const { tableRowId } = payload;
    const headers = {}; // Adjust the value as needed
    return axios.delete<DeleteEmployeeTableApiResponse>(
      `${baseUrl}/deleteEmployee/${tableRowId}`,
      createAxiosConfig(token, headers)
    );
  }
);

export const employeeTableSlice = createSlice({
  name: "employeeTable",
  initialState,
  reducers: {
    resetGetEmployeeProfile(state) {
      state.employeeProfileData = null;
      state.employeeProfileIsLoading = false;
      state.employeeProfileIsError = false;
      state.employeeProfileError = "";
      state.employeeProfileIsSuccess = false;
    },
    resetAddEmployee(state) {
      state.employeeAddDataLoading = false;
      state.employeeAddedDataIsError = false;
      state.employeeAddedDataError = "";
      state.employeeAddedDataIsSuccess = false;
    },
    resetEditEmployee(state) {
      state.employeeEditDataLoading = false;
      state.employeeEditDataIsError = false;
      state.employeeEditDataError = "";
      state.employeeEditDataIsSuccess = false;
    },
    resetDeleteEmployee(state) {
      state.employeeDeleteDataLoading = false;
      state.employeeDeleteDataIsError = false;
      state.employeeDeleteDataError = "";
      state.employeeDeleteDataIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEmployeeTableData.pending, (state) => {
        state.data = null;
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(getEmployeeTableData.fulfilled, (state, action) => {
        state.data = action.payload as GetEmployeeTableAPIResponse;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
      })
      .addCase(getEmployeeTableData.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.isSuccess = false;
      })
      .addCase(getEmployeeProfileData.pending, (state) => {
        state.employeeProfileData = null;
        state.employeeProfileIsLoading = true;
        state.employeeProfileIsError = false;
        state.employeeProfileError = "";
        state.employeeProfileIsSuccess = false;
      })
      .addCase(getEmployeeProfileData.fulfilled, (state, action) => {
        state.employeeProfileData =
          action.payload as GetEmployeeProfileApiResponse;
        state.employeeProfileIsLoading = false;
        state.employeeProfileIsError = false;
        state.employeeProfileError = "";
        state.employeeProfileIsSuccess = true;
      })
      .addCase(getEmployeeProfileData.rejected, (state, action) => {
        state.employeeProfileData = null;
        state.employeeProfileIsLoading = false;
        state.employeeProfileIsError = true;
        state.employeeProfileError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeProfileIsSuccess = false;
      })
      .addCase(addEmployeeTableData.pending, (state) => {
        state.employeeAddedData = null;
        state.employeeAddDataLoading = true;
        state.employeeAddedDataIsError = false;
        state.employeeAddedDataError = "";
        state.employeeAddedDataIsSuccess = false;
      })
      .addCase(addEmployeeTableData.fulfilled, (state, action) => {
        state.employeeAddedData = action.payload as AddSuccessApiResponse;
        state.employeeAddDataLoading = false;
        state.employeeAddedDataIsError = false;
        state.employeeAddedDataError = "";
        state.employeeAddedDataIsSuccess = true;
      })
      .addCase(addEmployeeTableData.rejected, (state, action) => {
        state.employeeAddedData = null;
        state.employeeAddDataLoading = false;
        state.employeeAddedDataIsError = true;
        state.employeeAddedDataError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeAddedDataIsSuccess = false;
      })
      .addCase(editEmployeeTableData.pending, (state) => {
        state.employeeEditedData = null;
        state.employeeEditDataLoading = true;
        state.employeeEditDataIsError = false;
        state.employeeEditDataError = "";
        state.employeeEditDataIsSuccess = false;
      })
      .addCase(editEmployeeTableData.fulfilled, (state, action) => {
        state.employeeEditedData =
          action.payload as EditEmployeeProfileApiResponse;
        state.employeeEditDataLoading = false;
        state.employeeEditDataIsError = false;
        state.employeeEditDataError = "";
        state.employeeEditDataIsSuccess = true;
      })
      .addCase(editEmployeeTableData.rejected, (state, action) => {
        state.employeeEditedData = null;
        state.employeeEditDataLoading = false;
        state.employeeEditDataIsError = true;
        state.employeeEditDataError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeEditDataIsSuccess = false;
      })
      .addCase(deleteEmployeeTableData.pending, (state) => {
        state.employeeDeletedData = null;
        state.employeeDeleteDataLoading = true;
        state.employeeDeleteDataIsError = false;
        state.employeeDeleteDataError = "";
        state.employeeDeleteDataIsSuccess = false;
      })
      .addCase(deleteEmployeeTableData.fulfilled, (state, action) => {
        state.employeeDeletedData =
          action.payload as DeleteEmployeeTableApiResponse;
        state.employeeDeleteDataLoading = false;
        state.employeeDeleteDataIsError = false;
        state.employeeDeleteDataError = "";
        state.employeeDeleteDataIsSuccess = true;
      })
      .addCase(deleteEmployeeTableData.rejected, (state, action) => {
        state.employeeDeletedData = null;
        state.employeeDeleteDataLoading = false;
        state.employeeDeleteDataIsError = true;
        state.employeeDeleteDataError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeDeleteDataIsSuccess = false;
      });
  },
});

export const {
  resetAddEmployee,
  resetDeleteEmployee,
  resetEditEmployee,
  resetGetEmployeeProfile,
} = employeeTableSlice.actions;

export default employeeTableSlice.reducer;
