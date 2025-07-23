document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const startScreen = document.getElementById('start-screen');
    const startGameButton = document.getElementById('start-game-button');
    const gameContainer = document.getElementById('game-container');
    
    const gameBoard = document.getElementById('game-board');
    const timerElement = document.getElementById('timer');
    const levelDisplay = document.getElementById('level-display');
    const modal = document.getElementById('final-modal');
    const modalTitle = document.getElementById('modal-title');
    const finalImage = document.getElementById('final-image');
    const nextLevelButton = document.getElementById('next-level-button');
    const restartButton = document.getElementById('restart-button');

    // --- CONFIGURACIÓN DE NIVELES ---
    const levelsConfig = [
        { level: 1, pairs: 8, time: 60, grid: 'grid-4x4' },
        { level: 2, pairs: 10, time: 70, grid: 'grid-5x4' },
        { level: 3, pairs: 12, time: 80, grid: 'grid-6x4' },
        { level: 4, pairs: 15, time: 90, grid: 'grid-6x5' }
    ];

    // --- IMÁGENES (Asegúrate de tener 15 imágenes de personajes en la carpeta img) ---
    const allImageSources = [
        { name: 'goku', img: 'img/1.gif' }, { name: 'vegeta', img: 'img/2.webp' },
        { name: 'gohan', img: 'img/3.webp' }, { name: 'trunks', img: 'img/4.jpg' },
        { name: 'piccolo', img: 'img/5.jpg' }, { name: 'frieza', img: 'img/6.jpg' },
        { name: 'cell', img: 'img/7.jpg' }, { name: 'buu', img: 'img/8.jpg' },
        { name: 'broly', img: 'img/9.jpg' }, { name: 'ginyu', img: 'img/10.jpg' },
        { name: 'beerus', img: 'img/11.jpg' }, { name: 'whis', img: 'img/12.jpg' },
        { name: 'jiren', img: 'img/13.jpg' }, { name: 'zamasu', img: 'img/14.jpg' },
        { name: 'gogeta', img: 'img/15.jpg' }
    ];

    // --- ESTADO DEL JUEGO ---
    let currentLevelIndex = 0;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedPairs = 0;
    let timerInterval;

    // --- LÓGICA DEL JUEGO ---

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        const config = levelsConfig[currentLevelIndex];
        gameBoard.innerHTML = '';
        gameBoard.className = 'game-board ' + config.grid;

        const levelImages = allImageSources.slice(0, config.pairs);
        const cardsArray = shuffle([...levelImages, ...levelImages]);

        cardsArray.forEach(cardData => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card-container');
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = cardData.name;
            card.innerHTML = `
                <div class="card-face card-front"><img src="${cardData.img}" alt="${cardData.name}"></div>
                <div class="card-face card-back"><img src="img/back.png" alt="Reverso"></div>
            `;
            cardContainer.appendChild(card);
            gameBoard.appendChild(cardContainer);
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;
        this.classList.add('flipped');
        if (!firstCard) {
            firstCard = this;
            return;
        }
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        resetTurn();
        if (matchedPairs === levelsConfig[currentLevelIndex].pairs) {
            endGame('win');
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
        }, 1200);
    }

    function resetTurn() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function startTimer() {
        const config = levelsConfig[currentLevelIndex];
        let timeLeft = config.time;
        timerElement.textContent = `Tiempo: ${timeLeft}`;
        clearInterval(timerInterval);
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
        gameBoard.style.pointerEvents = 'none';
        setTimeout(() => {
            if (result === 'win') {
                if (currentLevelIndex < levelsConfig.length - 1) {
                    showModal('level-win');
                } else {
                    showModal('game-win');
                }
            } else {
                showModal('lose');
            }
        }, 800);
    }

    function showModal(type) {
        restartButton.style.display = 'none';
        nextLevelButton.style.display = 'none';
        if (type === 'level-win') {
            modalTitle.textContent = `¡Nivel ${levelsConfig[currentLevelIndex].level} Superado!`;
            finalImage.src = 'img/ganaste.gif';
            nextLevelButton.style.display = 'block';
        } else if (type === 'game-win') {
            modalTitle.textContent = '¡HAS COMPLETADO EL JUEGO!';
            finalImage.src = 'img/juego-completado.gif';
            restartButton.style.display = 'block';
        } else {
            modalTitle.textContent = '¡SE ACABÓ EL TIEMPO!';
            finalImage.src = 'img/perdiste.gif';
            restartButton.style.display = 'block';
        }
        modal.style.display = 'flex';
    }

    function startLevel() {
        modal.style.display = 'none';
        gameBoard.style.pointerEvents = 'auto';
        matchedPairs = 0;
        resetTurn();
        const config = levelsConfig[currentLevelIndex];
        levelDisplay.textContent = `Nivel: ${config.level}`;
        createBoard();
        startTimer(); // El tiempo ahora empieza con cada nivel
    }

    // --- EVENTOS DE BOTONES ---
    nextLevelButton.addEventListener('click', () => {
        currentLevelIndex++;
        startLevel();
    });

    restartButton.addEventListener('click', () => {
        currentLevelIndex = 0;
        startLevel();
    });

    // --- INICIO DEL JUEGO (NUEVO MÉTODO) ---
    startGameButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startLevel();
    });
});
