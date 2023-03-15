<?php
require __DIR__."/api/api.php";
require __DIR__."/session/session.php";

function tryToLogout(){
    if(isAvailableSession()){
        destroySession();
        api_success_response("Đăng xuất thành công!");
    }
    else{
        api_error_response("Không thể đăng xuất do chưa đăng nhập!");
    }
}

tryToLogout();