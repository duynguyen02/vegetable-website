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

  const portfolioList = select("#portfolio-list")

  const getProducts = async () => {
    let res = await getRequest('product.php?limit=6')

    if (res.status == true) {
      let products = ``

      res.items.forEach(item => {
        let imgSrc = server_url + item.ViTriHinhAnh
        products += `
        <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <img src="${imgSrc}" class="img-fluid" alt="">
            <div class="portfolio-info">
              <h4>${item.ThucPham}</h4>
              <p>${item.MoTa}</p>
              <a href="./product-detail.html?id=${item.MaThucPham}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
            </div>
        </div>
        `
      });

      portfolioList.innerHTML = products

    }

  }

  getProducts()

  // khởi tạo card sản phẩm tiêu biểu
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

})();
