const Utils = {
    // Định dạng tiền tệ Việt Nam VNĐ
    formatCurrency: (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },

    // Render nhãn badge chứng nhận chuẩn màu sắc sinh động
    getBadgeCert: (cert) => {
        if(cert === 'Organic') return `<span class="badge badge-organic">Organic</span>`;
        if(cert === 'GlobalGAP') return `<span class="badge badge-globalgap">GlobalGAP</span>`;
        return `<span class="badge badge-ecofriendly">Eco-friendly</span>`;
    },

    // Hàm hiển thị thông báo Toast nhanh góc màn hình
    showToast: (message, isSuccess = true) => {
        const bgClass = isSuccess ? 'bg-success' : 'bg-danger';
        const toastHtml = `
            <div class="toast align-items-center text-white ${bgClass} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2500">
                <div class="d-flex">
                    <div class="toast-body fw-bold">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        const $toastElement = $(toastHtml);
        $('.toast-container').append($toastElement);
        const bootstrapToast = new bootstrap.Toast($toastElement[0]);
        bootstrapToast.show();
        $toastElement.on('hidden.bs.toast', function () { $(this).remove(); });
    },

    // Kiểm tra định dạng URL hình ảnh hợp lệ
    isValidURL: (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;  
        }
    }
};