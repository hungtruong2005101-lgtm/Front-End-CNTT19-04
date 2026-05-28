function calculateBMI(){

    let height = Number(document.getElementById("height").value);

    let weight = Number(document.getElementById("weight").value);

    let result = document.getElementById("result");

    if(height <= 0 || weight <= 0){

        result.innerHTML = "Vui lòng nhập dữ liệu hợp lệ!";
        result.style.color = "red";

        return;
    }

    let bmi = weight / (height * height);

    bmi = bmi.toFixed(2);

    let status = "";

    if(bmi < 18.5){

        status = "Gầy";
        result.style.color = "orange";
    }
    else if(bmi < 25){

        status = "Bình thường";
        result.style.color = "green";
    }
    else if(bmi < 30){

        status = "Thừa cân";
        result.style.color = "blue";
    }
    else{

        status = "Béo phì";
        result.style.color = "red";
    }

    result.innerHTML = `
        BMI: ${bmi} <br>
        Phân loại: ${status}
    `;
}