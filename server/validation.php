<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/session/session.php";

/**
 * Phương thức xác thực quyền quản trị
 * Gọi phương thức này trước khi thực hiện
 * các thao tác cơ sở dữ liệu trên các tệp
 * cần có quyền quản trị.
 * Nếu xác thực thất bại, phương thức sẽ trả
 * về chuỗi phản hồi json và kết thúc lập tức
 * phiên làm việc.
 * @return void
 */
function validate()
{
    // nếu session không khả dụng
    if (!isAvailableSession()) {
        // đưa ra phản hồi và kết thực thực thi mã nguồn
        api_error_response("Xác thực thất bại!", false);
        die();
    }
}

/**
 * Trả về email của quản trị viên đang đăng nhập.
 * @return mixed
 */
function getCurrentEmailSession(){
    validate();
    return getSession();
}

/**
 * kiểm tra xem session có hợp lệ hay không
 * @return bool
 */
function isValidSession(): bool
{
    return isAvailableSession();
}