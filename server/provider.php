<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";
require_once __DIR__ . "/common.php";

/**
 * thực hiện kiểm tra phương thức được client 
 * yêu cầu lên và thực thi nếu phương thức hợp lệ
 * @return void
 */
function invokeMethodOption()
{
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method == "GET") {
        getProvidersInformation();
        die();
    }

    // xác thực nếu client yêu cầu các
    // phương thức cần quyền quản trị 
    validate();

    switch ($method) {
        case "POST" :
        {
            addProvider();
            break;
        }
        case "PUT" :
        {
            editProvider();
            break;
        }
        case "DELETE" :
        {
            deleteProvider();
            break;
        }
        default :
        {
            api_error_response("Phương thức không xác định!", false);
        }
    }
}

/**
 * xóa nhà cung cấp khỏi cơ sở dữ liệu
 */
function deleteProvider()
{
    // kiểm tra xem client có 
    // truyền các đối số chứa dữ liệu cần thiết
    paramsCheck(
        $_GET,
        'id'
    );

    // lấy dữ liệu từ các đối số
    $id = $_GET['id'];

    // xây dựng truy vấn 
    $query = "
    DELETE
    FROM NoiSanXuat
    WHERE MaNoiSanXuat = $id;
    ";

    // thực hiện truy vấn và kiểm tra truy vấn
    deleteResponse(api_query($query));

}

/**
 * chỉnh sửa truy vấn
 * @return void
 */
function editProvider()
{
    // lấy dữ liệu truyền lên của client từ phương thức PUT
    // và truyền vào biến $_PUT
    parse_str(file_get_contents('php://input'), $_PUT);

    // kiểm tra các đối số xem có hợp lệ
    paramsCheck(
        $_PUT,
        'id', 'provider_name', 'address'
    );

    // lấy dữ liệu từ các đối số
    $id = $_PUT['id'];
    $providerName = $_PUT['provider_name'];
    $address = $_PUT['address'];

    // xây dựng truy vấn
    $query = "
    UPDATE NoiSanXuat
    SET CongTySanXuat = '$providerName', DiaChi = '$address'
    WHERE MaNoiSanXuat = '$id'
    ";

    // thực hiện truy vấn và kiểm tra truy vấn
    editResponse(api_query($query));


}

/**
 * thêm nhà cung cấp
 * @return void
 */
function addProvider()
{
    
    paramsCheck(
        $_POST,
        'provider_name', 'address'
    );

    $providerName = $_POST['provider_name'];
    $address = $_POST['address'];

    $query = "INSERT INTO NoiSanXuat (CongTySanXuat, DiaChi, NgayTao) VALUES ('$providerName', '$address', NOW())";

    insertResponse(api_query($query));


}

function getProvidersInformation()
{
    $query = "SELECT * FROM NoiSanXuat";
    $result = api_query($query);
    itemsListResponse($result);

}

invokeMethodOption();