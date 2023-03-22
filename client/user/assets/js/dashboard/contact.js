
(function () {
    "use strict";

    new Dashboard()
        .setUrl("contact.php")
        .addButton(contactButton)
        .setTableHeader(
            `
             <tr>
                  <th scope="col">Mã thư</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">SĐT</th>
                  <th scope="col">Email</th>
                  <th scope="col">Tiêu đề</th>
                  <th scope="col">Ngày liên hệ</th>
            </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="contact-${item.MaLienHe}">
              <th scope="row">${item.MaLienHe}</th>
              <td>${item.hovaten}</td>
              <td>${item.sodienthoai}</td>
              <td>${item.email}</td>
              <td>${item.TieuDe}</td>
              <td>${item.NgayLienHe}</td>
            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#contact-${item.MaLienHe}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>${item.TieuDe}</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                            <span>Họ và tên: ${item.hovaten}</span> <br>
                            <span>Số điện thoại: ${item.sodienthoai}</span> <br>
                            <span>Email: ${item.email}</span> <br>
                            <span>Ngày liên hệ: ${item.NgayLienHe}</span> <br>
                            <span>------------------------------------</span> <br>
                            <span>${item.NoiDung}</span>
                    `
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-delete-message" type="button" class="btn btn-success">Xóa Thư</button>
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
                })
                .setCustomEvent((item) => {
                    select("#dashboard-delete-message").addEventListener("click", (e) => {
                        if (confirm("Bạn có muốn xóa tin nhắn?")) {
                            // TODO: request xóa thư
                            select(`#contact-${item.MaLienHe}`).remove();
                            select(`#dashboard-modal-exit`).click();
                        }
                    });
                })
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("LIÊN HỆ")
        })
        .build()


})();