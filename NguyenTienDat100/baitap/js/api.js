// Đường dẫn kết nối trực tiếp đến MockAPI của bạn (Đã xóa bỏ dòng const thừa gây lỗi)
// const BASE_URL = "https://6a0d5af8769682b8ee76085a.mockapi.io/api/v1/products";
const BASE_URL = "https://6a187ec51878294b597d4409.mockapi.io/api/v1/products";

const ApiService = {
    // 1. Lấy toàn bộ sản phẩm bằng Fetch API kết hợp Promise (.then/.catch)
    getAllProducts: () => {
        return fetch(BASE_URL)
            .then(response => {
                if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm!");
                return response.json();
            });
    },

    // 2. Lấy 1 sản phẩm chi tiết bằng Fetch API
    getProductById: (id) => {
        return fetch(`${BASE_URL}/${id}`)
            .then(response => {
                if (!response.ok) throw new Error("Không thể lấy chi tiết sản phẩm!");
                return response.json();
            });
    },

    // 3. Thêm mới sản phẩm bằng Fetch API (Phương thức POST)
    createProduct: (productData) => {
        return fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        }).then(response => {
            if (!response.ok) throw new Error("Không thể thêm mới sản phẩm!");
            return response.json();
        });
    },

    // 4. Cập nhật thông tin bằng jQuery AJAX (Phương thức PUT)
    updateProduct: (id, productData) => {
        return $.ajax({
            url: `${BASE_URL}/${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(productData)
        });
    },

    // 5. Xóa sản phẩm bằng Fetch API (Phương thức DELETE)
    deleteProduct: (id) => {
        return fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        }).then(response => {
            if (!response.ok) throw new Error("Không thể xóa sản phẩm!");
            return response.json();
        });
    }
};