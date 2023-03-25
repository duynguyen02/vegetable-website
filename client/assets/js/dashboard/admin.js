
(function () {
    "use strict";

    const deleteAdmin = async (item) => {
        if (confirm("Bạn có muốn xóa quản trị viên?")) {
                            
            let id = item.MaTaiKhoan

            let res = await deleteRequest(`admin.php?id=${id}`)

            if (res.status == true){
                select('#dashboard-sub-notification').innerHTML = `Xóa thành công! ID: ${id}`
                select(`#admin-${item.MaTaiKhoan}`).remove();
            }
            else{
                select('#dashboard-sub-notification').innerHTML = res.message
            }
            select(`#dashboard-modal-exit`).click();
        }
    }

    new Dashboard()
        .setUrl("admin.php")
        .addButton(adminButton)
        .setTableHeader(
            `
             <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Ngày Tạo</th>
             </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="admin-${item.MaTaiKhoan}" >
                <th scope="row">${item.MaTaiKhoan}</th>
                <td>${item.Email}</td>
                <td>${item.NgayTao}</td>
            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#admin-${item.MaTaiKhoan}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thông tin quản trị viên</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                    <span>Email: ${item.Email}</span> <br>
                    `
                })
                .setFooterModal(select("#dashboard-footer-modal"))
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
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete((dashboard) => {
            setNotificationWith("QUẢN TRỊ VIÊN")

            setTableTool(
                `
                <button id="add-new-admin" type="button" class="btn btn-success"><i class='bx bx-plus-circle'></i></button>
                
                `
            )

            const addNewAdmin = async (dashboard) => {
                let email = select("#dashboard-admin-email").value.trim()
                let password = select("#dashboard-admin-password").value

                if (!email || !password){
                    select("#add-admin-notification").innerHTML = "Vui lòng nhập giá trị hợp lệ!"
                    return
                }

                let res = await postRequest('admin.php', {
                    email : email,
                    password : password
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
                .setItemElement(select("#add-new-admin"))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thêm quản trị viên</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
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
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-add-new-admin" type="button" class="btn btn-success">Thêm</button>
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
                })
                .setCustomEvent((item) => {
                    select("#dashboard-add-new-admin").addEventListener("click", (e) => {
                        addNewAdmin(dashboard)
                    });
                })
                .build()



        })
        .build()


})();