import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import TarjetaJuego from "../components/TarjetaJuego";
import ModalJuego from "../components/ModalJuego";
import "../css/biblioteca.css";

export default function Biblioteca() {
    const [juegos, setJuegos] = useState([]);
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(true);
    const USER_ID = localStorage.getItem("USER_ID");

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
                await Swal.fire({
                    icon: 'success',
                    title: '¡Juego añadido! ',
                    text: 'Se añadió a tu colección',
                    confirmButtonText: 'Aceptar'
                });
                handleCloseModal();
            } else {
                const msg = (result && (result.error || result.message)) ? (result.error || result.message) : '';
                const duplicate = (
                    response.status === 409 ||
                    /exist|existe|ya\s*est[aá]/i.test(msg) ||
                    /e11000|duplicate\s*key|unique\s*constraint|duplicado/i.test(String(msg).toLowerCase())
                );
                if (duplicate) {
                    await Swal.fire({
                        icon: 'info',
                        title: 'Este juego ya está en tu colección',
                        text: juegoSeleccionado?.titulo ? `${juegoSeleccionado.titulo} ya estaba agregado` : '',
                        confirmButtonText: 'Aceptar'
                    });
                    handleCloseModal();
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: msg || 'Ocurrió un error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        } catch (error) {
            console.error('Error añadiendo a colección:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    
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
                        horasTotales: 0, 
                        puntuacionPersonal: 5 
                    })
                });

                if (response.ok) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Juego completado',
                        text: `${juegoSeleccionado.titulo} marcado como completado`,
                        confirmButtonText: 'Aceptar'
                    });
                    handleCloseModal();
                } else {
                    const errText = await response.text();
                    const duplicate = (
                        response.status === 409 ||
                        /exist|existe|ya\s*est[aá]/i.test(errText) ||
                        /e11000|duplicate\s*key|unique\s*constraint|duplicado/i.test(String(errText).toLowerCase())
                    );
                    if (duplicate) {
                        await Swal.fire({
                            icon: 'info',
                            title: 'Este juego ya estaba completado',
                            text: `${juegoSeleccionado.titulo} ya estaba marcado como completado`,
                            confirmButtonText: 'Aceptar'
                        });
                        handleCloseModal();
                    } else {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo marcar como completado',
                            confirmButtonText: 'Aceptar'
                        });
                    }
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
        }
    };

    const handleReseña = async () => {
        if (juegoSeleccionado) {
            await Swal.fire({
                icon: 'info',
                title: 'Redirigiendo',
                text: `Reseñas de ${juegoSeleccionado.titulo}`,
                confirmButtonText: 'Continuar'
            });
            handleCloseModal();
            window.location.href = '/resenias';
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
