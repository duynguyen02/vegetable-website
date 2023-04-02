(function () {
  "use strict";

  // khởi tạo card đánh giá của khách hàng
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  // chọn tag chứa danh sách sản phẩm
  const portfolioList = select("#portfolio-list")

  /**
   * lấy sản phẩm từ server và đổ vào giao diện
   */
  const getProducts = async () => {

    // lấy 6 sản phẩm trong cơ sở dữ liệu
    let res = await getRequest('product.php?limit=6')

    if (res.status == true) { // nếu yêu cầu dữ liệu thành công
      let products = ``

      // xây dựng HTML cho từng sản phẩm
      res.items.forEach(item => {
        let imgSrc = server_url + item.ViTriHinhAnh
        products += `
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <div class="bg-image hover-zoom" data-mdb-ripple-color="light">
              <a href="./product-detail.html?id=${item.MaThucPham}" class="text-reset">
              <img src="${imgSrc}"
              class="w-100 inner-img" />
            </a>
          </div>
          <div class="card-body">
            <a href="./product-detail.html?id=${item.MaThucPham}" class="text-reset">
              <h5 class="card-title mb-3"><strong>${item.ThucPham}</strong></h5>
            </a>
            <a href="" class="text-reset">
              <p>Loại Thực Phẩm: ${item.LoaiThucPham}</p>
            </a>
          </div>
        </div>
      </div>
        `
      });

      portfolioList.innerHTML = products

    }

  }

  getProducts()


})();
