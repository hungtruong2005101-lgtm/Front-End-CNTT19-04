// Hàm tính tỷ lệ giảm giá riêng biệt để tái sử dụng
function calculateDiscountRate(orderValue, tier) {
    let baseDiscount = 0;

    // Áp dụng tối thiểu 3 mức khuyến mãi theo khoảng tiền [cite: 25]
    if (orderValue >= 5000000) {
        baseDiscount = 10; // Đơn trên 5 triệu giảm 10%
    } else if (orderValue >= 2000000) {
        baseDiscount = 5;  // Đơn từ 2 triệu - dưới 5 triệu giảm 5%
    } else {
        baseDiscount = 0;  // Đơn dưới 2 triệu không giảm
    }

    // Ưu đãi cộng dồn theo hạng thành viên
    if (tier === "gold") {
        baseDiscount += 5; // Vàng: +5%
    } else if (tier === "silver") {
        baseDiscount += 2; // Bạc: +2%
    }

    return baseDiscount;
}

// Bắt sự kiện nút bấm
document.getElementById("btnCalcOrder").addEventListener("click", function() {
    let orderValue = Number(document.getElementById("orderValue").value);
    let tier = document.getElementById("memberTier").value;
    let promoCode = document.getElementById("promoCode").value.trim().toUpperCase();

    // Ràng buộc dữ liệu không được nhỏ hơn hoặc bằng 0
    if (orderValue <= 0) {
        alert("Vui lòng nhập giá trị đơn hàng hợp lệ!");
        return;
    }

    // 1. Tính toán tỷ lệ giảm
    let discountRate = calculateDiscountRate(orderValue, tier);

    // 2. Tính tiền giảm giá và số tiền phải thanh toán sau cùng [cite: 26]
    let discountAmount = orderValue * (discountRate / 100);
    let priceAfterDiscount = orderValue - discountAmount;
    
    // 3. Xử lý yêu cầu mở rộng: Miễn phí vận chuyển 
    let shippingFee = 30000; // Mặc định phí ship là 30k
    // Free ship nếu đơn hàng từ 5 triệu trở lên HOẶC nhập đúng mã
    if (orderValue >= 5000000 || promoCode === "FREESHIP") {
        shippingFee = 0; 
    }

    // Cộng phí ship vào tổng thanh toán cuối cùng
    let finalPrice = priceAfterDiscount + shippingFee;

    // Hiển thị kết quả ra HTML. Sử dụng toLocaleString() để định dạng số có dấu phẩy 
    document.getElementById("originalPrice").innerText = orderValue.toLocaleString('vi-VN');
    document.getElementById("discountRate").innerText = discountRate;
    document.getElementById("discountAmount").innerText = discountAmount.toLocaleString('vi-VN');
    
    let shipText = shippingFee === 0 ? "0 (Miễn phí)" : shippingFee.toLocaleString('vi-VN');
    document.getElementById("shippingFee").innerText = shipText;
    
    document.getElementById("finalPrice").innerText = finalPrice.toLocaleString('vi-VN');

    // Hiển thị khung kết quả đang bị ẩn đi
    document.getElementById("resultBox").style.display = "block";
});