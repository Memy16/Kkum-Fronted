import "../css/auth.css";
import { loginWithGoogle } from "../firebase";
import Swal from 'sweetalert2';

export default function Login() {
    const currentUserId = localStorage.getItem("USER_ID");
    const handleGoogle = async () => {
        try {
            const result = await loginWithGoogle();
            const user = result.user;
            localStorage.setItem("USER_ID", user.uid);
            localStorage.setItem("USER_NAME", user.displayName);
            localStorage.setItem("USER_PHOTO", user.photoURL);
            try {
                await fetch('http://localhost:5000/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        _id: user.uid,
                        email: user.email,
                        googleId: user.uid,
                        nombre: user.displayName
                    })
                });
            } catch (e) {
                console.error('Error sincronizando usuario:', e);
            }
            window.location.href = "/";
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem("USER_ID");
        localStorage.removeItem("USER_NAME");
        localStorage.removeItem("USER_PHOTO");
        await Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            confirmButtonText: 'Aceptar'
        });
        window.location.href = "/login";
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Iniciar Sesión</h2>
                <button className="btn-google" onClick={handleGoogle}>
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                        alt="Google"
                    />
                    Ingresar con Google
                </button>
                {currentUserId && (
                    <div style={{ marginTop: "1rem" }}>
                        <button className="btn-auth" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                )}
            </div>
        </div>
    );
}
