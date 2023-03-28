(function () {
    "use strict";

    const adminButton = select("#dashboard-a-admin");

    const deleteAdmin = async (item) => {
        if (confirm("Bạn có muốn xóa quản trị viên?")) {

            let id = item.MaTaiKhoan

            let res = await deleteRequest(`admin.php?id=${id}`)

            if (res.status == true) {
                select('#dashboard-sub-notification').innerHTML = `Xóa thành công! ID: ${id}`
                select(`#admin-${item.MaTaiKhoan}`).remove();
            }
            else {
                select('#dashboard-sub-notification').innerHTML = res.message
            }
            select(`#dashboard-modal-exit`).click();
        }
    }

    const adminDialog = new Dialog()
        .setModalButton(btnModal)
        .setHeaderModal(modalHeader)
        .setBodyModal(modalBody)
        .setFooterModal(modalFooter)
        .setHeaderModalHTML((item) => {
            return `
                <h5>Thông tin quản trị viên</h5>
            `
        })
        .setBodyModalHTML((item) => {
            return `
            <span>Email: ${item.Email}</span> <br>
            <span>Ngày tạo: ${item.NgayTao}</span> <br>
            `
        })
        .setFooterModalHTML((item) => {
            return `
            <button id="dashboard-delete-message" type="button" class="btn btn-success">Xóa Quản trị viên</button>
            <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>          
                    `
        })
        .setCustomEvent((item) => {
            select("#dashboard-delete-message").addEventListener("click", (e) => {
                deleteAdmin(item)
            });
        })




    const adminAddDialog = Object.assign(Object.create(Object.getPrototypeOf(adminDialog)), adminDialog)

    const adminDashboard = new TableData()
        .setTableData(tableData)
        .setTableHeaderRander(new RowRender((item) => {
            return `
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ngày Tạo</th>
                </tr>
                            `
        }))
        .setRowRender(new RowRender((item) => {
            return `
            <tr id="admin-${item.MaTaiKhoan}" >
                <th scope="row">${item.MaTaiKhoan}</th>
                <td>${item.Email}</td>
                <td>${item.NgayTao}</td>
            </tr>
            `
        }))
        .setOnIemEventListener((item) => {

            let itemButton = select(`#admin-${item.MaTaiKhoan}`);

            itemButton.addEventListener('click', (e) => {
                e.preventDefault()
                adminDialog.render(item)
            })


        })
        .setTableTool(tableTool)
        .setTableToolHTML(
            `
            <div class="input-group">
                <div class="form-outline">
                    <input placeholder type="search" id="admin-search" class="form-control" />
                </div>

                <button type="button" id="admin-add-btn" class="mx-1 btn btn-light"><i class='bx bx-plus-circle'></i></button>

            </div>
            `
        )
        .setOnCustomTableDataEvent((dashboard, items) => {
            let contactSearch = select("#admin-search")
            contactSearch.addEventListener('input', (e) => {
                let tempItems = items.filter((item) => {
                    let value = contactSearch.value
                    return (
                        item.Email.includes(value)
                    )
                })
                dashboard.tableRender(tempItems)
            })


            adminAddDialog
                .setBodyModalHTML((item) => {
                    return `
                <form>
                <div class="mb-3">
                <label for="dashboard-admin-email" class="form-label">Email</label>
                <input value="" type="text" class="form-control" id="dashboard-admin-email">
                </div>
                <div class="mb-3">
                <label for="dashboard-admin-password" class="form-label">Mật khẩu</label>
                <input value="" type="password" class="form-control" id="dashboard-admin-password">
                </div>
                <div class="mb-3" id="add-admin-notification">
                </div>
            </form>
            `
                })
                .setFooterModalHTML((item) => {
                    return `
                <button id="dashboard-add-new-admin" type="button" class="btn btn-success">Thêm</button>
                <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>      
                        `
                })
                .setCustomEvent((item) => {

                    select("#dashboard-add-new-admin").addEventListener("click", (e) => {

                        const addNewAdmin = async () => {
                            let email = select("#dashboard-admin-email").value.trim()
                            let password = select("#dashboard-admin-password").value

                            if (!email || !password) {
                                select("#add-admin-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                                return
                            }

                            let resM = await postRequest('admin.php', {
                                email: email,
                                password: password
                            })

                            if (resM.status == true) {
                                select('#dashboard-sub-notification').innerHTML = resM.message
                                let res = await getRequest('admin.php')

                                if (res.status == true) {
                                    adminDashboard.render(res.items)
                                }
                                else {
                                    setNotificationWithCannotLoadData()
                                }

                            }
                            else {
                                select('#dashboard-sub-notification').innerHTML = "Lỗi không xác định"
                            }
                            select(`#dashboard-modal-exit`).click();

                        }


                        addNewAdmin()
                    });
                })



            select("#admin-add-btn").addEventListener('click', (e) => {
                adminAddDialog.render(undefined)
            })




        })





    const renderDashboard = async () => {
        setLoading()

        let res = await getRequest('admin.php')

        if (res.status == true) {
            adminDashboard.render(res.items)
        }
        else {
            setNotificationWithCannotLoadData()
        }

        setNotificationWith("QUẢN TRỊ VIÊN")

    }

    adminButton.addEventListener('click', (e) => {
        e.preventDefault()
        renderDashboard()
    })


})()