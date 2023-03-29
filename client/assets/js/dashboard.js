class RowRender {
    constructor(onElementRender) {
        this.onElementRender = onElementRender
    }

    render(item) {
        let itemsRendered = this.onElementRender(item)
        return itemsRendered
    }

}


class TableData {
    onItemEventListener = undefined
    onCustomTableDataEvent = undefined

    // tab
    tableData = undefined
    tableTool = undefined

    // RowRander
    tableHeaderRender = undefined
    tableRowRender = undefined

    // string
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


    tableRender(items){
        this.tableData.innerHTML = ``;

        let header = (this.tableHeaderRender === undefined) ? '' : this.tableHeaderRender.render(undefined)


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
            items.forEach((item) => {
                this.tableData.insertAdjacentHTML(
                    "beforeend",
                    this.tableRowRender.render(item)
                )

                if (this.onItemEventListener != undefined) {
                    this.onItemEventListener(item)
                }

            })
        }


        this.tableData.insertAdjacentHTML("beforeend", `</tbody>`);
    }



    render(items) {
        if (this.tableData === undefined) {
            throw new Error('Vui lòng xây dựng đầy đủ thuộc tính')
        }

        if (this.tableTool !== undefined) {
            if (this.tableToolHTML !== undefined) {
                this.tableTool.innerHTML = this.tableToolHTML
            }
        }

        this.tableRender(items)
      

        if (this.onCustomTableDataEvent !== undefined) {
            this.onCustomTableDataEvent(this, items)
        }

    }


}


class Dialog {
    btnModal = undefined
    headerModal = undefined
    headerModalHTML = undefined
    bodyModal = undefined
    bodyModalHTML = undefined
    footerModal = undefined
    footerModalHTML = undefined
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


    render(item) {
        if (
            this.btnModal === undefined
        ) {
            throw new Error("Vui long thiet lap day du thuoc tinh")
        }

        this.btnModal.click();

        if (this.headerModalHTML !== undefined && this.headerModal !== undefined) {

            this.headerModal.innerHTML = this.headerModalHTML(item)

        }

        if (this.bodyModalHTML !== undefined && this.bodyModal !== undefined) {

            this.bodyModal.innerHTML = this.bodyModalHTML(item)

        }

        if (this.footerModalHTML !== undefined && this.footerModal !== undefined) {

            this.footerModal.innerHTML = this.footerModalHTML(item)

        }

        if (this.customEvent !== undefined) {
            this.customEvent(item, this)
        }
    }
}