(function () {
    "use strict";

    let companyButton = select("#dashboard-a-company-info");

    const contactDialog = new Dialog()
        .setModalButton(btnModal)
        .setHeaderModal(modalHeader)
        .setBodyModal(modalBody)
        .setFooterModal(modalFooter)
        .setHeaderModalHTML((item) => {
            return `
                            <h5>Thông tin công ty</h5>
                `
        })
        .setBodyModalHTML((item) => {
            return `
            <form>
                <div class="mb-3">
                <label for="dashboard-company-name" class="form-label">Tên công ty</label>
                <input value="${item.TenCongTy}" type="text" class="form-control" id="dashboard-company-name">
                </div>
                <div class="mb-3">
                <label for="dashboard-company-phone" class="form-label">Số điện thoại</label>
                <input value="${item.SoDienThoai}" type="text" class="form-control" id="dashboard-company-phone">
                </div>
                <div class="mb-3">
                <label for="dashboard-company-email" class="form-label">Email</label>
                <input value="${item.Email}" type="text" class="form-control" id="dashboard-company-email">
                </div>
                <div class="mb-3">
                <label for="dashboard-company-address" class="form-label">Địa chỉ</label>
                <input value="${item.DiaChi}" type="text" class="form-control" id="dashboard-company-address">
                </div>
                <div class="mb-3" id="add-admin-notification">
            </form>
            `
        })
        .setFooterModalHTML((item) => {
            return `
            <button id="dashboard-modal-save" type="button" class="btn btn-success" data-bs-dismiss="modal">Lưu</button>
            <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
        })
        .setCustomEvent((item) => {

            select("#dashboard-modal-save").addEventListener("click", (e) => {
                let companyName = select("#dashboard-company-name").value
                let companyPhone = select("#dashboard-company-phone").value
                let companyEmail = select("#dashboard-company-email").value
                let companyAddress = select("#dashboard-company-address").value

                if(!companyName || !companyPhone || !companyEmail || !companyAddress){
                    setSubNotification("Vui lòng nhập thông tin hợp lệ!")
                    select(`#dashboard-modal-exit`).click();
                    return
                }


                const editCompanyInfo = async () => {
                    let res = await putRequest('companyInfo.php', {
                        company_name : companyName,
                        email : companyEmail,
                        phone_number : companyPhone,
                        address : companyAddress
                    })
                    
                    if (res.status == true){
                        setSubNotification("Sửa thành công!")
                        select(`#company-${companyPhone}`).innerHTML = `
                        <tr id="company-${companyPhone}" >
                            <th scope="row">${companyName}</th>
                            <td>${companyPhone}</td>
                            <td>${companyEmail}</td>
                            <td>${companyAddress}</td>
                            <td>${item.NgayTao}</td>
                        </tr>
                        `;
            
                        item.TenCongTy = companyName
                        item.SoDienThoai = companyPhone
                        item.Email = companyEmail
                        item.DiaChi = companyAddress
                        
                    }
                    else{
                        setSubNotification(res.message)
                    }
                    select(`#dashboard-modal-exit`).click();
            
                }

                editCompanyInfo()



            });
            
        })





    const companyInfoDashboard = new TableData()
        .setTableData(tableData)
        .setTableHeaderRander(new RowRender((item) => {
            return `
        <tr>
            <th scope="col">Tên Công Ty</th>
            <th scope="col">SĐT</th>
            <th scope="col">Email</th>
            <th scope="col">Địa Chỉ</th>
            <th scope="col">Ngày Tạo</th>
         </tr>
        `
        }))
        .setRowRender(new RowRender((item) => {
            return `
            <tr id="company-${item.SoDienThoai}" >
                <th scope="row">${item.TenCongTy}</th>
                <td>${item.SoDienThoai}</td>
                <td>${item.Email}</td>
                <td>${item.DiaChi}</td>
                <td>${item.NgayTao}</td>
            </tr>
            `
        }))
        .setOnIemEventListener((item) => {

            let itemButton = select(`#company-${item.SoDienThoai}`);

            itemButton.addEventListener('click', (e) => {
                e.preventDefault()
                contactDialog.render(item)
            })
        })
        .setTableTool(tableTool)
        .setTableToolHTML(
            `
            `
        )





    const renderDashboard = async () => {
        setLoading()

        let res = await getRequest('companyInfo.php')

        if (res) {
            companyInfoDashboard.render([res])
        }
        else {
            setNotificationWithCannotLoadData()
        }

        setNotificationWith("THÔNG TIN CÔNG TY")

    }

    companyButton.addEventListener('click', (e) => {
        e.preventDefault()
        renderDashboard()
    })

})()