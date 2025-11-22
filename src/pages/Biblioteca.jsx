import { useState, useEffect } from "react";
import TarjetaJuego from "../components/TarjetaJuego";
import ModalJuego from "../components/ModalJuego";
import "../css/biblioteca.css";

export default function Biblioteca() {
    const [juegos, setJuegos] = useState([]);
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(true);
    const USER_ID = "usuario-demo-123";

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

    const handleAddToCollection = async (gameId) => {
        try {
            const response = await fetch('http://localhost:5000/api/collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: USER_ID,
                    gameId: gameId
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert('✅ ¡Juego añadido a tu colección!');
                handleCloseModal();
            } else {
                alert('❌ Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error añadiendo a colección:', error);
            alert('❌ Error de conexión');
        }
    };

    // 🆕 AGREGAR ESTA FUNCIÓN en Biblioteca.jsx
    const handleCompletado = async () => {
        if (juegoSeleccionado) {
            try {
                const response = await fetch('http://localhost:5000/api/completed', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: USER_ID,
                        gameId: juegoSeleccionado._id,
                        horasTotales: 0, // Puedes cambiar esto
                        puntuacionPersonal: 5 // O pedir al usuario
                    })
                });

                if (response.ok) {
                    alert(`✅ ¡${juegoSeleccionado.titulo} marcado como completado!`);
                    handleCloseModal();
                } else {
                    alert('❌ Error al marcar como completado');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Error de conexión');
            }
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
                    onAddToCollection={() => handleAddToCollection(juegoSeleccionado._id)}
                />
            )}
        </div>
    );
}