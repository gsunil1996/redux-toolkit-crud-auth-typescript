import { useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  authRefreshAction,
  checkTokenValidtyAction,
} from "../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChildrenProps } from "@/types/common.types";

const PersistLogin = ({ children }: ChildrenProps) => {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector((state) => state.auth.refreshIsLoading);
  const isError = useAppSelector((state) => state.auth.refreshIsError);
  const error = useAppSelector((state) => state.auth.refreshError);
  const isSuccess = useAppSelector((state) => state.auth.refreshIsSuccess);

  const checkTokenValidityIsLoading = useAppSelector(
    (state) => state.auth.checkTokenValidityIsLoading
  );
  const checkTokenValidityIsError = useAppSelector(
    (state) => state.auth.checkTokenValidityIsError
  );
  const checkTokenValidityError = useAppSelector(
    (state) => state.auth.checkTokenValidityError
  );
  const checkTokenValidityIsSuccess = useAppSelector(
    (state) => state.auth.checkTokenValidityIsSuccess
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authRefreshAction());
    } else {
      dispatch(checkTokenValidtyAction());
    }
  }, [dispatch]);

  if (isLoading || checkTokenValidityIsLoading) {
    return (
      <Box sx={{ width: "100%", marginTop: "40px" }}>
        <LinearProgress />
      </Box>
    );
  } else if (isError || checkTokenValidityIsError) {
    return (
      <p className="errmsg">
        {`${isError ? error : checkTokenValidityError} -`}
        <Link href="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess || checkTokenValidityIsSuccess) {
    return children;
  }

  // Default return statement
  return null;
};

export default PersistLogin;
