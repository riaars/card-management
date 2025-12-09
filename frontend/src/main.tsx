import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Navbar from "./layout/Navbar.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./shared/components/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Provider store={store}>
        <>
          <Navbar />
          <App />
        </>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
