import { useEffect, useState } from "react";
import "../css/completados.css";

export default function Completados() {
    const [completados, setCompletados] = useState([]);
    const [loading, setLoading] = useState(true);
    const USER_ID = "usuario-demo-123";
    
    useEffect(() => {
        const fetchCompletados = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/completed/${USER_ID}`);
                const data = await response.json();
                setCompletados(data);
            } catch (error) {
                console.error('Error cargando completados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompletados();
    }, []);
    

    if (loading) {
        return (
            <div className="completados-container">
                <h1 className="completados-title">Juegos Completados</h1>
                <div className="loading">Cargando juegos completados...</div>
            </div>
        );
    }

    return (
        <div className="completados-container">
            <h1 className="completados-title">Juegos Completados</h1>
            <p className="contador">Total juegos completados: {completados.length}</p>
            {completados.length === 0 ? (
                <div className="completados-vacio">
                    <p>🎯 Aún no has completado ningún juego</p>
                    <p>Ve a la biblioteca y marca juegos como completados!</p>
                </div>
            ) : (
                <div className="completados-list">
                    {completados.map(item => (
                        <div key={item._id} className="completados-item">
                            <div className="completados-info">
                                <h3>{item.gameId.titulo}</h3>
                                <p className="completados-fecha">
                                    Completado: {new Date(item.fechaCompletado).toLocaleDateString()}
                                </p>
                                {item.horasTotales > 0 && (
                                    <p className="completados-horas">Horas jugadas: {item.horasTotales}h</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
