let secretNumber = 0;
let attempts = 0;
let maxNumber = 10;
let isPlaying = false; 

function initGame() {
    maxNumber = Number(document.getElementById("difficulty").value);
    
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    
    attempts = 0;
    isPlaying = true;
    
    document.getElementById("attemptCount").innerText = `Số lần thử: ${attempts}`;
    document.getElementById("feedback").innerText = `Đã tạo số từ 1 đến ${maxNumber}. Bắt đầu đoán đi!`;
    document.getElementById("feedback").style.color = "black";
    document.getElementById("guessInput").value = "";
    
    document.getElementById("playAgainBtn").style.display = "none";
    document.getElementById("guessBtn").disabled = false;
}

document.getElementById("startBtn").addEventListener("click", initGame);

document.getElementById("guessBtn").addEventListener("click", function() {
    if (!isPlaying) {
        alert("Vui lòng bấm 'Bắt đầu ván mới' trước!");
        return;
    }

    let guess = Number(document.getElementById("guessInput").value);

    if (guess < 1 || guess > maxNumber) {
        document.getElementById("feedback").innerText = `Vui lòng nhập số từ 1 đến ${maxNumber}!`;
        return;
    }

    attempts++;
    document.getElementById("attemptCount").innerText = `Số lần thử: ${attempts}`;
    let feedbackEl = document.getElementById("feedback");

    if (guess === secretNumber) {
        feedbackEl.innerText = `🎉 Chính xác! Số bí mật là ${secretNumber}.`;
        feedbackEl.style.color = "green";
        isPlaying = false;
        document.getElementById("playAgainBtn").style.display = "inline-block";
        document.getElementById("guessBtn").disabled = true;
    } else if (guess > secretNumber) {
        feedbackEl.innerText = "📉 Số bạn đoán LỚN hơn số bí mật!";
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.innerText = "📈 Số bạn đoán NHỎ hơn số bí mật!";
        feedbackEl.style.color = "orange";
    }
});

document.getElementById("playAgainBtn").addEventListener("click", initGame);
initGame();