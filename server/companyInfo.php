<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";
require_once __DIR__ . "/common.php";


function invokeMethodOption()
{
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method == "GET") {
        getCompanyInformation();
        die();
    }

    validate();
    switch ($method) {
        case "PUT":
        {
            changeCompanyInformation();
            break;
        }
        default:
        {
            api_error_response("Phương thức không xác định!", false);
        }
    }
}

function changeCompanyInformation()
{
    parse_str(file_get_contents('php://input'), $_PUT);
    paramsCheck($_PUT,
        'company_name', 'email',
        'phone_number', 'address'
    );

    $companyName = $_PUT['company_name'];
    $email = $_PUT['email'];
    $phoneNumber = $_PUT['phone_number'];
    $address = $_PUT['address'];

    $query = "UPDATE ThongTinCongTy SET TenCongTy = '$companyName', Email = '$email', SoDienThoai = '$phoneNumber', DiaChi = '$address'";

    if (api_query($query)) {
        api_success_response("Thay đổi thông tin thành công!", true);
    } else {
        api_success_response("Thay đổi thông tin thất bại!", false);
    }
}

function getCompanyInformation()
{
    $query = "SELECT * FROM ThongTinCongTy";
    $result = api_query($query);
    api_response(mysqli_fetch_assoc($result), 200);
}

invokeMethodOption();