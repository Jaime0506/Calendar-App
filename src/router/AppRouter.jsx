import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useEffect } from "react";
import { useAuthStore } from "../hooks";
import { Checking } from "../components";

export const AppRouter = () => {

    const { status, handleChecking } = useAuthStore()

    useEffect(() => {
        handleChecking()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (status == "checking") return <Checking />

    return (
        <Routes>
            {
                (status === "not-authenticated"
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to='/auth/login' />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<CalendarPage />} />)
                            <Route path="/*" element={<Navigate to='/' />} />
                        </>
                    )
                )
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
