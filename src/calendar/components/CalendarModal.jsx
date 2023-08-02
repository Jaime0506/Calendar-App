import { useState } from "react";
import ReactModal from "react-modal";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { useDispatch } from "react-redux";

import { openModal } from "../../store/notifications";

import "./modal.css";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

ReactModal.setAppElement("#root");
registerLocale("es", es);

export const CalendarModal = () => {
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [formValues, setFormValues] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
    });
    const [error, setError] = useState({
        title: false,
        note: false,
        start: false,
        end: false,
    });

    const onCloseModal = () => {
        console.log("Cerrando Modal");
        setModalIsOpen(false);
    };

    const onInputChange = ({ target }) => {
        const { value, name } = target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const onPickerDateChange = (type, date) => {
        console.log(date);
        setFormValues({
            ...formValues,
            [type]: date,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        setError({
            title: false,
            note: false,
            start: false,
            end: false,
        });

        // VERIFICO QUE LA FECHA FINAL SEA SIEMPRE MAYOR A LA INICIAL, ANTES DE GUARDAR CUALQUIER DATO
        const difference = differenceInSeconds(
            formValues.end,
            formValues.start
        );

        if (formValues.start <= 0) {
            dispatch(openModal("Los campos de fecha no pueden estar vacios"));
            setError({
                ...error,
                ["start"]: true,
            });

            return;
        }

        if (formValues.end <= 0) {
            dispatch(openModal("Los campos de fecha no pueden estar vacios"));
            setError({
                ...error,
                ["end"]: true,
            });

            return;
        }

        if (difference <= 0 || isNaN(difference)) {
            dispatch(
                openModal(
                    "La fecha de finalizacion debe ser mayor a la de inicio"
                )
            );
            setError({
                ...error,
                ["end"]: true,
            });

            return;
        }

        if (formValues.title.length <= 0) {
            dispatch(openModal("El titulo y nota son requeridos"));
            setError({
                ...error,
                ["title"]: true,
            });
            return;
        }

        if (formValues.notes.length <= 0) {
            dispatch(openModal("El titulo y nota son requeridas"));
            setError({
                ...error,
                ["note"]: true,
            });

            return;
        }
    };

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <div className="p-3">
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container">
                    <div className="form-group mb-3">
                        <label className="mb-1">Fecha y hora inicio</label>
                        <DatePicker
                            locale="es"
                            className={`${
                                error.start ? "is-invalid" : ""
                            } form-control`}
                            selected={formValues.start}
                            onChange={(date) =>
                                onPickerDateChange("start", date)
                            }
                            dateFormat="dd/MM/yyyy h:mm aa"
                            showTimeSelect
                            timeCaption="Hora"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="mb-1">Fecha y hora fin</label>
                        <DatePicker
                            locale="es"
                            minDate={formValues.start}
                            className={`${
                                error.end ? "is-invalid" : ""
                            } form-control`}
                            selected={formValues.end}
                            onChange={(date) => onPickerDateChange("end", date)}
                            dateFormat="dd/MM/yyyy h:mm aa"
                            showTimeSelect
                            timeCaption="Hora"
                        />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label className="mb-1">Titulo y notas</label>
                        <input
                            type="text"
                            className={`${
                                error.title ? "is-invalid" : ""
                            } form-control`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={onInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            Una descripción corta
                        </small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className={`${
                                error.note ? "is-invalid" : ""
                            } form-control`}
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={formValues.notes}
                            onChange={onInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">
                            Información adicional
                        </small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                        onClick={onSubmit}
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </div>
        </ReactModal>
    );
};
