(function(){
    "use strict";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id')

    const title = select("#title")

    if (productId == null || productId == undefined){
        title.innerHTML = `<span class="text-danger">Không Tồn Tại!</span>`
        return
    }

    const getProductDetail = async () => {
        let res = await getRequest(`product.php?id=${productId}`)
        let productDetailContainer = select("#product-detail-container")
        if (res.status == true){
            if(res.items.length == 0){
                title.innerHTML = `<span class="text-danger">Không Tồn Tại!</span>`
                return
            }

            let item = res.items[0]
            title.innerHTML = item.ThucPham
            let imgSrc = server_url + item.ViTriHinhAnh

            productDetailContainer.innerHTML = `
            <div class="row gy-4">

                <div class="col-lg-8">
                    <div class="portfolio-details-slider swiper">
                    <div class="swiper-wrapper align-items-center">

                        <div class="swiper-slide">
                        <img src="${imgSrc}" alt="">
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="portfolio-info">
                    <h3>Thông Tin Sản Phẩm</h3>
                    <ul>
                        <li><strong>Sản Phẩm</strong>: ${item.ThucPham}</li>
                        <li><strong>Loại Sản Phẩm</strong>: ${item.LoaiThucPham}</li>
                        <li><strong>Hình Dáng</strong>: ${item.HinhDang}</li>
                        <li><strong>Kích Thước</strong>: ${item.KichThuoc}</li>
                        <li><strong>Màu Sắc</strong>: ${item.MauSac}</li>
                        <li><strong>Nguồn Cung Cấp</strong>: ${item.CongTySanXuat}</li>
                        <li><strong>Địa Chỉ</strong>: ${item.DiaChi}</li>
                        <li><h2><a href="./contact.html" >LIÊN HỆ NGAY</a></h2></li>
                    </ul>
                    </div>
                    <div class="portfolio-description">
                    <h2>Mô Tả</h2>
                    <p>
                        ${item.MoTa}
                    </p>
                    </div>
                </div>

            </div>
            `

        }
        else{
            title.innerHTML = `<span class="text-danger">Không Tồn Tại!</span>`
        }
    }

    getProductDetail()


})()