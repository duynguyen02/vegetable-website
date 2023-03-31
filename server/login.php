<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/session/session.php";
require_once __DIR__ . "/common.php";

/**
 * Đăng nhập quản trị viên vào thiết bị.
 * @return void
 */
function tryToLogin()
{
    
    if (isAvailableSession()) { // nếu session khả dụng có nghĩa người dùng đã đăng nhập 
        // trả phản hồi thông báo
        api_error_response("Bạn đã đăng nhập trước đó!", false);
        die();
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // kiểm tra đối số
        paramsCheck($_POST, 'email', 'password');

        // lấy dữ liệu từ đối số
        $email = $_POST['email'];
        $password = $_POST['password'];

        if (isValidUser($email, $password)) { // nếu email và mật khẩu hợp lệ
            // gán email là dữ liệu cho session
            setSession($email);
            // trả phản hồi
            api_success_response("Đăng nhập thành công!", true);
        } else { // nếu email và mật khẩu không hợp lệ
            // trả phản hồi thất bại
            api_success_response("Đăng nhập thất bại!", false);
        }

    } else {
        api_error_response(
            "Phương thức không hợp lệ!", false
        );
    }
}

tryToLogin();


