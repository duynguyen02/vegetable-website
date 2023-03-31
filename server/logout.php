<?php
require_once __DIR__."/api/api.php";
require_once __DIR__."/session/session.php";

/**
 * Đăng xuất quản trị viên khỏi thiết bị.
 * @return void
 */
function tryToLogout(){
    if(isAvailableSession()){ // nếu session hợp lệ
        // xóa session
        destroySession();
        // trả về phản hồi thành công
        api_success_response("Đăng xuất thành công!", true);
    }
    else{ // nếu session không hợp lệ thì trả phản hồi lỗi
        api_error_response("Không thể đăng xuất do chưa đăng nhập!", false);
    }
}

tryToLogout();