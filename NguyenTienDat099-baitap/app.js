const API_URL =
    "http://localhost:3000/students";

// Load dữ liệu
async function loadStudents(){

    try{

        const response =
            await fetch(API_URL);

        const students =
            await response.json();

        renderStudents(students);

    }
    catch(error){

        console.log(
            "Lỗi tải dữ liệu:",
            error
        );

    }

}

// Hiển thị danh sách
function renderStudents(students){

    const studentList =
        document.getElementById(
            "studentList"
        );

    let html = "";

    students.forEach(student => {

        html += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.major}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="updateMajor(${student.id})"
                    >
                        Sửa
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})"
                    >
                        Xóa
                    </button>

                </td>

            </tr>
        `;

    });

    studentList.innerHTML = html;

}

// Thêm sinh viên
document
    .getElementById("studentForm")

    .addEventListener(
        "submit",
        async function(event){

            event.preventDefault();

            const name =
                document
                .getElementById("name")
                .value
                .trim();

            const email =
                document
                .getElementById("email")
                .value
                .trim();

            const major =
                document
                .getElementById("major")
                .value
                .trim();

            // Kiểm tra rỗng
            if(
                name === "" ||
                email === "" ||
                major === ""
            ){

                alert(
                    "Vui lòng nhập đầy đủ!"
                );

                return;

            }

            const newStudent = {

                name: name,

                email: email,

                major: major

            };

            try{

                await fetch(API_URL, {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify(
                        newStudent
                    )

                });

                // Reset form
                document
                    .getElementById(
                        "studentForm"
                    )
                    .reset();

                // Load lại dữ liệu
                loadStudents();

            }
            catch(error){

                console.log(
                    "Lỗi thêm dữ liệu:",
                    error
                );

            }

        }
    );

// Sửa chuyên ngành
async function updateMajor(id){

    const newMajor =
        prompt(
            "Nhập chuyên ngành mới:"
        );

    if(!newMajor){

        return;

    }

    try{

        await fetch(
            `${API_URL}/${id}`,
            {

                method: "PATCH",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    major: newMajor

                })

            }
        );

        loadStudents();

    }
    catch(error){

        console.log(
            "Lỗi cập nhật:",
            error
        );

    }

}

// Xóa sinh viên
async function deleteStudent(id){

    const confirmDelete =
        confirm(
            "Bạn có chắc muốn xóa?"
        );

    if(!confirmDelete){

        return;

    }

    try{

        await fetch(
            `${API_URL}/${id}`,
            {

                method: "DELETE"

            }
        );

        loadStudents();

    }
    catch(error){

        console.log(
            "Lỗi xóa dữ liệu:",
            error
        );

    }

}

// Gọi lần đầu
loadStudents();