const API_URL = "http://localhost:3000/students";

async function loadStudents(){

    let studentTable =
        document.getElementById("studentTable");

    let loading =
        document.getElementById("loading");

    loading.innerHTML = "Đang tải dữ liệu...";

    try{

        const response = await fetch(API_URL);

        const students = await response.json();

        studentTable.innerHTML = "";

        students.forEach(function(student){

            let rankClass = "";

            let rankText = "";

            if(student.gpa >= 8.5){

                rankClass = "excellent";
                rankText = "Xuất sắc";
            }
            else if(student.gpa >= 7){

                rankClass = "good";
                rankText = "Khá";
            }
            else{

                rankClass = "average";
                rankText = "Trung bình";
            }

            studentTable.innerHTML += `
                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.age}</td>

                    <td>${student.major}</td>

                    <td>${student.gpa}</td>

                    <td>
                        <span class="
                            rank ${rankClass}
                        ">
                            ${rankText}
                        </span>
                    </td>

                </tr>
            `;
        });

        loading.innerHTML = `
            Tải dữ liệu thành công!
        `;
    }
    catch(error){

        loading.style.color = "red";

        loading.innerHTML = `
            Không thể kết nối JSON Server!
        `;
    }
}

function clearData(){

    document.getElementById(
        "studentTable"
    ).innerHTML = "";

    document.getElementById(
        "loading"
    ).innerHTML = "";
}