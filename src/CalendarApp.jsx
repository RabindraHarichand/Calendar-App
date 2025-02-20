import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

export const CalendarApp = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <AppRouter />
    </BrowserRouter>
  );
};
