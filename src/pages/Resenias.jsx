import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "../css/resenias.css";

export default function Reseñas() {
    const [reseñas, setReseñas] = useState([]);
    const [nuevaReseña, setNuevaReseña] = useState({
        juegoId: "",
        comentario: ""
    });
    const [loading, setLoading] = useState(true);
    const USER_ID = localStorage.getItem("USER_ID");
    
    const [juegos, setJuegos] = useState([]);
    useEffect(() => {
        const fetchJuegos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/games');
                const data = await response.json();
                setJuegos(data);
                if (data.length > 0) {
                    setNuevaReseña(prev => ({ ...prev, juegoId: data[0]._id }));
                    fetchReseñasPorJuego(data[0]._id);
                }
            } catch (error) {
                console.error('Error cargando juegos:', error);
                setLoading(false);
            }
        };

        fetchJuegos();
    }, []);
    
    const fetchReseñasPorJuego = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/reviews/game/${gameId}`);
            const data = await response.json();
            setReseñas(data);
        } catch (error) {
            console.error('Error cargando reseñas:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleCambiarJuego = (gameId) => {
        setNuevaReseña(prev => ({ ...prev, juegoId: gameId }));
        setLoading(true);
        fetchReseñasPorJuego(gameId);
    };
    
    const handleEnviarReseña = async () => {
        if (!nuevaReseña.juegoId || !nuevaReseña.comentario.trim()) {
            await Swal.fire({
                icon: 'warning',
                title: 'Completa la reseña',
                text: 'Selecciona un juego y escribe tu reseña',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: USER_ID,
                    gameId: nuevaReseña.juegoId,
                    comentario: nuevaReseña.comentario,
                    estrellas: 5
                })
            });

            if (response.ok) {
                await response.json();
                fetchReseñasPorJuego(nuevaReseña.juegoId);
                setNuevaReseña(prev => ({ ...prev, comentario: "" }));
                await Swal.fire({
                    icon: 'success',
                    title: '¡Reseña publicada!',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                const errorData = await response.json();
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorData.error || 'No se pudo publicar la reseña',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    if (loading) {
        return (
            <div className="reseñas-container">
                <h1 className="reseñas-title">Reseñas</h1>
                <div className="loading">Cargando reseñas...</div>
            </div>
        );
    }

    return (
        <div className="reseñas-container">
            <h1 className="reseñas-title">Reseñas</h1>
            
            <div className="selector-juego">
                <label>Selecciona un juego para ver sus reseñas:</label>
                <select
                    value={nuevaReseña.juegoId}
                    onChange={(e) => handleCambiarJuego(e.target.value)}
                    className="form-select"
                >
                    {juegos.map(juego => (
                        <option key={juego._id} value={juego._id}>
                            {juego.titulo}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="reseñas-list">
                <h3>Reseñas de {juegos.find(j => j._id === nuevaReseña.juegoId)?.titulo || "Juego"}</h3>

                {reseñas.length === 0 ? (
                    <div className="reseñas-vacio">
                        <p>📝 Aún no hay reseñas para este juego</p>
                        <p>¡Sé el primero en escribir una!</p>
                    </div>
                ) : (
                    reseñas.map(reseña => (
                        <div key={reseña._id} className="reseña-card">
                            <h4>{reseña.gameId?.titulo || "Juego"}</h4>
                            <p className="reseña-usuario">Por: {reseña.userId?.nombre || reseña.userId?.email || "Usuario"}</p>
                            <p className="reseña-fecha">
                                {new Date(reseña.fecha).toLocaleDateString()}
                            </p>
                            <p>{reseña.comentario}</p>
                        </div>
                    ))
                )}
            </div>
            
            <div className="reseña-form">
                <h3>Escribe tu Reseña</h3>

                <textarea
                    placeholder="Comparte tu experiencia con este juego..."
                    value={nuevaReseña.comentario}
                    onChange={(e) => setNuevaReseña(prev => ({ ...prev, comentario: e.target.value }))}
                    rows="4"
                />

                <button
                    className="btn-enviar-reseña"
                    onClick={handleEnviarReseña}
                >
                    Enviar Reseña
                </button>
            </div>
        </div>
    );
}
