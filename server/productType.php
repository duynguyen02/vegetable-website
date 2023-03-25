<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";
require_once __DIR__ . "/common.php";

function invokeMethodOption()
{
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method == "GET") {
        getProductTypesInformation();
        die();
    }

    validate();
    switch ($method) {
        case "POST" :
        {
            addProductType();
            break;
        }
        case "PUT" :
        {
            editProductType();
            break;
        }
        case "DELETE" :
        {
            deleteProductType();
            break;
        }
        default :
        {
            api_error_response("Phương thức không xác định!", false);
        }
    }
}

function deleteProductType()
{
    paramsCheck(
        $_GET,
        'id'
    );

    $id = $_GET['id'];

    $query = "
    DELETE
    FROM LoaiThucPham
    WHERE MaLoaiThucPham = '$id' 
    ";

    deleteResponse(api_query($query));

}

function editProductType()
{
    parse_str(file_get_contents('php://input'), $_PUT);
    paramsCheck(
        $_PUT,
        'id', 'product_type'
    );

    $id = $_PUT['id'];
    $productType = $_PUT['product_type'];

    $query = "
    UPDATE LoaiThucPham 
    SET LoaiThucPham = '$productType'
    WHERE MaLoaiThucPham = '$id';
    ";

    editResponse(api_query($query));


}

function addProductType()
{
    paramsCheck(
        $_POST,
        'product_type'
    );

    $productType = $_POST['product_type'];

    $query = "
    INSERT INTO LoaiThucPham (LoaiThucPham, NgayTao)
    VALUES ('$productType', NOW())
    ";

    insertResponse(api_query($query));


}

function getProductTypesInformation()
{
    $query = "SELECT * FROM LoaiThucPham";
    $result = api_query($query);
    itemsListResponse($result);

}

invokeMethodOption();

