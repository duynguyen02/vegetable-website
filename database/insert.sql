SELECT * FROM QuanTriVien;

INSERT INTO QuanTriVien(MatKhau, Email, NgayTao)
VALUES (
        SHA1('123456'),
        'admin@admin.com',
        NOW()
       )