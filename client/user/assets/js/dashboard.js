(function () {
  "use strict";

  // các nút trên header
  let logoutButton = select("#dashboard-a-logout");
  let contactButton = select("#dashboard-a-contact");
  let companyButton = select("#dashboard-a-company-info");
  let adminButton = select("#dashboard-a-admin");
  let productAdmin = select("#dashboard-a-product");
  let providerButton = select("#dashboard-a-provider");
  let productTypeButton = select("#dashboard-a-product-type");
  let changePasswordButton = select("#dashboard-a-change-password");

  // thông báo
  let notification = select("#dashboard-notification");
  // thông báo của hộp thoại đổi mật khẩu
  let changePasswordNotification = select("#dashboard-password-change-message");

  // bảng dữ liệu
  let tableData = select("#dashboard-table-data");

  // nút tiến hành đổi mật khẩu
  let changePasswordSubmitButton = select("#dashboard-btn-change-password");

  /**
   * Hàm gán spinner cho thanh thông báo
   */
  const setLoading = () => {
    if (notification) {
      notification.innerHTML = `
            Đang Tải...
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            `;
    }
  };

  /**
   * Hàm tùy chỉnh thông báo
   * @param {*} content 
   */
  const setNotificationWith = (content) => {
    if (notification) {
      notification.innerHTML = content;
    }
  };


  /**
   * Hàm chỉnh thông báo thành chữ không thể tại dữ liệu
   */
  const setNotificationWithCannotLoadData = () => {
    setNotificationWith(
      `<span class="text-danger">Không thể tải dữ liệu!</span>`
    );
  };

  /**
   * Hàm để setup các bảng dữ liệu
   * @param {*} url 
   * @param {*} onPrepare 
   * @param {*} onSuccess 
   * @param {*} onError 
   * @returns 
   */
  const setupDashboard = async (url, onPrepare, onSuccess, onError) => {
    onPrepare();

    let res = await getRequest(url);

    if (res.status == false) {
      onError();
      return;
    }

    onSuccess(res);
  };

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

  // gán sự kiện nút 
  if (contactButton) {
    contactButton.addEventListener("click", (e) => {
      e.preventDefault();

      const setup = (res) => {
        let content = `
                <thead>
                    <tr>
                        <th scope="col">Mã thư</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Ngày liên hệ</th>
                    </tr>
                </thead>
                `;

        let data = ``;

        res.items.forEach((item) => {
          data += `
                        <tr id="contact-${item.MaLienHe}">
                            <th scope="row">${item.MaLienHe}</th>
                            <td>${item.hovaten}</td>
                            <td>${item.sodienthoai}</td>
                            <td>${item.email}</td>
                            <td>${item.TieuDe}</td>
                            <td>${item.NgayLienHe}</td>
                        </tr>
                    `;
        });

        tableData.innerHTML =
          content +
          `
                    <tbody>
                    ${data}
                    </tbody>
                `;

        res.items.forEach((item) => {
          select(`#contact-${item.MaLienHe}`).addEventListener("click", (e) => {
            e.preventDefault();
            select("#dashboard-modal").click();

            select("#dashboard-header-modal").innerHTML = `
                            <h5>${item.TieuDe}</h5>
                           
                        `;

            select("#dashboard-body-modal").innerHTML = `
                            <span>Họ và tên: ${item.hovaten}</span> <br>
                            <span>Số điện thoại: ${item.sodienthoai}</span> <br>
                            <span>Email: ${item.email}</span> <br>
                            <span>Ngày liên hệ: ${item.NgayLienHe}</span> <br>
                            <span>------------------------------------</span> <br>
                            <span>${item.NoiDung}</span>
                           
                        `;

            select("#dashboard-footer-modal").innerHTML = `
                    <button type="button" class="btn btn-success">Xóa Thư</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                       
                    `;


          });
        });

        setNotificationWith("LIÊN HỆ");
      };

      setupDashboard(
        "contact.php",
        setLoading,
        setup,
        setNotificationWithCannotLoadData
      );
    });
  }

  // gán sự kiện nút 
  if (companyButton) {
    companyButton.addEventListener("click", (e) => {
      e.preventDefault();

      const setup = (res) => {
        let content = `
                <thead>
                    <tr>
                        <th scope="col">Tên Công Ty</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Email</th>
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">Ngày Tạo</th>
                    </tr>
                </thead>
                `;

        let data = `
                        <tr>
                            <th scope="row">${res.TenCongTy}</th>
                            <td>${res.SoDienThoai}</td>
                            <td>${res.Email}</td>
                            <td>${res.DiaChi}</td>
                            <td>${res.NgayTao}</td>
                        </tr>
                    `;

        tableData.innerHTML =
          content +
          `
                    <tbody>
                    ${data}
                    </tbody>
                `;

        setNotificationWith("THÔNG TIN TẬP ĐOÀN");
      };

      setupDashboard(
        "companyInfo.php",
        setLoading,
        setup,
        setNotificationWithCannotLoadData
      );
    });
  }

  // gán sự kiện nút 
  if (adminButton) {
    adminButton.addEventListener("click", (e) => {
      e.preventDefault();

      const setup = (res) => {
        let content = `
                <thead>
                    <tr>
                        <th scope="col">Mã Quản Trị</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ngày Tạo</th>
                    </tr>
                </thead>
                `;

        let data = ``;

        res.items.forEach((item) => {
          data += `
                        <tr>
                            <th scope="row">${item.MaTaiKhoan}</th>
                            <td>${item.Email}</td>
                            <td>${item.NgayTao}</td>
                        </tr>
                    `;
        });

        tableData.innerHTML =
          content +
          `
                    <tbody>
                    ${data}
                    </tbody>
                `;

        setNotificationWith("QUẢN TRỊ");
      };

      setupDashboard(
        "admin.php",
        setLoading,
        setup,
        setNotificationWithCannotLoadData
      );
    });
  }

  // gán sự kiện nút 
  if (providerButton) {
    providerButton.addEventListener("click", (e) => {
      e.preventDefault();

      const setup = (res) => {
        let content = `
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Công Ty</th>
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">Ngày Tạo</th>
                    </tr>
                </thead>
                `;

        let data = ``;

        res.items.forEach((item) => {
          data += `
                        <tr>
                            <th scope="row">${item.MaNoiSanXuat}</th>
                            <td>${item.CongTySanXuat}</td>
                            <td>${item.DiaChi}</td>
                            <td>${item.NgayTao}</td>
                        </tr>
                    `;
        });

        tableData.innerHTML =
          content +
          `
                    <tbody>
                    ${data}
                    </tbody>
                `;

        setNotificationWith("NHÀ CUNG CẤP");
      };

      setupDashboard(
        "provider.php",
        setLoading,
        setup,
        setNotificationWithCannotLoadData
      );
    });
  }

  // gán sự kiện nút 
  if (productTypeButton) {
    productTypeButton.addEventListener("click", (e) => {
      e.preventDefault();

      const setup = (res) => {
        let content = `
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Loại Thực Phẩm</th>
                        <th scope="col">Ngày Tạo</th>
                    </tr>
                </thead>
                `;

        let data = ``;

        res.items.forEach((item) => {
          data += `
                        <tr>
                            <th scope="row">${item.MaLoaiThucPham}</th>
                            <td>${item.LoaiThucPham}</td>
                            <td>${item.NgayTao}</td>
                        </tr>
                    `;
        });

        tableData.innerHTML =
          content +
          `
                    <tbody>
                    ${data}
                    </tbody>
                `;

        setNotificationWith("LOẠI THỰC PHẨM");
      };

      setupDashboard(
        "productType.php",
        setLoading,
        setup,
        setNotificationWithCannotLoadData
      );
    });
  }

  
})();
