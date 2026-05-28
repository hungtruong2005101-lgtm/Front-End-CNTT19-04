let contentList = document.getElementById("contentList");

let colors = [
    "#007bff",
    "#28a745",
    "#dc3545",
    "#6f42c1",
    "#fd7e14",
    "#20c997"
];

function getRandomColor(){

    return colors[
        Math.floor(Math.random() * colors.length)
    ];
}

function addContent(){

    let input = document.getElementById("contentInput");

    let text = input.value.trim();

    if(text === ""){

        alert("Vui lòng nhập nội dung!");
        return;
    }

    let div = document.createElement("div");

    div.className = "content-item";

    div.style.background = getRandomColor();

    div.innerHTML = `
        <span>${text}</span>

        <button 
            class="delete-btn"
            onclick="deleteContent(this)"
        >
            Xóa
        </button>
    `;

    contentList.appendChild(div);

    input.value = "";
}

function deleteContent(button){

    button.parentElement.remove();
}

function clearAll(){

    if(confirm("Bạn có chắc muốn xóa toàn bộ?")){

        contentList.innerHTML = "";
    }
}

function randomColor(){

    let items = document.querySelectorAll(".content-item");

    items.forEach(function(item){

        item.style.background = getRandomColor();
    });
}