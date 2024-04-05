document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const scoreDisplay = document.getElementById('score');

    let score = 0;
    const speedLimit = 2.5;
    const gameArea = document.getElementById("gameArea").getBoundingClientRect();

    let mouseX = 0;
    let mouseY = 0;

    function generateSquare() {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.left = `${Math.random() * (gameArea.width)}px`;
        square.style.top = `${Math.random() * (gameArea.height)}px`;
        console.log(gameArea.height);
        document.body.appendChild(square);

        setInterval(() => {
            const playerRect = player.getBoundingClientRect();
            const squareRect = square.getBoundingClientRect();

            if (
                playerRect.left < squareRect.right &&
                playerRect.right > squareRect.left &&
                playerRect.top < squareRect.bottom &&
                playerRect.bottom > squareRect.top
            ) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                square.remove();
                generateSquare();
            }
        }, 10);
    }

    generateSquare();

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

        requestAnimationFrame(movePlayer);
    }

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    requestAnimationFrame(movePlayer);
});
