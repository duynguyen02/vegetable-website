(function () {
    "use strict";

    const productButton = select("#dashboard-a-product");

    let productTypes = ``
    const getProductTypes = async () => {
        productTypes = ``
        let res = await getRequest('productType.php')
        if (res.status === true){
            res.items.forEach((item) => {
                productTypes += `<option value="${item.MaLoaiThucPham}">${item.LoaiThucPham}</option>`
            })
        }
    }

    const productDialog = new Dialog() 
        .setModalButton(btnModal)
        .setHeaderModal(modalHeader)
        .setBodyModal(modalBody)
        .setFooterModal(modalFooter)
        .setHeaderModalHTML((item) => {
            return `
            <h5>Thông tin loại thực phẩm</h5>
            `
        })
        .setBodyModalHTML((item) => {
            return `
            <form>
            <div class="mb-3">
            <label for="dashboard-product-name" class="form-label">Tên Sản Phẩm</label>
            <input value="${item === undefined ? "" : item.ThucPham}" type="text" class="form-control" id="dashboard-product-name">
            </div>
            <div class="mb-3">
            <label for="dashboard-product-color" class="form-label">Màu Sắc</label>
            <input value="${item === undefined ? "" : item.MauSac}" type="text" class="form-control" id="dashboard-product-color">
            </div>
            <div class="mb-3">
            <label for="dashboard-product-size" class="form-label">Kích Thước</label>
            <input value="${item === undefined ? "" : item.KichThuoc}" type="text" class="form-control" id="dashboard-product-size">
            </div>
            <div class="mb-3">
            <label for="dashboard-product-shape" class="form-label">Hình Dạng</label>
            <input value="${item === undefined ? "" : item.HinhDang}" type="text" class="form-control" id="dashboard-product-shape">
            </div>
            <div class="mb-3">
            <label for="dashboard-product-day" class="form-label">Ngày Tạo</label>
            <input value="${item === undefined ? "" : item.NgayTao}" type="text" class="form-control" id="dashboard-product-day">
            </div>
            <div class="mb-3">
            <label for="formFileSm" class="form-label">Hình Ảnh</label>
            ${item === undefined ? "" : `<a href="${`${server_url}${item.ViTriHinhAnh}`}" target="_blank" >Xem Ảnh</a>`}
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
            ${""}
            </select>
            </div>
           
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
                // TODO                
            })

            select("#dashboard-modal-delete").addEventListener("click", (e) => {
                e.preventDefault()
                // TODO
            });
        })


    const productAddDialog = Object.assign(Object.create(Object.getPrototypeOf(productDialog)), productDialog)
    productAddDialog
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



    const productDashboard = new TableData()
        .setTableData(tableData)
        .setTableHeaderRander(new RowRender((item) => {
            return `
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
        }))
        .setRowRender(new RowRender((item) => {
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
            `
        }))
        .setOnIemEventListener((item) => {
            getProductTypes()

            let itemButton = select(`#product-${item.MaThucPham}`);

            itemButton.addEventListener('click', (e) => {
                e.preventDefault()
                productDialog.render(item)
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
                productAddDialog.render(undefined)
            })



        })





    const renderDashboard = async () => {
        setLoading()

        let res = await getRequest('product.php')

        if (res.status == true) {
            productDashboard.render(res.items)
        }
        else {
            setNotificationWithCannotLoadData()
        }

        setNotificationWith("NHÀ CUNG CẤP")

    }

    productButton.addEventListener('click', (e) => {
        e.preventDefault()
        renderDashboard()
    })


})()