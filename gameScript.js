document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');

    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        gameArea.style.display = 'block';
        startGame();
    });

    function startGame() {
        const player = document.getElementById('player');
        const scoreDisplay = document.getElementById('score');
        const hitSound = new Audio('Zap.mp3');
        const scream1 = new Audio("Skrik_1.mp3")
        const scream2 = new Audio("Skrik_2.mp3")
        const scream3 = new Audio("Skrik_3.mp3")
        const scream4 = new Audio("Skrik_4.mp3")
        const scream5 = new Audio("Skrik_5.mp3")
        const scream6 = new Audio("abesios.mp3")
        const scream_sounds = [scream1, scream2, scream3, scream4, scream5, scream6]

        let score = 0;
        const speedLimit = 6;
        const gameArea = document.getElementById("gameArea").getBoundingClientRect();
    
        let mouseX = 0;
        let mouseY = 0;
    
        let collisionActive = true;

        function getRandomElementFromArray(arr) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            if (randomIndex == 5) {
                console.log("jeg elsker lekser gambling")
                const gamble_abesios = Math.floor(Math.random() * 10);
                if (gamble_abesios == 1) {
                    console.log("oi oi oi")
                } else {
                    randomIndex = 1;
                }
            }
            console.log(randomIndex);
            return arr[randomIndex];
        }
    
        function generateSquare() {
            const square = document.createElement('div');
            square.className = 'square';
            square.style.left = `${Math.random() * (gameArea.width - 20)}px`;
            square.style.top = `${Math.random() * (gameArea.height - 20)}px`;
            document.body.appendChild(square);
        }
    
        generateSquare();
    
        function checkCollision() {
            if (!collisionActive) return;
    
            const playerRect = player.getBoundingClientRect();
            const squares = document.querySelectorAll('.square');
    
            squares.forEach(square => {
                const squareRect = square.getBoundingClientRect();
    
                if (
                    playerRect.left < squareRect.right &&
                    playerRect.right > squareRect.left &&
                    playerRect.top < squareRect.bottom &&
                    playerRect.bottom > squareRect.top
                ) {
                    collisionActive = false;
                    score++;
                    scoreDisplay.textContent = `Score: ${score}`;
                    square.classList.add('hit');
                    hitSound.currentTime = 0;
                    hitSound.play();
                    const random_scream = getRandomElementFromArray(scream_sounds);
                    random_scream.currentTime = 0;
                    random_scream.play();
                    square.style.transition = "top 2s";
                    square.style.top = `${gameArea.height}px`;
                    setTimeout(() => {
                        square.remove();
                        generateSquare();
                        collisionActive = true;
                    }, 2000);
                }
            });
        }
    
        function movePlayer() {
            const playerX = player.offsetLeft + player.offsetWidth / 2;
            const playerY = player.offsetTop + player.offsetHeight / 2;
    
            const dx = mouseX - playerX;
            const dy = mouseY - playerY;
    
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance <= speedLimit) {
                player.style.left = mouseX - player.offsetWidth / 2 + 'px';
                player.style.top = mouseY - player.offsetHeight / 2 + 'px';
            } else {
                const ratio = speedLimit / distance;
                const x = playerX + dx * ratio - player.offsetWidth / 2;
                const y = playerY + dy * ratio - player.offsetHeight / 2;
    
                player.style.left = x + 'px';
                player.style.top = y + 'px';
            }
    
            checkCollision();
            requestAnimationFrame(movePlayer);
        }
    
        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });
    
        movePlayer();
    }
    
});
