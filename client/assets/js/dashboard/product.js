(function () {
    "use strict";
    let productTypes = ``
    const getProductTypes = async () => {
        let res = await getRequest('productType.php')
        if (res.status === true){
            res.items.forEach((item) => {
                productTypes += `<option value="${item.MaLoaiThucPham}">${item.LoaiThucPham}</option>`
            })
        }
    }

    getProductTypes()




    // const getProviders = async () => {
    //     let res = await getRequest('provider.php')
    //     if (res.status === true){
    //         return res.items
    //     }
    //     return []
    // }
    // let providers = ``

    // getProviders().forEach((item) => {
        
    // })



    new Dashboard()
        .setUrl("product.php")
        .addButton(productButton)
        .setTableHeader(
            `
             <tr>
                <th scope="col">#</th>
                <th scope="col">Thực Phẩm</th>
                <th scope="col">Màu Sắc</th>
                <th scope="col">Kích Thước</th>
                <th scope="col">Hình Dáng</th>
                <th scope="col">Hình Ảnh</th>
                <th scope="col">Ngày Tạo</th>
                <th scope="col">Công Ty Sản Xuất</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Loại Thực Phẩm</th>
             </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="product-${item.MaThucPham}" >
                <th scope="row">${item.MaThucPham}</th>
                <td>${item.ThucPham}</td>
                <td>${item.MauSac}</td>
                <td>${item.KichThuoc}</td>
                <td>${item.HinhDang}</td>
                <td>${item.ViTriHinhAnh}</td>
                <td>${item.NgayTao}</td>
                <td>${item.CongTySanXuat}</td>
                <td>${item.DiaChi}</td>
                <td>${item.LoaiThucPham}</td>

            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#product-${item.MaThucPham}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thông tin sản phẩm</h5>
                    `;
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                    <form>
                    <div class="mb-3">
                    <label for="dashboard-product-name" class="form-label">Tên Sản Phẩm</label>
                    <input value="${item.ThucPham}" type="text" class="form-control" id="dashboard-product-name">
                    </div>
                    <div class="mb-3">
                    <label for="dashboard-product-color" class="form-label">Màu Sắc</label>
                    <input value="${item.MauSac}" type="text" class="form-control" id="dashboard-product-color">
                    </div>
                    <div class="mb-3">
                    <label for="dashboard-product-size" class="form-label">Kích Thước</label>
                    <input value="${item.KichThuoc}" type="text" class="form-control" id="dashboard-product-size">
                    </div>
                    <div class="mb-3">
                    <label for="dashboard-product-shape" class="form-label">Hình Dạng</label>
                    <input value="${item.HinhDang}" type="text" class="form-control" id="dashboard-product-shape">
                    </div>
                    <div class="mb-3">
                    <label for="dashboard-product-day" class="form-label">Ngày Tạo</label>
                    <input value="${item.NgayTao}" type="text" class="form-control" id="dashboard-product-day">
                    </div>
                    <div class="mb-3">
                    <label for="formFileSm" class="form-label">Hình Ảnh</label>
                    <a href="https://google.com" target="_blank" >Xem Ảnh</a>
                    <input class="form-control form-control-sm" id="formFileSm" type="file">
                    </div>
                    <div class="mb-3">
                    <label for="" class="form-label">Loại Thực Phẩm</label>
                    <select class="form-select">
                    ${productTypes}
                    </select>
                    </div>
                    <div class="mb-3">
                    <label for="" class="form-label">Nguồn Cung</label>
                    <select class="form-select">
                    ${productTypes}
                    </select>
                    </div>
                   
                </form>
                    `;
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-modal-save" type="button" class="btn btn-success" data-bs-dismiss="modal">Lưu</button>
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `;
                })
                .setCustomEvent((item) => {






                })
                .build();
        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("THỰC PHẨM");
            setTableTool('')
        })
        .build();
})();
