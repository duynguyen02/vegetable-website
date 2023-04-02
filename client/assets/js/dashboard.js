/**
 * xây dựng dòng dữ liệu cho bảng dữ liệu 
 */
class RowRender {
    constructor(onElementRender) {
        this.onElementRender = onElementRender
    }

    render(item) {
        let itemsRendered = this.onElementRender(item)
        return itemsRendered
    }

}

/**
 * xây dựng bảng dữ liệu
 */
class TableData {
    // sự kiện cho mỗi dòng
    onItemEventListener = undefined
    // sự kiện tự chọn cho bảng
    onCustomTableDataEvent = undefined

    // tab
    tableData = undefined
    tableTool = undefined

    // RowRander
    tableHeaderRender = undefined
    tableRowRender = undefined

    // xây dựng công cụ cho bảng
    tableToolHTML = undefined




    setOnIemEventListener(onItemEventListener) {
        this.onItemEventListener = onItemEventListener
        return this
    }

    setTableData(tableData) {
        this.tableData = tableData
        return this
    }

    setTableHeaderRander(tableHeaderRender) {
        this.tableHeaderRender = tableHeaderRender
        return this
    }

    setRowRender(tableRowRender) {
        this.tableRowRender = tableRowRender
        return this
    }

    setTableTool(tableTool) {
        this.tableTool = tableTool
        return this
    }

    setTableToolHTML(tableToolHTML){
        this.tableToolHTML = tableToolHTML
        return this
    }

    setOnCustomTableDataEvent(onCustomTableDataEvent) {
        this.onCustomTableDataEvent = onCustomTableDataEvent
        return this
    }

    /**
     * hàm xây dựng bảng từ dữ liệu
     * @param {*} items 
     */
    tableRender(items){

        // loại bỏ các dữ liệu cũ
        this.tableData.innerHTML = ``;

        // nếu dòng tên dữ liệu không được gán thì gán rồng
        let header = (this.tableHeaderRender === undefined) ? '' : this.tableHeaderRender.render(undefined)

        // xây dựng đầu bảng
        this.tableData.insertAdjacentHTML(
            "beforeend",
            `
                  <thead>
                  ${header}
                  </thead>
                  <tbody>
            `
        )

        if (this.tableRowRender !== undefined) {

            // xây dựng từng dòng từ dữ liệu
            items.forEach((item) => {

                // gán vào bảng
                this.tableData.insertAdjacentHTML(
                    "beforeend",
                    this.tableRowRender.render(item)
                )
                
                // gán sự kiện cho từng dòng (nếu có)
                if (this.onItemEventListener != undefined) {
                    this.onItemEventListener(item)
                }

            })
        }


        this.tableData.insertAdjacentHTML("beforeend", `</tbody>`);
    }


    /**
     * xây dựng bảng 
     * @param {*} items 
     */
    render(items) {
        // nếu các thuộc tính cần thiết chưa gán thì báo lỗi
        if (this.tableData === undefined) {
            throw new Error('Vui lòng xây dựng đầy đủ thuộc tính')
        }

        // gán công cụ cho bảng
        if (this.tableTool !== undefined) {
            if (this.tableToolHTML !== undefined) {
                this.tableTool.innerHTML = this.tableToolHTML
            }
        }

        // kết xuất bảng dữ liệu
        this.tableRender(items)
      
        // gán các sự kiện tự điều chỉnh (nếu có)
        if (this.onCustomTableDataEvent !== undefined) {
            this.onCustomTableDataEvent(this, items)
        }

    }


}

/**
 * Xây dựng hộp thoại (modal) của bootstrap 5
 */
class Dialog {
    // nút kích hoạt hộp thoại
    btnModal = undefined
    
    // tag đầu của hộp thoại
    headerModal = undefined
    // HTML của tag đầu
    headerModalHTML = undefined

    // tag thân của hộp thoại
    bodyModal = undefined
    // HTML của tag thân
    bodyModalHTML = undefined

    // tag chân của hộp thoại
    footerModal = undefined
    // HTML của tag chân
    footerModalHTML = undefined

    // sự kiện tùy chỉnh
    customEvent = undefined

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

    /**
     * hàm xây dựng hộp thoại
     * @param {*} item 
     */
    render(item) {
        if (
            this.btnModal === undefined
        ) {
            throw new Error("Vui long thiet lap day du thuoc tinh")
        }

        // mở hộp thoại
        this.btnModal.click();

        // gán HTML cho các phần của hộp thoại
        if (this.headerModalHTML !== undefined && this.headerModal !== undefined) {

            this.headerModal.innerHTML = this.headerModalHTML(item)

        }

        if (this.bodyModalHTML !== undefined && this.bodyModal !== undefined) {

            this.bodyModal.innerHTML = this.bodyModalHTML(item)

        }

        if (this.footerModalHTML !== undefined && this.footerModal !== undefined) {

            this.footerModal.innerHTML = this.footerModalHTML(item)

        }


        // gán sự kiện 
        if (this.customEvent !== undefined) {
            this.customEvent(item, this)
        }
    }
}