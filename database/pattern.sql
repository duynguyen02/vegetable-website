# Các mẫu truy vấn sử dụng
# trong quá trình phát triển API
# Vui lòng không thực thi vào CSDL

### khach hang ###
SELECT *
FROM vegetable_showroom.KhachHang;

INSERT INTO vegetable_showroom.KhachHang (HoVaTen, SoDienThoai, Email)
VALUES ('Thien Quan', '0957654845', 'st@st.com');

DELETE
FROM vegetable_showroom.KhachHang
WHERE MaKhachHang = 4;

### lien he ###
INSERT INTO vegetable_showroom.LienHe (TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES ('Mua Rau', null, 'Toi muon mua rau', 4);

DELETE
FROM vegetable_showroom.LienHe
WHERE MaLienHe = 1;

### loai thuc pham ###

SELECT *
FROM LoaiThucPham;

INSERT INTO vegetable_showroom.LoaiThucPham (LoaiThucPham, NgayTao)
VALUES ('Rau', NOW());

UPDATE vegetable_showroom.LoaiThucPham t
SET t.LoaiThucPham = 'Rau'
WHERE t.MaLoaiThucPham = 1;

DELETE
FROM vegetable_showroom.LoaiThucPham
WHERE MaLoaiThucPham = 1;


### noi san xuat ###
SELECT *
FROM NoiSanXuat;

INSERT INTO vegetable_showroom.NoiSanXuat (CongTySanXuat, DiaChi, NgayTao)
VALUES ('Tan Ngoc Group', 'TP. HCM', NOW());

UPDATE vegetable_showroom.NoiSanXuat t
SET t.CongTySanXuat = 'Tan Ngoc Group',
    t.DiaChi        = 'TP. HCM '
WHERE t.MaNoiSanXuat = 1;

DELETE
FROM vegetable_showroom.NoiSanXuat
WHERE MaNoiSanXuat = 1;

### quan tri vien ###

INSERT INTO vegetable_showroom.QuanTriVien (MatKhau, Email, NgayTao)
VALUES (SHA1('123456'), 'admin@admin2.com', '2023-03-19 00:49:55');

UPDATE vegetable_showroom.QuanTriVien t
SET t.MatKhau = '7c4a8d09ca3762af61e59520943dc26494f8941b1',
    t.Email   = 'admin@admin.comh',
    t.NgayTao = '2023-03-19 00:39:18'
WHERE t.MaTaiKhoan = 1;

DELETE
FROM vegetable_showroom.QuanTriVien
WHERE MaTaiKhoan = 2;


### thuc pham ###

INSERT INTO vegetable_showroom.ThucPham (ThucPham, MauSac, KichThuoc, HinhDang, ViTriHinhAnh, NgayTao, MaNoiSanXuat,
                                         MaLoaiThucPham)
VALUES ('v', 'v', 'v', 'v', 'v', '2023-03-19 00:52:34', null, null);

UPDATE vegetable_showroom.ThucPham t
SET t.ThucPham       = 'vq',
    t.MauSac         = '3',
    t.KichThuoc      = '44',
    t.HinhDang       = '44',
    t.ViTriHinhAnh   = '44',
    t.MaNoiSanXuat   = 2,
    t.MaLoaiThucPham = 2
WHERE t.MaThucPham = 1;

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (45, 'hihi', '03215485', 'er@gmail.com');

SELECT KhachHang.MaKhachHang, KhachHang.hovaten, KhachHang.sodienthoai, KhachHang.email,
    LienHe.TieuDe, LienHe.NoiDung, LienHe.NgayLienHe
FROM KhachHang
         INNER JOIN LienHe on KhachHang.MaKhachHang = LienHe.MaKhachHang;


SELECT ThucPham.MaThucPham, ThucPham.ThucPham, ThucPham.MauSac, ThucPham.KichThuoc, ThucPham.HinhDang, ThucPham.ViTriHinhAnh, ThucPham.NgayTao, noisanxuat.CongTySanXuat, noisanxuat.DiaChi, loaithucpham.LoaiThucPham
FROM ThucPham
INNER JOIN noisanxuat  ON noisanxuat.MaNoiSanXuat = ThucPham.MaNoiSanXuat
INNER JOIN loaithucpham ON loaithucpham.MaLoaiThucPham = ThucPham.MaLoaiThucPham;