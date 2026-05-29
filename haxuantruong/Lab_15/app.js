$(document).ready(function(){


    $("#registerForm").submit(function(event){

        event.preventDefault();


        let name =
        $("#name").val().trim();

        let email =
        $("#email").val().trim();

        let password =
        $("#password").val().trim();


        let isValid = true;


        $("small").text("");

        $("#successMessage").text("");



        // KIỂM TRA TÊN

        if(name === ""){

            $("#nameError")
            .text("Vui lòng nhập họ tên");

            isValid = false;
        }



        // KIỂM TRA EMAIL

        if(email === ""){

            $("#emailError")
            .text("Vui lòng nhập email");

            isValid = false;

        }else if(!email.includes("@")){

            $("#emailError")
            .text("Email không hợp lệ");

            isValid = false;
        }



        // KIỂM TRA PASSWORD

        if(password === ""){

            $("#passwordError")
            .text("Vui lòng nhập mật khẩu");

            isValid = false;

        }else if(password.length < 6){

            $("#passwordError")
            .text("Mật khẩu phải >= 6 ký tự");

            isValid = false;
        }



        // THÀNH CÔNG

        if(isValid){

            $("#successMessage")
            .text("Đăng ký thành công!");

            $("#registerForm")[0].reset();
        }

    });


});