<?php
session_start();
const LOGIN_EMAIL_SESSION_NAME = "login_email";
function isAvailableSession(): bool
{
    return isset($_SESSION[LOGIN_EMAIL_SESSION_NAME]);
}

function setSession($loginEmail){
    $_SESSION[LOGIN_EMAIL_SESSION_NAME] = $loginEmail;
}

function destroySession(){
    session_destroy();
}