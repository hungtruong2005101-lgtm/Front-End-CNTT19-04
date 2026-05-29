document.getElementById("btnCalc").addEventListener("click", function() {
    
    // Lấy dữ liệu và ép về kiểu số nguyên/số thực
    let h = Number(document.getElementById("height").value);
    let w = Number(document.getElementById("weight").value);

    // Kiểm tra dữ liệu đầu vào không được nhỏ hơn hoặc bằng 0
    if (h <= 0 || w <= 0) {
        document.getElementById("resultDisplay").innerText = "Vui lòng nhập chiều cao và cân nặng lớn hơn 0!";
        return;
    }

    // Tính toán BMI
    let bmi = w / (h * h);
    let category = "";

    // Phân loại 4 mức theo chuẩn 
    if (bmi < 18.5) {
        category = "Gầy";
    } else if (bmi >= 18.5 && bmi < 25) {
        category = "Bình thường";
    } else if (bmi >= 25 && bmi < 30) {
        category = "Thừa cân";
    } else if (bmi >= 30) {
        category = "Béo phì";
    }

    // Trả kết quả ra màn hình (làm tròn 2 chữ số thập phân)
    document.getElementById("resultDisplay").innerText = 
        `Chỉ số BMI: ${bmi.toFixed(2)} - Thể trạng: ${category}`;
});