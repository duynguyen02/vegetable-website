<?php
require __DIR__."/api/api.php";
require __DIR__."/session/session.php";

function checkHasLogged(){
    if (isAvailableSession()){
        api_success_response("Bạn đã đăng nhập trước đó!");
        die();
    }
}
function isValidUser(string $email, string $password): bool
{
    $query = "SELECT MaTaiKhoan FROM QuanTriVien WHERE Email = '$email' and MatKhau = SHA1('$password')";
    $result = api_query($query);
    $count = mysqli_num_rows($result);
    return $count == 1;
}

function tryToLogin(){
    checkHasLogged();
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $email = $_POST['email'];
        $password = $_POST['password'];
        if (isValidUser($email,$password)){
            setSession($email);
            api_success_response("Đăng nhập thành công!");
        }
        else{
            api_success_response("Đăng nhập thất bại!");
        }

    }
    else{
        api_error_response(
            "Phương thức không hợp lệ!"
        );
    }
}

tryToLogin();


