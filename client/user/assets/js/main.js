let hostname = window.location.host;

let protocol = window.location.protocol;

let server_url = `${protocol}//${hostname}/vegetable-website/server/`;

/**
 *
 */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
 *
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

/**
 *
 */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/**
 *
 */
const getRequest = async (url) => {
  try {
    let res = await fetch(server_url + url, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 */
const postRequest = async (url, body) => {
  try {
    let res = await fetch(server_url + url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: new URLSearchParams(body),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 */
const putRequest = async (url, body) => {
  try {
    let res = await fetch(server_url + url, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: new URLSearchParams(body),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 */
const deleteRequest = async (url) => {
  try {
    let res = await fetch(server_url + url, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * 
 * @param {*} email 
 * @returns 
 */
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

(function () {
  "use strict";

  /**
   * tạo sự kiện cho nút back to top
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Hàm thiết lập các thông tin của công ty
   * @returns
   */
  const setCompanyInfo = async () => {
    let info = await getRequest("companyInfo.php");

    if (!info) {
      return;
    }

    let companyAddress = select(".company-address", true);
    let companyEmail = select(".company-email", true);
    let companyPhoneNumber = select(".company-phone-address", true);

    if (companyAddress) {
      companyAddress.forEach((e) => {
        e.innerHTML = info.DiaChi;
      });
    }

    if (companyEmail) {
      companyEmail.forEach((e) => {
        e.innerHTML = info.Email;
      });
    }

    if (companyPhoneNumber) {
      companyPhoneNumber.forEach((e) => {
        e.innerHTML = info.SoDienThoai;
      });
    }
  };

  setCompanyInfo();
})();
