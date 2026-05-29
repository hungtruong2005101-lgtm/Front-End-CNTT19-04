let products = [
    { id: 1, name: "Laptop", price: 15000000, quantity: 5 },
    { id: 2, name: "Chuột", price: 200000, quantity: 50 },
    { id: 3, name: "Bàn phím", price: 500000, quantity: 30 },
    { id: 4, name: "Màn hình", price: 3000000, quantity: 15 },
    { id: 5, name: "Tai nghe", price: 800000, quantity: 25 }
];

function renderProducts(list) {
    let htmlContent = "";
    if (list.length === 0) {
        htmlContent = "<p>Không tìm thấy sản phẩm nào.</p>";
    } else {
        for (let i = 0; i < list.length; i++) {
            let p = list[i];
            htmlContent += `
                <div class="product-item">
                    <strong>${p.name}</strong><br>
                    Giá: ${p.price.toLocaleString('vi-VN')} VNĐ<br>
                    Số lượng: ${p.quantity}
                </div>
            `;
        }
    }
    document.getElementById("productList").innerHTML = htmlContent;
}

document.getElementById("btnSearch").addEventListener("click", function() {
    let keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    if (keyword === "") return;
    
    let result = products.find(p => p.name.toLowerCase().includes(keyword));
    
    if (result) {
        renderProducts([result]);
    } else {
        renderProducts([]);
    }
});

document.getElementById("btnFilter").addEventListener("click", function() {
    let maxPrice = Number(document.getElementById("priceInput").value);
    if (maxPrice <= 0) return;
    
    let filteredList = products.filter(p => p.price <= maxPrice);
    renderProducts(filteredList);
});

document.getElementById("btnReset").addEventListener("click", function() {
    document.getElementById("searchInput").value = "";
    document.getElementById("priceInput").value = "";
    renderProducts(products);
});

renderProducts(products);