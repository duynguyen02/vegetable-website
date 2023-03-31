<?php
session_start();
const LOGIN_EMAIL_SESSION_NAME = "login_email";

/**
 * kiểm tra xem session có được gán dữ liệu chưa
 * @return bool
 */
function isAvailableSession(): bool
{
    return isset($_SESSION[LOGIN_EMAIL_SESSION_NAME]);
}

/**
 * gán dữ liệu đăng nhập cho session
 * @param $loginEmail
 * @return void
 */
function setSession($loginEmail){
    $_SESSION[LOGIN_EMAIL_SESSION_NAME] = $loginEmail;
}

/**
 * lấy dữ liệu từ session
 * @return mixed
 */
function getSession(){
    return $_SESSION[LOGIN_EMAIL_SESSION_NAME];
}

/**
 * xóa session
 * @return void
 */
function destroySession(){
    session_destroy();
}