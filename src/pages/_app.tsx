import "@/styles/globals.css";
import type { AppProps } from "next/app";

// ** Redux Import
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// ** Third Party Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ** components Import
import Sidebar from "@/components/sidebar/Sidebar";
import dynamic from "next/dynamic";
import { Box, LinearProgress } from "@mui/material";

const Header = dynamic(() => import("../components/header/Header"), {
  ssr: false,
  loading: () => (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div>
        <Header />
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <div style={{ width: "100%" }}>
          <Component {...pageProps} />
        </div>
      </div>
      <ToastContainer />
    </Provider>
  );
}
