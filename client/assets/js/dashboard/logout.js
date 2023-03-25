(function () {
    "use strict";
    /**
    * hàm đăng xuất 
    */
    const tryLogout = async () => {
        let res = await getRequest("logout.php");

        if (res.status == true) {
            window.location.href = "./login.html";
        } else {
            location.reload();
        }
    };

    /**
 * hàm đổi mật khẩu
 */
    const changePassword = async () => {
        let oldPassword = select("#dashboard-old-password").value;
        let newPassword = select("#dashboard-new-password").value;

        if (!oldPassword || !newPassword) {
            changePasswordNotification.innerHTML = "Vui lòng nhập đầy đủ!";
            return
        }

        let res = await putRequest("admin.php", {
            new_password: newPassword,
            current_password: oldPassword,
        });

        if (res) {
            changePasswordNotification.innerHTML = res.message;
        } else {
            changePasswordNotification.innerHTML = "Lỗi không xác định!";
        }

        select("#dashboard-old-password").value = "";
        select("#dashboard-new-password").value = "";
    };

    // gán sự kiện nút 
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            tryLogout();
        });
    }

    // gán sự kiện nút 
    if (changePasswordSubmitButton) {
        changePasswordSubmitButton.addEventListener("click", (e) => {
            e.preventDefault();
            changePassword();
        });
    }

})()