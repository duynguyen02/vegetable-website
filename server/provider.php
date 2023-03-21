<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";
require_once __DIR__ . "/common.php";

function invokeMethodOption()
{
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method == "GET") {
        getProvidersInformation();
        die();
    }

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

function deleteProvider()
{
    paramsCheck(
        $_GET,
        'id'
    );

    $id = $_GET['id'];

    $query = "
    DELETE
    FROM NoiSanXuat
    WHERE MaNoiSanXuat = $id;
    ";

    deleteResponse(api_query($query));

}

function editProvider()
{
    paramsCheck(
        $_POST,
        'id', 'provider_name', 'address'
    );

    $id = $_POST['id'];
    $providerName = $_POST['provider_name'];
    $address = $_POST['address'];

    $query = "
    UPDATE NoiSanXuat
    SET CongTySanXuat = '$providerName', DiaChi = '$address'
    WHERE MaNoiSanXuat = '$id'
    ";

    editResponse(api_query($query));


}

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