import { differenceInSeconds } from "date-fns";
import { useState } from "react";

export const useForm = (initialState = {}) => {
    const [formValues, setFormValues] = useState(initialState);
    const [error, setError] = useState(null)

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onPickerDateChange = (type, date) => {
        setFormValues({
            ...formValues,
            [type]: date,
        });
    };

    const validateForm = () => {
        setError(null)

        const difference = differenceInSeconds(
            formValues.end,
            formValues.start
        );


        if (formValues.start <= 0) {
            setError({ start: true })
            return {
                role: "start",
                message: "Los campos de fecha no pueden estar vacios",
            };
        }

        if (formValues.end <= 0) {
            setError({ end: true })
            return {
                role: "end",
                message: "Los campos de fecha no pueden estar vacios",
            };
        }

        if (formValues.title.length <= 0) {
            setError({ title: true })
            return {
                role: "title",
                message: "El titulo es obligatorio",
            };
        }

        if (difference <= 0 || isNaN(difference)) {
            setError({ end: true })
            return {
                role: "end",
                message: "la fecha de finalizacion debe ser mayor a la de inicio",
            };
        }
    };
    
    return {
        formValues,
        onInputChange,
        onPickerDateChange,
        validateForm,
        error
    };
};
