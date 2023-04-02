(function () {
    "use strict";

    const providerButton = select("#dashboard-a-provider");

    const providerDialog = new Dialog()
        .setModalButton(btnModal)
        .setHeaderModal(modalHeader)
        .setBodyModal(modalBody)
        .setFooterModal(modalFooter)
        .setHeaderModalHTML((item) => {
            return `
                <h5>Thông tin nhà cung cấp</h5>
            `
        })
        .setBodyModalHTML((item) => {
            return `
            <form>
            <div class="mb-3">
            <label for="dashboard-provider-name" class="form-label">Tên nhà cung cấp</label>
            <input value="${item === undefined ? "" : item.CongTySanXuat}" type="text" class="form-control" id="dashboard-provider-name">
            </div>
            <div class="mb-3">
            <label for="dashboard-provider-address" class="form-label">Địa chỉ</label>
            <input value="${item === undefined ? "" : item.DiaChi}" type="text" class="form-control" id="dashboard-provider-address">
            </div>
            <div class="mb-3" id="add-provider-notification">
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
                             setSubNotification(`Xóa thành công! ID: ${id}`)
                            select(`#provider-${item.MaNoiSanXuat}`).remove();
                        }
                        else {
                             setSubNotification(res.message)
                        }
                        select(`#dashboard-modal-exit`).click();
                    }
                }

                deleteProvider()

            });
        })


    const providerAddDialog = Object.assign(Object.create(Object.getPrototypeOf(providerDialog)), providerDialog)
    providerAddDialog
    .setFooterModalHTML((item) => {
        return `
        <button id="dashboard-add-new-provider" type="button" class="btn btn-success">Thêm</button>
        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>     
                `
    })
    .setCustomEvent((item) => {
        select("#dashboard-add-new-provider").addEventListener("click", (e) => {

            const addNewProvider = async () => {

                let providerName = select("#dashboard-provider-name").value.trim()
                let address = select("#dashboard-provider-address").value.trim()

                if (!providerName || !address){
                    select("#add-provider-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                    return
                }

                let res = await postRequest('provider.php', {
                    provider_name : providerName,
                    address : address
                })

                if (res.status == true){
                     setSubNotification(res.message)
                    renderDashboard()

                }
                else{
                     setSubNotification("Lỗi không xác định")
                }
                select(`#dashboard-modal-exit`).click();

            }
                        
            addNewProvider()
            
        });
    })



    const providerDashboard = new TableData()
        .setTableData(tableData)
        .setTableHeaderRander(new RowRender((item) => {
            return `
            <tr>
            <th scope="col">#</th>
            <th scope="col">Công ty sản xuất</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Ngày tạo</th>
            </tr>
                            `
        }))
        .setRowRender(new RowRender((item) => {
            return `
            <tr id="provider-${item.MaNoiSanXuat}" >
            <th scope="row">${item.MaNoiSanXuat}</th>
            <td>${item.CongTySanXuat}</td>
            <td>${item.DiaChi}</td>
            <td>${item.NgayTao}</td>
            </tr>
            `
        }))
        .setOnIemEventListener((item) => {

            let itemButton = select(`#provider-${item.MaNoiSanXuat}`);

            itemButton.addEventListener('click', (e) => {
                e.preventDefault()
                providerDialog.render(item)
            })
        })
        .setTableTool(tableTool)
        .setTableToolHTML(
            `
            <div class="input-group">
                <div class="form-outline">
                    <input placeholder type="search" id="provider-search" class="form-control" />
                </div>

                <button type="button" id="provider-add-btn" class="mx-1 btn btn-light"><i class='bx bx-plus-circle'></i></button>

            </div>
            `
        )
        .setOnCustomTableDataEvent((dashboard, items) => {
            let contactSearch = select("#provider-search")
            contactSearch.addEventListener('input', (e) => {
                let tempItems = items.filter((item) => {
                    let value = contactSearch.value
                    return (
                        item.CongTySanXuat.includes(value) || item.DiaChi.includes(value)
                    )
                })
                dashboard.tableRender(tempItems)
            })

            select("#provider-add-btn").addEventListener('click', (e) => {
                providerAddDialog.render(undefined)
            })



        })





    const renderDashboard = async () => {
        setLoading()

        let res = await getRequest('provider.php')

        if (res.status == true) {
            providerDashboard.render(res.items)
        }
        else {
            setNotificationWithCannotLoadData()
        }

        setNotificationWith("NHÀ CUNG CẤP")

    }

    providerButton.addEventListener('click', (e) => {
        e.preventDefault()
        renderDashboard()
    })


})()