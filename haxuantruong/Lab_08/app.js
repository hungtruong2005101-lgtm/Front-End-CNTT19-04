let count = 0;

let counter = document.getElementById("counter");

let statusText = document.getElementById("status");

let historyList = document.getElementById("historyList");

function updateDisplay(){

    counter.innerHTML = count;

    if(count > 0){

        statusText.innerHTML = "Trạng thái: Số dương";
        statusText.style.color = "green";

        counter.style.color = "green";
    }
    else if(count < 0){

        statusText.innerHTML = "Trạng thái: Số âm";
        statusText.style.color = "red";

        counter.style.color = "red";
    }
    else{

        statusText.innerHTML = "Trạng thái: Bình thường";
        statusText.style.color = "gray";

        counter.style.color = "#007bff";
    }
}

function addHistory(action){

    let li = document.createElement("li");

    let time = new Date().toLocaleTimeString();

    li.innerHTML = `
        ${action} lúc ${time}
    `;

    historyList.prepend(li);
}

function increaseCount(){

    count++;

    updateDisplay();

    addHistory("Đã tăng giá trị");
}

function decreaseCount(){

    count--;

    updateDisplay();

    addHistory("Đã giảm giá trị");
}

function resetCount(){

    count = 0;

    updateDisplay();

    addHistory("Đã reset bộ đếm");
}