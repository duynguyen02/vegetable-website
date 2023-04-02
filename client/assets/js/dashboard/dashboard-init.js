// các nút trên header
let logoutButton = select("#dashboard-a-logout");
// let contactButton = select("#dashboard-a-contact");
let changePasswordButton = select("#dashboard-a-change-password");

// thông báo
let notification = select("#dashboard-notification");
// thông báo của hộp thoại đổi mật khẩu
let changePasswordNotification = select("#dashboard-password-change-message");
// bảng dữ liệu
let tableData = select("#dashboard-table-data");
// nút tiến hành đổi mật khẩu
let changePasswordSubmitButton = select("#dashboard-btn-change-password");
// thông báo nhỏ
let subNotification = select("#dashboard-sub-notification")
// vùng đầu bảng dữ liệu
let tableTool = select("#dashboard-table-tool")



let btnModal = select("#dashboard-modal")
let modalHeader = select("#dashboard-header-modal")
let modalBody = select("#dashboard-body-modal")
let modalFooter = select("#dashboard-footer-modal")

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

/**
 * 
 * @param {*} msg 
 */
const setSubNotification = (msg) => {

    subNotification.innerHTML += `
    <div class="alert alert-info alert-dismissible fade show" role="alert">
    <strong>${(new Date()).toLocaleString()}: &nbsp</strong>${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

const setTableTool = (s) => {
    tableTool.innerHTML = s
}

