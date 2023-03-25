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
                    select("#dashboard-modal-save").addEventListener('click', (e) => {
                        e.preventDefault()

                        const editProductType = async () => {
                            let productType = select("#dashboard-product-type-name").value.trim()

                            if (!productType) {
                                select('#dashboard-sub-notification').innerHTML = "Vui lòng nhập thông tin hợp lệ!"
                                select(`#dashboard-modal-exit`).click();
                                return
                            }

                            let res = await putRequest('productType.php', {
                                id : item.MaLoaiThucPham,
                                product_type : productType
                            })

                            if (res.status == true){
                                select('#dashboard-sub-notification').innerHTML = "Sửa thành công!"
                                select(`#product-type-${item.MaLoaiThucPham}`).innerHTML = `
                                <tr id="#product-type-${item.MaLoaiThucPham}" >
                                    <th scope="row">${item.MaLoaiThucPham}</th>
                                    <td>${productType}</td>
                                    <td>${item.NgayTao}</td>
                                </tr>
                                `;
                    
                                item.LoaiThucPham = productType
                                
                            }
                            else{
                                select('#dashboard-sub-notification').innerHTML = res.message
                            }
                            select(`#dashboard-modal-exit`).click();


                        }

                        editProductType()



                    })

                    select("#dashboard-modal-delete").addEventListener("click", (e) => {
                        const deleteProductType = async () => {
                            if (confirm("Bạn có muốn xóa?")) {
                            
                                let id = item.MaLoaiThucPham
                    
                                let res = await deleteRequest(`productType.php?id=${id}`)
                    
                                if (res.status == true){
                                    select('#dashboard-sub-notification').innerHTML = `Xóa thành công! ID: ${id}`
                                    select(`#product-type-${item.MaLoaiThucPham}`).remove();
                                }
                                else{
                                    select('#dashboard-sub-notification').innerHTML = res.message
                                }
                                select(`#dashboard-modal-exit`).click();
                            }
                        }

                        deleteProductType()
                    });


                })
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete((dashboard) => {
            setNotificationWith("LOẠI THỰC PHẨM")

            setTableTool(
                `
                <button id="add-new-product-type" type="button" class="btn btn-success"><i class='bx bx-plus-circle'></i></button>
                `
            )

            const addNewProductType = async (dashboard) => {
                let productType = select("#dashboard-product-type").value.trim()

                if (!productType) {
                    select("#add-admin-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                    return
                }

                let res = await postRequest('productType.php', {
                    product_type: productType
                })

                if (res.status == true) {
                    select('#dashboard-sub-notification').innerHTML = res.message
                    dashboard._render()

                }
                else {
                    select('#dashboard-sub-notification').innerHTML = "Lỗi không xác định"
                }
                select(`#dashboard-modal-exit`).click();

            }

            new ItemInfoDialog()
                .setItemElement(select("#add-new-product-type"))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thêm loại thực phẩm</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                    <form>
                        <div class="mb-3">
                        <label for="dashboard-product-type" class="form-label">Loại thực phẩm</label>
                        <input value="" type="text" class="form-control" id="dashboard-product-type">
                        </div>
                        <div class="mb-3" id="add-admin-notification">
                        
                        </div>
                    </form>
                    
                    `
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-add-new-product-type" type="button" class="btn btn-success">Thêm</button>
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
                })
                .setCustomEvent((item) => {
                    select("#dashboard-add-new-product-type").addEventListener("click", (e) => {
                        addNewProductType(dashboard)
                    });
                })
                .build()



        })
        .build()


})();