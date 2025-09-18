import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Criando o React Query Provider */}
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
