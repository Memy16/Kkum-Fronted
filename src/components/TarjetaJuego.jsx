import "../css/biblioteca.css";

export default function TarjetaJuego({ juego }) {
    if (!juego) {
        return <div className="card-juego">Error: Juego no disponible</div>;
    }
    
    const categorias = Array.isArray(juego.categorias) ? juego.categorias : [];
    const categoriasTexto = categorias.length > 0 ? categorias.join(" • ") : "Sin categorías";

    return (
        <div className="card-juego">
            <img src={juego.imagen || ''} alt={juego.titulo || 'Juego'} />
            <h3 className="titulo">{juego.titulo || 'Sin título'}</h3>
            <p className="categoria">{categoriasTexto}</p>
        </div>
    );
}