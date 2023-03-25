const contactDashboardSetup = (contactButton, tableData, notification) => {
    contactButton.addEventListener("click", (e) => {
      e.preventDefault();
  
      /**
       * lập bảng
       * @param {*} res
       */
      const setup = (res) => {
        tableData.innerHTML = "";
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
                <tbody>
                `;
        tableData.insertAdjacentHTML("beforeend", content);
  
        let data = ``;
  
        res.items.forEach((item) => {
          data = `
                        <tr id="contact-${item.MaLienHe}">
                            <th scope="row">${item.MaLienHe}</th>
                            <td>${item.hovaten}</td>
                            <td>${item.sodienthoai}</td>
                            <td>${item.email}</td>
                            <td>${item.TieuDe}</td>
                            <td>${item.NgayLienHe}</td>
                        </tr>
                    `;
          tableData.insertAdjacentHTML("beforeend", data);
  
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
                    <button id="dashboard-delete-message" type="button" class="btn btn-success">Xóa Thư</button>
                    <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                       
                    `;
  
            select("#dashboard-delete-message").addEventListener("click", (e) => {
              if (confirm("Bạn có muốn xóa tin nhắn?")) {
                // TODO: request xóa thư
                select(`#contact-${item.MaLienHe}`).remove();
                select(`#dashboard-modal-exit`).click();
              }
            });
          });
        });
  
        tableData.insertAdjacentHTML("beforeend", `</tbody>`);
  
        setNotificationWith(notification ,"LIÊN HỆ");
      };
  
      setupDashboard(
        "contact.php",
        ()=>{
          setLoading(notification);
        },
        setup,
        ()=>{
          setNotificationWithCannotLoadData(notification);
        }
      );
      
    });
  };
  