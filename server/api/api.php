<?php
require __DIR__."/../inc/bootstrap.php";

const ERROR_RESPONSE = 404;
const SUCCESS_RESPONSE = 200;
function api_error_response($message){
    api_msg_response($message, ERROR_RESPONSE);
}

function api_success_response($message){
    api_msg_response($message, SUCCESS_RESPONSE);
}

function api_msg_response($message, int $statusCode){
    $response['message'] = $message;
    api_response($response, $statusCode);

}
function api_response(array $response, int $statusCode){
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($statusCode);
    echo json_encode($response);
}

function api_checking_connection($connection){
    if(!$connection){
        api_error_response("Không thể kết nối đến cơ sở dữ liệu!");
        die();
    }
}

function api_query($query){
    global $connection;
    return mysqli_query($connection, $query);
}

$connection = getConnection();
api_checking_connection($connection);







