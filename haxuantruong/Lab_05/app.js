let products = [];

function renderProducts(data = products){

    let productTable = document.getElementById("productTable");

    productTable.innerHTML = "";

    data.forEach(function(product, index){

        productTable.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${product.name}</td>

                <td>
                    ${product.price.toLocaleString()} VNĐ
                </td>

                <td>
                    <span class="
                        status
                        ${product.price > 1000000 ? "out-stock" : "in-stock"}
                    ">
                        ${product.price > 1000000 ? "Cao Giá" : "Bình Thường"}
                    </span>
                </td>

                <td>

                    <button 
                        class="edit-btn"
                        onclick="editProduct(${index})"
                    >
                        Sửa
                    </button>

                    <button 
                        class="delete-btn"
                        onclick="deleteProduct(${index})"
                    >
                        Xóa
                    </button>

                </td>

            </tr>
        `;
    });

    updateSummary();
}

function addProduct(){

    let productName = document.getElementById("productName");

    let productPrice = document.getElementById("productPrice");

    if(
        productName.value.trim() === "" ||
        productPrice.value.trim() === ""
    ){
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let product = {

        name: productName.value,

        price: Number(productPrice.value)
    };

    products.push(product);

    renderProducts();

    productName.value = "";
    productPrice.value = "";
}

function deleteProduct(index){

    if(confirm("Bạn có chắc muốn xóa sản phẩm này?")){

        products.splice(index, 1);

        renderProducts();
    }
}

function editProduct(index){

    let newName = prompt(
        "Nhập tên mới:",
        products[index].name
    );

    let newPrice = prompt(
        "Nhập giá mới:",
        products[index].price
    );

    if(newName && newPrice){

        products[index].name = newName;

        products[index].price = Number(newPrice);

        renderProducts();
    }
}

function searchProduct(){

    let keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let filtered = products.filter(function(product){

        return product.name
            .toLowerCase()
            .includes(keyword);
    });

    renderProducts(filtered);
}

function updateSummary(){

    let summary = document.getElementById("summary");

    let total = 0;

    products.forEach(function(product){

        total += product.price;
    });

    summary.innerHTML = `
        <b>Tổng sản phẩm:</b> ${products.length} <br>

        <b>Tổng giá trị:</b>
        ${total.toLocaleString()} VNĐ
    `;
}