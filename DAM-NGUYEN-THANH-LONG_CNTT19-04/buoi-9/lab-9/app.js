const API_URL = "http://localhost:3000/students";

const studentTable = document.getElementById("studentTable");
const studentForm = document.getElementById("studentForm");

const maSinhVienInput = document.getElementById("maSinhVien");
const tenInput = document.getElementById("ten");
const tuoiInput = document.getElementById("tuoi");
const chuyenNganhInput = document.getElementById("chuyenNganh");
const diemTrungBinhInput = document.getElementById("diemTrungBinh");

// 1. Chức năng XEM danh sách sinh viên (GET)
async function getStudents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Không thể lấy dữ liệu sinh viên từ API");
    }
    const students = await response.json();
    renderStudents(students);
  } catch (error) {
    alert("Lỗi tải danh sách: " + error.message);
  }
}

// Hàm hiển thị dữ liệu ra bảng HTML
function renderStudents(students) {
  studentTable.innerHTML = ""; // Xóa dữ liệu cũ trước khi render dữ liệu mới

  students.forEach(function (student) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.maSinhVien}</td>
      <td>${student.ten}</td>
      <td>${student.tuoi}</td>
      <td>${student.chuyenNganh}</td>
      <td>${student.diemTrungBinh}</td>
      <td>${student.hocBong ? "<b style='color: green;'>Có</b>" : "Không"}</td>
      <td>
        <button class="btn-edit" data-id="${student.id}">Sửa chuyên ngành</button>
        <button class="btn-delete" data-id="${student.id}">Xóa</button>
      </td>
    `;

    studentTable.appendChild(row);
  });
}

// 2. Chức năng THÊM sinh viên mới (POST)
studentForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Ngăn trang web bị load lại khi nhấn submit

  const diem = Number(diemTrungBinhInput.value);

  const newStudent = {
    maSinhVien: maSinhVienInput.value,
    ten: tenInput.value,
    tuoi: Number(tuoiInput.value),
    chuyenNganh: chuyenNganhInput.value,
    diemTrungBinh: diem,
    hocBong: diem >= 8.0, // Đạt từ 8.0 trở lên tự động nhận học bổng
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });

    if (!response.ok) {
      throw new Error("Không thể thêm sinh viên vào hệ thống");
    }

    studentForm.reset(); // Làm sạch các ô nhập liệu trong form
    getStudents(); // Gọi lại hàm để cập nhật bảng ngay lập tức
  } catch (error) {
    alert("Lỗi thêm mới: " + error.message);
  }
});

// 3. Lắng nghe sự kiện click cho các nút Sửa và Xóa trong bảng
studentTable.addEventListener("click", async function (event) {
  const studentId = event.target.dataset.id;

  // Nếu click hụt ra ngoài các button thì bỏ qua
  if (!studentId) return;

  // Hành động bấm nút Xóa
  if (event.target.classList.contains("btn-delete")) {
    await deleteStudent(studentId);
  }

  // Hành động bấm nút Sửa chuyên ngành
  if (event.target.classList.contains("btn-edit")) {
    const newMajor = prompt("Nhập chuyên ngành mới cần cập nhật:");
    if (newMajor && newMajor.trim() !== "") {
      await updateMajor(studentId, newMajor.trim());
    }
  }
});

// 4. Chức năng SỬA chuyên ngành (PATCH)
async function updateMajor(id, newMajor) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chuyenNganh: newMajor,
      }),
    });

    if (!response.ok) {
      throw new Error("Không thể cập nhật chuyên ngành cho sinh viên");
    }

    getStudents(); // Cập nhật lại giao diện bảng sau khi sửa thành công
  } catch (error) {
    alert("Lỗi cập nhật: " + error.message);
  }
}

// 5. Chức năng XÓA sinh viên (DELETE)
async function deleteStudent(id) {
  const confirmDelete = confirm(
    "Bạn có chắc chắn muốn xóa sinh viên này khỏi danh sách?",
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Không thể xóa sinh viên khỏi cơ sở dữ liệu");
    }

    getStudents(); // Cập nhật lại giao diện bảng sau khi xóa thành công
  } catch (error) {
    alert("Lỗi xóa dữ liệu: " + error.message);
  }
}

// Tự động kích hoạt lấy dữ liệu lần đầu tiên ngay khi mở trang web
getStudents();
