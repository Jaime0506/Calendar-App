import { useAuthStore } from "../../hooks"

export const Navbar = () => {
  const { handleOnLogout, user } = useAuthStore()
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt mr-2"></i>
            &nbsp;
            {user?.name || "Anonimo"}
        </span>

        <button className="btn btn-outline-danger" onClick={handleOnLogout}>
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Cerrar Sesion</span>
        </button>
    </div>
  )
}
