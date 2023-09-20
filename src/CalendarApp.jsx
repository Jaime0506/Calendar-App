import { HashRouter } from "react-router-dom";

import { AppRouter } from "./router";
import { NotifyToasti } from "./components";

export const CalendarApp = () => {
    return (
        <HashRouter>
            <AppRouter />
            <NotifyToasti />
        </HashRouter>
    );
};
