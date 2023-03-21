<?php
require_once __DIR__ . "/api/api.php";
require_once __DIR__ . "/validation.php";

if (isValidSession()){
    api_success_response("Hợp lệ!", true);
}
else{
    api_success_response("Không hợp lệ!", false);
}
