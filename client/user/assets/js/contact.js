(function () {
  "use strict";

  const sendMessage = async () => {
    let customerName = select("#contact-fullname").value.trim();
    let customerEmail = select("#contact-email").value.trim();
    let customerPhoneNumber = select("#contact-phone-number").value.trim();
    let customerTitle = select("#contact-title").value.trim();
    let customerContent = select("#contact-content").value.trim();

    if (
      !customerName ||
      !customerEmail ||
      !customerPhoneNumber ||
      !customerTitle ||
      !customerContent
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!validateEmail(customerEmail)) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    let sendButton = select("#contact-btn-send");

    if (sendButton) {
      sendButton.disabled = true;
      sendButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...`;
    }

    let res = await postRequest("contact.php", {
      customer_name: customerName,
      phone_number: customerPhoneNumber,
      email: customerEmail,
      title: customerTitle,
      content: customerContent,
    });

    sendButton.disabled = false;
    sendButton.innerHTML = `Gửi liên hệ`;

    let contactAlert = select(".contact-alert");
    if (res.status == true) {
      contactAlert.innerHTML = `
      <div class="alert alert-success alert-dismissible">
      <strong>Gửi thành công! </strong>Chúng tôi sẽ liên hệ đến bạn sớm nhất!
      </div>
      `;
    } else {
      contactAlert.innerHTML = `
      <div class="alert alert-danger alert-dismissible">
      <strong>Gửi thất bại! </strong>Vui lòng thử lại!
      </div>
      `;
    }
  };

  on("click", "#contact-btn-send", function (e) {
    // tắt bắt sự kiện mặc định của nút
    e.preventDefault();

    sendMessage();
  });
})();
