<style>
  * {
    margin-top: 2px;
    margin-bottom: 2px;
  }
</style>
<h2>CHÀO MỪNG ĐẾN VỚI API CỦA WEBSITE GIỚI THIỆU RAU CỦ QUẢ NHÓM 7 </h2> <br>
<h3> Hướng dẫn sử dụng: </h3> <br>
<h4>Các phản hồi chung</h4>
<p><i>Phản hồi khi các phương thức yêu cầu không hợp lệ với 1 API: </i></p>
<p>
<pre>
<code>
{
  "message": "Phương thức không hợp lệ!",
  "status": false
}
</code>
</pre>
</p>

<p><i>Phản hồi khi các đối số không hợp lệ với 1 API: </i></p>
<p>
<pre>
<code>
{
  "message": "Đối số không hợp lệ!",
  "status": false
}
</code>
</pre>
</p>
<p><i>Phản hồi khi yêu cầu 1 API cần đăng nhập để sử dụng: </i></p>
<p>
<pre>
<code>
{
  "message": "Xác thực thất bại!",
  "status": false
}
</code>
</pre>
</p>
<p><i>Phản hồi khi thêm thành công một bản ghi: </i></p>
<p>
<pre>
<code>
{
  "message": "Thêm thành công!",
  "status": true
}
</code>
</pre>
</p>
<p><i>Phản hồi khi thay đổi thông tin thành công thuộc tính: </i></p>
<p>
<pre>
<code>
{
  "message": "Thay đổi thông tin thành công!",
  "status": true
}
</code>
</pre>
</p>
<p><i>Phản hồi khi xóa thành công một bản ghi: </i></p>
<p>
<pre>
<code>
{
  "message": "Xóa thành công!",
  "status": true
}
</code>
</pre>
</p>

<br>
<h4>login.php</h4>
<p>Chức năng: Đăng nhập vào máy chủ để thực hiện các chức năng khác có yêu cầu đăng nhập.</p>
<p>----------</p>
<pre>
POST {tên miền của bạn}/vegetable-website/server/login.php
Content-Type: application/x-www-form-urlencoded

email={Email tài khoản}&password={Mật khẩu tài khoản}

</pre>
<p><i>Phản hồi đăng nhập thành công: </i></p>
<p>
<pre>
<code>
{
"message": "Đăng nhập thành công!",
"status": true
}
</code>
</pre>
</p>

<p><i>Phản hồi đã đăng nhập: </i></p>
<p>
<pre>
<code>
{
  "message": "Bạn đã đăng nhập trước đó!",
  "status": false
}
</code>
</pre>
</p>

<p><i>Phản hồi đăng nhập thất bại: </i></p>
<p>
<pre>
<code>
{
  "message": "Đăng nhập thất bại!",
  "status": false
}
</code>
</pre>
</p>

<br>

<h4>logout.php</h4>
<p>Chức năng: Đăng xuất khỏi máy chủ.</p>
<p>----------</p>
<pre>
GET {tên miền của bạn}/vegetable-website/server/logout.php

</pre>
<p><i>Phản hồi khi đăng xuất thành công: </i></p>
<p>
<pre>
<code>
{
  "message": "Đăng xuất thành công!",
  "status": true
}
</code>
</pre>
</p>
<p><i>Phản hồi khi chưa đăng nhập nhưng lại thực hiện đăng xuất: </i></p>
<p>
<pre>
<code>
{
  "message": "Không thể đăng xuất do chưa đăng nhập!",
  "status": false
}
</code>
</pre>
</p>


<br>

<h4>sessionCheck.php</h4>
<p>Chức năng: Xác thực đăng nhập trên một thiết bị.</p>
<p>----------</p>
<pre>
GET {tên miền của bạn}/vegetable-website/server/sessionCheck.php

</pre>
<p><i>Phản hồi khi xác thực hợp lệ: </i></p>
<p>
<pre>
<code>
{
  "message": "Hợp lệ!",
  "status": true
}
</code>
</pre>
</p>
<p><i>Phản hồi khi xác thực không hợp lệ:</i></p>
<p>
<pre>
<code>
{
  "message": "Không hợp lệ!",
  "status": false
}
</code>
</pre>
</p>

<br>

<h4>admin.php</h4>
<p>Chức năng: Quản lý thông tin của các quản trị viên.</p>
<p>Yêu cầu: phải đăng nhập trước khi sử dụng các phương thức GET POST PUT DELETE.</p>
<p>----------</p>
<pre>
# yêu cầu danh sách quản trị viên
GET {tên miền của bạn}/vegetable-website/server/admin.php

</pre>
<p><i>Phản hồi danh sách quản trị viên (mẫu):</i></p>
<p>
<pre>
<code>
{
  "items": [
    {
      "MaTaiKhoan": "1",
      "Email": "admin@admin.com",
      "NgayTao": "2023-03-22 02:37:19"
    }
  ],
  "status": true
}
</code>
</pre>
</p>
<p>----------</p>
<pre>
# thêm một quản trị viên
POST {tên miền của bạn}/vegetable-website/server/admin.php
Content-Type: application/x-www-form-urlencoded

email={Email}&password={Mật khẩu}

</pre>

<p>----------</p>
<pre>
# đổi mật khẩu của tài khoản quản trị viên của phiên đăng nhập hiện tại
PUT {tên miền của bạn}/vegetable-website/server/admin.php
Content-Type: application/x-www-form-urlencoded

new_password={Mật khẩu mới}&amp;current_password={Mật khẩu hiện tại}

</pre>
<p><i>Phản hồi khi đổi mật khẩu thành công:</i></p>
<p>
<pre>
<code>
{
  "message": "Đổi mật khẩu thành công!",
  "status": true
}
</code>
</pre>
</p>

<p>----------</p>
<pre>
# xóa tài khoản của một quản trị viên
DELETE {tên miền của bạn}/vegetable-website/server/admin.php?id={Mã quản trị viên}

</pre>


<br>

<h4>companyInfo.php</h4>
<p>Chức năng: Quản lý thông tin công ty.</p>
<p>Yêu cầu: phải đăng nhập trước khi sử dụng phương thức PUT.</p>
<p>----------</p>
<pre>
# lấy thông tin công ty
GET {tên miền của bạn}/vegetable-website/server/companyInfo.php

</pre>
<p><i>Phản hồi thông tin công ty (mẫu):</i></p>
<p>
<pre>
<code>
{
  "lock": "X",
  "TenCongTy": "Măng Non Corporation",
  "Email": "mangnon@admin.com",
  "SoDienThoai": "0897562341",
  "DiaChi": "TP. HCM",
  "NgayTao": "2023-03-22 02:37:19"
}
</code>
</pre>
</p>

<p>----------</p>
<pre>
# sửa thông tin công ty
PUT {tên miền của bạn}/vegetable-website/server/companyInfo.php
Content-Type: application/x-www-form-urlencoded

company_name={Tên công ty}&email={Email công ty}&phone_number={Số điện thoại công ty}&address={Địa chỉ công ty}

</pre>

<br>

<h4>contact.php</h4>
<p>Chức năng: Quản lý liên hệ của khách hàng.</p>
<p>Yêu cầu: phải đăng nhập trước khi sử dụng phương thức GET DELETE.</p>
<p>----------</p>
<pre>
# lấy các liên hệ của khách hàng
GET {tên miền của bạn}/vegetable-website/server/contact.php

</pre>
<p><i>Phản hồi liên hệ của khách hàng (mẫu):</i></p>
<p>
<pre>
<code>
{
  "items": [
    {
      "MaKhachHang": "1",
      "hovaten": "Duy Nguyễn",
      "sodienthoai": "0985645741",
      "email": "duyduy@gmail.com",
      "MaLienHe": "1",
      "TieuDe": "Mua Bắp",
      "NoiDung": "Tôi muốn mua bắp",
      "NgayLienHe": "2023-03-22 02:37:23"
    },
    {
      "MaKhachHang": "2",
      "hovaten": "Trần Tân",
      "sodienthoai": "0987548562",
      "email": "tandeptrai@gmail.com",
      "MaLienHe": "2",
      "TieuDe": "Mua Khoai",
      "NoiDung": "Tôi muốn mua khoai",
      "NgayLienHe": "2023-03-22 02:37:23"
    },
    {
      "MaKhachHang": "4",
      "hovaten": "Nguyễn Ngọc Hạ An",
      "sodienthoai": "0926431975",
      "email": "Haan512@gmail.com",
      "MaLienHe": "4",
      "TieuDe": "Mua Cải bó xôi",
      "NoiDung": "Tôi muốn mua cải bó xôi",
      "NgayLienHe": "2023-03-22 02:37:23"
    }
  ],
  "status": true
}
</code>
</pre>
</p>
<p>----------</p>
<pre>
# xóa thông tin khách hàng và toàn bộ thư liên lạc của người đó
DELETE {tên miền của bạn}/vegetable-website/server/contact.php?method=customer&id={Mã khách hàng}

</pre>
<p>----------</p>
<pre>
# xóa thư liên lạc của một khách hàng
DELETE {tên miền của bạn}/vegetable-website/server/contact.php?method=message&id={Mã thư}

</pre>

<br>

<h4>productType.php</h4>
<p>Chức năng: Quản lý loại thực phẩm.</p>
<p>Yêu cầu: phải đăng nhập trước khi sử dụng phương thức POST PUT DELETE.</p>
<p>----------</p>
<pre>
# lấy thông tin các loại thực phẩm
GET {tên miền của bạn}/vegetable-website/server/productType.php

</pre>
<p><i>Phản hồi loại thực phẩm (mẫu):</i></p>
<p>
<pre>
<code>
{
  "items": [
    {
      "MaLoaiThucPham": "1",
      "LoaiThucPham": "Rau",
      "NgayTao": "2023-03-22 02:37:23"
    },
    {
      "MaLoaiThucPham": "2",
      "LoaiThucPham": "Trái Cây",
      "NgayTao": "2023-03-22 02:37:23"
    },
    {
      "MaLoaiThucPham": "3",
      "LoaiThucPham": "Củ",
      "NgayTao": "2023-03-22 02:37:24"
    }
  ],
  "status": true
}
</code>
</pre>
</p>
<p>----------</p>
<pre>
# thêm loại thực phẩm
POST {tên miền của bạn}/vegetable-website/server/productType.php
Content-Type: application/x-www-form-urlencoded

product_type={Loại thực phẩm}

</pre>

<p>----------</p>
<pre>
# sửa loại thực phẩm
PUT {tên miền của bạn}/vegetable-website/server/productType.php
Content-Type: application/x-www-form-urlencoded

product_type={Loại thực phẩm}&id={Mã loại thực phẩm}

</pre>
<p>----------</p>
<pre>
# xóa loại thực phẩm
DELETE {tên miền của bạn}/vegetable-website/server/productType.php&id={Mã loại thực phẩm}

</pre>
