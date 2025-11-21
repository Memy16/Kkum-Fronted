import { useParams } from "react-router-dom";
import juegos from "../data/juegos";
import "../css/juego-detalle.css";

export default function JuegoDetalle() {
    const { id } = useParams();
    const juego = juegos[id];

    return (
        <div className="detalle-container">
            <img className="detalle-img" src={juego.imagen} />

            <div className="detalle-info">
                <h1>{juego.titulo}</h1>
                <p>{juego.descripcion}</p>

                <a className="btn-descargar" href={juego.link} target="_blank">
                    Descargar / Info
                </a>
            </div>
        </div>
    );
}
