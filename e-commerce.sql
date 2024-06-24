


INSERT INTO CategorieProduit (Id_CategorieProduit, NomCategorie)
VALUES 
(1, 'Women'),
(2, 'Men'),
(3, 'Kid');


INSERT INTO `produit` (`Id_Produit`, `Titre`, `Description`, `Image`, `Prix`, `old_price`, `Id_CategorieProduit`, `isNewCollection`) VALUES
(1, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_1.png', 50, 60, 1,  0),
(2, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_2.png', 75, 85, 1,  1),
(3, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_3.png', 60, 70, 1,  0),
(4, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_4.png', 100, 0, 1,  0),
(5, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_5.png', 190, 0, 1,  0),
(6, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_6.png', 35, 0, 1,  0),
(7, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_7.png', 45, 0, 1,  0),
(8, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_8.png', 180, 0, 1,  1),
(9, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_9.png', 85, 0, 1,  0),
(10, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_10.png', 60, 0, 1,  0),
(11, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_11.png', 100, 0, 1,  0),
(12, 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse', '', 'product_12.png', 87, 0, 1,  1),
(13, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_13.png', 175, 0, 2,  0),
(14, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_14.png', 65, 0, 2,  0),
(15, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_15.png', 195, 0, 2,  1),
(16, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_16.png', 195, 0, 2,  0),
(17, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_17.png', 165, 0, 2,  1),
(18, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_18.png', 125, 0, 2,  0),
(19, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_19.png', 175, 0, 2,  1),
(20, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_20.png', 145, 0, 2,  0),
(21, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_21.png', 105, 0, 2,  0),
(22, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_22.png', 105, 0, 2,  0),
(23, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_23.png', 165, 0, 2,  0),
(24, 'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket', '', 'product_24.png', 105, 0, 2,  0),
(25, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_25.png', 215, 0, 3,  0),
(26, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_26.png', 255, 0, 3,  0),
(27, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_27.png', 295, 0, 3,  0),
(28, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_28.png', 245, 0, 3,  1),
(29, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_29.png', 235, 0, 3,  0),
(30, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_30.png', 225, 0, 3,  0),
(31, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_31.png', 205, 0, 3,  0),
(32, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_32.png', 225, 0, 3,  0),
(33, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_33.png', 295, 0, 3,  0),
(34, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_34.png', 275, 0, 3,  0),
(35, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_35.png', 225, 0, 3,  0),
(36, 'Fossil Gen 5 Carlyle Touchscreen kid', '', 'product_36.png', 245, 0, 3, 0);

INSERT INTO `roleutilisateur` (`id_Role`, `Client`, `Admin`, `createdAt`, `updatedAt`) 
VALUES (1, 0, 1, NOW(), NOW());

INSERT INTO `detient` (`createdAt`, `updatedAt`, `id_Utilisateur`, `id_Role`) 
VALUES (NOW(), NOW(), 1, 1);
