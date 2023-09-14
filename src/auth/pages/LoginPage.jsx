import { useState } from "react";
import { useAuthStore } from "../../hooks";

import "./LoginPage.css";
import { validationEmail } from "../../helpers";

export const LoginPage = () => {

    const { handleOnLogin, handleOnErrorForm, handleOnRegister } = useAuthStore()

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const [errorControl, setErrorControl] = useState({
        name: null,
        email: null,
        password: null,
    })

    const onInputChange = (event, setValues) => {
        const { target } = event

        setValues((formValue) => ({
            ...formValue,
            [target.name]: target.value
        }))
    }

    const onSubmitLogin = (event) => {
        event.preventDefault()
        handleOnLogin(loginForm.email, loginForm.password)
    }

    const onSubmitRegister = (event) => {
        event.preventDefault()
        // Sera true cuando todos pasen la validacion de no estar vacios, de lo contrario sera false
        let isEmpyValidation = true

        let errorTemp = { 
            name: null,
            email: null,
            password: null,
        }

        Object.keys(registerForm).forEach((key) => {
            if (!registerForm[key]) {
                isEmpyValidation = false
            }
        })

        if (!isEmpyValidation) return handleOnErrorForm("Todos los campos son obligatorios")

        if (!validationEmail(registerForm.email)) {
            errorTemp = {...errorTemp, ["email"]: "El email es invalido"}
        }

        if (registerForm.name.length < 4) {
            errorTemp = {...errorTemp, ["name"]: "El usuario debe tener minimo 4 caracteres"}
        }

        if (registerForm.password < 7) {
            errorTemp = {...errorTemp, ["password"]: "La constrasena debe tener mas de 6 caracteres"}
        }

        if (registerForm.repeatPassword !== registerForm.password) {
            errorTemp = {...errorTemp, ["password"]: "Las contraseñas no coinciden"}
        }

        if (!errorTemp.email && !errorTemp.name && !errorTemp.password) {
            console.log("Todo listo para hacer peticion")
            handleOnRegister({...registerForm})
        }

        setErrorControl(errorTemp)
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={onSubmitLogin}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                onChange={(e) => onInputChange(e, setLoginForm)}
                                value={loginForm.email}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                onChange={(e) => onInputChange(e, setLoginForm)}
                                value={loginForm.password}
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
                    <form onSubmit={onSubmitRegister}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Nombre"
                                name="name"
                                onChange={(e) => onInputChange(e, setRegisterForm)}
                                className={`form-control ${errorControl?.name && "is-invalid"}`}
                            />
                            { errorControl?.name &&  (<div className="invalid-feedback">{errorControl.name}</div>) }
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                placeholder="Correo"
                                name="email"
                                onChange={(e) => onInputChange(e, setRegisterForm)}
                                className={`form-control ${errorControl?.email && "is-invalid"}`}
                            />
                            { errorControl?.email &&  (<div className="invalid-feedback">{errorControl.email}</div>) }
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                onChange={(e) => onInputChange(e, setRegisterForm)}
                                className={`form-control ${errorControl?.password && "is-invalid"}`}
                            />
                            { errorControl?.password &&  (<div className="invalid-feedback">{errorControl.password}</div>) }
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="repeatPassword"
                                onChange={(e) => onInputChange(e, setRegisterForm)}
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
