import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router";
import { NotifyToasti } from "./components";

import { useUiStore } from "./hooks/useUiStore";

export const CalendarApp = () => {
    
    const { toastify: { isVisible, message }, closeToastify } = useUiStore()

    return (
        <BrowserRouter>
            <AppRouter />

            {isVisible && (
                <NotifyToasti
                    message={message}
                    isActive={isVisible}
                    onClose={closeToastify}
                />
            )}
        </BrowserRouter>
    );
};
