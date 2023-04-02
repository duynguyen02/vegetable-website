(function () {
  "use strict";

  const tryLogin = async () => {

    // lấy dữ liệu từ tag email và mật khẩu
    let email = select("#login-input-email").value.trim();
    let password = select("#login-input-password").value;

    // chọn tag thông báo
    let errorField = select(".login-p-error");

    // nếu email nhập vào không hợp lệ thì báo lỗi
    if (!validateEmail(email)) {
      errorField.innerHTML = "Vui lòng nhập Email hợp lệ!";
      return;
    }

    // yêu cầu đăng nhập
    let res = await postRequest("login.php", {
      email: email,
      password: password,
    });

    // nếu đăng nhập thành công chuyển hướng về giao diện quản lý
    if(res.status === true){   
        window.location.href = "./dashboard.html";
    }
    else{ // thông báo lỗi
        errorField.innerHTML = res.message;
    }

  };

  // chọn nút đăng nhập
  let loginButton = select("#login-btn-login");

  if (loginButton) {
    // gán sự kiện cho nút đăng nhập
    on("click", "#login-btn-login", (e) => {
      e.preventDefault();

      tryLogin().then(r => {});
    });
  }
})();
