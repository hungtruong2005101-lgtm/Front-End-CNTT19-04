$(document).ready(function(){



    $("#addBtn").click(function(){

        let name =
        $("#memberName").val().trim();


        if(name === ""){

            alert("Vui lòng nhập tên");

            return;
        }



        $("#memberList").append(`

            <li>

                <span class="member-text">
                    ${name}
                </span>

                <div class="action-box">

                    <button class="editBtn">
                        <i class="fa-solid fa-pen"></i>
                        Sửa
                    </button>

                    <button class="deleteBtn">
                        <i class="fa-solid fa-trash"></i>
                        Xóa
                    </button>

                </div>

            </li>

        `);


        $("#memberName").val("");

    });




    $(document).on("click",".deleteBtn",function(){

        $(this).closest("li").remove();

    });




    $(document).on("click",".editBtn",function(){

        let currentText = $(this)
        .closest("li")
        .find(".member-text")
        .text();


        let newName =
        prompt("Nhập tên mới",currentText);


        if(newName !== null &&
           newName.trim() !== ""){

            $(this)
            .closest("li")
            .find(".member-text")
            .text(newName);
        }

    });


});