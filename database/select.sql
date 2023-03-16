SELECT MaTaiKhoan FROM QuanTriVien WHERE MaTaiKhoan = '1';

SELECT MaTaiKhoan FROM QuanTriVien WHERE  Email = 'admin@admin.com' AND MatKhau = SHA1('456789');

UPDATE QuanTriVien
SET MatKhau = SHA1('456789')
WHERE Email = 'admin@admin.com';