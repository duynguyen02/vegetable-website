<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";
require_once __DIR__ . "/common.php";


function invokeMethodOption()
{
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method == "GET") {
        getProduct();
        die();
    }

    validate();
    switch ($method) {
        case "POST": {
                addProduct();
                break;
            }
        case "PUT": {

                break;
            }
        case "DELETE": {

                break;
            }
        default: {
                api_error_response("Phương thức không xác định!", false);
            }
    }
}

function getProduct()
{
    if (isset($_GET['id'])) {
        getProductById();
        return;
    }

    if (isset($_GET['limit'])) {
        getProductByLimit();
        return;
    }

    getAllProduct();
}

function getProductById()
{
}

function getProductByLimit()
{
}

function getAllProduct()
{
    $query = "
    SELECT ThucPham.MaThucPham, ThucPham.ThucPham, ThucPham.MauSac, ThucPham.KichThuoc, ThucPham.HinhDang, ThucPham.ViTriHinhAnh, ThucPham.NgayTao, noisanxuat.CongTySanXuat, noisanxuat.DiaChi, loaithucpham.LoaiThucPham
    FROM ThucPham
    INNER JOIN noisanxuat  ON noisanxuat.MaNoiSanXuat = ThucPham.MaNoiSanXuat
    INNER JOIN loaithucpham ON loaithucpham.MaLoaiThucPham = ThucPham.MaLoaiThucPham;
    ";

    itemsListResponse(api_query($query));
}

function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}

function addProduct()
{
    paramsCheck(
        $_POST,
        'product',
        'color',
        'size',
        'shape',
        'provider_id',
        'product_type_id'
    );

    paramsCheck(
        $_FILES,
        'image'
    );

    $product = $_POST['product'];
    $color = $_POST['color'];
    $size = $_POST['size'];
    $shape = $_POST['shape'];
    $providerId = $_POST['provider_id'];
    $productTypeId = $_POST['product_type_id'];

    // kiểm tra ảnh có hợp lệ hay không

    // kiểm tra ảnh có phải giả
    $fakeImageCheck = getimagesize($_FILES["image"]["tmp_name"]);

    // kiểm tra đuôi ảnh có hợp lệ
    // lấy đuôi ảnh
    $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $fileExtensionCheck = true;
    if (
        $fileExtensionCheck != "jpg" && $fileExtensionCheck != "jpeg"
    ) {
        $fileExtensionCheck = false;
    }


    if ($fakeImageCheck === false || $fileExtensionCheck === false) {
        api_error_response("Ảnh không hợp lệ!", false);
        return;
    }

    // biến vị trí lưu ảnh
    $targetDir = "uploads/";


    // tạo 1 đường dẫn không tồn tại
    while ($uploadTarget = $targetDir . generateRandomString() . $fileExtension) {
        if (!file_exists($uploadTarget)) {
            break;
        }
    }

    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $uploadTarget)){
        api_error_response("Không thể tải ảnh!", false);
        return;
    }

    $query = "
    INSERT INTO thucpham (ThucPham, MauSac, KichThuoc, HinhDang, ViTriHinhAnh, NgayTao, MaNoiSanXuat, MaLoaiThucPham)
    VALUES ('$product', '$color', '$size', '$shape', '$uploadTarget', NOW(), '$providerId', '$productTypeId')
    ";

    insertResponse(api_query($query));

}

invokeMethodOption();