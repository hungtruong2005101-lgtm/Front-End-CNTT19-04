$(document).ready(function() {
    let deleteIdTarget = null;

    // 1. Đọc và tải dữ liệu lên Table
    function loadAdminTable() {
        ApiService.getAllProducts()
            .then(products => {
                const $tableBody = $('#adminProductTable');
                $tableBody.empty();

                products.forEach(item => {
                    const tr = `
                        <tr>
                            <td><img src="${item.image}" alt="" class="rounded" style="width: 45px; height: 45px; object-fit: contain;"></td>
                            <td class="text-start fw-bold small">${item.name}</td>
                            <td>${Utils.getBadgeCert(item.certification)}</td>
                            <td class="text-danger fw-bold small">${Utils.formatCurrency(item.price)}</td>
                            <td>
                                <button class="btn btn-warning btn-sm btn-edit py-0 px-2" data-id="${item.id}">Sửa</button>
                                <button class="btn btn-danger btn-sm btn-delete py-0 px-2" data-id="${item.id}">Xóa</button>
                            </td>
                        </tr>
                    `;
                    $tableBody.append(tr);
                });

                registerTableEvents();
            })
            .catch(err => Utils.showToast(err.message, false));
    }

    // Đăng ký sự kiện Click cho nút Sửa / Xóa bằng jQuery .on()
    function registerTableEvents() {
        // Hủy đăng ký cũ tránh lặp sự kiện khi tải lại bảng
        $('.btn-edit').off('click').on('click', function() {
            const id = $(this).attr('data-id');
            editProductSetup(id);
        });

        $('.btn-delete').off('click').on('click', function() {
            deleteIdTarget = $(this).attr('data-id');
            const delModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
            delModal.show();
        });
    }

    // 2. Chế độ thiết lập Sửa sản phẩm
    function editProductSetup(id) {
        ApiService.getProductById(id)
            .then(product => {
                $('#productId').val(product.id);
                $('#prodName').val(product.name);
                $('#prodPrice').val(product.price);
                $('#prodCategory').val(product.category);
                $('#prodImage').val(product.image);
                $('#prodCertification').val(product.certification);
                $('#prodSupplier').val(product.supplier);
                $('#prodDesc').val(product.description);

                $('#formTitle').removeClass('bg-success').addClass('bg-warning text-dark').text('Cập Nhật Sản Phẩm');
                $('#btnResetForm').removeClass('d-none');
                $('.error-feedback').text('');
            })
            .catch(err => Utils.showToast(err.message, false));
    }

    // Hủy chế độ sửa (Reset Form)
    $('#btnResetForm').on('click', function() {
        resetFormState();
    });

    function resetFormState() {
        $('#productForm')[0].reset();
        $('#productId').val('');
        $('#formTitle').removeClass('bg-warning text-dark').addClass('bg-success text-white').text('Thêm Sản Phẩm Mới');
        $('#btnResetForm').addClass('d-none');
        $('.error-feedback').text('');
    }

    // 3. Xử lý Submit Form (Gồm cả thêm mới POST và cập nhật PUT AJAX) + Validation chặt chẽ
    $('#productForm').on('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        const id = $('#productId').val();
        const name = $('#prodName').val().trim();
        const price = parseFloat($('#prodPrice').val());
        const category = $('#prodCategory').val().trim();
        const image = $('#prodImage').val().trim();
        const certification = $('#prodCertification').val();
        const supplier = $('#prodSupplier').val().trim();
        const description = $('#prodDesc').val().trim();

        if (!name) { $('#errProdName').text('Tên sản phẩm không được trống!'); isValid = false; } else { $('#errProdName').text(''); }
        if (isNaN(price) || price <= 0) { $('#errProdPrice').text('Giá tiền phải lớn hơn 0!'); isValid = false; } else { $('#errProdPrice').text(''); }
        if (!category) { $('#errProdCategory').text('Vui lòng điền danh mục!'); isValid = false; } else { $('#errProdCategory').text(''); }
        if (!image || !Utils.isValidURL(image)) { $('#errProdImage').text('Đường dẫn URL ảnh không hợp lệ!'); isValid = false; } else { $('#errProdImage').text(''); }
        if (!certification) { $('#errProdCert').text('Vui lòng chọn chứng nhận!'); isValid = false; } else { $('#errProdCert').text(''); }
        if (!supplier) { $('#errProdSupplier').text('Vui lòng nhập nhà cung cấp!'); isValid = false; } else { $('#errProdSupplier').text(''); }

        if (!isValid) return;

        const productPayload = { name, price, category, image, certification, supplier, description };

        if (id) {
            ApiService.updateProduct(id, productPayload)
                .done(() => {
                    Utils.showToast("Cập nhật thông tin sản phẩm thành công!");
                    resetFormState();
                    loadAdminTable();
                })
                .fail(() => Utils.showToast("Xảy ra lỗi trong quá trình cập nhật!", false));
        } else {
            ApiService.createProduct(productPayload)
                .then(() => {
                    Utils.showToast("Thêm mới sản phẩm xanh thành công!");
                    resetFormState();
                    loadAdminTable();
                })
                .catch(err => Utils.showToast(err.message, false));
        }
    });

    // 4. Xác nhận xóa phần tử dữ liệu (DELETE)
    $('#btnConfirmDelete').on('click', function() {
        if (!deleteIdTarget) return;

        ApiService.deleteProduct(deleteIdTarget)
            .then(() => {
                Utils.showToast("Xóa sản phẩm khỏi hệ thống thành công!");
                bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
                loadAdminTable();
            })
            .catch(err => Utils.showToast(err.message, false));
    });

    // Khởi chạy nạp bảng dữ liệu
    loadAdminTable();
});