let scores = [];

function renderScores(){

    let scoreList = document.getElementById("scoreList");

    scoreList.innerHTML = "";

    scores.forEach(function(score, index){

        scoreList.innerHTML += `
            <div class="score-item">

                <span>Điểm ${index + 1}: ${score}</span>

                <button 
                    class="delete-btn"
                    onclick="deleteScore(${index})"
                >
                    Xóa
                </button>

            </div>
        `;
    });
}

function addScore(){

    let scoreInput = document.getElementById("scoreInput");

    let score = Number(scoreInput.value);

    if(score < 0 || score > 10 || scoreInput.value === ""){

        alert("Vui lòng nhập điểm từ 0 đến 10!");
        return;
    }

    scores.push(score);

    renderScores();

    scoreInput.value = "";
}

function deleteScore(index){

    scores.splice(index, 1);

    renderScores();
}

function calculateResult(){

    let result = document.getElementById("result");

    if(scores.length === 0){

        result.innerHTML = `
            <span style="color:red;">
                Chưa có dữ liệu điểm!
            </span>
        `;

        return;
    }

    let total = 0;

    scores.forEach(function(score){

        total += score;
    });

    let average = total / scores.length;

    let rank = "";

    if(average < 5){

        rank = "Yếu";
    }
    else if(average < 7){

        rank = "Trung Bình";
    }
    else if(average < 8){

        rank = "Khá";
    }
    else{

        rank = "Giỏi";
    }

    result.innerHTML = `
        <p><b>Danh sách điểm:</b> ${scores.join(", ")}</p>

        <p><b>Tổng điểm:</b> ${total}</p>

        <p><b>Điểm trung bình:</b> ${average.toFixed(2)}</p>

        <p><b>Xếp loại:</b> ${rank}</p>
    `;
}