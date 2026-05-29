$(document).ready(function(){


    let users = [

        {
            id: 1,
            name: "Nguyễn Văn An",
            email: "an@gmail.com",
            city: "Hà Nội"
        }

    ];



    function renderUsers(){

        $("#userList").html("");


        users.forEach(function(user){

            $("#userList").append(`

                <tr>

                    <td>${user.id}</td>

                    <td>${user.name}</td>

                    <td>${user.email}</td>

                    <td>${user.city}</td>

                </tr>

            `);

        });

    }




    $("#addBtn").click(function(){


        let name =
        $("#name").val().trim();

        let email =
        $("#email").val().trim();

        let city =
        $("#city").val().trim();



        if(name === "" ||
           email === "" ||
           city === ""){

            alert("Vui lòng nhập đầy đủ");

            return;
        }



        $.ajax({

            url:
            "https://jsonplaceholder.typicode.com/users",

            method: "POST",

            data: {

                name: name,
                email: email,
                city: city
            },


            success: function(){


                let newUser = {

                    id: users.length + 1,

                    name: name,

                    email: email,

                    city: city
                };


                users.push(newUser);


                renderUsers();


                $("#name").val("");

                $("#email").val("");

                $("#city").val("");


                alert("Thêm dữ liệu thành công!");

            },


            error: function(){

                alert("Lỗi thêm dữ liệu!");

            }

        });


    });



    renderUsers();

});