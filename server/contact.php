<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";
require_once __DIR__ . "/common.php";

function invokeMethodOption()
{
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method == "POST") {
        sendMessage();
        die();
    }

    validate();
    switch ($method) {
        case "GET":
        {
            getCustomerMessages();
            break;
        }
        case "DELETE":
        {
            deleteContact();
            break;
        }
        default:
        {
            api_error_response("Phương thức không xác định!", false);
        }
    }
}

function getCustomerMessages()
{
    $query = "
    SELECT KhachHang.MaKhachHang, KhachHang.hovaten, KhachHang.sodienthoai, KhachHang.email,
        LienHe.MaLienHe, LienHe.TieuDe, LienHe.NoiDung, LienHe.NgayLienHe
    FROM KhachHang
    INNER JOIN LienHe on KhachHang.MaKhachHang = LienHe.MaKhachHang
    ";

    itemsListResponse(api_query($query));
}

function deleteContact()
{
    paramsCheck($_GET,
        'method',
        'id'
    );

    switch ($_GET['method']) {
        case 'message' :
        {
            deleteMessage();
            break;
        }
        case 'customer' :
        {
            deleteCustomer();
            break;
        }
        default :
        {
            api_error_response("Phương thức xóa không xác định!", false);
        }
    }


}

function deleteCustomer()
{
    $id = $_GET['id'];
    $query = "
    DELETE
    FROM KhachHang
    WHERE MaKhachHang = '$id'
    ";

    deleteResponse(api_query($query));

}

function deleteMessage()
{
    $id = $_GET['id'];
    $query = "
    DELETE
    FROM LienHe
    WHERE MaLienHe = '$id';
    ";

    deleteResponse(api_query($query));

}

function sendMessage()
{
    paramsCheck($_POST,
        'customer_name',
        'phone_number',
        'email',
        'title',
        'content'
    );

    $customerName = $_POST['customer_name'];
    $phoneNumber = $_POST['phone_number'];
    $email = $_POST['email'];
    $title = $_POST['title'];
    $content = $_POST['content'];

    $id = getCustomerIdIfExistOrNull($phoneNumber, $email);

    if (!is_null($id)) {
        $query = "
        INSERT INTO LienHe (TieuDe, NgayLienHe, NoiDung, MaKhachHang)
        VALUES ('$title', NOW(), '$content', '$id')
        ";
    } else {
        $addCustomerQuery = "
        INSERT INTO KhachHang (HoVaTen, SoDienThoai, Email)
        VALUES ('$customerName', '$phoneNumber', '$email')
        ";

        if (!api_query($addCustomerQuery)) {
            api_error_response("Không thể gửi tin nhắn lúc này!", false);
            die();
        }

        $newId = api_get_db_last_id();

        $query = "
        INSERT INTO LienHe (TieuDe, NgayLienHe, NoiDung, MaKhachHang)
        VALUES ('$title', NOW(), '$content', '$newId')
        ";

    }
    insertResponse(api_query($query));


}

function getCustomerIdIfExistOrNull(string $phoneNumber, string $email)
{
    $query = "
    SELECT MaKhachHang FROM KhachHang WHERE Email = '$email' AND SoDienThoai = '$phoneNumber';
    ";

    $result = api_query($query);
    $count = mysqli_num_rows($result);

    if ($count == 1) {
        return mysqli_fetch_assoc($result)['MaKhachHang'];
    }

    return null;

}

invokeMethodOption();