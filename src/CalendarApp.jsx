import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router";
import { NotifyToasti } from "./components";

export const CalendarApp = () => {
    return (
        <BrowserRouter>
            <AppRouter />
            <NotifyToasti />
        </BrowserRouter>
    );
};
