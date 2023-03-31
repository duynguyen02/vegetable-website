<?php

/**
 * hàm liên kết php với cơ sở dữ liệu
 */
function getConnection(){
    return mysqli_connect(
        DB_HOST,
        DB_USERNAME,
        DB_PASSWORD,
        DB_DATABASE_NAME
    );
}

