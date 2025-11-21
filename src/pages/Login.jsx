import "../css/auth.css";

export default function Login() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Iniciar Sesión</h2>

                <div className="auth-input">
                    <input type="email" placeholder="Email" />
                </div>

                <div className="auth-input">
                    <input type="password" placeholder="Contraseña" />
                </div>

                <button className="btn-auth">Ingresar</button>
            </div>
        </div>
    );
}
