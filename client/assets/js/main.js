let hostname = window.location.host;

let protocol = window.location.protocol;

let server_url = `${protocol}//${hostname}/vegetable-website/server/`;

/**
 * chọn các tag theo tên class/id chỉ định
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
 * cài sự kiện cho các tag
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
 * cài hành động cho sự kiện scroll
 */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/**
 * thực hiện request với phương thức GET
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
 * thực hiện request với phương thức POST
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
 * thực hiện request với phương thức POST với FormData
 * @param {string} url 
 * @param {json} body 
 * @returns 
 */
const postRequestWithFormData = async (url, body) => {
  try {
    let res = await fetch(server_url + url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: body,
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};





/**
 * thực hiện request với phương thức PUT
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
 * thực hiện request với phương thức DELETE
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
 * Kiểm tra xem email có hợp lệ hay không
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
   * gán sự kiện click cho nút thoát ở chế độ giao diện di động
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * gán sự kiện click cho nút menu ở chế độ giao diện di động
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
   * Hàm thiết lập các thông tin của công ty
   * @returns
   */
  const setCompanyInfo = async () => {

    // yêu cầu dữ liệu từ server
    let info = await getRequest("companyInfo.php");

    // nếu yêu cầu dữ liệu không thành công thì trả về
    if (!info) {
      return;
    }

    // lấy các tag cần thiết
    let companyAddress = select(".company-address");
    let companyEmail = select(".company-email");
    let companyPhoneNumber = select(".company-phone-address");

    // nếu các tag khả dụng thì gán dữ liệu vào

    if (companyAddress) {
        companyAddress.innerHTML = info.DiaChi;
    }

    if (companyEmail) {
        companyEmail.innerHTML = info.Email;
    }

    if (companyPhoneNumber) {
        companyPhoneNumber.innerHTML = info.SoDienThoai;
    }
  };

  setCompanyInfo();
})();
