import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {

    const state = "not-authenticate"

    return (
        <Routes>
            {
                (state === "not-authenticated"
                    ? <Route path="/auth/*" element={ <LoginPage /> }/>
                    : <Route path="/*" element={<CalendarPage />} />
                )
            }     
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
