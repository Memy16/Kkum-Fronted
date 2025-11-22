import "../css/resenias.css";

export default function Reseñas() {
    return (
        <div className="reseñas-container">
            <h1 className="reseñas-title">Reseñas</h1>
            
            <div className="reseña-card">
                <h3>Cyberpunk 2077</h3>
                <p>Muy buen juego pero tiene bugs.</p>
            </div>
            
            <div className="reseña-form">
                <textarea placeholder="Escribe tu reseña aquí..." />
            </div>
            
            <button className="btn-enviar-reseña">Enviar Reseña</button>
        </div>
    );
}
