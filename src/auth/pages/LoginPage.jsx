import { useState } from "react";
import { useAuthStore } from "../../hooks";

import "./LoginPage.css";

export const LoginPage = () => {

    const { handleOnLogin } = useAuthStore()

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const onInputChange = (event) => {
        const { target } = event

        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        handleOnLogin(formValue.email, formValue.password)
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                onChange={onInputChange}
                                value={formValue.email}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                onChange={onInputChange}
                                value={formValue.password}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                            />
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
