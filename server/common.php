<?php
require_once __DIR__ . "/api/api.php";

/**
 * Kiểm tra xem tài khoản quản trị viên có hợp lệ hay không.
 * @param string $email
 * @param string $password
 * @return bool
 */
function isValidUser(string $email, string $password): bool
{
    $query = "SELECT MaTaiKhoan FROM QuanTriVien WHERE Email = '$email' and MatKhau = SHA1('$password')";
    $result = api_query($query);
    $count = mysqli_num_rows($result);
    return $count == 1;
}

/**
 * Kiểm tra xem mã định danh có tồn tại tài khoản
 * của quản trị viên hay không.
 * @param string $id
 * @return bool
 */
function isAdminExist(string $id): bool
{
    $query = "SELECT MaTaiKhoan FROM QuanTriVien WHERE MaTaiKhoan = '$id'";
    $result = api_query($query);
    $count = mysqli_num_rows($result);
    return $count == 1;
}

/**
 * Kiểm tra xem các đối số có hợp lệ hay không.
 * @param $variable : Biến cần kiểm tra.
 * @param string ...$args : Danh sách các đối số.
 * @return void
 */
function paramsCheck($variable,string ...$args){
    try {
        foreach ($args as $value){
            if(!isset($variable[$value])){
                api_error_response("Đối số không hợp lệ!", false);
                die();
            }
        }
    }catch (Exception $exception){
        api_error_response("Đối số không hợp lệ!", false);
        die();
    }
}