import { useEffect, useState } from "react";
import "../css/coleccion.css";

export default function Coleccion() {

    const [coleccion, setColeccion] = useState([]);
    const [loading, setLoading] = useState(true);
    const USER_ID = "usuario-demo-123";

    useEffect(() => {
        const fetchColeccion = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/collection/${USER_ID}`);
                const data = await response.json();
                setColeccion(data);
            } catch (error) {
                console.error('Error cargando colección:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColeccion();
    }, []);

    const handleEliminar = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/collection/${USER_ID}/${gameId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('🗑️ Juego eliminado de tu colección');
                const updatedResponse = await fetch(`http://localhost:5000/api/collection/${USER_ID}`);
                const updatedData = await updatedResponse.json();
                setColeccion(updatedData);
            } else {
                alert('❌ Error eliminando juego');
            }
        } catch (error) {
            console.error('Error eliminando:', error);
        }
    };

    if (loading) {
        return (
            <div className="coleccion-container">
                <h1 className="titulo-coleccion">Mi Colección</h1>
                <div className="loading">Cargando tu colección...</div>
            </div>
        );
    }

    return (
        <div className="coleccion-container">
            <h1 className="titulo-coleccion">Mi Colección</h1>
            <p className="contador">Juegos en colección: {coleccion.length}</p>

            {coleccion.length === 0 ? (
                <div className="coleccion-vacia">
                    <p>📭 Tu colección está vacía</p>
                    <p>Ve a la biblioteca y añade algunos juegos!</p>
                </div>
            ) : (
                <div className="coleccion-grid">
                    {coleccion.map(item => (
                        <div key={item._id} className="coleccion-card">
                            <img src={item.gameId.imagen} alt={item.gameId.titulo} />
                            <h3>{item.gameId.titulo}</h3>
                            <p className="categoria">{item.gameId.categorias.join(" • ")}</p>
                            <p className="dispositivo">{item.gameId.dispositivo}</p>
                            <button
                                className="btn-eliminar"
                                onClick={() => handleEliminar(item.gameId._id)}
                            >
                                🗑️ Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
