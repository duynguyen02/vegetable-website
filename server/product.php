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
            // kiểm tra đối số clent truyền lên có hợp lệ
            paramsCheck(
                $_GET,
                'method'
            );

            if ($_GET['method'] == 'add') { // nếu đối số method là add thì thực hiện hàm addProduct
                addProduct();
            } else if ($_GET['method'] == 'edit') { // nếu đối số method là edit thì thực hiện hàm editProduct
                editProduct();
            } else { // nếu đối số method không hợp lệ thì trả phản hồi lỗi và kết thúc phiên làm việc
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
 * tải ảnh lên máy chủ
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
        $fileExtension != "jpg" && $fileExtension != "jpeg" && $fileExtension != "webp" && $fileExtension != "png"
    ) {
        $fileExtensionCheck = false;
    }

    // nếu không phải là ảnh hoặc đuôi ảnh không hợp lệ
    // thì trả về null
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

    // nếu tải ảnh không thành công thì trả về null
    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $uploadTarget)) {
        return null;
    }

    // tải ảnh lên thành công thì trả về địa chỉ hình ảnh trên máy chủ
    return $uploadTarget;

}

/**
 * thay đổi thông tin sản phẩm  
 * @return void
 * @throws Exception
 */
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

    // tạo một biến địa chỉ hình ảnh tạm thời
    // nếu quản trị thay đổi hình ảnh
    $uploadTarget = null;

    // nếu đối số is_change_image là true thì 
    // quản trị muốn thay đổi hình ảnh
    if ($_POST['is_change_image'] === "true") {

        // kiểm tra đối số có hợp lệ
        paramsCheck(
            $_FILES,
            'image'
        );

        // tải hình ảnh lên
        $uploadTarget = uploadImage();

        // nếu $uploadTarget vẫn giá trị null thì ảnh 
        // không thể tải lên và kết thúc phiên làm việc
        if (is_null($uploadTarget)) {
            api_error_response("Không thể tải ảnh lên hệ thống!", false);
            return;
        }
    }

    // lấy id của sản phẩm
    $id = $_POST['id'];

    // xây dựng truy vấn để lấy đường dẫn ảnh cũ
    $oldImageQuery = "
    SELECT ViTriHinhAnh FROM ThucPham WHERE MaThucPham = $id
    ";  

    // truy vấn lấy địa chỉ ảnh cũ
    $oldImageLocation = mysqli_fetch_assoc(api_query($oldImageQuery))['ViTriHinhAnh'];

    // nếu is_change_image là true thì đường dẫn ảnh của sản phẩm là uploadTarget 
    // còn không thì là oldImageLocation
    $uploadTargetFinal = $_POST['is_change_image'] === "true" ? $uploadTarget : $oldImageLocation;

    // lấy các giá trị từ các đối số
    $product = $_POST['product'];
    $color = $_POST['color'];
    $size = $_POST['size'];
    $shape = $_POST['shape'];
    $desc = $_POST['desc'];
    $providerId = $_POST['provider_id'];
    $productTypeId = $_POST['product_type_id'];

    // xây dựng truy vấn thay đổi thông tin sản phẩm
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

    // nếu truy vấn thành công
    if (editResponse(api_query($query))) {
        // xóa ảnh cũ nếu đối số is_change_image có giá trị là true
        if ($_POST['is_change_image'] === "true"){
            try {
                // nếu ảnh có tồn tại thì xóa
                if (file_exists($oldImageLocation)) {
                    unlink($oldImageLocation);
                }
            } catch (Exception $exception) {
    
            }
        }
    }
}

/**
 * xóa sản phẩm
 * @return void
 */
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

/**
 * lấy thông tin sản phẩm
 * @return void
 */
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

/**
 * lấy thông tin sản phẩm thông qua id
 * @return void
 */
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

/**
 * lấy số thông tin sản phẩm giới hạn
 * @return void
 */
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

/**
 * lấy thông tin toàn bộ sản phẩm
 * @return void
 */
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
 * khởi tạo một chuỗi ngẫu nhiên
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

/**
 * thêm sản phẩm 
 * @return void
 * @throws Exception
 */
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