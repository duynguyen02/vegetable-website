# them quan tri vien
INSERT INTO QuanTriVien(MatKhau, Email, NgayTao)
VALUES (
        SHA1('123456'),
        'admin@admin.com',
        NOW()
       );

# them khach hang
INSERT INTO KhachHang(HoVaTen, SoDienThoai, Email)
VALUES (
        'Duy Nguyen',
        '0957654845',
        'st@st.com'
       );

# them tin nhan khach hang
INSERT INTO LienHe(TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (
        'Mua Ca Chua',
        NOW(),
        'Toi muon mua ca chua',
        1
       );

# them loai thuc pham
INSERT INTO LoaiThucPham(LoaiThucPham, NgayTao)
VALUES (
        'Rau',
        NOW()
       );

# them noi san xuat
INSERT INTO NoiSanXuat(CongTySanXuat, DiaChi, NgayTao)
VALUES (
        'Thuc pham xanh',
        'TPHCM',
        NOW()
       );

# them thong tin cong ty
INSERT INTO ThongTinCongTy(`lock`, TenCongTy, Email, SoDienThoai, DiaChi, NgayTao)
VALUES (
        'X',
        'Tiānxià Wǔjué Corporation',
        'tianxiawujue@admin.com',
        '0897562341',
        'TP. HCM',
        NOW()
       );


