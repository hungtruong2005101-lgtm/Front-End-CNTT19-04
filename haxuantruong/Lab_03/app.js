let secretNumber = Math.floor(Math.random() * 100) + 1;

let attemptCount = 0;

function checkGuess(){

    let guess = Number(document.getElementById("guessInput").value);

    let message = document.getElementById("message");

    let count = document.getElementById("count");

    if(guess < 1 || guess > 100){

        message.innerHTML = "Vui lòng nhập số từ 1 đến 100!";
        message.style.color = "red";

        return;
    }

    attemptCount++;

    if(guess < secretNumber){

        message.innerHTML = "Số bạn đoán nhỏ hơn!";
        message.style.color = "orange";
    }
    else if(guess > secretNumber){

        message.innerHTML = "Số bạn đoán lớn hơn!";
        message.style.color = "blue";
    }
    else{

        message.innerHTML = `
            Bạn đã đoán đúng số ${secretNumber}!
        `;

        message.style.color = "green";
    }

    count.innerHTML = `
        Số lần đoán: ${attemptCount}
    `;
}

function resetGame(){

    secretNumber = Math.floor(Math.random() * 100) + 1;

    attemptCount = 0;

    document.getElementById("guessInput").value = "";

    document.getElementById("message").innerHTML = "";

    document.getElementById("count").innerHTML = "";
}