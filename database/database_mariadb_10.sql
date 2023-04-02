-- # Tệp khởi tạo CSDL.
-- # Vui lòng thực thi tệp này

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

INSERT INTO `KhachHang` VALUES (1,'Duy Nguyễn','0985645741','duyduy@gmail.com'),(2,'Trần Tân','0987548562','tandeptrai@gmail.com'),(3,'Trần Ngọc Mẫn Nhi','0994618762','mannhi@gmail.com'),(4,'Nguyễn Ngọc Hạ An','0926431975','Haan512@gmail.com'),(5,'Hạ Đình Phong','0962439157','dinhphong@gmail.com'),(6,'Nguyễn Thị Xuân Hương','0965197854','nguyenxuanhuong@gmail.com'),(7,'Trần Ngọc Hà','0958134975','ngocha@gmail.com'),(8,'Võ Thị Thuý Diễm','0949763154','ThuyDiem@gmail.com'),(9,'Nguyễn Xuân Bình','0946137825','nguyenbinh@gmail.com'),(10,'Nguyễn Hải Vân','0985642487','Haivan@gmail.com'),(11,'Nguyễn Hoàng Thanh Vân','0963154982','ThanhVan@gmail.com'),(12,'Nguyễn Ngọc Thuỳ Linh','0345629784','ThuyLinh@gmail.com'),(13,'Nguyễn Ngọc Hoàng Kim','0399841362','hoangkim@gmail.com'),(14,'Nguyễn Thị Trâm Anh','0955416792','TramAnh@gmail.com'),(15,'Trần Phạm Hải Anh','0334167845','HaiAnhh@gmail.com'),(16,'Nguyễn Phạm Xuân Hương ','0942641973','XuanHuong1111@gmail.com'),(17,'Nguyễn Ngọc Hiếu','0956149218','NgocHieu@gmail.com'),(18,'Phạm Ngọc Thu','0944513754','ThuNgocc@gmail.com'),(19,'Nguyễn Thanh Ngọc','0312954688','ThanhNgoc@gmail.com'),(20,'Trần Ngọc Huyền Trang','0977821649','HuyenTrang1405@gmail.com'),(21,'Trần Thị Tuyết Nhi','0355281649','TuyetNhi@gmail.com');

INSERT INTO `LienHe` VALUES (1,'Mua Bắp','2023-03-29 17:35:56','Tôi muốn mua bắp',1),(2,'Mua Khoai','2023-03-29 17:35:56','Tôi muốn mua khoai',2),(3,'Mua Bắp Cải','2023-03-29 17:35:56','Tôi muốn mua bắp cải',3),(4,'Mua Cải bó xôi','2023-03-29 17:35:56','Tôi muốn mua cải bó xôi',4),(5,'Mua Cà rốt','2023-03-29 17:35:56','Tôi muốn mua cà rốt',5),(6,'Mua Khoai Tây','2023-03-29 17:35:56','Tôi muốn mua khoai tây',6),(7,'Mua Bí ngô','2023-03-29 17:35:56','Tôi muốn mua bí ngô',7),(8,'Mua rau mồng tơi','2023-03-29 17:35:56','Tôi muốn mua rau mồng tơi',8),(9,'Mua rau diếp cá','2023-03-29 17:35:56','Tôi muốn mua rau diếp cá',9),(10,'Mua cải xoong','2023-03-29 17:35:56','Tôi muốn mua cải xoong',10),(11,'Mua bí đao','2023-03-29 17:35:56','Tôi muốn mua bí đao',11),(12,'Mua rau má','2023-03-29 17:35:56','Tôi muốn mua rau má',12),(13,'Mua rau cải xoăn','2023-03-29 17:35:56','Tôi muốn mua rau cải xoăn',13),(14,'Mua ra muống','2023-03-29 17:35:56','Tôi muốn mua rau muống',14),(15,'Mua củ cải đỏ','2023-03-29 17:35:56','Tôi muốn mua củ cải đỏ',15),(16,'Mua măng tây','2023-03-29 17:35:56','Tôi muốn mua măng tây',16),(17,'Mua nấm kim chi','2023-03-29 17:35:56','Tôi muốn mua nấm kim chi',17),(18,'Mua nấm trâm vàng','2023-03-29 17:35:56','Tôi muốn mua nấm trâm vàng',18),(19,'Mua nấm kim châm','2023-03-29 17:35:57','Tôi muốn mua nấm kim châm',19),(20,'Mua nấm hoàng đế','2023-03-29 17:35:57','Tôi muốn mua nấm hoàng đế',20);

INSERT INTO `LoaiThucPham` VALUES (1,'Rau','2023-03-29 17:35:57'),(2,'Trái Cây','2023-03-29 17:35:57'),(3,'Củ','2023-03-29 17:35:57'),(4,'Hạt','2023-03-29 18:01:52'),(5,'Nấm','2023-03-29 18:53:52');

INSERT INTO `NoiSanXuat` VALUES (1,'Thiên Hạ Ngũ Tuyệt Group ','TP Hồ Chí Minh','2023-03-29 17:35:57'),(2,'Vegetable Group','Đà Lạt','2023-03-29 17:35:57'),(3,'Đông Tà Group','Long Khánh','2023-03-29 17:35:57'),(4,'Trung Thần Thông Group','Bình Tân','2023-03-29 17:35:57'),(5,'Bắc Cái Group','Quận 12','2023-03-29 17:35:57'),(6,'Tây Độc Group','Quận 7','2023-03-29 17:35:57'),(7,'Nam Đế Group','Hà Nội','2023-03-29 17:35:57');

INSERT INTO `QuanTriVien` VALUES (1,'7c4a8d09ca3762af61e59520943dc26494f8941b','admin@admin.com','2023-03-29 17:35:42');

INSERT INTO `ThongTinCongTy` VALUES ('X','Tiānxià Wǔjué Corporation','tianxiawujue@admin.com','0897562341','TP. HCM','2023-03-29 17:35:42');

INSERT INTO `ThucPham` VALUES (2,'Mòng Tơi','Rau mồng tơi là loại rau xanh bản địa của Đông Nam Á, phổ biến trong ẩm thực Việt Nam. Rau mồng tơi có lá mềm, thanh mát, có hương vị độc đáo và dinh dưỡng cao. Rau mồng tơi cung cấp nhiều vitamin và khoáng chất, đặc biệt là chất xơ, giúp cải thiện tiêu hóa và hỗ trợ sức khỏe tim mạch. Rau mồng tơi cũng được dùng để chế biến các món ăn như canh, nước lèo, salad, xào, nấu cháo và nhiều món khác. Với những người thực sự yêu đồ ăn xanh và sạch, rau mồng tơi là một lựa chọn hoàn hảo.','Xanh','Không','Bó','uploads/1VXIUFQuSm.jpg','2023-03-29 17:56:20',1,1),(3,'Dưa Hấu','Dưa hấu là một loại quả giàu dinh dưỡng và được ưa chuộng trên khắp thế giới. Với vị ngọt thanh mát và độ giòn của thịt, dưa hấu được coi là một loại thực phẩm giải nhiệt tuyệt vời trong những ngày nắng nóng. Ngoài ra, dưa hấu còn chứa nhiều vitamin, chất xơ và chất chống oxy hóa có ích cho sức khỏe. Dưa hấu có nhiều loại khác nhau, có thể có vỏ màu xanh hoặc màu vàng, thịt màu đỏ hoặc trắng tùy vào giống. Dưa hấu là một loại quả dễ trồng và phổ biến ở các khu vực nhiệt đới.','Xanh Thẵm','Đường kính khoảng 15-25cm','Cầu','uploads/j1IzbkLOAf.webp','2023-03-29 17:59:09',2,2),(4,'Đậu Hà Lan','Đậu hà lan là một loại rau quả được trồng phổ biến ở các nước châu Âu. Nó có màu xanh lá cây, hình dáng đặc trưng là những bông hoa nhỏ có cuống dài. Đậu hà lan chứa nhiều vitamin và khoáng chất như vitamin C, vitamin K, folate, kali, chất xơ và protein, giúp cải thiện sức khỏe tim mạch, hỗ trợ tiêu hóa và tăng cường miễn dịch. Ngoài ra, đậu hà lan cũng được sử dụng rộng rãi trong các món ăn như salad, soup hay ăn sống kèm với các loại xốt khác nhau. Với hương vị tuyệt vời và những lợi ích về sức khỏe, đậu hà lan là một loại rau hoàn hảo cho một chế độ ăn uống lành mạnh.','Xanh','Không','Viên','uploads/zFxDKO26BP.jpg','2023-03-29 18:02:47',3,4),(5,'Táo Rose Mỹ','Táo rất giàu chất xơ, vitamin C và chất chống oxy hóa khác nhau. Nghiên cứu cho thấy rằng ăn táo có nhiều lợi ích sức khỏe. Táo có một hương vị thơm ngon riêng và thường được ăn chưa qua chế biến, nó có thể sử dụng làm nước ép trái cây, các món ăn lạ miệng.\r\nMột quả táo cỡ trung bình chỉ chứa 95 calo, với hầu hết năng lượng đến từ carbs.','Đỏ','3,5cm – 4cm/quả.','Hình trứng xuôi, hình trứng ngược, tròn, thuôn dài','uploads/jMmu3A1fyy.jpg','2023-03-29 18:36:27',3,2),(6,'Táo Xanh','Táo chủ yếu được tạo thành từ Carbohydrate và nước, rất giàu các loại đường đơn như fructose, sucrose, glucose. Mặc dù táo chứa carbohydrate và đường cao, những chỉ số đường huyết thấp, dao động 29-44.\r\n\r\nChỉ số đường huyết của thực phẩm ảnh hưởng đến sự gia tăng lượng đường trong máu sau khi ăn, giá trị thấp có liên quan với những lợi ích sức khỏe khác nha. Trái cây thường có điểm số thấp về chỉ số đường huyết, có thể là do chất xơ cao và hàm lượng polyphenol giúp làm chậm quá trình tiêu hóa carbohydrat.','Xanh','3,5cm – 4cm/quả.','Hình trứng xuôi, hình trứng ngược, tròn, thuôn dài','uploads/9ivSMCEVYS.webp','2023-03-29 18:49:24',6,2),(7,'Nấm Rơm','Nấm rơm là một loại nấm phổ biến được tìm thấy trên các vùng đất trồng lúa và ngô. Đây là một loại nấm có hình dáng hình tròn, màu trắng hoặc xám nhạt, khi thu hoạch thì có đường kính khoảng 4-6cm. Nấm rơm chứa nhiều chất dinh dưỡng và protit, giúp tăng cường sức khỏe và chống oxy hóa. Nấm rơm có thể được sử dụng trong nhiều món ăn, từ món chiên, xào đến các loại nước lèo và các món trộn. Ngoài thành phần dinh dưỡng, nấm rơm còn được xem là một loại thực phẩm chức năng, giúp tăng cường sức khỏe và cải thiện hệ miễn dịch của cơ thể.','Trắng hoặc xám nhạt','Đường kính 4 - 6cm','Núm, tròn hoặc bán cầu dẹp','uploads/U8LUWxDd44.webp','2023-03-29 18:53:43',4,5);

