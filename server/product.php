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
        case "POST":
        {
            paramsCheck(
                $_GET,
                'method'
            );

            if ($_GET['method'] == 'add') {
                addProduct();
            } else if ($_GET['method'] == 'edit') {
                editProduct();
            } else {
                api_error_response("Phương thức không xác định!", false);
            }
            break;
        }
        case "DELETE":
        {
            deleteProduct();
            break;
        }
        default:
        {
            api_error_response("Phương thức không xác định!", false);
        }
    }
}

/**
 * @return string|null
 * @throws Exception
 */
function uploadImage(): ?string
{
    // kiểm tra ảnh có hợp lệ hay không

    // kiểm tra ảnh có phải giả
    $fakeImageCheck = getimagesize($_FILES["image"]["tmp_name"]);

    // kiểm tra đuôi ảnh có hợp lệ
    // lấy đuôi ảnh
    $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $fileExtensionCheck = true;
    if (
        $fileExtension != "jpg" && $fileExtension != "jpeg" && $fileExtension != "webp"
    ) {
        $fileExtensionCheck = false;
    }


    if ($fakeImageCheck === false || $fileExtensionCheck === false) {
        return null;
    }

    // biến vị trí lưu ảnh
    $targetDir = "uploads/";


    // tạo 1 đường dẫn không tồn tại
    while ($uploadTarget = $targetDir . generateRandomString() . "." . $fileExtension) {
        if (!file_exists($uploadTarget)) {
            break;
        }
    }

    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $uploadTarget)) {
        return null;
    }

    return $uploadTarget;

}

function editProduct()
{


    paramsCheck(
        $_POST,
        'id',
        'product',
        'color',
        'size',
        'shape',
        'desc',
        'provider_id',
        'product_type_id',
        'is_change_image'
    );

    $uploadTarget = null;
    if ($_POST['is_change_image'] == "") {
        paramsCheck(
            $_FILES,
            'image'
        );

        $uploadTarget = uploadImage();

        if (is_null($uploadTarget)) {
            api_error_response("Không thể tải ảnh lên hệ thống!", false);
            return;
        }

    }

    $uploadTargetFinal = is_null($uploadTarget) ? $_POST['is_change_image'] : $uploadTarget;
    $product = $_POST['product'];
    $id = $_POST['id'];
    $color = $_POST['color'];
    $size = $_POST['size'];
    $shape = $_POST['shape'];
    $desc = $_POST['desc'];
    $providerId = $_POST['provider_id'];
    $productTypeId = $_POST['product_type_id'];


    $query = "
    UPDATE ThucPham t
    SET t.ThucPham       = '$product',
        t.MoTa           = '$desc',
        t.MauSac         = '$color',
        t.KichThuoc      = '$size',
        t.HinhDang       = '$shape',
        t.ViTriHinhAnh   = '$uploadTargetFinal',
        t.MaNoiSanXuat   = '$providerId',
        t.MaLoaiThucPham = '$productTypeId'
    WHERE t.MaThucPham = '$id'
    ";

    $oldImageQuery = "
            SELECT ViTriHinhAnh FROM ThucPham WHERE MaThucPham = $id
     ";

    $oldImageLocation = mysqli_fetch_assoc(api_query($oldImageQuery))['ViTriHinhAnh'];


    if (editResponse(api_query($query))) {
        try {
            if ($_POST['is_change_image'] == ""){
                unlink($oldImageLocation);
            }
        } catch (Exception $exception) {

        }
    }
}

function deleteProduct()
{
    paramsCheck($_GET, 'id');

    $id = $_GET['id'];

    $query = "
    DELETE FROM ThucPham
    WHERE MaThucPham = $id
    ";

    deleteResponse(api_query($query));

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
    $id = $_GET['id'];
    $query = "
    SELECT ThucPham.MoTa, ThucPham.MaThucPham, ThucPham.ThucPham, ThucPham.MauSac, ThucPham.KichThuoc, ThucPham.HinhDang, ThucPham.ViTriHinhAnh, ThucPham.NgayTao, NoiSanXuat.CongTySanXuat, NoiSanXuat.DiaChi, LTP.LoaiThucPham, NoiSanXuat.MaNoiSanXuat, LTP.MaLoaiThucPham
    FROM ThucPham
    INNER JOIN NoiSanXuat  ON NoiSanXuat.MaNoiSanXuat = ThucPham.MaNoiSanXuat
    INNER JOIN LoaiThucPham LTP on ThucPham.MaLoaiThucPham = LTP.MaLoaiThucPham
    WHERE ThucPham.MaThucPham = $id
    ";

    itemsListResponse(api_query($query));
}

function getProductByLimit()
{
    $limit = $_GET['limit'];
    $query = "
    SELECT ThucPham.MoTa, ThucPham.MaThucPham, ThucPham.ThucPham, ThucPham.MauSac, ThucPham.KichThuoc, ThucPham.HinhDang, ThucPham.ViTriHinhAnh, ThucPham.NgayTao, NoiSanXuat.CongTySanXuat, NoiSanXuat.DiaChi, LTP.LoaiThucPham, NoiSanXuat.MaNoiSanXuat, LTP.MaLoaiThucPham
    FROM ThucPham
    INNER JOIN NoiSanXuat  ON NoiSanXuat.MaNoiSanXuat = ThucPham.MaNoiSanXuat
    INNER JOIN LoaiThucPham LTP on ThucPham.MaLoaiThucPham = LTP.MaLoaiThucPham
    LIMIT $limit
    ";

    itemsListResponse(api_query($query));
}

function getAllProduct()
{
    $query = "
    SELECT ThucPham.MoTa, ThucPham.MaThucPham, ThucPham.ThucPham, ThucPham.MauSac, ThucPham.KichThuoc, ThucPham.HinhDang, ThucPham.ViTriHinhAnh, ThucPham.NgayTao, NoiSanXuat.CongTySanXuat, NoiSanXuat.DiaChi, LTP.LoaiThucPham, NoiSanXuat.MaNoiSanXuat, LTP.MaLoaiThucPham
    FROM ThucPham
    INNER JOIN NoiSanXuat  ON NoiSanXuat.MaNoiSanXuat = ThucPham.MaNoiSanXuat
    INNER JOIN LoaiThucPham LTP on ThucPham.MaLoaiThucPham = LTP.MaLoaiThucPham
    ";

    itemsListResponse(api_query($query));
}

/**
 * @throws Exception
 */
function generateRandomString($length = 10): string
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
        'desc',
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
    $desc = $_POST['desc'];
    $providerId = $_POST['provider_id'];
    $productTypeId = $_POST['product_type_id'];

    $uploadTarget = uploadImage();

    if (is_null($uploadTarget)) {
        api_error_response("Không thể tải ảnh lên hệ thống!", false);
        return;
    }

    $query = "
    INSERT INTO ThucPham (ThucPham, MauSac, KichThuoc, HinhDang, ViTriHinhAnh, NgayTao, MaNoiSanXuat, MaLoaiThucPham, MoTa)
    VALUES ('$product', '$color', '$size', '$shape', '$uploadTarget', NOW(), '$providerId', '$productTypeId', '$desc')
    ";

    insertResponse(api_query($query));

}

invokeMethodOption();