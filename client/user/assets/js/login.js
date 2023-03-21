(function () {
  "use strict";

  const tryLogin = async () => {
    let email = select("#login-input-email").value.trim();
    let password = select("#login-input-password").value;

    let errorField = select(".login-p-error");

    if (!validateEmail(email)) {
      errorField.innerHTML = "Vui lòng nhập Email hợp lệ!";
      return;
    }

    let res = await postRequest("login.php", {
      email: email,
      password: password,
    });

    if(res.status === true){
        window.location.href = "./dashboard.html";
    }
    else{
        errorField.innerHTML = res.message;
    }

  };

  let loginButton = select("#login-btn-login");

  if (loginButton) {
    on("click", "#login-btn-login", (e) => {
      e.preventDefault();

      tryLogin().then(r => {});
    });
  }
})();
