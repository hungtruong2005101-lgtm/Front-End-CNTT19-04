let scores = [7.5, 6.0, 8.5, 4.0, 9.0];

function renderScores() {
    document.getElementById("scoreList").innerText = scores.join(", ");
}

document.getElementById("btnAdd").addEventListener("click", function() {
    let inputVal = document.getElementById("scoreInput").value;
    
    if (inputVal === "" || inputVal < 0 || inputVal > 10) {
        alert("Vui lòng nhập điểm hợp lệ từ 0 đến 10!");
        return;
    }
    
    scores.push(Number(inputVal));
    document.getElementById("scoreInput").value = "";
    renderScores();
});

document.getElementById("btnCalc").addEventListener("click", function() {
    if (scores.length === 0) return;
    
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    
    let avg = sum / scores.length;
    let rank = "";
    
    if (avg < 5.0) {
        rank = "Yếu";
    } else if (avg < 7.0) {
        rank = "Trung bình";
    } else if (avg < 8.0) {
        rank = "Khá";
    } else {
        rank = "Giỏi";
    }
    
    document.getElementById("averageScore").innerText = avg.toFixed(2);
    document.getElementById("rank").innerText = rank;
});

renderScores();