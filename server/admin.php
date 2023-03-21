<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";
require_once __DIR__ . "/common.php";

function invokeMethodOption()
{
    $method = $_SERVER["REQUEST_METHOD"];
    validate();
    switch ($method) {
        case  "GET":
        {
            getAdmins();
            break;
        }
        case "POST":
        {
            addNewAdmin();
            break;
        }
        case "DELETE":
        {
            deleteAdminAccountById();
            break;
        }
        case "PUT":
        {
            changeAdminPassword();
            break;
        }
        default:
        {
            api_error_response("Phương thức không xác định!", false);
        }
    }
}

function getAdmins()
{
    $query = "SELECT MaTaiKhoan, Email, NgayTao FROM QuanTriVien";
    itemsListResponse(api_query($query));
}

function changeAdminPassword()
{
    parse_str(file_get_contents('php://input'), $_PUT);

    paramsCheck($_PUT, 'new_password', 'current_password');

    $adminEmail = getCurrentEmailSession();
    $currentPassword = $_PUT['current_password'];

    if (!isValidUser($adminEmail, $currentPassword)) {
        api_error_response("Mật khẩu hiện tại không khớp!", false);
        die();
    }

    $newPassword = $_PUT['new_password'];

    $query = "UPDATE QuanTriVien SET MatKhau = SHA1('$newPassword') WHERE Email = '$adminEmail'";

    if (api_query($query)) {
        api_success_response("Đổi mật khẩu thành công!", true);
    } else {
        api_success_response("Đổi mật khẩu thất bại!", false);
    }
}


function addNewAdmin()
{
    paramsCheck($_POST, 'email', 'password');
    $email = $_POST["email"];
    $password = $_POST["password"];

    $query = "INSERT INTO QuanTriVien(MatKhau, Email, NgayTao) VALUES (SHA1('$password'),'$email',NOW())";

    insertResponse(api_query($query));


}


/**
 * Phương thức xòa tài khoản của quản trị viên
 * thông qua mã định danh.
 * Đối với quản trị viên gốc với mã định danh 1
 * máy chủ từ chối quyền xóa.
 *
 * Phương thức: GET
 * Đối số:
 *  - id: mã định danh của quản trị viên
 *
 * @return void
 */
function deleteAdminAccountById()
{
    paramsCheck($_GET, 'id');
    $id = $_GET['id'];
    if ($id == '1') {
        api_error_response("Không thể xóa tài khoản gốc!", false);
        die();
    }

    if (!isAdminExist($id)) {
        api_error_response("Tài khoản không tồn tại!", false);
        die();
    }

    $query = "DELETE FROM QuanTriVien WHERE MaTaiKhoan = '$id'";

    deleteResponse(api_query($query));
}

/**
 * Khởi tạo các chức năng của tệp.
 * @return void
 */
function init()
{
    invokeMethodOption();
}

init();




