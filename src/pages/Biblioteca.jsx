import { useState, useEffect } from "react";
import TarjetaJuego from "../components/TarjetaJuego";
import ModalJuego from "../components/ModalJuego";
import "../css/biblioteca.css";

export default function Biblioteca() {
    const [juegos, setJuegos] = useState([]);
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchJuegos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/games');
                const data = await response.json();
                setJuegos(data);
            } catch (error) {
                console.error('Error cargando juegos:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchJuegos();
    }, []);
    
    const handleCardClick = (juego) => {
        setJuegoSeleccionado(juego);
    };
    
    const handleCloseModal = () => {
        setJuegoSeleccionado(null);
    };
    
    const handleCompletado = () => {
        if (juegoSeleccionado) {
            alert(`¡${juegoSeleccionado.titulo} marcado como completado!`);
            handleCloseModal();
        }
    };
    
    const handleReseña = () => {
        if (juegoSeleccionado) {
            alert(`Redirigiendo a reseñas de ${juegoSeleccionado.titulo}`);
            handleCloseModal();
        }
    };
    
    if (loading) {
        return (
            <div className="biblioteca-container">
                <h1 className="neon-title">Biblioteca de Juegos</h1>
                <div className="loading">Cargando juegos...</div>
            </div>
        );
    }
    
    return (
        <div className="biblioteca-container">
            <h1 className="neon-title">Biblioteca de Juegos</h1>
            
            <div className="grid-juegos">
                {juegos.map(juego => (    
                    <div 
                        key={juego._id} 
                        onClick={() => handleCardClick(juego)}
                        style={{ cursor: 'pointer' }}
                    >
                        <TarjetaJuego juego={juego} />
                    </div>
                ))}
            </div>
            
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