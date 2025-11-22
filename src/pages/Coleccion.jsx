import juegos from "../data/juegos";
import "../css/coleccion.css";

export default function Coleccion() {
    return (
        <div className="coleccion-container">
            <h1 className="titulo-coleccion">Mi Colección</h1>
            
            <div className="coleccion-grid">
                {juegos.slice(0, 8).map(j => (
                    <div key={j.titulo} className="coleccion-card">
                        <img src={j.imagen} width="100%" />
                        <h3>{j.titulo}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
