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
    if (isAvailableSession()) {
        api_error_response("Bạn đã đăng nhập trước đó!", false);
        die();
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        paramsCheck($_POST, 'email', 'password');

        $email = $_POST['email'];
        $password = $_POST['password'];
        if (isValidUser($email, $password)) {
            setSession($email);
            api_success_response("Đăng nhập thành công!", true);
        } else {
            api_success_response("Đăng nhập thất bại!", false);
        }

    } else {
        api_error_response(
            "Phương thức không hợp lệ!", false
        );
    }
}

tryToLogin();


