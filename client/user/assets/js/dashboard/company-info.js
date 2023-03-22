(function () {
    "use strict";

    new Dashboard()
        .setUrl("companyInfo.php")
        .addButton(companyButton)
        .setTableHeader(
            `
             <tr>
                <th scope="col">Tên Công Ty</th>
                <th scope="col">SĐT</th>
                <th scope="col">Email</th>
                <th scope="col">Địa Chỉ</th>
                <th scope="col">Ngày Tạo</th>
             </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="company-${item.SoDienThoai}" >
                <th scope="row">${item.TenCongTy}</th>
                <td>${item.SoDienThoai}</td>
                <td>${item.Email}</td>
                <td>${item.DiaChi}</td>
                <td>${item.NgayTao}</td>
            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#company-${item.SoDienThoai}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thông tin công ty</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                           TODO
                    `
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
                })
                .setCustomEvent((item) => {

                })
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("THÔNG TIN CÔNG TY")
        })
        .build()


})();