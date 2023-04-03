(function(){
    "use strict";

    // lấy query từ url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // lấy id sản phẩm từ query
    const productId = urlParams.get('id')

    // chọn tag để gán tiêu đề
    const title = select("#title")

    // nếu không nhận được id sản phẩm từ query thì gán tiêu đề 
    if (productId == null || productId == undefined){
        title.innerHTML = `<span class="text-danger">Không Tồn Tại!</span>`
        return
    }
    
    /**
     * lấy thông tin sản phẩm
     * @returns 
     */
    const getProductDetail = async () => {

        // yêu cầu dữ liệu từ server
        let res = await getRequest(`product.php?id=${productId}`)

        // chọn vùng chứa thông tin sản phẩm
        let productDetailContainer = select("#product-detail-container")

        if (res.status == true){

            // nếu dữ liệu rỗng thì gán sản phẩm không tồn tại 
            if(res.items.length == 0){
                title.innerHTML = `<span class="text-danger">Không Tồn Tại!</span>`
                return
            }

            // lấy sản phẩm đầu tiên
            let item = res.items[0]
            // gán tiêu đề là tên sản phẩm
            title.innerHTML = item.ThucPham

            // xây dựng đường dẫn tới hình ảnh sản phẩm
            let imgSrc = server_url + item.ViTriHinhAnh
            
            // xây dựng HTML cho thông tin sản phẩm
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
                        
                    </ul>
                    </div>
                    <div class="portfolio-description">
                    <h2><a href="./contact.html" >LIÊN HỆ NGAY</a></h2>
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