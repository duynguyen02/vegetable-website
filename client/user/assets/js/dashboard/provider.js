(function () {
    "use strict";

    new Dashboard()
        .setUrl("provider.php")
        .addButton(providerButton   )
        .setTableHeader(
            `
             <tr>
                <th scope="col">#</th>
                <th scope="col">Công ty sản xuất</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Ngày tạo</th>
             </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="provider-${item.MaNoiSanXuat}" >
                <th scope="row">${item.MaNoiSanXuat}</th>
                <td>${item.CongTySanXuat}</td>
                <td>${item.DiaChi}</td>
                <td>${item.NgayTao}</td>
            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#provider-${item.MaNoiSanXuat}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thông tin nhà cung cấp</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                        <form>
                        <div class="mb-3">
                        <label for="dashboard-provider-name" class="form-label">Tên nhà cung cấp</label>
                        <input value="${item.CongTySanXuat}" type="text" class="form-control" id="dashboard-provider-name">
                        </div>
                        <div class="mb-3">
                        <label for="dashboard-provider-address" class="form-label">Địa chỉ</label>
                        <input value="${item.DiaChi}" type="text" class="form-control" id="dashboard-provider-address">
                        </div>
                    </form>
                    `
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-modal-save" type="button" class="btn btn-success" data-bs-dismiss="modal">Lưu</button>
                        <button id="dashboard-modal-delete" type="button" class="btn btn-warning" data-bs-dismiss="modal">Xóa</button>
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
                })
                .setCustomEvent((item) => {
                    select("#dashboard-modal-save").addEventListener('click', (e)=>{
                        e.preventDefault()
                        
                        let providerName = select("#dashboard-provider-name").value
                        

                    })
                })
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("NƠI SẢN XUẤT") 
        })
        .build()


})();