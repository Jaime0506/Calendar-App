import PropTypes from "prop-types";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotifyToasti = ({message, isActive, onClose}) => {

    useEffect(() => {
        if (isActive) {
            toast.error(message, {
                position: "bottom-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => onClose()
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, message]);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

NotifyToasti.propTypes = {
    message: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};
