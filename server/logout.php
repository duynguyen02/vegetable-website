<?php
require_once __DIR__."/api/api.php";
require_once __DIR__."/session/session.php";

/**
 * Đăng xuất quản trị viên khỏi thiết bị.
 * @return void
 */
function tryToLogout(){
    if(isAvailableSession()){
        destroySession();
        api_success_response("Đăng xuất thành công!", true);
    }
    else{
        api_error_response("Không thể đăng xuất do chưa đăng nhập!", false);
    }
}

tryToLogout();