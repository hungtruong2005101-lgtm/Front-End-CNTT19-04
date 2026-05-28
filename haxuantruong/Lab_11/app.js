async function searchUser(){

    let keyword = document
        .getElementById("userInput")
        .value
        .toLowerCase();

    let result = document.getElementById("result");

    let loading = document.getElementById("loading");

    if(keyword === ""){

        result.innerHTML = `
            <div class="error">
                Vui lòng nhập tên người dùng
            </div>
        `;

        return;
    }

    loading.innerHTML = `
        <p>
            <i class="fa-solid fa-spinner fa-spin"></i>
            Đang tải dữ liệu...
        </p>
    `;

    result.innerHTML = "";

    try{

        let response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        let data = await response.json();

        loading.innerHTML = "";

        let user = data.find(item =>
            item.name.toLowerCase().includes(keyword)
        );

        if(user){

            result.innerHTML = `
                <div class="user-card">

                    <h2>
                        <i class="fa-solid fa-circle-user"></i>
                        ${user.name}
                    </h2>

                    <p>
                        <b>Email:</b> ${user.email}
                    </p>

                    <p>
                        <b>SĐT:</b> ${user.phone}
                    </p>

                    <p>
                        <b>Website:</b> ${user.website}
                    </p>

                    <p>
                        <b>Thành phố:</b> ${user.address.city}
                    </p>

                    <p>
                        <b>Công ty:</b> ${user.company.name}
                    </p>

                </div>
            `;

        }else{

            result.innerHTML = `
                <div class="error">
                    Không tìm thấy người dùng
                </div>
            `;
        }

    }catch(error){

        loading.innerHTML = "";

        result.innerHTML = `
            <div class="error">
                Lỗi kết nối API
            </div>
        `;
    }
}