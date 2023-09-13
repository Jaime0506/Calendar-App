import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useAuthStore } from "../hooks";
import "react-toastify/dist/ReactToastify.css";


export const NotifyToasti = () => {
    const { errorMessage } = useAuthStore()

    useEffect(() => {
        errorMessage && (
            toast.error(errorMessage, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
            })
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessage]);

    return (
        <ToastContainer limit={1} />
    );
};