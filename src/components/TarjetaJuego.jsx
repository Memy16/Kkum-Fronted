import "../css/biblioteca.css";

export default function TarjetaJuego({ juego }) {
    return (
        <div className="card-juego">
            <img src={juego.imagen} alt={juego.titulo} />
            <h3 className="titulo">{juego.titulo}</h3>
            <p className="categoria">{juego.categorias.join(" • ")}</p>
            <div className="card-hover-effect">
                <span>Click para ver detalles</span>
            </div>
        </div>
    );
}