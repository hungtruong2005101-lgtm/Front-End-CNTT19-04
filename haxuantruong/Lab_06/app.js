let timeline = document.getElementById("timeline");

function addStep(message, className){

    timeline.innerHTML += `
        <div class="step ${className}">
            ${message}
        </div>
    `;
}

function createOrder(){

    let customerName = document
        .getElementById("customerName")
        .value;

    let productName = document
        .getElementById("productName")
        .value;

    if(
        customerName.trim() === "" ||
        productName.trim() === ""
    ){
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    timeline.innerHTML = "";

    addStep(
        `Đã tiếp nhận đơn hàng của ${customerName}`,
        "processing"
    );

    processOrder(productName, function(){

        prepareShipping(function(){

            completeOrder(customerName, productName);
        });
    });
}

function processOrder(productName, callback){

    setTimeout(function(){

        addStep(
            `Đang xử lý sản phẩm: ${productName}`,
            "processing"
        );

        callback();

    }, 1500);
}

function prepareShipping(callback){

    setTimeout(function(){

        addStep(
            "Đơn hàng đang được đóng gói và vận chuyển",
            "processing"
        );

        callback();

    }, 1500);
}

function completeOrder(customerName, productName){

    setTimeout(function(){

        addStep(
            `
            Hoàn tất đơn hàng cho 
            ${customerName} - ${productName}
            `,
            "success"
        );

    }, 1500);
}