$(document).ready(function(){


    let students = [

        {
            id: 1,
            name: "Nguyễn Văn An",
            email: "an@gmail.com",
            city: "Hà Nội"
        },

        {
            id: 2,
            name: "Trần Minh Quân",
            email: "quan@gmail.com",
            city: "Đà Nẵng"
        }

    ];


    let editId = null;




    function renderStudents(){

        $("#studentList").html("");


        students.forEach(function(student){

            $("#studentList").append(`

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.email}</td>

                    <td>${student.city}</td>

                    <td>

                        <button
                            class="editBtn"
                            data-id="${student.id}"
                        >
                            <i class="fa-solid fa-pen"></i>
                            Sửa
                        </button>

                    </td>

                    <td>

                        <button
                            class="deleteBtn"
                            data-id="${student.id}"
                        >
                            <i class="fa-solid fa-trash"></i>
                            Xóa
                        </button>

                    </td>

                </tr>

            `);

        });

    }




    $("#studentForm").submit(function(e){

        e.preventDefault();


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



        // THÊM

        if(editId === null){

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


                    students.push({

                        id: students.length + 1,

                        name: name,

                        email: email,

                        city: city
                    });


                    renderStudents();


                    $("#studentForm")[0].reset();


                    alert("Thêm thành công!");

                }

            });

        }



        // SỬA

        else{

            $.ajax({

                url:
                "https://jsonplaceholder.typicode.com/users/" + editId,

                method: "PUT",

                data: {

                    name: name,
                    email: email,
                    city: city
                },


                success: function(){


                    students =
                    students.map(function(student){

                        if(student.id == editId){

                            return {

                                ...student,

                                name: name,

                                email: email,

                                city: city
                            };
                        }

                        return student;

                    });


                    renderStudents();


                    $("#studentForm")[0].reset();


                    editId = null;


                    $("#saveBtn").html(`
                        <i class="fa-solid fa-floppy-disk"></i>
                        Lưu
                    `);


                    alert("Cập nhật thành công!");

                }

            });

        }

    });




    $(document).on(
        "click",
        ".deleteBtn",
        function(){

            let id =
            $(this).data("id");


            let check =
            confirm("Bạn có chắc muốn xóa?");


            if(check){

                $.ajax({

                    url:
                    "https://jsonplaceholder.typicode.com/users/" + id,

                    method: "DELETE",


                    success: function(){

                        students =
                        students.filter(
                            student => student.id != id
                        );


                        renderStudents();


                        alert("Xóa thành công!");

                    }

                });

            }

        }
    );




    $(document).on(
        "click",
        ".editBtn",
        function(){

            let id =
            $(this).data("id");


            let student =
            students.find(
                student => student.id == id
            );


            $("#name").val(student.name);

            $("#email").val(student.email);

            $("#city").val(student.city);


            editId = id;


            $("#saveBtn").html(`
                <i class="fa-solid fa-pen"></i>
                Cập Nhật
            `);

        }
    );



    renderStudents();

});