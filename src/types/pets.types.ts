export type PetsDataType = {
  id: string;
  name: string;
  image: {
    url: string;
  };
};

export type PetsErrorResponse = {
  message: string;
};

export type PetsStateType = {
  petsData: PetsDataType[] | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;
};
