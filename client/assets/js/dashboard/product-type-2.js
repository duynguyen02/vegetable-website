(function () {
    "use strict";

    const productTypeButton = select("#dashboard-a-product-type");

    const productTypeDialog = new Dialog() 
        .setModalButton(btnModal)
        .setHeaderModal(modalHeader)
        .setBodyModal(modalBody)
        .setFooterModal(modalFooter)
        .setHeaderModalHTML((item) => {
            return `
            <h5>Thông tin sản phẩm</h5>
            `
        })
        .setBodyModalHTML((item) => {
            return `
            <form>
            <div class="mb-3">
            <label for="dashboard-product-type-name" class="form-label">Loại thực phẩm</label>
            <input value="${item === undefined ? "" : item.LoaiThucPham}" type="text" class="form-control" id="dashboard-product-type-name">
            </div>
            <div class="mb-3" id="add-admin-notification">
            </form>
            `
        })
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


    const productTypeDialogAddDialog = Object.assign(Object.create(Object.getPrototypeOf(productTypeDialog)), productTypeDialog)
    productTypeDialogAddDialog
    .setFooterModalHTML((item) => {
        return `
        <button id="dashboard-add-new-product-type" type="button" class="btn btn-success">Thêm</button>
        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>  
                `
    })
    .setCustomEvent((item) => {

        const addNewProductType = async () => {
            let productType = select("#dashboard-product-type-name").value.trim()

            if (!productType) {
                select("#add-admin-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                return
            }

            let res = await postRequest('productType.php', {
                product_type: productType
            })

            if (res.status == true) {
                select('#dashboard-sub-notification').innerHTML = res.message
                renderDashboard()

            }
            else {
                select('#dashboard-sub-notification').innerHTML = "Lỗi không xác định"
            }
            select(`#dashboard-modal-exit`).click();

        }
        
        select("#dashboard-add-new-product-type").addEventListener("click", (e) => {
            addNewProductType()
        });

    })



    const productTypeDashboard = new TableData()
        .setTableData(tableData)
        .setTableHeaderRander(new RowRender((item) => {
            return `
            <tr>
                <th scope="col">#</th>
                <th scope="col">Loại thực phẩm</th>
                <th scope="col">Ngày tạo</th>
             </tr>
                            `
        }))
        .setRowRender(new RowRender((item) => {
            return `
            <tr id="product-type-${item.MaLoaiThucPham}" >
            <th scope="row">${item.MaLoaiThucPham}</th>
            <td>${item.LoaiThucPham}</td>
            <td>${item.NgayTao}</td>
        </tr>
            `
        }))
        .setOnIemEventListener((item) => {

            let itemButton = select(`#product-type-${item.MaLoaiThucPham}`);

            itemButton.addEventListener('click', (e) => {
                e.preventDefault()
                productTypeDialog.render(item)
            })

        })
        .setTableTool(tableTool)
        .setTableToolHTML(
            `
            <div class="input-group">
                <div class="form-outline">
                    <input placeholder type="search" id="product-type-search" class="form-control" />
                </div>

                <button type="button" id="provider-add-btn" class="mx-1 btn btn-light"><i class='bx bx-plus-circle'></i></button>

            </div>
            `
        )
        .setOnCustomTableDataEvent((dashboard, items) => {
            let contactSearch = select("#product-type-search")
            contactSearch.addEventListener('input', (e) => {
                let tempItems = items.filter((item) => {
                    let value = contactSearch.value
                    return (
                        item.LoaiThucPham.includes(value)
                    )
                })
                dashboard.tableRender(tempItems)
            })

            select("#provider-add-btn").addEventListener('click', (e) => {
                productTypeDialogAddDialog.render(undefined)
            })



        })





    const renderDashboard = async () => {
        setLoading()

        let res = await getRequest('productType.php')

        if (res.status == true) {
            productTypeDashboard.render(res.items)
        }
        else {
            setNotificationWithCannotLoadData()
        }

        setNotificationWith("NHÀ CUNG CẤP")

    }

    productTypeButton.addEventListener('click', (e) => {
        e.preventDefault()
        renderDashboard()
    })


})()