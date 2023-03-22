(function () {
    "use strict";

    new Dashboard()
        .setUrl("productType.php")
        .addButton(productTypeButton)
        .setTableHeader(
            `
             <tr>
                <th scope="col">#</th>
                <th scope="col">Loại thực phẩm</th>
                <th scope="col">Ngày tạo</th>
             </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="product-type-${item.MaLoaiThucPham}" >
                <th scope="row">${item.MaLoaiThucPham}</th>
                <td>${item.LoaiThucPham}</td>
                <td>${item.NgayTao}</td>
            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#product-type-${item.MaLoaiThucPham}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thông tin loại thực phẩm</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                        <form>
                        <div class="mb-3">
                        <label for="dashboard-product-type-name" class="form-label">Loại thực phẩm</label>
                        <input value="${item.LoaiThucPham}" type="text" class="form-control" id="dashboard-product-type-name">
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
                        
                        

                    })
                })
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("LOẠI THỰC PHẨM") 
        })
        .build()


})();