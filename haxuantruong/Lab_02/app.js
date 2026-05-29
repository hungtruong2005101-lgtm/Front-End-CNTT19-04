function calculateDiscount(){

    let orderValue = Number(document.getElementById("orderValue").value);

    let memberType = document.getElementById("memberType").value;

    let result = document.getElementById("result");

    if(orderValue <= 0){

        result.innerHTML = "Vui lòng nhập giá trị hợp lệ!";
        result.style.color = "red";

        return;
    }

    let discountPercent = 0;

    if(orderValue >= 1000000){

        discountPercent = 15;
    }
    else if(orderValue >= 500000){

        discountPercent = 10;
    }
    else if(orderValue >= 200000){

        discountPercent = 5;
    }

    if(memberType === "silver"){

        discountPercent += 3;
    }
    else if(memberType === "gold"){

        discountPercent += 5;
    }

    let discountMoney = orderValue * discountPercent / 100;

    let finalMoney = orderValue - discountMoney;

    result.style.color = "black";

    result.innerHTML = `
        <p>Tiền gốc: ${orderValue.toLocaleString()} VNĐ</p>

        <p>Tỷ lệ giảm: ${discountPercent}%</p>

        <p>Số tiền giảm: ${discountMoney.toLocaleString()} VNĐ</p>

        <p><b>Tổng thanh toán: ${finalMoney.toLocaleString()} VNĐ</b></p>
    `;
}