import { useState } from "react";
import juegos from "../data/juegos";
import TarjetaJuego from "../components/TarjetaJuego";
import ModalJuego from "../components/ModalJuego";
import "../css/biblioteca.css";

export default function Biblioteca() {
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

    const handleCardClick = (juego) => {
        setJuegoSeleccionado(juego);
    };

    const handleCloseModal = () => {
        setJuegoSeleccionado(null);
    };

    const handleCompletado = () => {
        if (juegoSeleccionado) {
            alert(`¡${juegoSeleccionado.titulo} marcado como completado!`);
            // Aquí iría la lógica para marcar como completado
            handleCloseModal();
        }
    };

    const handleReseña = () => {
        if (juegoSeleccionado) {
            alert(`Redirigiendo a reseñas de ${juegoSeleccionado.titulo}`);
            // Aquí podrías redirigir a la página de reseñas o abrir otro modal
            handleCloseModal();
        }
    };

    return (
        <div className="biblioteca-container">
            <h1 className="neon-title">Biblioteca de Juegos</h1>

            <div className="grid-juegos">
                {juegos.map((juego, index) => (
                    <div 
                        key={juego.titulo} 
                        onClick={() => handleCardClick(juego)}
                        style={{ cursor: 'pointer' }}
                    >
                        <TarjetaJuego juego={juego} />
                    </div>
                ))}
            </div>

            {/* Modal de detalle */}
            {juegoSeleccionado && (
                <ModalJuego 
                    juego={juegoSeleccionado}
                    onClose={handleCloseModal}
                    onCompletado={handleCompletado}
                    onReseña={handleReseña}
                />
            )}
        </div>
    );
}