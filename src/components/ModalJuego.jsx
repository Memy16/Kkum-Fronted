import { useEffect } from "react";
import "../css/modal-juego.css";

export default function ModalJuego({ juego, onClose, onCompletado, onReseña, onAddToCollection  }) {
    
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-body">
                    <div className="modal-imagen">
                        <img src={juego.imagen} alt={juego.titulo} />
                    </div>
                    
                    <div className="modal-info">
                        <h1 className="modal-titulo">{juego.titulo}</h1>
                        
                        <div className="modal-categorias">
                            {juego.categorias.map((categoria, index) => (
                                <span key={index} className="categoria-tag">
                                    {categoria}
                                </span>
                            ))}
                        </div>
                        
                        <p className="modal-descripcion">{juego.descripcion}</p>
                        
                        <div className="modal-metadata">
                            <div className="metadata-item">
                                <span className="metadata-label">Dispositivo:</span>
                                <span className="metadata-value">{juego.dispositivo}</span>
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                className="btn btn-collection"
                                onClick={onAddToCollection}
                            >
                                <span className="btn-icon">➕</span>
                                Añadir a Mi Colección
                            </button>
                            <button 
                                className="btn btn-completado"
                                onClick={onCompletado}
                            >
                                <span className="btn-icon">✓</span>
                                Marcar como Completado
                            </button>
                            
                            <button 
                                className="btn btn-reseña"
                                onClick={onReseña}
                            >
                                <span className="btn-icon">★</span>
                                Escribir Reseña
                            </button>
                            
                            <a 
                                href={juego.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-externo"
                            >
                                <span className="btn-icon">↗</span>
                                Ver más información
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
