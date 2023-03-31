(function () {
    "use strict";

    const productButton = select("#dashboard-a-product");

    productButton.addEventListener('click', (e) => {
        e.preventDefault()
        getProductTypes()
        getProviders()
        renderDashboard()
    })

    let productTypes = ``
    const getProductTypes = async () => {
        productTypes = ``
        let res = await getRequest('productType.php')
        if (res.status === true) {
            res.items.forEach((item) => {
                productTypes += `<option value="${item.MaLoaiThucPham}">${item.LoaiThucPham}</option>`
            })
        }
    }

    let providers = ``
    const getProviders = async () => {
        providers = ``
        let res = await getRequest('provider.php')
        if (res.status === true) {
            res.items.forEach((item) => {
                providers += `<option value="${item.MaNoiSanXuat}">${item.CongTySanXuat}</option>`
            })
        }
    }


    // hộp thoại chỉnh sửa
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
            <label for="dashboard-product-desc" class="form-label">Mô tả</label>
            <textarea class="form-control" name="message" rows="5" id="dashboard-product-desc" required="">${item === undefined ? "" : item.MoTa}</textarea>
            </div>
            <div class="mb-3">
            <label for="dashboard-product-img" class="form-label">Hình Ảnh</label>
            ${item === undefined ? "" : `<a  href="${`${server_url}${item.ViTriHinhAnh}`}" target="_blank" >Xem Ảnh <span id="dashboard-product-img-location"  hidden>${item === undefined ? "" : item.ViTriHinhAnh}</span></a>`}
            <input class="form-control form-control-sm" id="dashboard-product-img" type="file">
            </div>
            <div class="mb-3">
            <label for="" class="form-label">Loại Thực Phẩm</label>
            <select id="product-type-select" class="form-select">
            ${productTypes}
            </select>
            </div>
            <div class="mb-3">
            <label for="" class="form-label">Nguồn Cung</label>
            <select id="provider-select" class="form-select">
            ${providers}
            </select>
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

            const editProduct = async () => {
                let productName = select("#dashboard-product-name").value.trim()
                let color = select("#dashboard-product-color").value.trim()
                let size = select("#dashboard-product-size").value.trim()
                let shape = select("#dashboard-product-shape").value.trim()
                let desc = select("#dashboard-product-desc").value.trim()
                let img = undefined
                try{
                    img = select("#dashboard-product-img").files[0]
                }
                catch(err){
                    img = undefined
                }
                
                let productTypeId = select("#product-type-select").value
                let providerId = select("#provider-select").value
                let imageLocation = select("#dashboard-product-img-location").innerHTML


                if (
                    !productName ||
                    !color ||
                    !size ||
                    !shape ||
                    !productTypeId ||
                    !providerId ||
                    !desc
                ) {
                    select("#add-admin-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                    return
                }

                var data = new FormData()
                data.append('id', item.MaThucPham)
                data.append('product', productName)
                data.append('color', color)
                data.append('size', size)
                data.append('shape', shape)
                data.append('desc', desc)
                data.append('provider_id', providerId)
                data.append('product_type_id', productTypeId)

                
                if (img == undefined){
                    data.append('is_change_image', false)
                }
                else{
                    data.append('is_change_image', true)
                    data.append('image', img)
                }



                let res = await postRequestWithFormData('product.php?method=edit', data)

                if (res.status == true) {
                    select('#dashboard-sub-notification').innerHTML = res.message
                    renderDashboard()

                }
                else {
                    select('#dashboard-sub-notification').innerHTML = res.message
                }
                select(`#dashboard-modal-exit`).click();
            }


            select("#dashboard-modal-save").addEventListener('click', (e) => {
                e.preventDefault()
                
                editProduct()


            })

            select("#dashboard-modal-delete").addEventListener("click", (e) => {
                e.preventDefault()

                const deleteProduct = async () => {
                    if (confirm("Bạn có muốn xóa tin nhắn?")) {

                        let id = item.MaThucPham

                        let res = await deleteRequest(`product.php?id=${id}`)

                        if (res.status == true) {
                            select('#dashboard-sub-notification').innerHTML = `Xóa thành công! ID: ${id}`
                            select(`#product-${item.MaThucPham}`).remove();
                        }
                        else {
                            select('#dashboard-sub-notification').innerHTML = res.message
                        }
                        select(`#dashboard-modal-exit`).click();
                    }
                }

                deleteProduct()

            });
        })


    // hộp thoại thêm
    const productAddDialog = Object.assign(Object.create(Object.getPrototypeOf(productDialog)), productDialog)
    productAddDialog
        .setFooterModalHTML((item) => {
            return `
        <button id="dashboard-add-new-product-type" type="button" class="btn btn-success">Thêm</button>
        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>  
                `
        })
        .setCustomEvent((item) => {

            const addProduct = async () => {
                let productName = select("#dashboard-product-name").value.trim()
                let color = select("#dashboard-product-color").value.trim()
                let size = select("#dashboard-product-size").value.trim()
                let shape = select("#dashboard-product-shape").value.trim()
                let desc = select("#dashboard-product-desc").value.trim()
                let img = undefined
                try {
                    img = select("#dashboard-product-img").files[0]
                } catch (error) {
                    img = undefined
                }
                let productTypeId = select("#product-type-select").value
                let providerId = select("#provider-select").value


                if (
                    !productName ||
                    !color ||
                    !size ||
                    !shape ||
                    img == undefined ||
                    !productTypeId ||
                    !providerId ||
                    !desc
                ) {
                    select("#add-admin-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                    return
                }

                var data = new FormData()
                data.append('product', productName)
                data.append('color', color)
                data.append('size', size)
                data.append('shape', shape)
                data.append('desc', desc)
                data.append('provider_id', providerId)
                data.append('product_type_id', productTypeId)
                data.append('image', img)

                let res = await postRequestWithFormData('product.php?method=add', data)

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
                addProduct()
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

            let itemButton = select(`#product-${item.MaThucPham}`);

            itemButton.addEventListener('click', (e) => {
                e.preventDefault()
                productDialog.render(item)
                select("#product-type-select").value = item.MaLoaiThucPham
                select("#provider-select").value = item.MaNoiSanXuat

            })

        })
        .setTableTool(tableTool)
        .setTableToolHTML(
            `
            <div class="input-group">
                <div class="form-outline">
                    <input placeholder type="search" id="product-search" class="form-control" />
                </div>

                <button type="button" id="provider-add-btn" class="mx-1 btn btn-light"><i class='bx bx-plus-circle'></i></button>

            </div>
            `
        )
        .setOnCustomTableDataEvent((dashboard, items) => {
            let contactSearch = select("#product-search")
            contactSearch.addEventListener('input', (e) => {
                let tempItems = items.filter((item) => {
                    let value = contactSearch.value
                    return (
                        item.ThucPham.includes(value) || item.MauSac.includes(value) || item.LoaiThucPham.includes(value)
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
            setNotificationWith("SẢN PHẨM")
        }
        else {
            setNotificationWithCannotLoadData()
        }


    }




})()