-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: vegetable_showroom
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `KhachHang`
--

DROP TABLE IF EXISTS `KhachHang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `KhachHang` (
  `MaKhachHang` int NOT NULL AUTO_INCREMENT,
  `HoVaTen` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `SoDienThoai` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MaKhachHang`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KhachHang`
--

LOCK TABLES `KhachHang` WRITE;
/*!40000 ALTER TABLE `KhachHang` DISABLE KEYS */;
INSERT INTO `KhachHang` VALUES (1,'Duy Nguyễn','0985645741','duyduy@gmail.com'),(2,'Trần Tân','0987548562','tandeptrai@gmail.com'),(3,'Trần Ngọc Mẫn Nhi','0994618762','mannhi@gmail.com'),(4,'Nguyễn Ngọc Hạ An','0926431975','Haan512@gmail.com'),(5,'Hạ Đình Phong','0962439157','dinhphong@gmail.com'),(6,'Nguyễn Thị Xuân Hương','0965197854','nguyenxuanhuong@gmail.com'),(7,'Trần Ngọc Hà','0958134975','ngocha@gmail.com'),(8,'Võ Thị Thuý Diễm','0949763154','ThuyDiem@gmail.com'),(9,'Nguyễn Xuân Bình','0946137825','nguyenbinh@gmail.com'),(10,'Nguyễn Hải Vân','0985642487','Haivan@gmail.com'),(11,'Nguyễn Hoàng Thanh Vân','0963154982','ThanhVan@gmail.com'),(12,'Nguyễn Ngọc Thuỳ Linh','0345629784','ThuyLinh@gmail.com'),(13,'Nguyễn Ngọc Hoàng Kim','0399841362','hoangkim@gmail.com'),(14,'Nguyễn Thị Trâm Anh','0955416792','TramAnh@gmail.com'),(15,'Trần Phạm Hải Anh','0334167845','HaiAnhh@gmail.com'),(16,'Nguyễn Phạm Xuân Hương ','0942641973','XuanHuong1111@gmail.com'),(17,'Nguyễn Ngọc Hiếu','0956149218','NgocHieu@gmail.com'),(18,'Phạm Ngọc Thu','0944513754','ThuNgocc@gmail.com'),(19,'Nguyễn Thanh Ngọc','0312954688','ThanhNgoc@gmail.com'),(20,'Trần Ngọc Huyền Trang','0977821649','HuyenTrang1405@gmail.com'),(21,'Trần Thị Tuyết Nhi','0355281649','TuyetNhi@gmail.com');
/*!40000 ALTER TABLE `KhachHang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LienHe`
--

DROP TABLE IF EXISTS `LienHe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LienHe` (
  `MaLienHe` int NOT NULL AUTO_INCREMENT,
  `TieuDe` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NgayLienHe` datetime NOT NULL,
  `NoiDung` text COLLATE utf8mb4_general_ci NOT NULL,
  `MaKhachHang` int DEFAULT NULL,
  PRIMARY KEY (`MaLienHe`),
  KEY `FK_MaKhachHang` (`MaKhachHang`),
  CONSTRAINT `FK_MaKhachHang` FOREIGN KEY (`MaKhachHang`) REFERENCES `KhachHang` (`MaKhachHang`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LienHe`
--

LOCK TABLES `LienHe` WRITE;
/*!40000 ALTER TABLE `LienHe` DISABLE KEYS */;
INSERT INTO `LienHe` VALUES (1,'Mua Bắp','2023-03-29 17:35:56','Tôi muốn mua bắp',1),(2,'Mua Khoai','2023-03-29 17:35:56','Tôi muốn mua khoai',2),(3,'Mua Bắp Cải','2023-03-29 17:35:56','Tôi muốn mua bắp cải',3),(4,'Mua Cải bó xôi','2023-03-29 17:35:56','Tôi muốn mua cải bó xôi',4),(5,'Mua Cà rốt','2023-03-29 17:35:56','Tôi muốn mua cà rốt',5),(6,'Mua Khoai Tây','2023-03-29 17:35:56','Tôi muốn mua khoai tây',6),(7,'Mua Bí ngô','2023-03-29 17:35:56','Tôi muốn mua bí ngô',7),(8,'Mua rau mồng tơi','2023-03-29 17:35:56','Tôi muốn mua rau mồng tơi',8),(9,'Mua rau diếp cá','2023-03-29 17:35:56','Tôi muốn mua rau diếp cá',9),(10,'Mua cải xoong','2023-03-29 17:35:56','Tôi muốn mua cải xoong',10),(11,'Mua bí đao','2023-03-29 17:35:56','Tôi muốn mua bí đao',11),(12,'Mua rau má','2023-03-29 17:35:56','Tôi muốn mua rau má',12),(13,'Mua rau cải xoăn','2023-03-29 17:35:56','Tôi muốn mua rau cải xoăn',13),(14,'Mua ra muống','2023-03-29 17:35:56','Tôi muốn mua rau muống',14),(15,'Mua củ cải đỏ','2023-03-29 17:35:56','Tôi muốn mua củ cải đỏ',15),(16,'Mua măng tây','2023-03-29 17:35:56','Tôi muốn mua măng tây',16),(17,'Mua nấm kim chi','2023-03-29 17:35:56','Tôi muốn mua nấm kim chi',17),(18,'Mua nấm trâm vàng','2023-03-29 17:35:56','Tôi muốn mua nấm trâm vàng',18),(19,'Mua nấm kim châm','2023-03-29 17:35:57','Tôi muốn mua nấm kim châm',19),(20,'Mua nấm hoàng đế','2023-03-29 17:35:57','Tôi muốn mua nấm hoàng đế',20);
/*!40000 ALTER TABLE `LienHe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LoaiThucPham`
--

DROP TABLE IF EXISTS `LoaiThucPham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LoaiThucPham` (
  `MaLoaiThucPham` int NOT NULL AUTO_INCREMENT,
  `LoaiThucPham` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NgayTao` datetime NOT NULL,
  PRIMARY KEY (`MaLoaiThucPham`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LoaiThucPham`
--

LOCK TABLES `LoaiThucPham` WRITE;
/*!40000 ALTER TABLE `LoaiThucPham` DISABLE KEYS */;
INSERT INTO `LoaiThucPham` VALUES (1,'Rau','2023-03-29 17:35:57'),(2,'Trái Cây','2023-03-29 17:35:57'),(3,'Củ','2023-03-29 17:35:57'),(4,'Hạt','2023-03-29 18:01:52'),(5,'Nấm','2023-03-29 18:53:52');
/*!40000 ALTER TABLE `LoaiThucPham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NoiSanXuat`
--

DROP TABLE IF EXISTS `NoiSanXuat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NoiSanXuat` (
  `MaNoiSanXuat` int NOT NULL AUTO_INCREMENT,
  `CongTySanXuat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DiaChi` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NgayTao` datetime NOT NULL,
  PRIMARY KEY (`MaNoiSanXuat`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NoiSanXuat`
--

LOCK TABLES `NoiSanXuat` WRITE;
/*!40000 ALTER TABLE `NoiSanXuat` DISABLE KEYS */;
INSERT INTO `NoiSanXuat` VALUES (1,'Thiên Hạ Ngũ Tuyệt Group ','TP Hồ Chí Minh','2023-03-29 17:35:57'),(2,'Vegetable Group','Đà Lạt','2023-03-29 17:35:57'),(3,'Đông Tà Group','Long Khánh','2023-03-29 17:35:57'),(4,'Trung Thần Thông Group','Bình Tân','2023-03-29 17:35:57'),(5,'Bắc Cái Group','Quận 12','2023-03-29 17:35:57'),(6,'Tây Độc Group','Quận 7','2023-03-29 17:35:57'),(7,'Nam Đế Group','Hà Nội','2023-03-29 17:35:57');
/*!40000 ALTER TABLE `NoiSanXuat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuanTriVien`
--

DROP TABLE IF EXISTS `QuanTriVien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuanTriVien` (
  `MaTaiKhoan` int NOT NULL AUTO_INCREMENT,
  `MatKhau` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NgayTao` datetime NOT NULL,
  PRIMARY KEY (`MaTaiKhoan`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuanTriVien`
--

LOCK TABLES `QuanTriVien` WRITE;
/*!40000 ALTER TABLE `QuanTriVien` DISABLE KEYS */;
INSERT INTO `QuanTriVien` VALUES (1,'7c4a8d09ca3762af61e59520943dc26494f8941b','admin@admin.com','2023-03-29 17:35:42');
/*!40000 ALTER TABLE `QuanTriVien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThongTinCongTy`
--

DROP TABLE IF EXISTS `ThongTinCongTy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ThongTinCongTy` (
  `lock` enum('X') COLLATE utf8mb4_general_ci NOT NULL,
  `TenCongTy` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `SoDienThoai` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DiaChi` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NgayTao` datetime NOT NULL,
  PRIMARY KEY (`lock`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThongTinCongTy`
--

LOCK TABLES `ThongTinCongTy` WRITE;
/*!40000 ALTER TABLE `ThongTinCongTy` DISABLE KEYS */;
INSERT INTO `ThongTinCongTy` VALUES ('X','Tiānxià Wǔjué Corporation','tianxiawujue@admin.com','0897562341','TP. HCM','2023-03-29 17:35:42');
/*!40000 ALTER TABLE `ThongTinCongTy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThucPham`
--

DROP TABLE IF EXISTS `ThucPham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ThucPham` (
  `MaThucPham` int NOT NULL AUTO_INCREMENT,
  `ThucPham` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `MoTa` text COLLATE utf8mb4_general_ci,
  `MauSac` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `KichThuoc` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `HinhDang` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ViTriHinhAnh` text COLLATE utf8mb4_general_ci NOT NULL,
  `NgayTao` datetime NOT NULL,
  `MaNoiSanXuat` int DEFAULT NULL,
  `MaLoaiThucPham` int DEFAULT NULL,
  PRIMARY KEY (`MaThucPham`),
  KEY `FK_MaNoiSanXuat` (`MaNoiSanXuat`),
  KEY `FK_MaLoaiThucPham` (`MaLoaiThucPham`),
  CONSTRAINT `FK_MaLoaiThucPham` FOREIGN KEY (`MaLoaiThucPham`) REFERENCES `LoaiThucPham` (`MaLoaiThucPham`) ON DELETE SET NULL,
  CONSTRAINT `FK_MaNoiSanXuat` FOREIGN KEY (`MaNoiSanXuat`) REFERENCES `NoiSanXuat` (`MaNoiSanXuat`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThucPham`
--

LOCK TABLES `ThucPham` WRITE;
/*!40000 ALTER TABLE `ThucPham` DISABLE KEYS */;
INSERT INTO `ThucPham` VALUES (2,'Mòng Tơi','Rau mồng tơi là loại rau xanh bản địa của Đông Nam Á, phổ biến trong ẩm thực Việt Nam. Rau mồng tơi có lá mềm, thanh mát, có hương vị độc đáo và dinh dưỡng cao. Rau mồng tơi cung cấp nhiều vitamin và khoáng chất, đặc biệt là chất xơ, giúp cải thiện tiêu hóa và hỗ trợ sức khỏe tim mạch. Rau mồng tơi cũng được dùng để chế biến các món ăn như canh, nước lèo, salad, xào, nấu cháo và nhiều món khác. Với những người thực sự yêu đồ ăn xanh và sạch, rau mồng tơi là một lựa chọn hoàn hảo.','Xanh','Không','Bó','uploads/1VXIUFQuSm.jpg','2023-03-29 17:56:20',1,1),(3,'Dưa Hấu','Dưa hấu là một loại quả giàu dinh dưỡng và được ưa chuộng trên khắp thế giới. Với vị ngọt thanh mát và độ giòn của thịt, dưa hấu được coi là một loại thực phẩm giải nhiệt tuyệt vời trong những ngày nắng nóng. Ngoài ra, dưa hấu còn chứa nhiều vitamin, chất xơ và chất chống oxy hóa có ích cho sức khỏe. Dưa hấu có nhiều loại khác nhau, có thể có vỏ màu xanh hoặc màu vàng, thịt màu đỏ hoặc trắng tùy vào giống. Dưa hấu là một loại quả dễ trồng và phổ biến ở các khu vực nhiệt đới.','Xanh Thẵm','Đường kính khoảng 15-25cm','Cầu','uploads/j1IzbkLOAf.webp','2023-03-29 17:59:09',2,2),(4,'Đậu Hà Lan','Đậu hà lan là một loại rau quả được trồng phổ biến ở các nước châu Âu. Nó có màu xanh lá cây, hình dáng đặc trưng là những bông hoa nhỏ có cuống dài. Đậu hà lan chứa nhiều vitamin và khoáng chất như vitamin C, vitamin K, folate, kali, chất xơ và protein, giúp cải thiện sức khỏe tim mạch, hỗ trợ tiêu hóa và tăng cường miễn dịch. Ngoài ra, đậu hà lan cũng được sử dụng rộng rãi trong các món ăn như salad, soup hay ăn sống kèm với các loại xốt khác nhau. Với hương vị tuyệt vời và những lợi ích về sức khỏe, đậu hà lan là một loại rau hoàn hảo cho một chế độ ăn uống lành mạnh.','Xanh','Không','Viên','uploads/zFxDKO26BP.jpg','2023-03-29 18:02:47',3,4),(5,'Táo Rose Mỹ','Táo rất giàu chất xơ, vitamin C và chất chống oxy hóa khác nhau. Nghiên cứu cho thấy rằng ăn táo có nhiều lợi ích sức khỏe. Táo có một hương vị thơm ngon riêng và thường được ăn chưa qua chế biến, nó có thể sử dụng làm nước ép trái cây, các món ăn lạ miệng.\r\nMột quả táo cỡ trung bình chỉ chứa 95 calo, với hầu hết năng lượng đến từ carbs.','Đỏ','3,5cm – 4cm/quả.','Hình trứng xuôi, hình trứng ngược, tròn, thuôn dài','uploads/jMmu3A1fyy.jpg','2023-03-29 18:36:27',3,2),(6,'Táo Xanh','Táo chủ yếu được tạo thành từ Carbohydrate và nước, rất giàu các loại đường đơn như fructose, sucrose, glucose. Mặc dù táo chứa carbohydrate và đường cao, những chỉ số đường huyết thấp, dao động 29-44.\r\n\r\nChỉ số đường huyết của thực phẩm ảnh hưởng đến sự gia tăng lượng đường trong máu sau khi ăn, giá trị thấp có liên quan với những lợi ích sức khỏe khác nha. Trái cây thường có điểm số thấp về chỉ số đường huyết, có thể là do chất xơ cao và hàm lượng polyphenol giúp làm chậm quá trình tiêu hóa carbohydrat.','Xanh','3,5cm – 4cm/quả.','Hình trứng xuôi, hình trứng ngược, tròn, thuôn dài','uploads/9ivSMCEVYS.webp','2023-03-29 18:49:24',6,2),(7,'Nấm Rơm','Nấm rơm là một loại nấm phổ biến được tìm thấy trên các vùng đất trồng lúa và ngô. Đây là một loại nấm có hình dáng hình tròn, màu trắng hoặc xám nhạt, khi thu hoạch thì có đường kính khoảng 4-6cm. Nấm rơm chứa nhiều chất dinh dưỡng và protit, giúp tăng cường sức khỏe và chống oxy hóa. Nấm rơm có thể được sử dụng trong nhiều món ăn, từ món chiên, xào đến các loại nước lèo và các món trộn. Ngoài thành phần dinh dưỡng, nấm rơm còn được xem là một loại thực phẩm chức năng, giúp tăng cường sức khỏe và cải thiện hệ miễn dịch của cơ thể.','Trắng hoặc xám nhạt','Đường kính 4 - 6cm','Núm, tròn hoặc bán cầu dẹp','uploads/U8LUWxDd44.webp','2023-03-29 18:53:43',4,5);
/*!40000 ALTER TABLE `ThucPham` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-29 19:24:29
