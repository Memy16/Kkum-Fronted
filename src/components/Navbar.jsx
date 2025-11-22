import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const USER_ID = localStorage.getItem("USER_ID");
    const USER_PHOTO = localStorage.getItem("USER_PHOTO");

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <>
            <nav className="navbar">
                <h1 className="logo"><span style={{ color: "var(--fucsia)" }}>KKUM</span></h1>
                
                <div className="nav-links">
                    <Link to="/">Biblioteca</Link>
                    <Link to="/coleccion">Mi Colección</Link>
                    <Link to="/completados">Completados</Link>
                    <Link to="/resenias">Reseñas</Link>
                    {!USER_ID && <Link to="/login">Login</Link>}
                </div>
                {USER_ID && USER_PHOTO && (
                    <Link to="/login" aria-label="Perfil" className="user-avatar-link">
                        <img src={USER_PHOTO} alt="Usuario" className="user-avatar" />
                    </Link>
                )}
                
                <button
                    className={`menu-hamburguesa ${menuAbierto ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            
            <div className={`menu-mobile ${menuAbierto ? 'active' : ''}`}>
                <button className="cerrar-menu" onClick={cerrarMenu}>
                    ×
                </button>

                <Link to="/" onClick={cerrarMenu}>Biblioteca</Link>
                <Link to="/coleccion" onClick={cerrarMenu}>Mi Colección</Link>
                <Link to="/completados" onClick={cerrarMenu}>Completados</Link>
                <Link to="/resenias" onClick={cerrarMenu}>Reseñas</Link>
                {!USER_ID && <Link to="/login" onClick={cerrarMenu}>Login</Link>}
            </div>
        </>
    );
}
