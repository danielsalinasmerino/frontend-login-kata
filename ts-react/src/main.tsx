import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./navigation/AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
