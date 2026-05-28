document.addEventListener("DOMContentLoaded", function() {
    let allProductsLocal = [];

    // Tải dữ liệu chính từ API bằng Vanilla JavaScript
    function loadPublicProducts() {
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('productGrid').innerHTML = '';

        ApiService.getAllProducts()
            .then(data => {
                allProductsLocal = data;
                renderProducts(data);
            })
            .catch(error => {
                Utils.showToast(error.message, false);
            })
            .finally(() => {
                document.getElementById('loadingSpinner').style.display = 'none';
            });
    }

    // Render danh sách thẻ sản phẩm (DOM Manipulation)
    function renderProducts(products) {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = ''; // Đảm bảo làm sạch lưới trước khi render

        products.forEach(item => {
            const cardCol = document.createElement('div');
            cardCol.className = 'col-sm-6 col-md-4 col-lg-3 product-item';
            cardCol.setAttribute('data-cert', item.certification);
            
            cardCol.innerHTML = `
                <div class="card h-100 shadow-sm border-0 product-card rounded-3 overflow-hidden d-flex flex-column">
                    <div class="position-relative">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 180px; object-fit: cover;">
                        <span class="position-absolute top-0 start-0 m-2 shadow-sm">${Utils.getBadgeCert(item.certification)}</span>
                    </div>
                    <div class="card-body d-flex flex-column p-3">
                        <span class="text-muted small fw-semibold text-uppercase">${item.category || "Nông sản"}</span>
                        <h6 class="card-title fw-bold text-dark mt-1 mb-2 text-truncate-2" style="min-height: 40px;">${item.name}</h6>
                        <p class="card-text text-danger fw-bold fs-5 m-0 mb-3">${Utils.formatCurrency(item.price)}</p>
                        
                        <div class="d-flex gap-2 mt-auto">
                            <button class="btn btn-outline-secondary btn-sm flex-grow-1 fw-bold btn-view-detail" data-id="${item.id}">
                                👁️ Chi tiết
                            </button>
                            <button class="btn btn-success btn-sm flex-grow-1 fw-bold btn-buy-now" data-id="${item.id}">
                                🛒 Mua
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(cardCol);
        });
    }

    // Bộ lọc chứng nhận kết hợp hiệu ứng jQuery (.fadeIn(), .hide())
    $('#filterCertification').on('change', function() {
        const selectedCert = $(this).val();
        if(selectedCert === "") {
            $('.product-item').fadeIn(300);
        } else {
            $('.product-item').hide();
            $(`.product-item[data-cert="${selectedCert}"]`).fadeIn(300);
        }
    });

    // Xử lý Form đặt hàng kèm Inline Form Validation bắt buộc
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();

        if(!name) {
            document.getElementById('errCustomerName').innerText = "Vui lòng nhập họ tên nhận hàng!";
            isValid = false;
        } else {
            document.getElementById('errCustomerName').innerText = "";
        }

        if(!phone) {
            document.getElementById('errCustomerPhone').innerText = "Số điện thoại không được bỏ trống!";
            isValid = false;
        } else if(!/^[0-9]{10}$/.test(phone)) {
            document.getElementById('errCustomerPhone').innerText = "Số điện thoại chưa đúng định dạng (10 chữ số)!";
            isValid = false;
        } else {
            document.getElementById('errCustomerPhone').innerText = "";
        }

        if(isValid) {
            bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
            Utils.showToast(`Đặt hàng thành công sản phẩm! Chúng tôi sẽ gọi lại cho bạn sớm nhất.`);
        }
    });

    // ==========================================
    // LOGIC XỬ LÝ SỰ KIỆN XEM CHI TIẾT SẢN PHẨM
    // ==========================================
    
    // Hàm trung gian giúp đẩy dữ liệu chung lên Modal từ API
    function fillModalData(productId, callback) {
        ApiService.getProductById(productId)
            .then(product => {
                document.getElementById('modalProductName').innerText = product.name;
                document.getElementById('modalProductImg').src = product.image;
                document.getElementById('modalProductImg').alt = product.name;
                document.getElementById('modalProductCategory').innerText = product.category || "Nông sản xanh";
                document.getElementById('modalProductCert').innerHTML = Utils.getBadgeCert(product.certification);
                document.getElementById('modalProductPrice').innerText = Utils.formatCurrency(product.price);
                document.getElementById('modalProductSupplier').innerText = product.supplier || "Hợp tác xã Nông nghiệp Công nghệ cao";
                document.getElementById('modalProductDesc').innerText = product.description || "Sản phẩm đạt đầy đủ chứng nhận quy trình kiểm định an toàn thực phẩm, không chứa chất độc hại, tốt cho sức khỏe người tiêu dùng.";
                
                // Xóa sạch thông báo lỗi form cũ nếu có
                document.getElementById('errCustomerName').innerText = "";
                document.getElementById('errCustomerPhone').innerText = "";
                document.getElementById('orderForm').reset();

                if (callback) callback();
            })
            .catch(err => {
                Utils.showToast("Không thể lấy dữ liệu sản phẩm: " + err.message, false);
            });
    }

    // Sự kiện 1: Khi bấm nút "👁️ Chi tiết" ở màn hình chính
    $('#productGrid').on('click', '.btn-view-detail', function() {
        const id = $(this).data('id');
        fillModalData(id, function() {
            document.getElementById('modalMainTitle').innerText = "🌿 Chi tiết sản phẩm xanh";
            document.getElementById('btnSwitchToOrder').style.display = "block";
            document.getElementById('orderForm').style.display = "none";
            
            const myModal = new bootstrap.Modal(document.getElementById('orderModal'));
            myModal.show();
        });
    });

    // Sự kiện 2: Khi bấm thẳng nút "🛒 Mua" ở màn hình chính
    $('#productGrid').on('click', '.btn-buy-now', function() {
        const id = $(this).data('id');
        fillModalData(id, function() {
            document.getElementById('modalMainTitle').innerText = "🌿 Đặt mua sản phẩm nhanh";
            document.getElementById('btnSwitchToOrder').style.display = "none";
            document.getElementById('orderForm').style.display = "block";
            
            const myModal = new bootstrap.Modal(document.getElementById('orderModal'));
            myModal.show();
        });
    });

    // Sự kiện 3: Khi đang xem chi tiết mà bấm tiếp vào "ĐẶT MUA NHANH GIAO TẬN NƠI"
    document.getElementById('btnSwitchToOrder').addEventListener('click', function() {
        document.getElementById('modalMainTitle').innerText = "🌿 Đặt mua sản phẩm nhanh";
        $(this).fadeOut(200, function() {
            $('#orderForm').fadeIn(300);
        });
    });

    // Sự kiện 4: Khi đang ở Form mua hàng mà muốn nhấn "Quay lại" xem thông tin chi tiết bài viết
    document.getElementById('btnBackToDetail').addEventListener('click', function() {
        document.getElementById('modalMainTitle').innerText = "🌿 Chi tiết sản phẩm xanh";
        $('#orderForm').fadeOut(200, function() {
            $('#btnSwitchToOrder').fadeIn(300);
        });
    });

    // Chạy tải danh sách lần đầu
    loadPublicProducts();
});