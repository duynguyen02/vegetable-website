class ItemInfoDialog {
    item = undefined
    itemElement = undefined
    btnModal = undefined
    headerModal = undefined
    headerModalHTML = undefined
    bodyModal = undefined
    bodyModalHTML = undefined
    footerModal = undefined
    footerModalHTML = undefined
    customEvent = undefined

    setItem(item) {
        this.item = item
        return this
    }

    setItemElement(itemElement) {
        this.itemElement = itemElement
        return this
    }

    setModalButton(button) {
        this.btnModal = button
        return this
    }

    setHeaderModal(headerModal) {
        this.headerModal = headerModal
        return this
    }

    setFooterModal(headerModal) {
        this.footerModal = headerModal
        return this
    }

    setBodyModal(headerModal) {
        this.bodyModal = headerModal
        return this
    }

    setHeaderModalHTML(headerModalHTML) {
        this.headerModalHTML = headerModalHTML
        return this
    }

    setBodyModalHTML(headerModalHTML) {
        this.bodyModalHTML = headerModalHTML
        return this
    }

    setFooterModalHTML(headerModalHTML) {
        this.footerModalHTML = headerModalHTML
        return this
    }

    setCustomEvent(customEvent) {
        this.customEvent = customEvent
        return this
    }


    build() {
        if (this.item === undefined ||
            this.itemElement === undefined ||
            this.btnModal === undefined ||
            this.headerModal === undefined ||
            this.bodyModal === undefined ||
            this.footerModal === undefined
        ) {
            throw new Error("Vui long thiet lap day du thuoc tinh")
        }

        this.itemElement.addEventListener("click", (e) => {
            e.preventDefault();

            this.btnModal.click();

            if (this.headerModalHTML !== undefined) {

                this.headerModal.innerHTML = this.headerModalHTML(this.item)

            }

            if (this.bodyModalHTML !== undefined) {

                this.bodyModal.innerHTML = this.bodyModalHTML(this.item)

            }

            if (this.footerModalHTML !== undefined) {

                this.footerModal.innerHTML = this.footerModalHTML(this.item)

            }

            if (this.customEvent !== undefined) {
                this.customEvent(this.item)
            }


        });
    }


}

class Dashboard {
    url = undefined;
    buttons = [];
    tableHeader = undefined;
    onEachItems = undefined;
    onEachItemsClickEvent = undefined;
    tableDataElement = undefined;
    onPrepare = undefined;
    onError = undefined;
    onComplete = undefined;

    setUrl(url) {
        this.url = url
        return this
    }

    addButton(button) {
        this.buttons.push(button)
        return this
    }

    setTableHeader(tableHeader) {
        this.tableHeader = tableHeader
        return this
    }

    setOnEachItems(onEachItems) {
        this.onEachItems = onEachItems
        return this
    }

    setOnEachItemsClickEvent(onEachItemsClickEvent) {
        this.onEachItemsClickEvent = onEachItemsClickEvent
        return this
    }

    setTableDataElement(tableDataElement) {
        this.tableDataElement = tableDataElement
        return this
    }

    setOnPrepare(onPrepare) {
        this.onPrepare = onPrepare
        return this
    }

    setOnError(onError) {
        this.onError = onError
        return this
    }

    setOnComplete(onComplete) {
        this.onComplete = onComplete
        return this
    }

    async _render() {
        if (this.onPrepare !== undefined) {
            this.onPrepare()
        }

        this.tableDataElement.innerHTML = "";

        this.tableDataElement.insertAdjacentHTML(
            "beforeend",
            `
                  <thead>
                  ${this.tableHeader}
                  </thead>
                  <tbody>
                `
        )

        let res = await getRequest(this.url);

        if (res.status === false) {
            if (this.onError !== undefined) {
                this.onError();
            }
            return
        }

        const setData = (item) =>{
            let data = this.onEachItems(item);
            this.tableDataElement.insertAdjacentHTML("beforeend", data);
            this.onEachItemsClickEvent(item);
        }

        if(res.items === undefined){
            setData(res)
        }
        else {
            res.items.forEach((item) => {
                setData(item)
            })
        }



        this.tableDataElement.insertAdjacentHTML("beforeend", `</tbody>`);

        if (this.onComplete !== undefined) {
            this.onComplete();
        }

    }


    build() {
        if (
            this.url === undefined ||
            this.tableHeader === undefined ||
            this.onEachItems === undefined ||
            this.tableDataElement === undefined
        ) {
            throw new Error("Thiet lap day du cac thuoc tinh");
        }

        this.buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                this._render().then(r => {
                });
            });
        });
    }
}


(function () {
    "use strict";

    // các nút trên header
    let logoutButton = select("#dashboard-a-logout");
    let contactButton = select("#dashboard-a-contact");
    let companyButton = select("#dashboard-a-company-info");
    let adminButton = select("#dashboard-a-admin");
    let productAdmin = select("#dashboard-a-product");
    let providerButton = select("#dashboard-a-provider");
    let productTypeButton = select("#dashboard-a-product-type");
    let changePasswordButton = select("#dashboard-a-change-password");

    // thông báo
    let notification = select("#dashboard-notification");
    // thông báo của hộp thoại đổi mật khẩu
    let changePasswordNotification = select("#dashboard-password-change-message");
    // bảng dữ liệu
    let tableData = select("#dashboard-table-data");
    // nút tiến hành đổi mật khẩu
    let changePasswordSubmitButton = select("#dashboard-btn-change-password");

    /**
     * Hàm gán spinner cho thanh thông báo
     */
    const setLoading = () => {
        if (notification) {
            notification.innerHTML = `
              Đang Tải...
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              `;
        }
    };

    /**
     * Hàm tùy chỉnh thông báo
     * @param {*} content
     */
    const setNotificationWith = (content) => {
        if (notification) {
            notification.innerHTML = content;
        }
    };

    /**
     * Hàm chỉnh thông báo thành chữ không thể tại dữ liệu
     */
    const setNotificationWithCannotLoadData = () => {
        setNotificationWith(
            `<span class="text-danger">Không thể tải dữ liệu!</span>`
        );
    };

    new Dashboard()
        .setUrl("contact.php")
        .addButton(contactButton)
        .setTableHeader(
            `
             <tr>
                  <th scope="col">Mã thư</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">SĐT</th>
                  <th scope="col">Email</th>
                  <th scope="col">Tiêu đề</th>
                  <th scope="col">Ngày liên hệ</th>
            </tr>
            `
        )
        .setOnEachItems((item) => {
            return `
            <tr id="contact-${item.MaLienHe}">
              <th scope="row">${item.MaLienHe}</th>
              <td>${item.hovaten}</td>
              <td>${item.sodienthoai}</td>
              <td>${item.email}</td>
              <td>${item.TieuDe}</td>
              <td>${item.NgayLienHe}</td>
            </tr>
          `;
        })
        .setOnEachItemsClickEvent((item) => {
            new ItemInfoDialog()
                .setItem(item)
                .setItemElement(select(`#contact-${item.MaLienHe}`))
                .setModalButton(select("#dashboard-modal"))
                .setHeaderModal(select("#dashboard-header-modal"))
                .setHeaderModalHTML((item) => {
                    return `
                        <h5>${item.TieuDe}</h5>
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
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
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-delete-message" type="button" class="btn btn-success">Xóa Thư</button>
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
                })
                .setCustomEvent((item) => {
                    select("#dashboard-delete-message").addEventListener("click", (e) => {
                        if (confirm("Bạn có muốn xóa tin nhắn?")) {
                            // TODO: request xóa thư
                            select(`#contact-${item.MaLienHe}`).remove();
                            select(`#dashboard-modal-exit`).click();
                        }
                    });
                })
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("LIÊN HỆ")
        })
        .build()


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
                    `
                })
                .setBodyModal(select("#dashboard-body-modal"))
                .setBodyModalHTML((item) => {
                    return `
                           TODO
                    `
                })
                .setFooterModal(select("#dashboard-footer-modal"))
                .setFooterModalHTML((item) => {
                    return `
                        <button id="dashboard-modal-exit" type="button" class="btn btn-danger" data-bs-dismiss="modal">Thoát</button>
                    `
                })
                .setCustomEvent((item) => {

                })
                .build()

        })
        .setTableDataElement(tableData)
        .setOnPrepare(setLoading)
        .setOnError(setNotificationWithCannotLoadData)
        .setOnComplete(() => {
            setNotificationWith("THÔNG TIN CÔNG TY")
        })
        .build()


})();
