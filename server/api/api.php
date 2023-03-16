<?php
require __DIR__."/../inc/bootstrap.php";

const ERROR_RESPONSE = 404;
const SUCCESS_RESPONSE = 200;
function api_error_response($message, bool $status = null){
    api_msg_response($message, ERROR_RESPONSE, $status);
}

function api_success_response($message, bool $status = null){
    api_msg_response($message, SUCCESS_RESPONSE, $status);
}

function api_msg_response($message, int $statusCode, bool $status = null){
    $response['message'] = $message;
    if(!is_null($status)){
        $response['status'] = $status;
    }
    api_response($response, $statusCode);
}


/**
 * @param array $response
 * @param int $statusCode
 * @return void
 */
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
    try {
        return mysqli_query($connection, $query);
    }catch (mysqli_sql_exception $exception){
        return null;
    }
}

$connection = getConnection();
api_checking_connection($connection);







