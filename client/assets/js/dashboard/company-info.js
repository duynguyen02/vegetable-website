(function () {
    "use strict";

    const editCompanyInfo = async (body, item) => {
        let res = await putRequest('companyInfo.php', body)
        console.log(res);
        if (res.status == true){
            select('#dashboard-sub-notification').innerHTML = "Sửa thành công!"
            select(`#company-${item.SoDienThoai}`).innerHTML = `
            <tr id="company-${body.phone_number}" >
                <th scope="row">${body.company_name}</th>
                <td>${body.phone_number}</td>
                <td>${body.email}</td>
                <td>${body.address}</td>
                <td>${item.NgayTao}</td>
            </tr>
            `;

            item.TenCongTy = body.company_name
            item.SoDienThoai = body.phone_number
            item.Email = body.email
            item.DiaChi = body.address
            
        }
        else{
            select('#dashboard-sub-notification').innerHTML = res.message
        }
        select(`#dashboard-modal-exit`).click();

    }

    new Dashboard()
        .setUrl("companyInfo.php")
        .addButton(companyButton)
        .setTableHeader(
            `
             <tr>
                <th scope="col">Tên Công Ty</th>
                <th scope="col">SĐT</th>
                <th scope="col">Email</th>
                <th scope="col">Địa Chỉ</th>
                <th scope="col">Ngày Tạo</th>
             </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="company-${item.SoDienThoai}" >
                <th scope="row">${item.TenCongTy}</th>
                <td>${item.SoDienThoai}</td>
                <td>${item.Email}</td>
                <td>${item.DiaChi}</td>
                <td>${item.NgayTao}</td>
            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#company-${item.SoDienThoai}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>Thông tin công ty</h5>
                    `;
                })
                .setBodyModal(select("#dashboard-body-modal"))
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

                    select("#dashboard-modal-save").addEventListener("click", (e) => {
                        let companyName = select("#dashboard-company-name").value
                        let companyPhone = select("#dashboard-company-phone").value
                        let companyEmail = select("#dashboard-company-email").value
                        let companyAddress = select("#dashboard-company-address").value
    
                        if(!companyName || !companyPhone || !companyEmail || !companyAddress){
                            select('#dashboard-sub-notification').innerHTML = "Vui lòng nhập thông tin hợp lệ!"
                            select(`#dashboard-modal-exit`).click();
                            return
                        }
    
                        editCompanyInfo({
                            company_name : companyName,
                            email : companyEmail,
                            phone_number : companyPhone,
                            address : companyAddress
                        }, item)
                    });


                 

                 })
                .build();
        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("THÔNG TIN CÔNG TY");
            setTableTool('')
        })
        .build();
})();
