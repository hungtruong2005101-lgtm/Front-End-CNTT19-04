let orderData = {
    items: [
        { name: "Sách", price: 100000, qty: 2 },
        { name: "Bút", price: 20000, qty: 5 }
    ],
    discountCode: "SALE10" 
};

let logArea = document.getElementById("logArea");

function logStep(message, isFinal = false) {
    let p = document.createElement("p");
    p.innerText = message;
    p.className = isFinal ? "final" : "step";
    logArea.appendChild(p);
}

function calculateBaseTotal(order, callback) {
    let total = 0;
    for (let i = 0; i < order.items.length; i++) {
        total += order.items[i].price * order.items[i].qty;
    }
    logStep(`Bước 1: Tính tiền gốc = ${total.toLocaleString()} VNĐ`);
    callback(total, order.discountCode);
}

function applyDiscount(total, code, callback) {
    let discount = 0;
    if (code === "SALE10") {
        discount = total * 0.1;
    }
    let afterDiscount = total - discount;
    logStep(`Bước 2: Giảm giá (${code}) = -${discount.toLocaleString()} VNĐ`);
    callback(afterDiscount);
}

function addShippingFee(totalAfterDiscount, callback) {
    let shipping = 30000;
    if (totalAfterDiscount > 500000) {
        shipping = 0;
    }
    let finalAmount = totalAfterDiscount + shipping;
    logStep(`Bước 3: Phí vận chuyển = ${shipping.toLocaleString()} VNĐ`);
    callback(finalAmount);
}

document.getElementById("btnProcess").addEventListener("click", function() {
    logArea.innerHTML = "";
    
    calculateBaseTotal(orderData, function(baseTotal, code) {
        applyDiscount(baseTotal, code, function(totalAfterDiscount) {
            addShippingFee(totalAfterDiscount, function(finalTotal) {
                logStep(`Tổng thanh toán cuối cùng = ${finalTotal.toLocaleString()} VNĐ`, true);
            });
        });
    });
});