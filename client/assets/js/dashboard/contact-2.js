(function () {
    "use strict";

    const contactButton = select("#dashboard-a-contact");


    const deleteContact = async (item) => {
        if (confirm("Bạn có muốn xóa tin nhắn?")) {

            let id = item.MaLienHe

            let res = await deleteRequest(`contact.php?method=message&id=${id}`)

            if (res.status == true) {
                select('#dashboard-sub-notification').innerHTML = `Xóa thành công! ID: ${id}`
                select(`#contact-${item.MaLienHe}`).remove();
            }
            else {
                select('#dashboard-sub-notification').innerHTML = res.message
            }
            select(`#dashboard-modal-exit`).click();
        }
    }

    const contactDialog = new Dialog()
        .setModalButton(btnModal)
        .setHeaderModal(modalHeader)
        .setBodyModal(modalBody)
        .setFooterModal(modalFooter)
        .setHeaderModalHTML((item) => {
            return `
                                <h5>${item.TieuDe}</h5>
                            `
        })
        .setBodyModalHTML((item) => {
            return `
                                <span>Họ và tên: ${item.hovaten}</span> <br>
                                <span>Số điện thoại: ${item.sodienthoai}</span> <br>
                                <span>Email: ${item.email}</span> <br>
                                <span>Ngày liên hệ: ${item.NgayLienHe}</span> <br>
                                <span>------------------------------------</span> <br>
                                <span>${item.NoiDung}</span>
                            `
        })
        .setFooterModalHTML((item) => {
            return `
                                <button id="dashboard-delete-message" type="button" class="btn btn-success">Xóa Thư</button>
                                <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                            `
        })
        .setCustomEvent((item) => {
            select("#dashboard-delete-message").addEventListener("click", (e) => {
                deleteContact(item)
            });
        })



    const contactDashboard = new TableData()
        .setTableData(tableData)
        .setTableHeaderRander(new RowRender((item) => {
            return `
                            <tr>
                            <th scope="col">Mã thư</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Email</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Ngày liên hệ</th>
                            </tr>
                            `
        }))
        .setRowRender(new RowRender((item) => {
            return `
                            <tr id="contact-${item.MaLienHe}">
                            <th scope="row">${item.MaLienHe}</th>
                            <td>${item.hovaten}</td>
                            <td>${item.sodienthoai}</td>
                            <td>${item.email}</td>
                            <td>${item.TieuDe}</td>
                            <td>${item.NgayLienHe}</td>
                            </tr>
                            `
        }))
        .setOnIemEventListener((item) => {

            let itemButton = select(`#contact-${item.MaLienHe}`);

            itemButton.addEventListener('click', (e) => {
                e.preventDefault()
                contactDialog.render(item)
            })


        })
        .setTableTool(tableTool)
        .setTableToolHTML(
            `
            <div class="input-group">
                <div class="form-outline">
                    <input placeholder type="search" id="contact-search" class="form-control" />
                </div>
            </div>
            `
        )
        .setOnCustomTableDataEvent((dashboard, items) => {
            let contactSearch = select("#contact-search")
            contactSearch.addEventListener('input', (e) => {
                let tempItems = items.filter((item)=>{
                    let value = contactSearch.value
                    return (
                        item.hovaten.includes(value) || item.sodienthoai.includes(value) || item.email.includes(value) || item.TieuDe.includes(value)
                        )
                })
                dashboard.tableRender(tempItems)
            })
            
        })


    const renderDashboard = async () => {
        setLoading()

        let res = await getRequest('contact.php')

        if (res.status == true) {
            contactDashboard.render(res.items)
        }
        else {
            setNotificationWithCannotLoadData()
        }

        setNotificationWith("LIÊN HỆ")

    }

    contactButton.addEventListener('click', (e) => {
        e.preventDefault()
        renderDashboard()
    })


})()