import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppRouter } from "./router";
import { NotifyToasti } from "./components";

import { closeModal } from "./store/notifications";

export const CalendarApp = () => {
    const { isVisible, message } = useSelector((store) => store.notification);
    const dispatch = useDispatch();

    const onCloseNotification = () => {
        dispatch(closeModal());
    };

    return (
        <BrowserRouter>
            <AppRouter />

            {isVisible && (
                <NotifyToasti
                    message={message}
                    isActive={isVisible}
                    onClose={onCloseNotification}
                />
            )}
        </BrowserRouter>
    );
};
