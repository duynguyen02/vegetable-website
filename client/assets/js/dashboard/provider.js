(function () {
    "use strict";

    new Dashboard()
        .setUrl("provider.php")
        .addButton(providerButton)
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
                    `;
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
                    `;
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-modal-save" type="button" class="btn btn-success" data-bs-dismiss="modal">Lưu</button>
                        <button id="dashboard-modal-delete" type="button" class="btn btn-warning" data-bs-dismiss="modal">Xóa</button>
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `;
                })
                .setCustomEvent((item) => {
                    // thiết lập nút lưu
                    select("#dashboard-modal-save").addEventListener("click", (e) => {
                        e.preventDefault();

                        let providerName = select("#dashboard-provider-name").value;
                        let providerAddress = select("#dashboard-provider-address").value;

                        const editProvider = async () => {
                            let res = await putRequest("provider.php", {
                                id: item.MaNoiSanXuat,
                                provider_name: providerName,
                                address: providerAddress,
                            });

                            if (res.status == true) {
                                select("#dashboard-sub-notification").innerHTML =
                                    "Sửa thành công!";

                                select(`#provider-${item.MaNoiSanXuat}`).innerHTML = `
                                <tr id="provider-${item.MaNoiSanXuat}" >
                                <th scope="row">${item.MaNoiSanXuat}</th>
                                <td>${providerName}</td>
                                <td>${providerAddress}</td>
                                <td>${item.NgayTao}</td>
                                </tr>
                                `;

                                item.CongTySanXuat = providerName;
                                item.DiaChi = providerAddress;
                            } else {
                                select("#dashboard-sub-notification").innerHTML = res.message;
                            }
                            select(`#dashboard-modal-exit`).click();
                        };

                        editProvider();
                    });


                    // thiết lập nút xóa
                    select("#dashboard-modal-delete").addEventListener("click", (e) => {
                        e.preventDefault();

                        const deleteProvider = async () => {
                            if (confirm("Bạn có muốn xóa?")) {

                                let id = item.MaNoiSanXuat

                                let res = await deleteRequest(`provider.php?id=${id}`)

                                if (res.status == true) {
                                    select('#dashboard-sub-notification').innerHTML = `Xóa thành công! ID: ${id}`
                                    select(`#provider-${item.MaNoiSanXuat}`).remove();
                                }
                                else {
                                    select('#dashboard-sub-notification').innerHTML = res.message
                                }
                                select(`#dashboard-modal-exit`).click();
                            }
                        }

                        deleteProvider()

                    });

                })
                .build();
        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete((dashboard) => {
            setNotificationWith("NƠI SẢN XUẤT");
            setTableTool(`
            <button id="add-new-provider" type="button" class="btn btn-success"><i class='bx bx-plus-circle'></i></button>
            `);


            const addNewProvider = async () => {

                let providerName = select("#dashboard-provider-name").value.trim()
                let address = select("#dashboard-provider-address").value.trim()

                if (!providerName || !address){
                    select("#add-admin-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                    return
                }

                let res = await postRequest('provider.php', {
                    provider_name : providerName,
                    address : address
                })

                if (res.status == true){
                    select('#dashboard-sub-notification').innerHTML = res.message
                    dashboard._render()

                }
                else{
                    select('#dashboard-sub-notification').innerHTML = "Lỗi không xác định"
                }
                select(`#dashboard-modal-exit`).click();

            }


            new ItemInfoDialog()
                .setItemElement(select("#add-new-provider"))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                    <h5>Thêm nguồn cung cấp</h5>
                `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                <form>
                    <div class="mb-3">
                    <label for="dashboard-provider-name" class="form-label">Công ty sản xuất</label>
                    <input value="" type="text" class="form-control" id="dashboard-provider-name">
                    </div>
                    <div class="mb-3">
                    <label for="dashboard-provider-address" class="form-label">Địa chỉ</label>
                    <input value="" type="text" class="form-control" id="dashboard-provider-address">
                    </div>
                    <div class="mb-3" id="add-provider-notification">
                    
                    </div>
                </form>
                
                `
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                    <button id="dashboard-add-new-provider" type="button" class="btn btn-success">Thêm</button>
                    <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                `
                })
                .setCustomEvent((item) => {
                    select("#dashboard-add-new-provider").addEventListener("click", (e) => {
                        
                        addNewProvider()
                        
                    });
                })
                .build()




        })
        .build();
})();
