-- # Tệp khởi tạo CSDL.
-- # Vui lòng thực thi tệp này
-- # trước khi thực thi (nếu muốn) tệp insert.sql

DROP DATABASE IF EXISTS vegetable_showroom;

CREATE DATABASE vegetable_showroom CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE vegetable_showroom;

CREATE TABLE NoiSanXuat
(
    MaNoiSanXuat  INT AUTO_INCREMENT,
    CongTySanXuat VARCHAR (255) NOT NULL,
    DiaChi        VARCHAR (255) NOT NULL,
    NgayTao       DATETIME     NOT NULL,
    PRIMARY KEY (MaNoiSanXuat)
);
CREATE TABLE LoaiThucPham
(
    MaLoaiThucPham INT AUTO_INCREMENT,
    LoaiThucPham   VARCHAR (255) NOT NULL,
    NgayTao        DATETIME     NOT NULL,
    PRIMARY KEY (MaLoaiThucPham)
);

CREATE TABLE ThucPham
(
    MaThucPham     INT AUTO_INCREMENT,
    ThucPham       VARCHAR (255) NOT NULL,
    MoTa           TEXT,
    MauSac         VARCHAR (255) NOT NULL,
    KichThuoc      VARCHAR (255) NOT NULL,
    HinhDang       VARCHAR (255) NOT NULL,
    ViTriHinhAnh   TEXT         NOT NULL,
    NgayTao        DATETIME     NOT NULL,

    MaNoiSanXuat   INT,
    MaLoaiThucPham INT,
    CONSTRAINT FK_MaNoiSanXuat FOREIGN KEY (MaNoiSanXuat) REFERENCES NoiSanXuat (MaNoiSanXuat) ON DELETE SET NULL,
    CONSTRAINT FK_MaLoaiThucPham FOREIGN KEY (MaLoaiThucPham) REFERENCES LoaiThucPham (MaLoaiThucPham) ON DELETE SET NULL,
    PRIMARY KEY (MaThucPham)
);


CREATE TABLE QuanTriVien
(
    MaTaiKhoan INT AUTO_INCREMENT,
    MatKhau    VARCHAR(255)        NOT NULL,
    Email      VARCHAR(255) UNIQUE NOT NULL,
    NgayTao    DATETIME            NOT NULL,
    PRIMARY KEY (MaTaiKhoan)
);

CREATE TABLE ThongTinCongTy
(
    `lock` enum('X') NOT NULL,
    TenCongTy   VARCHAR(255) NOT NULL,
    Email       VARCHAR(255) NOT NULL,
    SoDienThoai VARCHAR(255) NOT NULL,
    DiaChi      VARCHAR(255) NOT NULL,
    NgayTao     DATETIME     NOT NULL,

    CONSTRAINT PK_T1 PRIMARY KEY (`lock`)
);


CREATE TABLE KhachHang
(
    MaKhachHang INT AUTO_INCREMENT,
    HoVaTen     VARCHAR(255) NOT NULL,
    SoDienThoai VARCHAR(255) NOT NULL,
    Email       VARCHAR(255) NOT NULL,
    PRIMARY KEY (MaKhachHang)
);

CREATE TABLE LienHe
(
    MaLienHe    INT AUTO_INCREMENT,
    TieuDe      VARCHAR(255) NOT NULL,
    NgayLienHe  DATETIME     NOT NULL,
    NoiDung     TEXT         NOT NULL,
    PRIMARY KEY (MaLienHe),

    MaKhachHang INT,
    CONSTRAINT FK_MaKhachHang FOREIGN KEY (MaKhachHang) REFERENCES KhachHang (MaKhachHang) ON DELETE CASCADE
);

INSERT INTO QuanTriVien(MatKhau, Email, NgayTao)
VALUES (SHA1('123456'),
        'admin@admin.com',
        NOW());

INSERT INTO ThongTinCongTy(`lock`, TenCongTy, Email, SoDienThoai, DiaChi, NgayTao)
VALUES ('X',
        'Tiānxià Wǔjué Corporation',
        'tianxiawujue@admin.com',
        '0897562341',
        'TP. HCM',
        NOW());