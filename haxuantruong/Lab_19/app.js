$(document).ready(function(){


    $("#loadBtn").click(function(){


        let users = [

            {
                id: 1,
                name: "Nguyễn Văn An",
                email: "an@gmail.com",
                city: "Phường Ba Đình Hà Nội"
            },

            {
                id: 2,
                name: "Trần Minh Quân",
                email: "quan@gmail.com",
                city: "77 Lê Hồng Phong Đà Nẵng"
            },

            {
                id: 3,
                name: "Lê Hoàng Nam",
                email: "nam@gmail.com",
                city: "55 An Dương Vương Hồ Chí Minh"
            },

            {
                id: 4,
                name: "Phạm Tuấn Kiệt",
                email: "kiet@gmail.com",
                city: "56 Quang Trung Hà Đông Hà Nội"
            },

            {
                id: 5,
                name: "Đỗ Hải Đăng",
                email: "dangeptrai@gmail.com",
                city: "Số 9 Phố Xốm Hà Đông Hà Nội"
            }

        ];


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


    });


});