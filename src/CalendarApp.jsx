import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router";
import { NotifyToasti } from "./components";

import { useUiStore } from "./hooks";

export const CalendarApp = () => {
    
    const {  isVisibleToastify, messageToastify, closeToastify } = useUiStore()
    
    return (
        <BrowserRouter>
            <AppRouter />

            {isVisibleToastify && (
                <NotifyToasti
                    isActive={isVisibleToastify}
                    message={messageToastify}
                    onClose={closeToastify}
                />
            )}
        </BrowserRouter>
    );
};
