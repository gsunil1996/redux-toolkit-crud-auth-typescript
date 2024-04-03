import { Dispatch, SetStateAction } from "react";

////////////////// Error Response Type //////////////////////////////////////////////////////
export type ErrorResponseType = {
  success: boolean;
  error: string;
};

///////////////// GET EMPLOYEE TABLE /////////////////////////////////////////////////////////

export type GetEmployeeTableDataProps = {
  search: string;
  gender: string;
  status: string;
  sort: string;
  page: number;
};

type Pagination = {
  count: number;
  pageCount: number;
};

export type Employee = {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  gender: string;
  status: string;
  location: string;
  datecreated: string; // This should ideally be a Date type if you can parse it
  __v: number;
  dateUpdated?: string; // This property is optional as it's not present in all employee objects
};

type EmployeesData = {
  pagination: Pagination;
  employeesTableData: Employee[];
};

export type GetEmployeeTableAPIResponse = {
  success: boolean;
  data: EmployeesData;
};

///////////////// GET EMPLOYEE PROFILE /////////////////////////////////////////////////////////

export type GetEmployeeProfileProps = {
  id: string;
};

export type GetEmployeeProfileApiResponse = {
  success: boolean;
  data: Employee;
};

///////////////// DELETE EMPLOYEE ////////////////////////////////////////////////////////////

export type DeleteEmployeeProps = {
  tableRowId: string;
};

export type DeleteEmployeeTableApiResponse = {
  success: boolean;
  data: Employee;
};

///////////////// ADD EMPLOYEE ////////////////////////////////////////////////////////////////

export type InputDataType = {
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  gender: string;
  location: string;
  status: string;
};

export type AddSuccessApiResponse = InputDataType & {
  datecreated: string;
  _id: string;
  __v: number;
};

///////////////// EDIT EMPLOYEE ////////////////////////////////////////////////////////////////

export type EditEmployeeProfileApiResponse = {
  success: boolean;
  data: Employee;
};

export type EditEmployeeTableProps = {
  tableRowId: string;
  data: InputDataType;
};

///////////////// INITIAL STATE TYPE //////////////////////////////////////////////////////

export type CrudInitialState = {
  data: GetEmployeeTableAPIResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;

  employeeProfileData: GetEmployeeProfileApiResponse | null;
  employeeProfileIsLoading: boolean;
  employeeProfileIsSuccess: boolean;
  employeeProfileIsError: boolean;
  employeeProfileError: string;

  employeeAddedData: AddSuccessApiResponse | null;
  employeeAddedDataIsSuccess: boolean;
  employeeAddDataLoading: boolean;
  employeeAddedDataIsError: boolean;
  employeeAddedDataError: string;

  employeeEditedData: EditEmployeeProfileApiResponse | null;
  employeeEditDataLoading: boolean;
  employeeEditDataIsSuccess: boolean;
  employeeEditDataIsError: boolean;
  employeeEditDataError: string;

  employeeDeletedData: DeleteEmployeeTableApiResponse | null;
  employeeDeleteDataLoading: boolean;
  employeeDeleteDataIsSuccess: boolean;
  employeeDeleteDataIsError: boolean;
  employeeDeleteDataError: string;
};

/////////////////// Component Types /////////////////////////////////////

export type Column = {
  id: string;
  label: string;
  minwidth: number;
  align: "left" | "right" | "center";
  background: string;
};

export type AddEmployeeComponentProps = {
  addEmployeeOpen: boolean;
  setAddEmployeeOpen: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<number>>;
};

export type DeleteEmployeeComponentProps = {
  deleteEmployeeOpen: boolean;
  setDeleteEmployeeOpen: Dispatch<SetStateAction<boolean>>;
  tableRowId: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export type EditEmployeeComponentProps = {
  editEmployeeopen: boolean;
  setEditEmployeeOpen: Dispatch<SetStateAction<boolean>>;
  tableRowId: string;
};

export type GetSingleEmployeeParmsType = {
  params: {
    employee: string;
  };
};

// Slice types
export type CrudPayloadTypes =
  | GetEmployeeTableDataProps
  | GetEmployeeProfileProps
  | InputDataType
  | EditEmployeeTableProps
  | DeleteEmployeeProps;
