document.addEventListener('DOMContentLoaded', () => {
    // --- Definición de Componentes y Estado del Juego ---
    const gameBoard = document.getElementById('game-board');
    const timerElement = document.getElementById('timer');
    const modal = document.getElementById('final-modal');
    const finalImage = document.getElementById('final-image');
    const restartButton = document.getElementById('restart-button');

    const imageSources = [
        { name: 'goku', img: 'img/1.gif' },
        { name: 'vegeta', img: 'img/2.webp' },
        { name: 'gohan', img: 'img/3.webp' },
        { name: 'trunks', img: 'img/4.jpg' },
        { name: 'piccolo', img: 'img/5.jpg' },
        { name: 'frieza', img: 'img/6.jpg' },
        { name: 'cell', img: 'img/7.jpg' },
        { name: 'buu', img: 'img/8.jpg' },
    ];

    let cardsArray = [];
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedPairs = 0;
    let timerInterval;
    const totalTime = 60;
    let timeLeft = totalTime;

    // --- Lógica del Juego ---

    // Baraja las cartas usando el algoritmo Fisher-Yates
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Crea y renderiza las cartas en el tablero
    function createBoard() {
        cardsArray = [...imageSources, ...imageSources]; // Duplicar para tener parejas
        shuffle(cardsArray);
        gameBoard.innerHTML = ''; // Limpiar el tablero
        
        cardsArray.forEach(cardData => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card-container');
            
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = cardData.name;

            const frontFace = document.createElement('div');
            frontFace.classList.add('card-face', 'card-front');
            const frontImage = document.createElement('img');
            frontImage.src = cardData.img;
            frontFace.appendChild(frontImage);
            
            const backFace = document.createElement('div');
            backFace.classList.add('card-face', 'card-back');
            const backImage = document.createElement('img');
            backImage.src = 'img/back.png';
            backFace.appendChild(backImage);
            
            card.appendChild(frontFace);
            card.appendChild(backFace);
            cardContainer.appendChild(card);
            
            gameBoard.appendChild(cardContainer);

            card.addEventListener('click', flipCard);
        });
    }

    // Maneja el evento de voltear una carta
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return; // Evita doble clic en la misma carta

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true; // Bloquear el tablero durante la verificación

        checkForMatch();
    }

    // Verifica si las dos cartas volteadas coinciden
    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    // Desactiva las cartas si coinciden
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        resetBoard();

        if (matchedPairs === imageSources.length) {
            endGame('win');
        }
    }

    // Voltea las cartas si no coinciden
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1200); // Pausa para que el jugador vea la segunda carta
    }
    
    // Resetea las variables de las cartas seleccionadas
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // --- Temporizador y Fin del Juego ---
    
    function startTimer() {
        timeLeft = totalTime;
        timerElement.textContent = `Tiempo: ${timeLeft}`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Tiempo: ${timeLeft}`;
            if (timeLeft <= 0) {
                endGame('lose');
            }
        }, 1000);
    }

    function endGame(result) {
        clearInterval(timerInterval);
        if (result === 'win') {
            finalImage.src = 'img/ganaste1.gif';
        } else {
            finalImage.src = 'img/perdiste.gif';
            gameBoard.style.pointerEvents = 'none'; // Desactivar clics en el tablero
        }
        setTimeout(() => {
            modal.style.display = 'flex';
        }, 500); // Pequeña espera antes de mostrar el modal
    }

    // --- Inicialización y Reinicio ---

    function restartGame() {
        modal.style.display = 'none';
        gameBoard.style.pointerEvents = 'auto';
        lockBoard = false;
        matchedPairs = 0;
        [firstCard, secondCard] = [null, null];
        clearInterval(timerInterval);
        
        // Retraso para que el tablero se vacíe y se vuelva a llenar suavemente
        setTimeout(() => {
            createBoard();
            startTimer();
        }, 300);
    }
    
    restartButton.addEventListener('click', restartGame);

    // Iniciar el juego por primera vez
    createBoard();
    startTimer();
});