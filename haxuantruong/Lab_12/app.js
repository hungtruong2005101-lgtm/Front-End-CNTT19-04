let students =
JSON.parse(localStorage.getItem("students")) || [];


// HIỂN THỊ

function renderStudents(){

    let studentList =
    document.getElementById("studentList");

    studentList.innerHTML = "";

    students.forEach((student,index) => {

        studentList.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.class}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${index})"
                    >
                        <i class="fa-solid fa-trash"></i>
                        Xóa
                    </button>

                </td>

            </tr>
        `;
    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}



// THÊM

function addStudent(){

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let studentClass =
    document.getElementById("class").value;


    if(name === "" ||
       email === "" ||
       studentClass === ""){

        alert("Vui lòng nhập đầy đủ");

        return;
    }


    let student = {

        name: name,
        email: email,
        class: studentClass
    };


    students.push(student);


    renderStudents();


    document.getElementById("name").value = "";

    document.getElementById("email").value = "";

    document.getElementById("class").value = "";
}



// XÓA

function deleteStudent(index){

    let check =
    confirm("Bạn có chắc muốn xóa?");

    if(check){

        students.splice(index,1);

        renderStudents();
    }
}


renderStudents();