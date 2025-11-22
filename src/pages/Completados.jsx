import juegos from "../data/juegos";
import "../css/completados.css";

export default function Completados() {
    return (
        <div className="completados-container">
            <h1 className="completados-title">Juegos Completados</h1>
            
            {juegos.slice(10, 15).map(j => (
                <div key={j.titulo} className="completados-item">
                    {j.titulo}
                </div>
            ))}
        </div>
    );
}
