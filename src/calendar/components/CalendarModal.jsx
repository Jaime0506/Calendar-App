import ReactModal from "react-modal";
import { addHours } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import { useForm, useUiStore } from "../../hooks";
import { customStylesModal } from "../../helpers";

import "react-datepicker/dist/react-datepicker.css";

ReactModal.setAppElement("#root");
registerLocale("es", es);

export const CalendarModal = () => {
    const {
        modal: { isVisible },
        closeDateModal,
        openToastify,
    } = useUiStore();

    const { formValues, onInputChange, onPickerDateChange, error, validateForm } = useForm({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const onSubmit = (event) => {
        event.preventDefault();

        const response = validateForm()

        if (response?.message) {
            openToastify(response.message)

            return
        }

        console.log("TODO LISTO PARA EL SUBMIT")
    };

    return (
        <ReactModal
            isOpen={isVisible}
            onRequestClose={closeDateModal}
            style={customStylesModal}
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
                            className={` ${error?.start ? "is-invalid" : "" } form-control`}
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
                            className={`${error?.end ? "is-invalid" : "" } form-control`}
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
                            className={` ${ error?.title ? "is-invalid" : "" } form-control`}
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
                            className="form-control"
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
