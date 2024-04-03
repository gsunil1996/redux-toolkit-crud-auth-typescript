import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import {
  loginAction,
  resetCheckTokenValidtyAction,
  resetLoginAction,
  resetRefreshction,
  resetRegisterAction,
} from "@/redux/features/authSlice";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Login = () => {
  const router = useRouter();

  const dispatch = useAppDispatch()

  const { loginIsLoading, loginIsError, loginError, loginIsSuccess } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginAction({ email, password }))
  };

  useEffect(() => {
    if (loginIsSuccess) {
      toast("login Successful", { autoClose: 2000, type: "success" });
      dispatch(resetLoginAction());
      router.push("/crud-operations")
    } else if (loginIsError) {
      toast(loginError, { autoClose: 2000, type: "error" });
      dispatch(resetLoginAction());
    }
  }, [loginIsError, loginIsSuccess])

  useEffect(() => {
    localStorage.clear();
    dispatch(resetLoginAction())
    dispatch(resetRefreshction());
    dispatch(resetCheckTokenValidtyAction());
    dispatch(resetRegisterAction());
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              name="password"
              label="Password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loginIsLoading ? <div>Loading ...</div> : "Login"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" style={{ color: "#1976d2" }}>
                Do not have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
