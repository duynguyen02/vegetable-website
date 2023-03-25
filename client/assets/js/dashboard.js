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
        if (
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
            this.onComplete(this);
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


