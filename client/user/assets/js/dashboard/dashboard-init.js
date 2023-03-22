// các nút trên header
let logoutButton = select("#dashboard-a-logout");
let contactButton = select("#dashboard-a-contact");
let companyButton = select("#dashboard-a-company-info");
let adminButton = select("#dashboard-a-admin");
let productAdmin = select("#dashboard-a-product");
let providerButton = select("#dashboard-a-provider");
let productTypeButton = select("#dashboard-a-product-type");
let changePasswordButton = select("#dashboard-a-change-password");

// thông báo
let notification = select("#dashboard-notification");
// thông báo của hộp thoại đổi mật khẩu
let changePasswordNotification = select("#dashboard-password-change-message");
// bảng dữ liệu
let tableData = select("#dashboard-table-data");
// nút tiến hành đổi mật khẩu
let changePasswordSubmitButton = select("#dashboard-btn-change-password");

/**
 * Hàm gán spinner cho thanh thông báo
 */
const setLoading = () => {
    if (notification) {
        notification.innerHTML = `
              Đang Tải...
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              `;
    }
};

/**
 * Hàm tùy chỉnh thông báo
 * @param {*} content
 */
const setNotificationWith = (content) => {
    if (notification) {
        notification.innerHTML = content;
    }
};

/**
 * Hàm chỉnh thông báo thành chữ không thể tại dữ liệu
 */
const setNotificationWithCannotLoadData = () => {
    setNotificationWith(
        `<span class="text-danger">Không thể tải dữ liệu!</span>`
    );
};


