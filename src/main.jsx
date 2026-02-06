import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./utils/theme.js";
import { Toaster } from "react-hot-toast";

import "./css/custom.css";
import "./css/global.css";

import App from "./components/layout/app.jsx";
import Home from "./pages/Home.jsx";
import Transaksi from "./pages/Transaksi.jsx";
import Laporan from "./pages/Laporan.jsx";
import Pengaturan from "./pages/Pengaturan.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Transaksi",
        element: <Transaksi />,
      },
      {
        path: "/Laporan",
        element: <Laporan />,
      },
      {
        path: "/Pengaturan",
        element: <Pengaturan />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Toaster position="top-center" reversedOrder="false" />
        <RouterProvider router={router}></RouterProvider>
      </CssBaseline>
    </ThemeProvider>
  </StrictMode>,
);
