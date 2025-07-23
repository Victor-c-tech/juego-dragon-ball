/* --- Estilos Globales y Fondo --- */
body {
    margin: 0;
    font-family: 'Bangers', cursive;
    color: #fff;
    background: radial-gradient(circle, #ffd700, #ffeb3b, #00c6ff, #0072ff);
    background-size: 400% 400%;
    animation: aura-animation 15s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
}

@keyframes aura-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* --- CLASE UTILITARIA --- */
.hidden {
    display: none !important;
}

/* --- PANTALLA DE INICIO --- */
#start-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.start-title {
    font-size: 5rem;
    text-shadow: 6px 6px 10px rgba(0,0,0,0.7);
    margin-bottom: 20px;
}

#start-game-button {
    font-family: 'Bangers', cursive;
    font-size: 2.5rem;
    padding: 15px 40px;
    border: none;
    border-radius: 15px;
    background-color: #ffc107;
    color: #a54a00;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
}
#start-game-button:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}

/* --- CONTENEDOR DEL JUEGO --- */
#game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

/* --- Estilos para el Logo --- */
.logo-container {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 90px;
    z-index: 1100;
}
.logo-container img { width: 100%; filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5)); }

/* --- Encabezado y Estadísticas --- */
.game-header { text-align: center; margin-bottom: 15px; z-index: 10; }

.stats-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-size: 1.8rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

#level-display, #timer {
    padding: 5px 15px;
    background-color: rgba(0,0,0,0.4);
    border-radius: 10px;
    border: 2px solid #ffc107;
}

/* --- Tablero y Nuevos Tamaños de Grid --- */
.game-board {
    display: grid;
    gap: 12px;
    perspective: 1200px;
    z-index: 10;
    transition: all 0.5s ease;
    /* CORRECCIÓN CLAVE: Asegura que el tablero ocupe el ancho disponible */
    width: 100%; 
}

/* Tamaños de tablero mejorados */
.grid-4x4 { grid-template-columns: repeat(4, 1fr); max-width: 500px; }
.grid-5x4 { grid-template-columns: repeat(5, 1fr); max-width: 620px; }
.grid-6x4 { grid-template-columns: repeat(6, 1fr); max-width: 740px; }
.grid-6x5 { grid-template-columns: repeat(6, 1fr); max-width: 740px; }


.card-container {
    background: rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 5px;
    box-shadow: 0 4px 15px rgba(0,198,255,0.3);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.2);
}

/* --- Estilo de las Cartas --- */
.card {
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    cursor: pointer;
}
.card.flipped { transform: rotateY(180deg); }

.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    overflow: hidden;
}
.card-face img { width: 100%; height: 100%; object-fit: cover; }
.card-face.card-front { transform: rotateY(180deg); }

/* --- Modal Final --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.85);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    text-align: center;
}

#modal-title {
    font-size: 3rem;
    color: #ffc107;
    margin: 0;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
}

#final-image {
    max-width: 80vw;
    max-height: 50vh;
    border-radius: 15px;
    border: 4px solid #ffc107;
    background-color: #000;
}

#next-level-button, #restart-button {
    font-family: 'Bangers', cursive;
    font-size: 1.5rem;
    padding: 10px 25px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
}

#next-level-button { background-color: #4CAF50; color: white; }
#restart-button { background-color: #ffc107; color: #a54a00; }
#next-level-button:hover, #restart-button:hover { transform: scale(1.05); }

/* --- Diseño Responsivo --- */
@media (max-width: 780px) {
    .grid-6x4, .grid-6x5 { max-width: 100%; }
}
@media (max-width: 640px) {
    .grid-5x4 { max-width: 100%; }
}
@media (max-width: 600px) {
    .start-title { font-size: 3rem; }
    #start-game-button { font-size: 1.8rem; }
    .stats-container { font-size: 1.5rem; }
    .game-board { gap: 8px; }
    .grid-4x4 { max-width: 100%; }
}
