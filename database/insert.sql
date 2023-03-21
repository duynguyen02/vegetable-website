-- ### khach hang ###
INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (1, 'Duy Nguyễn', '0985645741', 'duyduy@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (2, 'Trần Tân', '0987548562', 'tandeptrai@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (3, 'Trần Ngọc Mẫn Nhi', '0994618762', 'mannhi@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (4, 'Nguyễn Ngọc Hạ An', '0926431975', 'Haan512@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (5, 'Hạ Đình Phong', '0962439157', 'dinhphong@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (6, 'Nguyễn Thị Xuân Hương', '0965197854', 'nguyenxuanhuong@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (7, 'Trần Ngọc Hà', '0958134975', 'ngocha@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (8, 'Võ Thị Thuý Diễm', '0949763154', 'ThuyDiem@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (9, 'Nguyễn Xuân Bình', '0946137825', 'nguyenbinh@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (10, 'Nguyễn Hải Vân', '0985642487', 'Haivan@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (11, 'Nguyễn Hoàng Thanh Vân', '0963154982', 'ThanhVan@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (12, 'Nguyễn Ngọc Thuỳ Linh', '0345629784', 'ThuyLinh@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (13, 'Nguyễn Ngọc Hoàng Kim', '0399841362', 'hoangkim@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (14, 'Nguyễn Thị Trâm Anh', '0955416792', 'TramAnh@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (15, 'Trần Phạm Hải Anh', '0334167845', 'HaiAnhh@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (16, 'Nguyễn Phạm Xuân Hương ', '0942641973', 'XuanHuong1111@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (17, 'Nguyễn Ngọc Hiếu', '0956149218', 'NgocHieu@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (18, 'Phạm Ngọc Thu', '0944513754', 'ThuNgocc@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (19, 'Nguyễn Thanh Ngọc', '0312954688', 'ThanhNgoc@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (20, 'Trần Ngọc Huyền Trang', '0977821649', 'HuyenTrang1405@gmail.com');

INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email)
VALUES (21, 'Trần Thị Tuyết Nhi', '0355281649', 'TuyetNhi@gmail.com');


-- ### Lien He ###
INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (1, 'Mua Bắp', NOW(), 'Tôi muốn mua bắp', 1);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (2, 'Mua Khoai', NOW(), 'Tôi muốn mua khoai', 2);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (3, 'Mua Bắp Cải', NOW(), 'Tôi muốn mua bắp cải', 3);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (4, 'Mua Cải bó xôi', NOW(), 'Tôi muốn mua cải bó xôi', 4);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (5, 'Mua Cà rốt', NOW(), 'Tôi muốn mua cà rốt', 5);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (6, 'Mua Khoai Tây', NOW(), 'Tôi muốn mua khoai tây', 6);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (7, 'Mua Bí ngô', NOW(), 'Tôi muốn mua bí ngô', 7);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (8, 'Mua rau mồng tơi', NOW(), 'Tôi muốn mua rau mồng tơi', 8);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (9, 'Mua rau diếp cá', NOW(), 'Tôi muốn mua rau diếp cá', 9);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (10, 'Mua cải xoong', NOW(), 'Tôi muốn mua cải xoong', 10);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (11, 'Mua bí đao', NOW(), 'Tôi muốn mua bí đao', 11);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (12, 'Mua rau má', NOW(), 'Tôi muốn mua rau má', 12);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (13, 'Mua rau cải xoăn', NOW(), 'Tôi muốn mua rau cải xoăn', 13);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (14, 'Mua ra muống', NOW(), 'Tôi muốn mua rau muống', 14);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (15, 'Mua củ cải đỏ', NOW(), 'Tôi muốn mua củ cải đỏ', 15);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (16, 'Mua măng tây', NOW(), 'Tôi muốn mua măng tây', 16);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (17, 'Mua nấm kim chi', NOW(), 'Tôi muốn mua nấm kim chi', 17);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (18, 'Mua nấm trâm vàng', NOW(), 'Tôi muốn mua nấm trâm vàng', 18);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (19, 'Mua nấm kim châm', NOW(), 'Tôi muốn mua nấm kim châm', 19);

INSERT INTO LienHe (MaLienHe, TieuDe, NgayLienHe, NoiDung, MaKhachHang)
VALUES (20, 'Mua nấm hoàng đế', NOW(), 'Tôi muốn mua nấm hoàng đế', 20);


-- ### loai thuc pham ###
INSERT INTO LoaiThucPham (MaLoaiThucPham, LoaiThucPham, NgayTao)
VALUES (1, 'Rau', NOW());

INSERT INTO LoaiThucPham (MaLoaiThucPham, LoaiThucPham, NgayTao)
VALUES (2, 'Trái Cây', NOW());

INSERT INTO LoaiThucPham (MaLoaiThucPham, LoaiThucPham, NgayTao)
VALUES (3, 'Củ', NOW());


-- ### noi san xuat ###

INSERT INTO NoiSanXuat (MaNoiSanXuat, CongTySanXuat, DiaChi, NgayTao)
VALUES (1, 'Thiên Hạ Ngũ Tuyệt Group ', 'TP Hồ Chí Minh', NOW());

INSERT INTO NoiSanXuat (MaNoiSanXuat, CongTySanXuat, DiaChi, NgayTao)
VALUES (2, 'Vegetable Group', 'Đà Lạt', NOW());

INSERT INTO NoiSanXuat (MaNoiSanXuat, CongTySanXuat, DiaChi, NgayTao)
VALUES (3, 'Đông Tà Group', 'Long Khánh', NOW());

INSERT INTO NoiSanXuat (MaNoiSanXuat, CongTySanXuat, DiaChi, NgayTao)
VALUES (4, 'Trung Thần Thông Group', 'Bình Tân', NOW());

INSERT INTO NoiSanXuat (MaNoiSanXuat, CongTySanXuat, DiaChi, NgayTao)
VALUES (5, 'Bắc Cái Group', 'Quận 12', NOW());

INSERT INTO NoiSanXuat (MaNoiSanXuat, CongTySanXuat, DiaChi, NgayTao)
VALUES (6, 'Tây Độc Group', 'Quận 7', NOW());

INSERT INTO NoiSanXuat (MaNoiSanXuat, CongTySanXuat, DiaChi, NgayTao)
VALUES (7, 'Nam Đế Group', 'Hà Nội', NOW());
