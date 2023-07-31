import { useState } from "react";
import ReactModal from "react-modal";

import { addHours } from "date-fns";
import "./modal.css";

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

export const CalendarModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [formValues, setFormValues] = useState({
        title: "Busqueda de notas",
        notes: "Este es el ejemplo de una nota",
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const onCloseModal = () => {
        console.log("Cerrando Modal");
        setModalIsOpen(false);
    };

    const onInputChange = ({ target }) => {
        const { value, name } = target

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        console.log(formValues)
    }

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
                        <input
                            className="form-control"
                            placeholder="Fecha inicio"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="mb-1">Fecha y hora fin</label>
                        <input
                            className="form-control"
                            placeholder="Fecha inicio"
                        />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label className="mb-1">Titulo y notas</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={ formValues.title }
                            onChange={ onInputChange }
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
                            value={ formValues.notes }
                            onChange={ onInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">
                            Información adicional
                        </small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                        onClick={ onSubmit }
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </div>
        </ReactModal>
    );
};
