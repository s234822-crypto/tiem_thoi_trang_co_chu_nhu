import { Product } from '../types/game';

export const INITIAL_PRODUCTS: Product[] = [

  // ══════════════════════════════════════════
  // TOPS — ÁO (20 subCategories)
  // ══════════════════════════════════════════
  { id: 'basic-red-tshirt', name: 'Áo Thun Basic Đỏ', category: 'tops', subCategory: 'basic_tshirt',
    styleTags: ['casual', 'minimal'], colors: ['red', 'white'], occasions: ['school', 'coffee', 'shopping'],
    cost: 60000, price: 130000, stock: 8, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Áo thun cotton basic màu đỏ tươi bo cổ vàng trẻ trung dễ mặc hàng ngày.',
    image: '/assets/outfits/tops/basic-tshirt.png', accentColor: '#EF5350', visualEmoji: '👕' },

  { id: 'oversize-white-tee', name: 'Áo Thun Oversize Trắng', category: 'tops', subCategory: 'oversize_tshirt',
    styleTags: ['streetwear', 'casual', 'y2k'], colors: ['white'], occasions: ['school', 'street', 'shopping'],
    cost: 80000, price: 175000, stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Form rộng giấu quần màu trắng tinh khôi chuẩn style Hàn Quốc năng động.',
    image: '/assets/outfits/tops/oversize-tshirt.png', accentColor: '#FFFFFF', visualEmoji: '👕' },

  { id: 'pink-crop-top', name: 'Áo Croptop Hồng Pastel', category: 'tops', subCategory: 'croptop',
    styleTags: ['cute', 'korean', 'feminine'], colors: ['pink', 'white'], occasions: ['coffee', 'date', 'shopping'],
    cost: 75000, price: 160000, stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Chất thun tăm co giãn mềm mại với nơ nhỏ trước ngực, phong cách kẹo ngọt.',
    image: '/assets/outfits/tops/croptop.png', accentColor: '#F8BBD0', visualEmoji: '👚' },

  { id: 'yellow-camisole', name: 'Áo Hai Dây Vàng Lụa Soft', category: 'tops', subCategory: 'camisole',
    styleTags: ['feminine', 'cute', 'summer'], colors: ['yellow'], occasions: ['date', 'vacation', 'picnic'],
    cost: 75000, price: 165000, stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Áo 2 dây quai mảnh màu vàng chanh rạng rỡ mát mẻ cho những ngày hè nắng.',
    image: '/assets/outfits/tops/camisole.png', accentColor: '#FFF59D', visualEmoji: '✨' },

  { id: 'sport-tank-top', name: 'Áo Tank Top Thể Thao', category: 'tops', subCategory: 'tank_top',
    styleTags: ['sporty', 'casual', 'minimal'], colors: ['white', 'black'], occasions: ['sport', 'street', 'coffee'],
    cost: 55000, price: 120000, stock: 8, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Thun gân 4 chiều ôm nhẹ khoe eo thon gọn gàng thoáng khí mỗi ngày.',
    image: '/assets/outfits/tops/croptop.png', accentColor: '#CFD8DC', visualEmoji: '🎽' },

  { id: 'cream-puffed-blouse', name: 'Áo Blouse Tay Bồng Kem', category: 'tops', subCategory: 'blouse',
    styleTags: ['feminine', 'elegant', 'vintage'], colors: ['cream', 'white'], occasions: ['work', 'date', 'coffee'],
    cost: 105000, price: 230000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Chất đũi tơ mềm rũ tay bồng quyến rũ, cúc ngọc kiêu sa phong cách tiểu thư.',
    image: '/assets/outfits/tops/blouse.png', accentColor: '#FFF3E0', visualEmoji: '👚' },

  { id: 'blue-casual-shirt', name: 'Áo Sơ Mi Lanh Xanh Biển', category: 'tops', subCategory: 'shirt',
    styleTags: ['office', 'casual', 'minimal'], colors: ['blue'], occasions: ['work', 'school', 'formal'],
    cost: 115000, price: 250000, stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Cổ đức sắc nét tông xanh tươi mát dễ chịu thanh lịch chốn công sở.',
    image: '/assets/outfits/tops/shirt.png', accentColor: '#90CAF9', visualEmoji: '👔' },

  { id: 'warm-turtleneck', image: '/assets/outfits/tops/sweater.png', name: 'Áo Cổ Lọ Len Ấm Đông', category: 'tops', subCategory: 'turtleneck',
    styleTags: ['minimal', 'winter', 'korean'], colors: ['black', 'cream'], occasions: ['work', 'travel', 'coffee'],
    cost: 95000, price: 210000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Cổ ôm giữ nhiệt cao cấp chất len thun đan mỏng ôm dáng quyến rũ.',
    accentColor: '#795548', visualEmoji: '🧥' },

  { id: 'green-sporty-polo', name: 'Áo Polo Xanh Lá Viền Trắng', category: 'tops', subCategory: 'polo',
    styleTags: ['preppy', 'sporty', 'casual'], colors: ['green', 'white'], occasions: ['school', 'sport', 'picnic'],
    cost: 90000, price: 195000, stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Cổ bẻ kẻ viền trẻ trung cá tính phong cách thể thao học đường năng động.',
    image: '/assets/outfits/tops/polo.png', accentColor: '#A5D6A7', visualEmoji: '👕' },

  { id: 'chic-peplum-top', image: '/assets/outfits/tops/blouse.png', name: 'Áo Peplum Xòe Eo Tôn Dáng', category: 'tops', subCategory: 'peplum',
    styleTags: ['elegant', 'office', 'feminine'], colors: ['pink', 'white'], occasions: ['work', 'party', 'date'],
    cost: 140000, price: 310000, stock: 3, maxStock: 8, unlockLevel: 4, rarity: 'rare',
    description: 'Chiết eo xoè vạt duyên dáng giấu khuyết điểm bụng hiệu quả cho phái đẹp.',
    accentColor: '#F48FB1', visualEmoji: '👗' },

  { id: 'off-shoulder-lace', image: '/assets/outfits/tops/croptop.png', name: 'Áo Trễ Vai Xếp Ly Tiểu Thư', category: 'tops', subCategory: 'off_shoulder',
    styleTags: ['feminine', 'party', 'cute'], colors: ['white', 'pink'], occasions: ['date', 'party', 'travel'],
    cost: 130000, price: 280000, stock: 3, maxStock: 10, unlockLevel: 3, rarity: 'rare',
    description: 'Thiết kế nhún bèo bồng bềnh khéo léo khoe bờ vai mảnh mai quyến rũ.',
    accentColor: '#F48FB1', visualEmoji: '✨' },

  { id: 'ribbed-knit-top', image: '/assets/outfits/tops/basic-tshirt.png', name: 'Áo Len Dệt Kim Dáng Ôm', category: 'tops', subCategory: 'knit_top',
    styleTags: ['korean', 'minimal', 'cute'], colors: ['beige', 'cream'], occasions: ['coffee', 'date', 'school'],
    cost: 100000, price: 220000, stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Vải dệt kim sợi mảnh thoáng mát thích hợp tiết trời thu dịu mát.',
    accentColor: '#E6D7C3', visualEmoji: '🧶' },

  { id: 'purple-cozy-sweater', name: 'Áo Sweater Len Tím Pastel', category: 'tops', subCategory: 'sweater',
    styleTags: ['cute', 'korean', 'soft_girl'], colors: ['purple'], occasions: ['school', 'coffee', 'travel'],
    cost: 125000, price: 270000, stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Sweater len đan cổ lọ mềm mại màu tím mộng mơ giữ ấm cực đỉnh.',
    image: '/assets/outfits/tops/sweater.png', accentColor: '#CE93D8', visualEmoji: '🧥' },

  { id: 'pink-hoodie', image: '/assets/outfits/tops/sweater.png', name: 'Áo Hoodie Oversize Pastel', category: 'tops', subCategory: 'hoodie',
    styleTags: ['casual', 'cute', 'soft_girl'], colors: ['pink', 'purple'], occasions: ['school', 'shopping', 'picnic'],
    cost: 140000, price: 300000, stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Form oversize ấm áp mùa se lạnh, nội lông cừu siêu mềm như ôm gấu bông.',
    accentColor: '#F8BBD0', visualEmoji: '🧸' },

  { id: 'short-cardigan', image: '/assets/outfits/tops/croptop.png', name: 'Cardigan Ngắn Cúc Ngọc Mini', category: 'tops', subCategory: 'short_cardigan',
    styleTags: ['cute', 'korean', 'vintage'], colors: ['beige', 'cream'], occasions: ['coffee', 'date', 'school'],
    cost: 110000, price: 240000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Cardigan lửng cúc ngọc trai nữ tính diện khoác ngoài đầm siêu xinh.',
    accentColor: '#FFE082', visualEmoji: '🧶' },

  { id: 'long-sheer-cardigan', image: '/assets/outfits/tops/sweater.png', name: 'Cardigan Dài Mỏng Xuyên Thấu', category: 'tops', subCategory: 'long_cardigan',
    styleTags: ['summer', 'feminine', 'vacation'], colors: ['white', 'beige'], occasions: ['vacation', 'travel'],
    cost: 135000, price: 290000, stock: 3, maxStock: 8, unlockLevel: 3, rarity: 'uncommon',
    description: 'Dáng dài tà rũ nhẹ nhàng thướt tha phong cách đi biển mộng mơ.',
    accentColor: '#FFFFFF', visualEmoji: '🧥' },

  { id: 'vintage-corset-top', image: '/assets/outfits/tops/croptop.png', name: 'Áo Corset Dây Thắt Tiểu Thư', category: 'tops', subCategory: 'corset',
    styleTags: ['y2k', 'chic', 'party'], colors: ['black', 'red'], occasions: ['party', 'date'],
    cost: 160000, price: 350000, stock: 3, maxStock: 8, unlockLevel: 5, rarity: 'rare',
    description: 'Khung gọng nịt eo corset cổ điển tôn đường cong đồng hồ cát sang trọng.',
    accentColor: '#EF5350', visualEmoji: '💃' },

  { id: 'sweet-baby-tee', name: 'Áo Baby Tee In Hình Cute', category: 'tops', subCategory: 'baby_tee',
    styleTags: ['cute', 'y2k', 'soft_girl'], colors: ['pink', 'white'], occasions: ['school', 'coffee'],
    cost: 65000, price: 140000, stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Dáng ôm ngắn baby tee chất cotton mềm in hình gấu nhỏ đáng yêu.',
    image: '/assets/outfits/tops/basic-tshirt.png', accentColor: '#F8BBD0', visualEmoji: '👕' },

  { id: 'babydoll-peplum-top', name: 'Áo Babydoll Xòe Bồng Nơ', category: 'tops', subCategory: 'babydoll_top',
    styleTags: ['cute', 'soft_girl', 'feminine'], colors: ['cream', 'pink'], occasions: ['date', 'picnic', 'coffee'],
    cost: 115000, price: 250000, stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Dáng babydoll xòe công chúa nơ ngực bồng bềnh cực kỳ nữ tính.',
    image: '/assets/outfits/tops/blouse.png', accentColor: '#FFF3E0', visualEmoji: '🎀' },

  { id: 'lace-romantic-top', image: '/assets/outfits/tops/blouse.png', name: 'Áo Ren Hoa Trắng Điệu Đà', category: 'tops', subCategory: 'lace_top',
    styleTags: ['feminine', 'elegant', 'party'], colors: ['white'], occasions: ['party', 'date', 'formal'],
    cost: 145000, price: 320000, stock: 3, maxStock: 8, unlockLevel: 4, rarity: 'rare',
    description: 'Chất ren thêu tay hoa chìm tinh tế kiêu sa quyến rũ quý cô.',
    accentColor: '#FFFFFF', visualEmoji: '✨' },

  // ══════════════════════════════════════════
  // BOTTOMS — QUẦN (18 subCategories)
  // ══════════════════════════════════════════
  { id: 'blue-skinny-jeans', name: 'Quần Jean Skinny Xanh', category: 'bottoms', subCategory: 'skinny_jeans',
    styleTags: ['casual', 'denim'], colors: ['blue'], occasions: ['school', 'coffee', 'shopping'],
    cost: 130000, price: 280000, stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Skinny jeans ôm sát dáng chân thon dài xanh jean truyền thống co giãn mượt.',
    image: '/assets/outfits/bottoms/skinny-jeans.png', accentColor: '#90CAF9', visualEmoji: '👖' },

  { id: 'straight-denim-jeans', name: 'Quần Jean Ống Đứng Retro', category: 'bottoms', subCategory: 'straight_jeans',
    styleTags: ['casual', 'vintage', 'denim'], colors: ['blue'], occasions: ['school', 'coffee', 'street'],
    cost: 140000, price: 290000, stock: 4, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Màu xanh wash vintage chuẩn form tôn dáng dài miên man, dễ phối đồ.',
    image: '/assets/outfits/bottoms/straight-jeans.png', accentColor: '#90CAF9', visualEmoji: '👖' },

  { id: 'wide-light-jeans', name: 'Quần Jean Ống Rộng Nhạt', category: 'bottoms', subCategory: 'wide_jeans',
    styleTags: ['y2k', 'retro', 'denim'], colors: ['blue', 'white'], occasions: ['street', 'school', 'shopping'],
    cost: 145000, price: 310000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Ống rộng siêu phồng chiều dài hack chân 1m70, wash sáng màu chuẩn Y2K.',
    image: '/assets/outfits/bottoms/wide-jeans.png', accentColor: '#E0F7FA', visualEmoji: '👖' },

  { id: 'y2k-baggy-jeans', name: 'Quần Jean Baggy Y2K', category: 'bottoms', subCategory: 'baggy_jeans',
    styleTags: ['streetwear', 'y2k', 'denim'], colors: ['blue', 'navy'], occasions: ['street', 'shopping'],
    cost: 150000, price: 325000, stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Phù hợp style HipHop đường phố rộng rãi năng động cá tính cực chất.',
    image: '/assets/outfits/bottoms/wide-jeans.png', accentColor: '#5C6BC0', visualEmoji: '👖' },

  { id: 'cuff-denim-shorts', name: 'Quần Short Jean Lai Cuff', category: 'bottoms', subCategory: 'denim_shorts',
    styleTags: ['casual', 'summer', 'denim'], colors: ['blue'], occasions: ['shopping', 'picnic', 'vacation'],
    cost: 85000, price: 180000, stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Shorts jeans rách nhẹ gấu gấp lai trẻ trung tôn đùi thon khỏe khoắn.',
    image: '/assets/outfits/bottoms/denim-shorts.png', accentColor: '#90CAF9', visualEmoji: '🩳' },

  { id: 'kaki-white-shorts', image: '/assets/outfits/bottoms/denim-shorts.png', name: 'Quần Short Kaki Trắng Basic', category: 'bottoms', subCategory: 'kaki_shorts',
    styleTags: ['casual', 'summer', 'minimal'], colors: ['white', 'beige'], occasions: ['shopping', 'picnic', 'coffee'],
    cost: 75000, price: 160000, stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Kaki cotton đặn đứng dáng màu trắng sữa dịu mắt thoáng nhẹ.',
    accentColor: '#ECEFF1', visualEmoji: '🩳' },

  { id: 'tailored-beige-trousers', name: 'Quần Tây Xếp Ly Be', category: 'bottoms', subCategory: 'trousers',
    styleTags: ['office', 'elegant', 'minimal'], colors: ['beige', 'black'], occasions: ['work', 'formal'],
    cost: 135000, price: 295000, stock: 3, maxStock: 10, unlockLevel: 2, rarity: 'rare',
    description: 'Chất tuyết mưa dày dặn đứng dáng, đường ly ủi chết chuẩn phong cách sang trọng.',
    image: '/assets/outfits/bottoms/trousers.png', accentColor: '#E0D2C7', visualEmoji: '👔' },

  { id: 'linen-straight-pants', image: '/assets/outfits/bottoms/straight-jeans.png', name: 'Quần Ống Suông Linen', category: 'bottoms', subCategory: 'straight_pants',
    styleTags: ['minimal', 'casual', 'summer'], colors: ['cream', 'white'], occasions: ['coffee', 'travel', 'shopping'],
    cost: 110000, price: 230000, stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Vải lanh thiên nhiên mềm rũ mát rười rượi phong cách tối giản thanh lịch.',
    accentColor: '#FFF3E0', visualEmoji: '👖' },

  { id: 'pink-wide-pants', name: 'Quần Ống Rộng Hồng Pastel', category: 'bottoms', subCategory: 'wide_pants',
    styleTags: ['cute', 'korean', 'feminine'], colors: ['pink'], occasions: ['coffee', 'date', 'shopping'],
    cost: 120000, price: 260000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Ống phồng rộng xếp ly trước eo màu hồng ngọt ngào kẹo búp bê.',
    image: '/assets/outfits/bottoms/culottes.png', accentColor: '#F8BBD0', visualEmoji: '👖' },

  { id: 'olive-cargo-pants', name: 'Quần Cargo Túi Hộp Olive', category: 'bottoms', subCategory: 'cargo_pants',
    styleTags: ['streetwear', 'y2k', 'casual'], colors: ['olive', 'black'], occasions: ['street', 'shopping', 'travel'],
    cost: 160000, price: 340000, stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: '4 túi hộp siêu to đựng được nhiều đồ, khóa kéo kim loại giữ form chuẩn Streetwear.',
    image: '/assets/outfits/bottoms/cargo-pants.png', accentColor: '#8BC34A', visualEmoji: '🪖' },

  { id: 'black-sport-jogger', name: 'Quần Jogger Đen Thể Thao', category: 'bottoms', subCategory: 'jogger_pants',
    styleTags: ['sporty', 'casual', 'streetwear'], colors: ['black'], occasions: ['sport', 'street', 'school'],
    cost: 110000, price: 240000, stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Dây rút năng động bo gấu cá tính vải nỉ dầy dặn mặc siêu êm.',
    image: '/assets/outfits/bottoms/jogger-pants.png', accentColor: '#37474F', visualEmoji: '🏃' },

  { id: 'high-waist-legging', image: '/assets/outfits/bottoms/skinny-jeans.png', name: 'Quần Legging Bụng Cao Co Giãn', category: 'bottoms', subCategory: 'legging',
    styleTags: ['sporty', 'casual'], colors: ['black', 'navy'], occasions: ['sport', 'coffee'],
    cost: 80000, price: 175000, stock: 7, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Cạp cao nịt bụng giữ ấm, vải bốn chiều không bai không lộ chuẩn gym.',
    accentColor: '#212121', visualEmoji: '🏃' },

  { id: 'pink-flared-culottes', name: 'Quần Culottes Hồng Xòe', category: 'bottoms', subCategory: 'culottes',
    styleTags: ['feminine', 'cute', 'korean'], colors: ['pink'], occasions: ['date', 'coffee', 'picnic'],
    cost: 115000, price: 250000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Lỡ gối nhẹ nhàng phồng rộng tựa chân váy xinh xắn quyến rũ.',
    image: '/assets/outfits/bottoms/culottes.png', accentColor: '#F8BBD0', visualEmoji: '👗' },

  { id: 'breeze-linen-pants', image: '/assets/outfits/bottoms/culottes.png', name: 'Quần Linen Suông Mát Mùa Hè', category: 'bottoms', subCategory: 'linen_pants',
    styleTags: ['summer', 'minimal'], colors: ['beige', 'cream'], occasions: ['vacation', 'picnic'],
    cost: 105000, price: 225000, stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Chất linen tự nhiên mỏng nhẹ thấm hút mồ hôi cho chuyến dã ngoại tuyệt vời.',
    accentColor: '#E0D2C7', visualEmoji: '👖' },

  { id: 'high-waist-trousers', name: 'Quần Cạp Cao Tôn Dáng dài', category: 'bottoms', subCategory: 'high_waist_pants',
    styleTags: ['office', 'chic', 'elegant'], colors: ['black', 'brown'], occasions: ['work', 'formal'],
    cost: 145000, price: 310000, stock: 3, maxStock: 8, unlockLevel: 3, rarity: 'rare',
    description: 'Cạp cao trên rốn 5cm siết eo tạo hiệu ứng tỉ lệ cơ thể chuẩn ngọc trinh.',
    image: '/assets/outfits/bottoms/trousers.png', accentColor: '#4E342E', visualEmoji: '👔' },

  { id: 'y2k-flare-pants', name: 'Quần Y2K Ống Loe Sành Điệu', category: 'bottoms', subCategory: 'y2k_pants',
    styleTags: ['y2k', 'chic', 'streetwear'], colors: ['blue', 'black'], occasions: ['street', 'party'],
    cost: 155000, price: 330000, stock: 3, maxStock: 8, unlockLevel: 4, rarity: 'rare',
    description: 'Ống loe chuẩn trào lưu Y2K quyến rũ đôi chân dài thẳng tắp.',
    image: '/assets/outfits/bottoms/wide-jeans.png', accentColor: '#5C6BC0', visualEmoji: '👖' },

  { id: 'sporty-track-pants', name: 'Quần Sporty Bo Gấu 3 Sọc', category: 'bottoms', subCategory: 'sporty_pants',
    styleTags: ['sporty', 'casual'], colors: ['black', 'white'], occasions: ['sport', 'school'],
    cost: 95000, price: 205000, stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Kẻ sọc dọc sườn thời trang thể thao khỏe khoắn cực chất năng động.',
    image: '/assets/outfits/bottoms/jogger-pants.png', accentColor: '#37474F', visualEmoji: '🏃' },

  { id: 'biker-leather-pants', image: '/assets/outfits/bottoms/skinny-jeans.png', name: 'Quần Da Cá Tính Cool Ngầu', category: 'bottoms', subCategory: 'leather_pants',
    styleTags: ['streetwear', 'chic', 'y2k'], colors: ['black'], occasions: ['party', 'street'],
    cost: 180000, price: 390000, stock: 2, maxStock: 6, unlockLevel: 5, rarity: 'premium',
    description: 'Chất da bóng bẩy ôm sát tôn dáng chuẩn phong cách rockstar cá tính.',
    accentColor: '#212121', visualEmoji: '🖤' },

  // ══════════════════════════════════════════
  // SKIRTS — CHÂN VÁY (15 subCategories)
  // ══════════════════════════════════════════
  { id: 'pink-aline-skirt', name: 'Chân Váy Chữ A Hồng', category: 'skirts', subCategory: 'aline_skirt',
    styleTags: ['cute', 'korean', 'feminine'], colors: ['pink'], occasions: ['school', 'coffee', 'date'],
    cost: 90000, price: 195000, stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Xòe chữ A nhẹ nhàng màu hồng ngọt ngào đáng yêu dễ phối cùng áo thun.',
    image: '/assets/outfits/skirts/aline-skirt.png', accentColor: '#F8BBD0', visualEmoji: '🩷' },

  { id: 'tennis-white-skirt', name: 'Chân Váy Tennis Xếp Ly', category: 'skirts', subCategory: 'tennis_skirt',
    styleTags: ['cute', 'korean', 'sporty', 'preppy'], colors: ['white', 'blue'], occasions: ['school', 'picnic', 'sport'],
    cost: 85000, price: 190000, stock: 6, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Xếp ly trắng kẻ viền xanh tennis năng động có quần bảo hộ bên trong.',
    image: '/assets/outfits/skirts/tennis-skirt.png', accentColor: '#FFFFFF', visualEmoji: '🏓' },

  { id: 'purple-pleated-skirt', name: 'Chân Váy Xếp Ly Caro Tím', category: 'skirts', subCategory: 'pleated_skirt',
    styleTags: ['preppy', 'y2k', 'cute'], colors: ['purple'], occasions: ['school', 'date', 'coffee'],
    cost: 95000, price: 210000, stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Caro tím xếp nếp chuẩn phong cách học sinh Nhật Bản nữ tính ngọt ngào.',
    image: '/assets/outfits/skirts/pleated-skirt.png', accentColor: '#CE93D8', visualEmoji: '💜' },

  { id: 'denim-mini-skirt', name: 'Chân Váy Jean Mini Chữ A', category: 'skirts', subCategory: 'denim_skirt',
    styleTags: ['casual', 'denim', 'retro'], colors: ['blue'], occasions: ['school', 'coffee', 'street'],
    cost: 100000, price: 220000, stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Bò jeans wash xanh cổ điển gấu may cẩn thận dễ thương trẻ trung.',
    image: '/assets/outfits/skirts/denim-skirt.png', accentColor: '#90CAF9', visualEmoji: '👖' },

  { id: 'yellow-midi-skirt', name: 'Chân Váy Midi Xòe Vàng', category: 'skirts', subCategory: 'midi_skirt',
    styleTags: ['vintage', 'feminine', 'summer'], colors: ['yellow'], occasions: ['coffee', 'picnic', 'travel'],
    cost: 110000, price: 240000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Dáng dài qua gối xòe dịu dàng rạng rỡ như ánh nắng ban mai.',
    image: '/assets/outfits/skirts/midi-skirt.png', accentColor: '#FFF59D', visualEmoji: '🌼' },

  { id: 'mint-maxi-skirt', name: 'Chân Váy Maxi Tầng Mint', category: 'skirts', subCategory: 'maxi_skirt',
    styleTags: ['summer', 'feminine', 'vacation'], colors: ['green', 'white'], occasions: ['vacation', 'travel', 'picnic'],
    cost: 130000, price: 285000, stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Xòe nhiều tầng sóng bồng bềnh chất xô dệt siêu mát đi biển bay bổng.',
    image: '/assets/outfits/skirts/maxi-skirt.png', accentColor: '#A5D6A7', visualEmoji: '🍃' },

  { id: 'red-pencil-skirt', name: 'Chân Váy Bút Chì Đỏ Tôn Dáng', category: 'skirts', subCategory: 'pencil_skirt',
    styleTags: ['office', 'chic', 'elegant'], colors: ['red'], occasions: ['work', 'formal', 'party'],
    cost: 125000, price: 270000, stock: 3, maxStock: 10, unlockLevel: 3, rarity: 'rare',
    description: 'Dáng bút chì đỏ đô quyến rũ ôm hông khoe đường cong kiêu kỳ.',
    image: '/assets/outfits/skirts/pencil-skirt.png', accentColor: '#EF5350', visualEmoji: '👠' },

  { id: 'mermaid-glam-skirt', image: '/assets/outfits/skirts/mermaid-skirt.png', name: 'Chân Váy Đuôi Cá Quyển Lực', category: 'skirts', subCategory: 'mermaid_skirt',
    styleTags: ['party', 'elegant', 'luxury'], colors: ['black', 'red'], occasions: ['party', 'formal'],
    cost: 160000, price: 350000, stock: 3, maxStock: 8, unlockLevel: 4, rarity: 'rare',
    description: 'Ôm sát đùi xòe gấu đuôi cá lộng lẫy thướt tha kiều diễm.',
    accentColor: '#212121', visualEmoji: '🧜‍♀️' },

  { id: 'satin-silk-skirt', image: '/assets/outfits/skirts/satin-skirt.png', name: 'Chân Váy Lụa Satin Bóng', category: 'skirts', subCategory: 'satin_skirt',
    styleTags: ['luxury', 'feminine', 'elegant'], colors: ['cream', 'pink'], occasions: ['party', 'date'],
    cost: 150000, price: 330000, stock: 3, maxStock: 8, unlockLevel: 4, rarity: 'rare',
    description: 'Chất lụa satin mượt như nhung ánh xà cừ óng ánh bước đi uyển chuyển.',
    accentColor: '#FFF3E0', visualEmoji: '✨' },

  { id: 'lace-white-skirt', image: '/assets/outfits/skirts/lace-skirt.png', name: 'Chân Váy Ren Trắng Bèo Tầng', category: 'skirts', subCategory: 'lace_skirt',
    styleTags: ['cute', 'feminine', 'soft_girl'], colors: ['white'], occasions: ['date', 'coffee', 'picnic'],
    cost: 115000, price: 250000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Họa tiết ren hoa li ti phủ ngoài voan mỏng trắng trong ngần.',
    accentColor: '#FFFFFF', visualEmoji: '🌸' },

  { id: 'caro-plaid-skirt', name: 'Chân Váy Caro Tím Vintage', category: 'skirts', subCategory: 'caro_skirt',
    styleTags: ['vintage', 'preppy', 'korean'], colors: ['purple', 'pink'], occasions: ['school', 'coffee'],
    cost: 90000, price: 195000, stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Kẻ caro hoài cổ trẻ trung duyên dáng phối cùng sơ mi cực xinh.',
    image: '/assets/outfits/skirts/pleated-skirt.png', accentColor: '#CE93D8', visualEmoji: '🎀' },

  { id: 'cargo-pocket-skirt', image: '/assets/outfits/skirts/cargo-skirt.png', name: 'Chân Váy Cargo Dù Túi Hộp', category: 'skirts', subCategory: 'cargo_skirt',
    styleTags: ['streetwear', 'y2k'], colors: ['olive', 'black'], occasions: ['street', 'shopping'],
    cost: 120000, price: 260000, stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Vải dù túi hộp hai bên dây rút rút eo cá tính chất phát ngất.',
    accentColor: '#8BC34A', visualEmoji: '🪖' },

  { id: 'cute-mini-skirt', name: 'Chân Váy Mini Dễ Thương', category: 'skirts', subCategory: 'mini_skirt',
    styleTags: ['cute', 'y2k', 'casual'], colors: ['pink', 'black'], occasions: ['shopping', 'date'],
    cost: 80000, price: 175000, stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Váy mini ngắn khoe đùi nuột tôn dáng đáng yêu nịt eo nơ nhỏ.',
    image: '/assets/outfits/skirts/aline-skirt.png', accentColor: '#F8BBD0', visualEmoji: '🩷' },

  { id: 'purple-tiered-skirt', name: 'Chân Váy Tầng Tím Ruffle', category: 'skirts', subCategory: 'tiered_skirt',
    styleTags: ['cute', 'soft_girl', 'feminine'], colors: ['purple'], occasions: ['date', 'coffee', 'picnic'],
    cost: 105000, price: 230000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Xếp 3 tầng nhún bèo tím lãng mạn như mây bồng bềnh nhảy múa.',
    image: '/assets/outfits/skirts/tiered-skirt.png', accentColor: '#CE93D8', visualEmoji: '💜' },

  { id: 'vintage-floral-skirt', name: 'Chân Váy Vintage Hoa Nhí', category: 'skirts', subCategory: 'vintage_skirt',
    styleTags: ['vintage', 'feminine'], colors: ['cream', 'pink'], occasions: ['coffee', 'picnic'],
    cost: 110000, price: 240000, stock: 4, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Hoa nhí vintage Pháp cổ điển mộng mơ nhã nhặn hoài niệm.',
    image: '/assets/outfits/skirts/midi-skirt.png', accentColor: '#FFCCBC', visualEmoji: '🌸' },

  // ══════════════════════════════════════════
  // DRESSES — ĐẦM (Level 1–12)
  // ══════════════════════════════════════════

  { id: 'french-tea-dress', image: '/assets/outfits/dresses/floral-dress.png', name: 'Đầm Hoa Nhí Cổ V Pháp', category: 'dresses', subCategory: 'floral_dress',
    styleTags: ['vintage', 'feminine', 'cute'], colors: ['pink', 'cream'],
    occasions: ['coffee', 'date', 'picnic'], cost: 170000, price: 360000,
    stock: 4, maxStock: 10, unlockLevel: 1, rarity: 'uncommon',
    description: 'Cổ chữ V duyên dáng kết hợp hàng cúc bọc vải và thắt nơ lưng e ấp.',
    visualEmoji: '👗', accentColor: '#F48FB1' },

  { id: 'satin-evening-gown', image: '/assets/outfits/dresses/satin-dress.png', name: 'Đầm Dạ Hội Lụa Satin Cao Cấp', category: 'dresses', subCategory: 'party_dress',
    styleTags: ['party', 'luxury', 'elegant'], colors: ['red', 'black', 'white'],
    occasions: ['party', 'formal'], cost: 280000, price: 650000,
    stock: 2, maxStock: 6, unlockLevel: 10, rarity: 'luxury',
    description: 'Lụa tơ tằm bóng bẩy quý phái, lưng khoét sâu kiêu kỳ thu hút mọi ánh nhìn.',
    visualEmoji: '👑', accentColor: '#E91E63' },

  { id: 'korean-minimal-shirtdress', image: '/assets/outfits/dresses/shirt-dress.png', name: 'Đầm Sơ Mi Suông Tối Giản', category: 'dresses', subCategory: 'office_dress',
    styleTags: ['minimal', 'korean', 'casual'], colors: ['white', 'blue', 'beige'],
    occasions: ['work', 'coffee', 'school'], cost: 150000, price: 320000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Dáng suông thoải mái có đai thắt eo linh hoạt, thanh nhã đậm chất Seoul.',
    visualEmoji: '👗', accentColor: '#B0BEC5' },

  { id: 'babydoll-dress', image: '/assets/outfits/dresses/babydoll-dress.png', name: 'Đầm Babydoll Nơ Lưng Tiểu Thư', category: 'dresses', subCategory: 'babydoll_dress',
    styleTags: ['cute', 'feminine', 'soft_girl'], colors: ['pink', 'white', 'cream'],
    occasions: ['date', 'coffee', 'picnic'], cost: 165000, price: 350000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Dáng xoè bồng nhẹ nhàng như búp bê, phần thắt nơ sau lưng cực kỳ nữ tính.',
    visualEmoji: '🩷', accentColor: '#FFB3C6' },

  { id: 'maxi-boho-dress', image: '/assets/outfits/dresses/floral-dress.png', name: 'Đầm Maxi Bohemian Hoa Lớn', category: 'dresses', subCategory: 'maxi_dress',
    styleTags: ['vintage', 'summer', 'feminine'], colors: ['orange', 'cream', 'green'],
    occasions: ['travel', 'vacation', 'picnic'], cost: 195000, price: 420000,
    stock: 3, maxStock: 8, unlockLevel: 6, rarity: 'rare',
    description: 'Vải thô thoáng mát họa tiết hoa lớn phóng khoáng, bay trong gió cực kỳ lãng mạn.',
    visualEmoji: '🌺', accentColor: '#FF8A65' },

  { id: 'office-pencil-dress', image: '/assets/outfits/dresses/office-dress.png', name: 'Đầm Công Sở Bút Chì Cúc Bọc', category: 'dresses', subCategory: 'office_dress',
    styleTags: ['office', 'elegant', 'chic'], colors: ['black', 'navy', 'beige'],
    occasions: ['work', 'formal', 'party'], cost: 220000, price: 480000,
    stock: 3, maxStock: 8, unlockLevel: 7, rarity: 'rare',
    description: 'Dáng bút chì ôm form tôn vóc dáng, hàng cúc bọc vải dọc thân tinh tế sang trọng.',
    visualEmoji: '👔', accentColor: '#1A237E' },

  { id: 'mini-party-dress', image: '/assets/outfits/dresses/sequin-dress.png', name: 'Đầm Tiệc Mini Sequin Lấp Lánh', category: 'dresses', subCategory: 'party_dress',
    styleTags: ['party', 'chic', 'y2k'], colors: ['black', 'pink', 'gray'],
    occasions: ['party', 'date', 'formal'], cost: 240000, price: 520000,
    stock: 2, maxStock: 6, unlockLevel: 8, rarity: 'premium',
    description: 'Sequin đính tay 100% lấp lánh mọi ánh đèn, form mini thân thiện thoải mái.',
    visualEmoji: '✨', accentColor: '#E040FB' },

  { id: 'floral-wrap-dress', image: '/assets/outfits/dresses/floral-dress.png', name: 'Đầm Wrap Hoa Cúc Dại', category: 'dresses', subCategory: 'floral_dress',
    styleTags: ['summer', 'casual', 'feminine'], colors: ['cream', 'yellow', 'green'],
    occasions: ['picnic', 'vacation', 'coffee'], cost: 155000, price: 335000,
    stock: 4, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Kiểu quấn buộc eo uyển chuyển điều chỉnh vừa mọi size, vải linen mỏng nhẹ thoáng.',
    visualEmoji: '🌻', accentColor: '#FFF176' },

  // ══════════════════════════════════════════
  // JACKETS — ÁO KHOÁC (Level 3–12)
  // ══════════════════════════════════════════

  { id: 'rose-blazer', image: '/assets/outfits/jackets/blazer.png', name: 'Blazer Pastel Form Rộng', category: 'jackets', subCategory: 'blazer',
    styleTags: ['korean', 'office', 'chic'], colors: ['pink', 'beige'],
    occasions: ['work', 'coffee', 'date'], cost: 190000, price: 420000,
    stock: 3, maxStock: 8, unlockLevel: 5, rarity: 'rare',
    description: 'Đệm vai mỏng định hình vóc dáng, màu hồng pastel ngọt ngào mà sang trọng.',
    visualEmoji: '🧥', accentColor: '#F48FB1' },

  { id: 'tweed-boucle-jacket', image: '/assets/outfits/jackets/tweed-jacket.png', name: 'Áo Khoác Dạ Tweed Tiểu Thư', category: 'jackets', subCategory: 'blazer',
    styleTags: ['luxury', 'elegant', 'chic'], colors: ['white', 'black', 'pink'],
    occasions: ['party', 'formal', 'date'], cost: 250000, price: 580000,
    stock: 2, maxStock: 6, unlockLevel: 12, rarity: 'luxury',
    description: 'Dệt sợi kim tuyến viền nổi cúc mạ vàng phong cách quý cô Chanel.',
    visualEmoji: '✨', accentColor: '#D7CCC8' },

  { id: 'leather-biker-jacket', image: '/assets/outfits/jackets/leather-jacket.png', name: 'Áo Khoác Da Biker Cool Ngầu', category: 'jackets', subCategory: 'jacket_top',
    styleTags: ['streetwear', 'y2k', 'retro'], colors: ['black'],
    occasions: ['party', 'travel', 'street'], cost: 230000, price: 490000,
    stock: 3, maxStock: 8, unlockLevel: 7, rarity: 'rare',
    description: 'Chất da PU mềm chống xước khóa kéo kim loại hầm hố chuẩn chất đường phố.',
    visualEmoji: '🖤', accentColor: '#263238' },

  { id: 'varsity-jacket', image: '/assets/outfits/jackets/varsity-jacket.png', name: 'Áo Varsity Jacket Preppy', category: 'jackets', subCategory: 'jacket_top',
    styleTags: ['preppy', 'retro', 'sporty'], colors: ['navy', 'red', 'white'],
    occasions: ['school', 'street', 'shopping'], cost: 200000, price: 430000,
    stock: 3, maxStock: 8, unlockLevel: 6, rarity: 'rare',
    description: 'Phong cách học sinh Mỹ thập niên 90 cổ điển, tay da đối xứng logo thêu tinh tế.',
    visualEmoji: '🏫', accentColor: '#1A237E' },

  { id: 'pastel-cardigan', image: '/assets/outfits/jackets/outer-cardigan.png', name: 'Cardigan Cúc Ngọc Dài Pastel', category: 'jackets', subCategory: 'cardigan',
    styleTags: ['soft_girl', 'cute', 'korean'], colors: ['purple', 'pink', 'cream'],
    occasions: ['school', 'coffee', 'date'], cost: 165000, price: 355000,
    stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Len mịn nhẹ xuyên thấu nhẹ nhàng, cúc ngọc xếp dọc thân giống outfit KPOP Idol.',
    visualEmoji: '💜', accentColor: '#CE93D8' },

  // ══════════════════════════════════════════
  // SHOES — GIÀY (Level 1–10)
  // ══════════════════════════════════════════

  { id: 'mary-jane-shoes', image: '/assets/outfits/shoes/mary-jane.png', name: 'Giày Búp Bê Mary Jane Da Bóng', category: 'shoes', subCategory: 'mary_jane',
    styleTags: ['cute', 'vintage', 'korean', 'preppy'], colors: ['black', 'pink', 'white'],
    occasions: ['school', 'coffee', 'date'], cost: 95000, price: 210000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Quai cài cổ chân xinh xắn, gót vuông 3cm êm ái tôn dáng bước đi uyển chuyển.',
    visualEmoji: '🩰', accentColor: '#F48FB1' },

  { id: 'chunky-sneakers', image: '/assets/outfits/shoes/chunky-sneakers.png', name: 'Giày Thể Thao Chunky Năng Động', category: 'shoes', subCategory: 'sneaker',
    styleTags: ['sporty', 'streetwear', 'y2k'], colors: ['white', 'beige'],
    occasions: ['school', 'travel', 'shopping', 'sport'], cost: 140000, price: 310000,
    stock: 4, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Đế đôn 5cm hack chiều cao khéo léo, đệm khí nâng đỡ từng bước chân di chuyển.',
    visualEmoji: '👟', accentColor: '#CFD8DC' },

  { id: 'stiletto-pumps', image: '/assets/outfits/shoes/pointed-heels.png', name: 'Giày Cao Gót Mũi Nhọn 7cm', category: 'shoes', subCategory: 'heels',
    styleTags: ['elegant', 'office', 'luxury'], colors: ['black', 'cream', 'red'],
    occasions: ['work', 'party', 'formal'], cost: 130000, price: 290000,
    stock: 3, maxStock: 8, unlockLevel: 5, rarity: 'rare',
    description: 'Mũi nhọn thanh thoát kéo dài đôi chân, lót đệm êm giảm áp lực ngón chân.',
    visualEmoji: '👠', accentColor: '#3E2723' },

  { id: 'strappy-sandals', image: '/assets/outfits/shoes/strap-heels.png', name: 'Sandal Quai Mảnh Mùa Hè', category: 'shoes', subCategory: 'sandal',
    styleTags: ['summer', 'casual', 'feminine'], colors: ['beige', 'white', 'brown'],
    occasions: ['vacation', 'picnic', 'shopping'], cost: 75000, price: 165000,
    stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Quai đan chéo mảnh tôn bàn chân nuột, đế bệt nhẹ êm đi cả ngày không mỏi.',
    visualEmoji: '👡', accentColor: '#BCAAA4' },

  { id: 'ankle-boots', image: '/assets/outfits/shoes/ankle-boots.png', name: 'Boot Cổ Ngắn Da Vintage', category: 'shoes', subCategory: 'boots',
    styleTags: ['vintage', 'retro', 'chic'], colors: ['black', 'brown'],
    occasions: ['date', 'street', 'travel'], cost: 175000, price: 380000,
    stock: 3, maxStock: 8, unlockLevel: 6, rarity: 'rare',
    description: 'Da PU mịn gót block 4cm cực ổn định, kéo khóa siêu dễ không bao giờ lỗi mốt.',
    visualEmoji: '🥾', accentColor: '#4E342E' },

  { id: 'loafer-shoes', image: '/assets/outfits/shoes/loafers.png', name: 'Giày Lười Loafer Khóa Vàng', category: 'shoes', subCategory: 'loafer',
    styleTags: ['preppy', 'office', 'korean'], colors: ['black', 'brown', 'beige'],
    occasions: ['work', 'school', 'date'], cost: 120000, price: 265000,
    stock: 4, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Khóa kim loại mạ vàng đặc trưng, da mềm đế cao su êm hội tụ trend Pháp - Hàn.',
    visualEmoji: '🥿', accentColor: '#795548' },

  { id: 'platform-sneaker', image: '/assets/outfits/shoes/platform-sneakers.png', name: 'Sneaker Đế Chunky Platform', category: 'shoes', subCategory: 'sneaker',
    styleTags: ['y2k', 'streetwear', 'cute'], colors: ['white', 'pink', 'black'],
    occasions: ['street', 'shopping', 'school'], cost: 155000, price: 335000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'uncommon',
    description: 'Đế chunky siêu dày 7cm nâng tầm outfit từ thường thành wow, form chunky cực trend.',
    visualEmoji: '👟', accentColor: '#EC407A' },

  { id: 'kitten-heel', image: '/assets/outfits/shoes/kitten-heels.png', name: 'Giày Cao Gót Nhọn Mũi Kitten', category: 'shoes', subCategory: 'heels',
    styleTags: ['feminine', 'elegant', 'soft_girl'], colors: ['pink', 'cream', 'white'],
    occasions: ['date', 'party', 'coffee'], cost: 110000, price: 240000,
    stock: 4, maxStock: 10, unlockLevel: 7, rarity: 'rare',
    description: 'Gót nhỏ 5cm sang trọng vừa đủ, mũi nhọn thon dài nuột nà xinh như búp bê.',
    visualEmoji: '👠', accentColor: '#F8BBD0' },

  // ══════════════════════════════════════════
  // BAGS — TÚI XÁCH (Level 1–12)
  // ══════════════════════════════════════════

  { id: 'baguette-shoulder-bag', image: '/assets/outfits/bags/baguette-bag.png', name: 'Túi Kẹp Nách Baguette Y2K', category: 'bags', subCategory: 'mini_bag',
    styleTags: ['y2k', 'cute', 'korean'], colors: ['pink', 'white', 'black'],
    occasions: ['coffee', 'shopping', 'date'], cost: 75000, price: 170000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'common',
    description: 'Form kẹp nách thời thượng da mềm mượt, đựng vừa thỏi son và điện thoại.',
    visualEmoji: '👜', accentColor: '#F8BBD0' },

  { id: 'quilted-chain-bag', image: '/assets/outfits/bags/clutch-bag.png', name: 'Túi Xách Da Chần Bông Dây Xích', category: 'bags', subCategory: 'luxury_bag',
    styleTags: ['luxury', 'elegant', 'party'], colors: ['black', 'white', 'beige'],
    occasions: ['party', 'date', 'formal'], cost: 160000, price: 360000,
    stock: 3, maxStock: 8, unlockLevel: 10, rarity: 'premium',
    description: 'Quả trám chần nổi tinh xảo phối dây xích mạ vàng bóng loáng chuẩn tiểu thư.',
    visualEmoji: '👛', accentColor: '#FFD54F' },

  { id: 'canvas-tote-bag', image: '/assets/outfits/bags/tote-bag.png', name: 'Túi Vải Canvas Eco Minimal', category: 'bags', subCategory: 'tote',
    styleTags: ['minimal', 'casual', 'sporty'], colors: ['cream', 'white', 'black'],
    occasions: ['school', 'picnic', 'shopping'], cost: 50000, price: 120000,
    stock: 6, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Vải bố bền bỉ thân thiện môi trường, ngăn rộng thoải mái chứa sách vở.',
    visualEmoji: '🛍️', accentColor: '#E0D2C7' },

  { id: 'mini-crossbody', image: '/assets/outfits/bags/crossbody-bag.png', name: 'Túi Mini Đeo Chéo Tassle', category: 'bags', subCategory: 'mini_bag',
    styleTags: ['cute', 'feminine', 'soft_girl'], colors: ['pink', 'cream', 'brown'],
    occasions: ['coffee', 'date', 'shopping'], cost: 85000, price: 190000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Size mini xíu gọn nhẹ treo tassel satin lắc lư cực kỳ dễ thương mọi outfit.',
    visualEmoji: '💼', accentColor: '#FFCCBC' },

  { id: 'office-tote', image: '/assets/outfits/bags/office-bag.png', name: 'Túi Tote Công Sở Da PU Sang', category: 'bags', subCategory: 'office_bag',
    styleTags: ['office', 'minimal', 'elegant'], colors: ['black', 'brown', 'beige'],
    occasions: ['work', 'formal', 'travel'], cost: 145000, price: 315000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Dung tích lớn chứa laptop 13inch, da PU cao cấp không bong tróc theo năm tháng.',
    visualEmoji: '💼', accentColor: '#5D4037' },

  { id: 'bucket-hat-bag', image: '/assets/outfits/bags/bucket-bag.png', name: 'Túi Đeo Vai Bucket Form Mềm', category: 'bags', subCategory: 'shoulder_bag',
    styleTags: ['casual', 'summer', 'vintage'], colors: ['beige', 'brown', 'cream'],
    occasions: ['travel', 'picnic', 'shopping'], cost: 95000, price: 210000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Hình chiếc bucket mềm dẻo da lộn nhung nhẹ đeo vai chéo đều siêu thời thượng.',
    visualEmoji: '🪣', accentColor: '#8D6E63' },

  // ══════════════════════════════════════════
  // ACCESSORIES — PHỤ KIỆN (Level 1–10)
  // ══════════════════════════════════════════

  { id: 'french-beret-hat', image: '/assets/outfits/accessories/beret.png', name: 'Mũ Beret Nỉ Phong Cách Pháp', category: 'accessories', subCategory: 'hat',
    styleTags: ['vintage', 'cute', 'korean'], colors: ['beige', 'brown', 'black', 'pink'],
    occasions: ['coffee', 'travel', 'date'], cost: 45000, price: 110000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Chất dạ len mềm giữ form chuẩn, tạo điểm nhấn nghệ sĩ lãng mạn cho mái tóc.',
    visualEmoji: '🎩', accentColor: '#8D6E63' },

  { id: 'pearl-earrings', image: '/assets/outfits/accessories/earrings.png', name: 'Khuyên Tai Ngọc Trai Giọt Nước', category: 'accessories', subCategory: 'earrings',
    styleTags: ['elegant', 'luxury', 'office'], colors: ['white', 'cream'],
    occasions: ['work', 'party', 'formal', 'date'], cost: 55000, price: 135000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Ngọc trai nhân tạo ánh xà cừ lung linh, chuôi bạc 925 chống dị ứng da nhạy cảm.',
    visualEmoji: '✨', accentColor: '#FFF9C4' },

  { id: 'cat-eye-sunglasses', image: '/assets/outfits/accessories/sunglasses.png', name: 'Kính Râm Gọng Mắt Mèo Cá Tính', category: 'accessories', subCategory: 'glasses',
    styleTags: ['streetwear', 'y2k', 'summer', 'retro'], colors: ['black', 'brown'],
    occasions: ['travel', 'shopping', 'vacation'], cost: 60000, price: 145000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'uncommon',
    description: 'Tròng kính UV400 bảo vệ mắt, form mắt mèo nâng tầm outfit thêm phần thời thượng.',
    visualEmoji: '🕶️', accentColor: '#424242' },

  { id: 'satin-ribbon-bow', image: '/assets/outfits/accessories/hair-bow.png', name: 'Kẹp Tóc Nơ Lụa Ruy Băng', category: 'accessories', subCategory: 'hair_clip',
    styleTags: ['cute', 'feminine', 'korean', 'soft_girl'], colors: ['pink', 'white', 'black'],
    occasions: ['date', 'coffee', 'school'], cost: 30000, price: 75000,
    stock: 8, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Ruy băng satin cao cấp mềm mại bay bổng, gài tóc tựa nàng công chúa.',
    visualEmoji: '🎀', accentColor: '#F8BBD0' },

  { id: 'layered-necklace', image: '/assets/outfits/accessories/necklace.png', name: 'Vòng Cổ Dây Mảnh Nhiều Tầng', category: 'accessories', subCategory: 'necklace',
    styleTags: ['minimal', 'elegant', 'chic'], colors: ['white', 'yellow'],
    occasions: ['date', 'party', 'coffee'], cost: 65000, price: 155000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Bộ 3 dây bạc và vàng 18K xếp tầng sang trọng, mặt pendant ngôi sao & mặt trăng.',
    visualEmoji: '⭐', accentColor: '#FFC107' },

  { id: 'pearl-headband', image: '/assets/outfits/accessories/headband.png', name: 'Băng Đô Ngọc Trai Đính Thủ Công', category: 'accessories', subCategory: 'hair_clip',
    styleTags: ['elegant', 'feminine', 'vintage'], colors: ['white', 'cream'],
    occasions: ['date', 'party', 'formal'], cost: 50000, price: 125000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Nhựa plastic cứng nhẹ đính ngọc trai xung quanh, giữ tóc gọn cả ngày dài.',
    visualEmoji: '💫', accentColor: '#FFFDE7' },

  { id: 'scrunchie-set', image: '/assets/outfits/accessories/scrunchie.png', name: 'Set 3 Scrunchie Nhung Pastel', category: 'accessories', subCategory: 'hair_clip',
    styleTags: ['cute', 'casual', 'soft_girl'], colors: ['pink', 'purple', 'cream'],
    occasions: ['school', 'sport', 'picnic'], cost: 25000, price: 65000,
    stock: 10, maxStock: 20, unlockLevel: 1, rarity: 'common',
    description: 'Vải nhung bông mềm không làm gãy tóc, 3 màu đồng bộ phối được cả tuần.',
    visualEmoji: '🌀', accentColor: '#CE93D8' },

  { id: 'gold-belt', image: '/assets/outfits/accessories/belt.png', name: 'Thắt Lưng Khóa Vuông Mạ Vàng', category: 'accessories', subCategory: 'belt',
    styleTags: ['chic', 'elegant', 'office'], colors: ['yellow', 'black', 'brown'],
    occasions: ['work', 'date', 'party'], cost: 70000, price: 165000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'uncommon',
    description: 'Khóa hình vuông mạ vàng cân đối sang trọng, da PU mềm ôm eo không đau cả ngày.',
    visualEmoji: '🏅', accentColor: '#D9A441' },

  { id: 'charm-bracelet', image: '/assets/outfits/accessories/bracelet.png', name: 'Vòng Tay Charm Cute Collection', category: 'accessories', subCategory: 'bracelet',
    styleTags: ['cute', 'y2k', 'soft_girl'], colors: ['pink', 'white', 'yellow'],
    occasions: ['school', 'coffee', 'date'], cost: 40000, price: 95000,
    stock: 6, maxStock: 12, unlockLevel: 2, rarity: 'common',
    description: 'Xỏ charm handmade đám mây, trái tim, cầu vồng — mỗi ngày xỏ kiểu khác nhau.',
    visualEmoji: '🌈', accentColor: '#FFD54F' },

  { id: 'oversized-glasses', image: '/assets/outfits/accessories/round-glasses.png', name: 'Kính Gọng Nhựa Oversize Trendy', category: 'accessories', subCategory: 'glasses',
    styleTags: ['y2k', 'retro', 'streetwear'], colors: ['brown', 'black', 'pink'],
    occasions: ['street', 'shopping', 'coffee'], cost: 55000, price: 130000,
    stock: 4, maxStock: 10, unlockLevel: 6, rarity: 'uncommon',
    description: 'Gọng nhựa dày oversized vintage che nửa mặt siêu cool, tròng trong suốt không độ.',
    visualEmoji: '👓', accentColor: '#6D4C41' },


  // ══════════════════════════════════════════
  // NEW TAXONOMY EXTENSIONS
  // ══════════════════════════════════════════
  { id: 'dresses-bodycon-dress', image: '/assets/outfits/dresses/bodycon-dress.png', name: 'Đầm Body Quyến Rũ', category: 'dresses', subCategory: 'bodycon_dress',
    styleTags: ['party', 'chic'], colors: ['black', 'red'],
    occasions: ['party', 'date'], cost: 180000, price: 390000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Tôn đường cong quyến rũ.', accentColor: '#D87C9B' },

  { id: 'dresses-midi-dress', image: '/assets/outfits/dresses/midi-dress.png', name: 'Đầm Midi Xòe Nơ Ngực', category: 'dresses', subCategory: 'midi_dress',
    styleTags: ['feminine', 'korean'], colors: ['cream', 'pink'],
    occasions: ['coffee', 'date'], cost: 160000, price: 350000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Nhã nhặn nữ tính.', accentColor: '#D87C9B' },

  { id: 'dresses-shirt-dress', image: '/assets/outfits/dresses/shirt-dress.png', name: 'Đầm Sơ Mi Đai Eo', category: 'dresses', subCategory: 'shirt_dress',
    styleTags: ['minimal', 'office'], colors: ['white', 'beige'],
    occasions: ['work', 'school'], cost: 140000, price: 300000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Tối giản lịch sự.', accentColor: '#D87C9B' },

  { id: 'dresses-slip-dress', image: '/assets/outfits/dresses/slip-dress.png', name: 'Đầm Hai Dây Lụa Satin', category: 'dresses', subCategory: 'slip_dress',
    styleTags: ['feminine', 'chic'], colors: ['pink', 'black'],
    occasions: ['date', 'party'], cost: 170000, price: 370000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Mềm rũ quyến rũ.', accentColor: '#D87C9B' },

  { id: 'dresses-off-shoulder-dress', image: '/assets/outfits/dresses/off-shoulder-dress.png', name: 'Đầm Trễ Vai Bèo Tầng', category: 'dresses', subCategory: 'off_shoulder_dress',
    styleTags: ['cute', 'party'], colors: ['white', 'pink'],
    occasions: ['date', 'party'], cost: 165000, price: 360000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Khoe vai thon mộng mơ.', accentColor: '#D87C9B' },

  { id: 'dresses-square-neck-dress', image: '/assets/outfits/dresses/square-neck-dress.png', name: 'Đầm Cổ Vuông Tay Bồng', category: 'dresses', subCategory: 'square_neck_dress',
    styleTags: ['vintage', 'korean'], colors: ['cream', 'black'],
    occasions: ['coffee', 'work'], cost: 150000, price: 330000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Phong cách cổ điển Pháp.', accentColor: '#D87C9B' },

  { id: 'dresses-lace-dress', image: '/assets/outfits/dresses/lace-dress.png', name: 'Đầm Ren Trắng Tiểu Thư', category: 'dresses', subCategory: 'lace_dress',
    styleTags: ['feminine', 'luxury'], colors: ['white'],
    occasions: ['party', 'formal'], cost: 220000, price: 480000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'luxury',
    description: 'Chất ren thêu kiêu sa.', accentColor: '#D87C9B' },

  { id: 'dresses-satin-dress', image: '/assets/outfits/dresses/satin-dress.png', name: 'Đầm Satin Bóng Ánh Kim', category: 'dresses', subCategory: 'satin_dress',
    styleTags: ['luxury', 'party'], colors: ['cream', 'yellow'],
    occasions: ['party', 'formal'], cost: 230000, price: 500000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'luxury',
    description: 'Sang trọng đẳng cấp.', accentColor: '#D87C9B' },

  { id: 'dresses-sequin-dress', image: '/assets/outfits/dresses/sequin-dress.png', name: 'Đầm Mini Sequin Lấp Lánh', category: 'dresses', subCategory: 'sequin_dress',
    styleTags: ['y2k', 'party'], colors: ['purple', 'pink'],
    occasions: ['party', 'street'], cost: 210000, price: 460000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'premium',
    description: 'Chất quẩy tiệc Y2K.', accentColor: '#D87C9B' },

  { id: 'dresses-vintage-dress', image: '/assets/outfits/dresses/vintage-dress.png', name: 'Đầm Vintage Cúc Bọc', category: 'dresses', subCategory: 'vintage_dress',
    styleTags: ['vintage', 'casual'], colors: ['brown', 'beige'],
    occasions: ['coffee', 'picnic'], cost: 135000, price: 290000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Hoài cổ dịu mát.', accentColor: '#D87C9B' },

  { id: 'dresses-korean-dress', image: '/assets/outfits/dresses/korean-dress.png', name: 'Đầm Korean Xếp Ly Eo', category: 'dresses', subCategory: 'korean_dress',
    styleTags: ['korean', 'cute'], colors: ['pink', 'cream'],
    occasions: ['school', 'coffee'], cost: 145000, price: 310000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Chuẩn style Seoul.', accentColor: '#D87C9B' },

  { id: 'dresses-y2k-dress', image: '/assets/outfits/dresses/bodycon-dress.png', name: 'Đầm Y2K Ôm Sát Cá Tính', category: 'dresses', subCategory: 'y2k_dress',
    styleTags: ['y2k', 'streetwear'], colors: ['blue', 'black'],
    occasions: ['street', 'party'], cost: 175000, price: 380000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Thời thượng chất phát ngất.', accentColor: '#D87C9B' },

  { id: 'dresses-luxury-dress', image: '/assets/outfits/dresses/luxury-dress.png', name: 'Đầm Dạ Hội Luxury Lưng Khóa', category: 'dresses', subCategory: 'luxury_dress',
    styleTags: ['luxury', 'party'], colors: ['black', 'red'],
    occasions: ['formal', 'party'], cost: 280000, price: 650000,
    stock: 5, maxStock: 10, unlockLevel: 6, rarity: 'luxury',
    description: 'Đỉnh cao kiêu kỳ.', accentColor: '#D87C9B' },

  { id: 'jackets-denim-jacket', image: '/assets/outfits/jackets/denim-jacket.png', name: 'Áo Khoác Jean Vintage', category: 'jackets', subCategory: 'denim_jacket',
    styleTags: ['denim', 'casual'], colors: ['blue'],
    occasions: ['school', 'street'], cost: 160000, price: 340000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Bụi bặm cá tính.', accentColor: '#D87C9B' },

  { id: 'jackets-leather-jacket', image: '/assets/outfits/jackets/leather-jacket.png', name: 'Áo Khoác Da Biker', category: 'jackets', subCategory: 'leather_jacket',
    styleTags: ['streetwear', 'y2k'], colors: ['black'],
    occasions: ['street', 'party'], cost: 220000, price: 480000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Chất da PU cool ngầu.', accentColor: '#D87C9B' },

  { id: 'jackets-bomber-jacket', image: '/assets/outfits/jackets/bomber-jacket.png', name: 'Áo Bomber Thể Thao', category: 'jackets', subCategory: 'bomber_jacket',
    styleTags: ['sporty', 'casual'], colors: ['green', 'black'],
    occasions: ['school', 'street'], cost: 170000, price: 360000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'common',
    description: 'Năng động ấm áp.', accentColor: '#D87C9B' },

  { id: 'jackets-varsity-jacket', image: '/assets/outfits/jackets/varsity-jacket.png', name: 'Áo Varsity Preppy 90s', category: 'jackets', subCategory: 'varsity_jacket',
    styleTags: ['preppy', 'retro'], colors: ['navy', 'red'],
    occasions: ['school', 'street'], cost: 190000, price: 420000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Học sinh Mỹ cổ điển.', accentColor: '#D87C9B' },

  { id: 'jackets-trench-coat', image: '/assets/outfits/jackets/trench-coat.png', name: 'Áo Trench Coat Dáng Dài', category: 'jackets', subCategory: 'trench_coat',
    styleTags: ['chic', 'elegant'], colors: ['beige', 'brown'],
    occasions: ['travel', 'work'], cost: 250000, price: 550000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'luxury',
    description: 'Đẳng cấp mùa đông.', accentColor: '#D87C9B' },

  { id: 'jackets-wool-coat', image: '/assets/outfits/jackets/wool-coat.png', name: 'Áo Khoác Dạ Hàn Quốc', category: 'jackets', subCategory: 'wool_coat',
    styleTags: ['winter', 'korean'], colors: ['cream', 'black'],
    occasions: ['travel', 'date'], cost: 230000, price: 500000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Len dạ ấm mịn.', accentColor: '#D87C9B' },

  { id: 'jackets-fur-jacket', image: '/assets/outfits/jackets/fur-jacket.png', name: 'Áo Khoác Lông Bông Mềm', category: 'jackets', subCategory: 'fur_jacket',
    styleTags: ['soft_girl', 'luxury'], colors: ['white', 'pink'],
    occasions: ['party', 'date'], cost: 240000, price: 530000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'premium',
    description: 'Mềm như gấu bông.', accentColor: '#D87C9B' },

  { id: 'jackets-outer-cardigan', image: '/assets/outfits/jackets/outer-cardigan.png', name: 'Cardigan Dệt Kim Mỏng', category: 'jackets', subCategory: 'outer_cardigan',
    styleTags: ['soft_girl', 'cute'], colors: ['cream', 'purple'],
    occasions: ['coffee', 'school'], cost: 130000, price: 280000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Nhẹ nhàng nữ tính.', accentColor: '#D87C9B' },

  { id: 'jackets-tweed-jacket', image: '/assets/outfits/jackets/tweed-jacket.png', name: 'Áo Khoác Tweed Chanel', category: 'jackets', subCategory: 'tweed_jacket',
    styleTags: ['luxury', 'elegant'], colors: ['white', 'black'],
    occasions: ['party', 'formal'], cost: 260000, price: 580000,
    stock: 5, maxStock: 10, unlockLevel: 6, rarity: 'luxury',
    description: 'Đính cúc vàng sang trọng.', accentColor: '#D87C9B' },

  { id: 'jackets-cropped-jacket', image: '/assets/outfits/jackets/cropped-jacket.png', name: 'Áo Khoác Cropped Nhẹ', category: 'jackets', subCategory: 'cropped_jacket',
    styleTags: ['chic', 'y2k'], colors: ['pink', 'white'],
    occasions: ['shopping', 'coffee'], cost: 150000, price: 320000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'common',
    description: 'Form lửng hack dáng.', accentColor: '#D87C9B' },

  { id: 'jackets-oversized-jacket', image: '/assets/outfits/jackets/oversized-jacket.png', name: 'Áo Khoác Oversized Đường Phố', category: 'jackets', subCategory: 'oversized_jacket',
    styleTags: ['streetwear'], colors: ['black', 'gray'],
    occasions: ['street', 'shopping'], cost: 180000, price: 390000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Rộng rãi phóng khoáng.', accentColor: '#D87C9B' },

  { id: 'jackets-windbreaker', image: '/assets/outfits/jackets/windbreaker.png', name: 'Áo Gió Chống Nước', category: 'jackets', subCategory: 'windbreaker',
    styleTags: ['sporty', 'casual'], colors: ['blue', 'black'],
    occasions: ['sport', 'travel'], cost: 140000, price: 300000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Nhẹ thoáng cản gió.', accentColor: '#D87C9B' },

  { id: 'jackets-varsity-coat', image: '/assets/outfits/jackets/varsity-coat.png', name: 'Áo Khoác Varsity Da Dày', category: 'jackets', subCategory: 'varsity_coat',
    styleTags: ['streetwear', 'retro'], colors: ['black', 'white'],
    occasions: ['street', 'school'], cost: 210000, price: 450000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Họa tiết thêu cá tính.', accentColor: '#D87C9B' },

  { id: 'jackets-sporty-jacket', image: '/assets/outfits/jackets/sporty-jacket.png', name: 'Áo Khoác Sporty Bo Chun', category: 'jackets', subCategory: 'sporty_jacket',
    styleTags: ['sporty'], colors: ['black', 'white'],
    occasions: ['sport', 'street'], cost: 145000, price: 310000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Khỏe khoắn sành điệu.', accentColor: '#D87C9B' },

  { id: 'shoes-white-sneakers', image: '/assets/outfits/shoes/white-sneakers.png', name: 'Sneaker Trắng Cổ Điển', category: 'shoes', subCategory: 'white_sneakers',
    styleTags: ['casual', 'sporty'], colors: ['white'],
    occasions: ['school', 'street'], cost: 130000, price: 280000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Dễ phối mọi trang phục.', accentColor: '#D87C9B' },

  { id: 'shoes-chunky-sneakers', image: '/assets/outfits/shoes/chunky-sneakers.png', name: 'Sneaker Chunky Hack Chiều Cao', category: 'shoes', subCategory: 'chunky_sneakers',
    styleTags: ['y2k', 'streetwear'], colors: ['white', 'beige'],
    occasions: ['street', 'shopping'], cost: 160000, price: 350000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Đế đôn 5cm năng động.', accentColor: '#D87C9B' },

  { id: 'shoes-platform-sneakers', image: '/assets/outfits/shoes/platform-sneakers.png', name: 'Sneaker Platform Đế Chunky', category: 'shoes', subCategory: 'platform_sneakers',
    styleTags: ['y2k', 'cute'], colors: ['pink', 'white'],
    occasions: ['street', 'school'], cost: 170000, price: 370000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Cực kì thời thượng.', accentColor: '#D87C9B' },

  { id: 'shoes-pointed-heels', image: '/assets/outfits/shoes/pointed-heels.png', name: 'Cao Gót Mũi Nhọn 7cm', category: 'shoes', subCategory: 'pointed_heels',
    styleTags: ['elegant', 'office'], colors: ['black', 'red'],
    occasions: ['work', 'party'], cost: 150000, price: 330000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'rare',
    description: 'Tôn đôi chân thon.', accentColor: '#D87C9B' },

  { id: 'shoes-strap-heels', image: '/assets/outfits/shoes/strap-heels.png', name: 'Cao Gót Quai Mảnh Tiệc', category: 'shoes', subCategory: 'strap_heels',
    styleTags: ['party', 'chic'], colors: ['silver', 'black'],
    occasions: ['party', 'date'], cost: 160000, price: 350000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Quyến rũ thanh thoát.', accentColor: '#D87C9B' },

  { id: 'shoes-kitten-heels', image: '/assets/outfits/shoes/kitten-heels.png', name: 'Kitten Heels Gót Thấp 4cm', category: 'shoes', subCategory: 'kitten_heels',
    styleTags: ['feminine', 'korean'], colors: ['pink', 'cream'],
    occasions: ['coffee', 'work'], cost: 135000, price: 290000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Gót nhỏ nhắn êm chân.', accentColor: '#D87C9B' },

  { id: 'shoes-sandals', image: '/assets/outfits/shoes/sandals.png', name: 'Sandal Quai Ngang Mùa Hè', category: 'shoes', subCategory: 'sandals',
    styleTags: ['summer', 'casual'], colors: ['beige', 'white'],
    occasions: ['vacation', 'shopping'], cost: 90000, price: 195000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Thoáng mát đi biển.', accentColor: '#D87C9B' },

  { id: 'shoes-platform-sandals', image: '/assets/outfits/shoes/platform-sandals.png', name: 'Sandal Platform Đế Dày', category: 'shoes', subCategory: 'platform_sandals',
    styleTags: ['y2k', 'casual'], colors: ['black', 'white'],
    occasions: ['street', 'shopping'], cost: 120000, price: 260000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Thời trang mùa hè.', accentColor: '#D87C9B' },

  { id: 'shoes-ankle-boots', image: '/assets/outfits/shoes/ankle-boots.png', name: 'Boots Da Cổ Thấp Vintage', category: 'shoes', subCategory: 'ankle_boots',
    styleTags: ['vintage', 'chic'], colors: ['black', 'brown'],
    occasions: ['street', 'travel'], cost: 180000, price: 390000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Da PU gót block êm.', accentColor: '#D87C9B' },

  { id: 'shoes-knee-high-boots', image: '/assets/outfits/shoes/ankle-boots.png', name: 'Boots Da Cổ Cao Qua Gối', category: 'shoes', subCategory: 'knee_high_boots',
    styleTags: ['chic', 'luxury'], colors: ['black'],
    occasions: ['party', 'travel'], cost: 230000, price: 500000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'luxury',
    description: 'Đỉnh cao phong cách.', accentColor: '#D87C9B' },

  { id: 'shoes-chelsea-boots', image: '/assets/outfits/shoes/ankle-boots.png', name: 'Chelsea Boots Chunky', category: 'shoes', subCategory: 'chelsea_boots',
    styleTags: ['minimal', 'streetwear'], colors: ['black', 'brown'],
    occasions: ['work', 'street'], cost: 175000, price: 380000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Chun hai bên kéo dễ dàng.', accentColor: '#D87C9B' },

  { id: 'shoes-loafers', image: '/assets/outfits/shoes/loafers.png', name: 'Loafer Khóa Vàng Preppy', category: 'shoes', subCategory: 'loafers',
    styleTags: ['preppy', 'office'], colors: ['black', 'brown'],
    occasions: ['work', 'school'], cost: 140000, price: 300000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Chuẩn style học đường.', accentColor: '#D87C9B' },

  { id: 'shoes-ballet-flats', image: '/assets/outfits/shoes/ballet-flats.png', name: 'Giày Đế Bệt Ballet Ribbon', category: 'shoes', subCategory: 'ballet_flats',
    styleTags: ['cute', 'soft_girl'], colors: ['pink', 'white'],
    occasions: ['coffee', 'shopping'], cost: 110000, price: 240000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Mềm mại như vũ công.', accentColor: '#D87C9B' },

  { id: 'shoes-mules', image: '/assets/outfits/shoes/mules.png', name: 'Mule Hở Gót Cổ Điển', category: 'shoes', subCategory: 'mules',
    styleTags: ['minimal', 'office'], colors: ['beige', 'black'],
    occasions: ['work', 'coffee'], cost: 130000, price: 280000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Tiện lợi thanh lịch.', accentColor: '#D87C9B' },

  { id: 'shoes-oxford-shoes', image: '/assets/outfits/shoes/oxford-shoes.png', name: 'Giày Oxford Da Bóng British', category: 'shoes', subCategory: 'oxford_shoes',
    styleTags: ['vintage', 'preppy'], colors: ['brown', 'black'],
    occasions: ['work', 'school'], cost: 155000, price: 340000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Phong cách Anh Quốc.', accentColor: '#D87C9B' },

  { id: 'shoes-sport-shoes', image: '/assets/outfits/shoes/sport-shoes.png', name: 'Giày Thể Thao Tập Gym', category: 'shoes', subCategory: 'sport_shoes',
    styleTags: ['sporty'], colors: ['white', 'blue'],
    occasions: ['sport', 'street'], cost: 125000, price: 270000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Êm chân nhẹ nhàng.', accentColor: '#D87C9B' },

  { id: 'shoes-luxury-shoes', image: '/assets/outfits/shoes/luxury-shoes.png', name: 'Giày Cao Gót Đính Đá Luxury', category: 'shoes', subCategory: 'luxury_shoes',
    styleTags: ['luxury', 'party'], colors: ['gold', 'silver'],
    occasions: ['party', 'formal'], cost: 260000, price: 580000,
    stock: 5, maxStock: 10, unlockLevel: 6, rarity: 'luxury',
    description: 'Lấp lánh vương giả.', accentColor: '#D87C9B' },

  { id: 'bags-tote-bag', image: '/assets/outfits/bags/tote-bag.png', name: 'Túi Vải Canvas Eco Tote', category: 'bags', subCategory: 'tote_bag',
    styleTags: ['minimal', 'casual'], colors: ['cream', 'white'],
    occasions: ['school', 'shopping'], cost: 60000, price: 130000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Rộng rãi bền bỉ.', accentColor: '#D87C9B' },

  { id: 'bags-crossbody-bag', image: '/assets/outfits/bags/crossbody-bag.png', name: 'Túi Đeo Chéo Mini Quai Dây', category: 'bags', subCategory: 'crossbody_bag',
    styleTags: ['casual', 'cute'], colors: ['pink', 'brown'],
    occasions: ['shopping', 'travel'], cost: 105000, price: 230000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Nhỏ gọn năng động.', accentColor: '#D87C9B' },

  { id: 'bags-baguette-bag', image: '/assets/outfits/bags/baguette-bag.png', name: 'Túi Baguette Y2K Da Bóng', category: 'bags', subCategory: 'baguette_bag',
    styleTags: ['y2k', 'chic'], colors: ['purple', 'black'],
    occasions: ['street', 'party'], cost: 130000, price: 280000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Chuẩn trend Y2K.', accentColor: '#D87C9B' },

  { id: 'bags-bucket-bag', image: '/assets/outfits/bags/bucket-bag.png', name: 'Túi Bucket Dây Rút', category: 'bags', subCategory: 'bucket_bag',
    styleTags: ['casual', 'vintage'], colors: ['brown', 'beige'],
    occasions: ['travel', 'picnic'], cost: 125000, price: 270000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Đựng được nhiều đồ.', accentColor: '#D87C9B' },

  { id: 'bags-clutch-bag', image: '/assets/outfits/bags/clutch-bag.png', name: 'Túi Cầm Tay Clutch Tiệc', category: 'bags', subCategory: 'clutch_bag',
    styleTags: ['party', 'luxury'], colors: ['gold', 'black'],
    occasions: ['party', 'formal'], cost: 180000, price: 390000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Sang trọng cầm tay.', accentColor: '#D87C9B' },

  { id: 'bags-box-bag', image: '/assets/outfits/bags/box-bag.png', name: 'Túi Hộp Vuông Da Cứng', category: 'bags', subCategory: 'box_bag',
    styleTags: ['chic', 'minimal'], colors: ['white', 'black'],
    occasions: ['coffee', 'date'], cost: 140000, price: 300000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Đứng form vuông vắn.', accentColor: '#D87C9B' },

  { id: 'bags-leather-bag', image: '/assets/outfits/bags/leather-bag.png', name: 'Túi Da Thật Đeo Chéo', category: 'bags', subCategory: 'leather_bag',
    styleTags: ['chic', 'luxury'], colors: ['brown', 'black'],
    occasions: ['work', 'travel'], cost: 190000, price: 410000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Chất da cao cấp.', accentColor: '#D87C9B' },

  { id: 'bags-canvas-bag', image: '/assets/outfits/bags/canvas-bag.png', name: 'Túi Canvas Kẻ Sọc Vintage', category: 'bags', subCategory: 'canvas_bag',
    styleTags: ['vintage', 'casual'], colors: ['cream', 'navy'],
    occasions: ['school', 'picnic'], cost: 70000, price: 150000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Học sinh sinh viên.', accentColor: '#D87C9B' },

  { id: 'bags-pastel-bag', image: '/assets/outfits/bags/pastel-bag.png', name: 'Túi Xách Hồng Pastel Kẹo', category: 'bags', subCategory: 'pastel_bag',
    styleTags: ['cute', 'soft_girl'], colors: ['pink'],
    occasions: ['date', 'coffee'], cost: 110000, price: 240000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Màu hồng dịu ngọt.', accentColor: '#D87C9B' },

  { id: 'bags-vintage-bag', image: '/assets/outfits/bags/vintage-bag.png', name: 'Túi Da Vintage Khóa Đồng', category: 'bags', subCategory: 'vintage_bag',
    styleTags: ['vintage'], colors: ['brown'],
    occasions: ['coffee', 'travel'], cost: 135000, price: 290000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Hoài cổ sang trọng.', accentColor: '#D87C9B' },

  { id: 'bags-y2k-bag', image: '/assets/outfits/bags/y2k-bag.png', name: 'Túi Y2K Đính Đinh Tán', category: 'bags', subCategory: 'y2k_bag',
    styleTags: ['y2k', 'streetwear'], colors: ['black', 'silver'],
    occasions: ['street', 'party'], cost: 145000, price: 310000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Cá tính hầm hố.', accentColor: '#D87C9B' },

  { id: 'bags-bow-bag', image: '/assets/outfits/bags/bow-bag.png', name: 'Túi Nơ Satin Ngọt Ngào', category: 'bags', subCategory: 'bow_bag',
    styleTags: ['cute', 'feminine'], colors: ['pink', 'white'],
    occasions: ['date', 'party'], cost: 120000, price: 260000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Đính nơ satin xinh.', accentColor: '#D87C9B' },

  { id: 'bags-pearl-bag', image: '/assets/outfits/bags/pearl-bag.png', name: 'Túi Đính Ngọc Trai Tiệc', category: 'bags', subCategory: 'pearl_bag',
    styleTags: ['luxury', 'feminine'], colors: ['white'],
    occasions: ['party', 'formal'], cost: 220000, price: 480000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'luxury',
    description: 'Đính ngọc trai thủ công.', accentColor: '#D87C9B' },

  { id: 'accessories-sunglasses', image: '/assets/outfits/accessories/sunglasses.png', name: 'Kính Râm Mắt Mèo UV400', category: 'accessories', subCategory: 'sunglasses',
    styleTags: ['streetwear', 'summer'], colors: ['black', 'brown'],
    occasions: ['travel', 'shopping'], cost: 65000, price: 145000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Chống tia UV cá tính.', accentColor: '#D87C9B' },

  { id: 'accessories-round-glasses', image: '/assets/outfits/accessories/round-glasses.png', name: 'Kính Gọng Tròn Tri Thức', category: 'accessories', subCategory: 'round_glasses',
    styleTags: ['preppy', 'korean'], colors: ['black', 'gold'],
    occasions: ['school', 'coffee'], cost: 55000, price: 120000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Xinh xắn tri thức.', accentColor: '#D87C9B' },

  { id: 'accessories-baseball-cap', image: '/assets/outfits/accessories/baseball-cap.png', name: 'Mũ Lưỡi Trai Thêu Logo', category: 'accessories', subCategory: 'baseball_cap',
    styleTags: ['sporty', 'casual'], colors: ['black', 'white'],
    occasions: ['sport', 'street'], cost: 45000, price: 100000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Năng động che nắng.', accentColor: '#D87C9B' },

  { id: 'accessories-beret', image: '/assets/outfits/accessories/beret.png', name: 'Mũ Beret Nỉ Phong Cách Pháp', category: 'accessories', subCategory: 'beret',
    styleTags: ['vintage', 'cute'], colors: ['beige', 'black'],
    occasions: ['coffee', 'travel'], cost: 60000, price: 130000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Lãng mạn Pháp.', accentColor: '#D87C9B' },

  { id: 'accessories-bucket-hat', image: '/assets/outfits/accessories/bucket-hat.png', name: 'Mũ Bucket Vải Canvas', category: 'accessories', subCategory: 'bucket_hat',
    styleTags: ['casual', 'streetwear'], colors: ['beige', 'black'],
    occasions: ['travel', 'picnic'], cost: 50000, price: 110000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Đường phố trẻ trung.', accentColor: '#D87C9B' },

  { id: 'accessories-straw-hat', image: '/assets/outfits/accessories/straw-hat.png', name: 'Mũ Cói Rộng Vành Đi Biển', category: 'accessories', subCategory: 'straw_hat',
    styleTags: ['summer', 'vacation'], colors: ['beige'],
    occasions: ['vacation', 'travel'], cost: 70000, price: 150000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Đi biển che nắng.', accentColor: '#D87C9B' },

  { id: 'accessories-ring', image: '/assets/outfits/accessories/ring.png', name: 'Bộ Nhẫn Kim Loại Minimal', category: 'accessories', subCategory: 'ring',
    styleTags: ['minimal', 'chic'], colors: ['silver', 'gold'],
    occasions: ['street', 'coffee'], cost: 40000, price: 90000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Set 3 chiếc phong cách.', accentColor: '#D87C9B' },

  { id: 'accessories-hair-bow', image: '/assets/outfits/accessories/hair-bow.png', name: 'Nơ Tóc Lụa Satin Ruy Băng', category: 'accessories', subCategory: 'hair_bow',
    styleTags: ['cute', 'feminine'], colors: ['pink', 'white'],
    occasions: ['date', 'school'], cost: 35000, price: 80000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Gài tóc công chúa.', accentColor: '#D87C9B' },

  { id: 'accessories-scrunchie', image: '/assets/outfits/accessories/scrunchie.png', name: 'Set 3 Scrunchie Nhung Pastel', category: 'accessories', subCategory: 'scrunchie',
    styleTags: ['cute', 'casual'], colors: ['purple', 'pink'],
    occasions: ['school', 'sport'], cost: 25000, price: 60000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Nhung bông mềm mại.', accentColor: '#D87C9B' },

  { id: 'accessories-headband', image: '/assets/outfits/accessories/headband.png', name: 'Băng Đô Ngọc Trai Đính Đá', category: 'accessories', subCategory: 'headband',
    styleTags: ['elegant', 'feminine'], colors: ['cream', 'white'],
    occasions: ['party', 'date'], cost: 50000, price: 115000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Giữ tóc xinh xắn.', accentColor: '#D87C9B' },

  { id: 'accessories-scarf', image: '/assets/outfits/accessories/scarf.png', name: 'Khăn Choàng Cổ Len Ấm', category: 'accessories', subCategory: 'scarf',
    styleTags: ['winter', 'korean'], colors: ['beige', 'pink'],
    occasions: ['travel', 'school'], cost: 75000, price: 160000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Ấm áp mùa đông.', accentColor: '#D87C9B' },

  { id: 'accessories-watch', image: '/assets/outfits/accessories/watch.png', name: 'Đồng Hồ Dây Da Cổ Điển', category: 'accessories', subCategory: 'watch',
    styleTags: ['office', 'elegant'], colors: ['brown', 'black'],
    occasions: ['work', 'formal'], cost: 120000, price: 260000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'rare',
    description: 'Thời trang sang trọng.', accentColor: '#D87C9B' },

  { id: 'accessories-brooch', image: '/assets/outfits/accessories/brooch.png', name: 'Cài Áo Đính Ngọc Trai Tiệc', category: 'accessories', subCategory: 'brooch',
    styleTags: ['luxury', 'elegant'], colors: ['gold', 'white'],
    occasions: ['formal', 'party'], cost: 80000, price: 175000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Điểm nhấn quý cô.', accentColor: '#D87C9B' },

  { id: 'accessories-pearl-necklace', image: '/assets/outfits/accessories/pearl-necklace.png', name: 'Dây Chuyền Ngọc Trai Sang Trọng', category: 'accessories', subCategory: 'pearl_necklace',
    styleTags: ['luxury', 'elegant'], colors: ['white'],
    occasions: ['party', 'formal'], cost: 150000, price: 330000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Ánh xà cừ quyến rũ.', accentColor: '#D87C9B' },

  { id: 'accessories-high-socks', image: '/assets/outfits/accessories/high-socks.png', name: 'Tất Cao Cổ Học Sinh Preppy', category: 'accessories', subCategory: 'high_socks',
    styleTags: ['preppy', 'cute'], colors: ['white', 'black'],
    occasions: ['school', 'sport'], cost: 25000, price: 55000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Co giãn thoải mái.', accentColor: '#D87C9B' },
];

// ══════════════════════════════════════════
// LABEL MAPS
// ══════════════════════════════════════════

export const CATEGORY_LABELS: Record<string, string> = {
  tops:        'Áo',
  bottoms:     'Quần',
  skirts:      'Chân váy',
  dresses:     'Đầm liền',
  jackets:     'Áo khoác',
  shoes:       'Giày',
  bags:        'Túi xách',
  accessories: 'Phụ kiện',
};

export const SUBCATEGORY_LABELS: Record<string, string> = {
  // ÁO (Tops)
  basic_tshirt: 'Áo thun basic', oversize_tshirt: 'Áo thun oversize', croptop: 'Croptop',
  camisole: 'Áo hai dây', tank_top: 'Áo tank top', blouse: 'Áo blouse', shirt: 'Áo sơ mi',
  turtleneck: 'Áo cổ lọ', polo: 'Áo polo', peplum: 'Áo peplum', off_shoulder: 'Áo trễ vai',
  knit_top: 'Áo len', sweater: 'Sweater', hoodie: 'Hoodie', short_cardigan: 'Cardigan ngắn',
  long_cardigan: 'Cardigan dài', corset: 'Áo corset', baby_tee: 'Áo baby tee',
  babydoll_top: 'Áo babydoll', lace_top: 'Áo kiểu ren', tshirt: 'Áo thun', cardigan: 'Cardigan',
  jacket_top: 'Jacket', blazer: 'Blazer',

  // QUẦN (Bottoms)
  skinny_jeans: 'Quần jean skinny', straight_jeans: 'Quần jean ống đứng', wide_jeans: 'Quần jean ống rộng',
  baggy_jeans: 'Quần jean baggy', denim_shorts: 'Quần short jean', kaki_shorts: 'Quần short kaki',
  trousers: 'Quần tây', straight_pants: 'Quần ống suông', wide_pants: 'Quần ống rộng',
  cargo_pants: 'Quần cargo', jogger_pants: 'Quần jogger', legging: 'Quần legging',
  culottes: 'Quần culottes', linen_pants: 'Quần linen', high_waist_pants: 'Quần cạp cao',
  y2k_pants: 'Quần Y2K', sporty_pants: 'Quần sporty', leather_pants: 'Quần da',
  jeans: 'Quần jeans', shorts: 'Quần short', wide_leg: 'Quần ống rộng', cargo: 'Quần cargo',

  // CHÂN VÁY (Skirts)
  a_line_skirt: 'Chân váy chữ A', aline_skirt: 'Chân váy chữ A', tennis_skirt: 'Chân váy tennis', pleated_skirt: 'Chân váy xếp ly',
  denim_skirt: 'Chân váy jean', midi_skirt: 'Chân váy midi', maxi_skirt: 'Chân váy maxi',
  pencil_skirt: 'Chân váy bút chì', mermaid_skirt: 'Chân váy đuôi cá', satin_skirt: 'Chân váy satin',
  lace_skirt: 'Chân váy ren', plaid_skirt: 'Chân váy caro', caro_skirt: 'Chân váy caro', cargo_skirt: 'Chân váy cargo',
  mini_skirt: 'Chân váy mini', tiered_skirt: 'Chân váy tầng', vintage_skirt: 'Chân váy vintage',
  long_skirt: 'Chân váy dài',

  // ĐẦM (Dresses)
  office_dress: 'Đầm công sở', bodycon_dress: 'Đầm body', party_dress: 'Đầm dự tiệc', floral_dress: 'Đầm hoa',
  babydoll_dress: 'Đầm babydoll', maxi_dress: 'Đầm maxi', midi_dress: 'Đầm midi', shirt_dress: 'Đầm sơ mi',
  slip_dress: 'Đầm hai dây', off_shoulder_dress: 'Đầm trễ vai', square_neck_dress: 'Đầm cổ vuông', lace_dress: 'Đầm ren',
  satin_dress: 'Đầm satin', sequin_dress: 'Đầm sequin', vintage_dress: 'Đầm vintage', korean_dress: 'Đầm Korean',
  y2k_dress: 'Đầm Y2K', luxury_dress: 'Đầm luxury', body_dress: 'Đầm body',

  // ÁO KHOÁC (Jackets)
  blazer: 'Blazer', denim_jacket: 'Áo khoác jean', leather_jacket: 'Áo khoác da', bomber_jacket: 'Bomber',
  varsity_jacket: 'Varsity jacket', trench_coat: 'Trench coat', wool_coat: 'Áo khoác dạ', fur_jacket: 'Áo khoác lông',
  outer_cardigan: 'Cardigan khoác ngoài', tweed_jacket: 'Áo khoác tweed', cropped_jacket: 'Áo khoác cropped',
  oversized_jacket: 'Áo khoác oversized', windbreaker: 'Windbreaker', varsity_coat: 'Áo khoác varsity', sporty_jacket: 'Áo khoác sporty',

  // GIÀY (Shoes)
  white_sneakers: 'Sneaker trắng', chunky_sneakers: 'Sneaker chunky', platform_sneakers: 'Sneaker platform',
  pointed_heels: 'Cao gót mũi nhọn', strap_heels: 'Cao gót quai mảnh', kitten_heels: 'Kitten heels',
  sandals: 'Sandal', platform_sandals: 'Sandal platform', ankle_boots: 'Boots cổ thấp', knee_high_boots: 'Boots cổ cao',
  chelsea_boots: 'Chelsea boots', loafers: 'Loafer', mary_jane: 'Mary Jane', ballet_flats: 'Ballet flats',
  mules: 'Mule', oxford_shoes: 'Oxford', sport_shoes: 'Giày thể thao', luxury_shoes: 'Giày luxury',
  sneaker: 'Sneaker', heels: 'Cao gót', sandal: 'Sandal', boots: 'Boots', loafer: 'Loafer',

  // TÚI XÁCH (Bags)
  tote_bag: 'Túi tote', mini_bag: 'Túi mini', shoulder_bag: 'Túi đeo vai', crossbody_bag: 'Túi đeo chéo',
  baguette_bag: 'Túi baguette', bucket_bag: 'Túi bucket', office_bag: 'Túi công sở', clutch_bag: 'Túi clutch',
  box_bag: 'Túi hộp', leather_bag: 'Túi da', canvas_bag: 'Túi canvas', pastel_bag: 'Túi pastel',
  vintage_bag: 'Túi vintage', y2k_bag: 'Túi Y2K', luxury_bag: 'Túi luxury', bow_bag: 'Túi đính nơ',
  pearl_bag: 'Túi đính ngọc trai', tote: 'Túi tote', luxury_bag_old: 'Túi luxury',

  // PHỤ KIỆN (Accessories)
  sunglasses: 'Kính râm', round_glasses: 'Kính gọng tròn', baseball_cap: 'Mũ lưỡi trai', beret: 'Mũ beret',
  bucket_hat: 'Mũ bucket', straw_hat: 'Mũ cói', earrings: 'Khuyên tai', necklace: 'Vòng cổ',
  bracelet: 'Vòng tay', ring: 'Nhẫn', belt: 'Thắt lưng', hair_clip: 'Kẹp tóc',
  hair_bow: 'Nơ tóc', scrunchie: 'Scrunchie', headband: 'Băng đô', scarf: 'Khăn choàng',
  watch: 'Đồng hồ', brooch: 'Brooch', pearl_necklace: 'Dây chuyền ngọc trai', high_socks: 'Tất cao cổ',
  glasses: 'Kính', hat: 'Mũ',
};

export const STYLE_LABELS: Record<string, string> = {
  casual:     'Năng động',    cute:       'Dễ thương',
  korean:     'Hàn Quốc',     minimal:    'Tối giản',
  elegant:    'Thanh lịch',   office:     'Công sở',
  streetwear: 'Cá tính',      y2k:        'Y2K chất',
  vintage:    'Cổ điển',      sporty:     'Thể thao',
  feminine:   'Nữ tính',      party:      'Dự tiệc',
  summer:     'Mùa hè',       luxury:     'Sang trọng',
  winter:     'Mùa đông',     preppy:     'Preppy',
  chic:       'Chic',         soft_girl:  'Soft Girl',
  retro:      'Retro',        denim:      'Denim',
};

export const OCCASION_LABELS: Record<string, string> = {
  school:   'Đi học',     work:    'Đi làm',
  coffee:   'Cà phê',     date:    'Hẹn hò',
  shopping: 'Dạo phố',    party:   'Tiệc tùng',
  travel:   'Du lịch',    formal:  'Sự kiện',
  picnic:   'Dã ngoại',   sport:   'Thể thao',
  street:   'Đường phố',  vacation: 'Kỳ nghỉ',
};

export const COLOR_LABELS: Record<string, { name: string; hex: string }> = {
  pink:   { name: 'Hồng pastel',      hex: '#F8BBD0' },
  white:  { name: 'Trắng tinh khôi',  hex: '#FFFFFF' },
  black:  { name: 'Đen sang trọng',   hex: '#212121' },
  beige:  { name: 'Be ấm áp',         hex: '#E6D7C3' },
  cream:  { name: 'Kem dịu dàng',     hex: '#FFF3E0' },
  brown:  { name: 'Nâu vintage',      hex: '#795548' },
  blue:   { name: 'Xanh denim',       hex: '#90CAF9' },
  navy:   { name: 'Xanh navy',        hex: '#1A237E' },
  green:  { name: 'Xanh bơ mát',      hex: '#A5D6A7' },
  olive:  { name: 'Xanh olive',       hex: '#8BC34A' },
  yellow: { name: 'Vàng bơ',          hex: '#FFF59D' },
  purple: { name: 'Tím lavender',     hex: '#CE93D8' },
  red:    { name: 'Đỏ quyến rũ',      hex: '#EF5350' },
  gray:   { name: 'Xám ghi thời thượng', hex: '#9E9E9E' },
  orange: { name: 'Cam nắng hè',      hex: '#FF8A65' },
};

export const RARITY_LABELS: Record<string, { name: string; color: string; border: string }> = {
  common:   { name: 'Thường',     color: '#8D6E63', border: '#F2E1CF' },
  uncommon: { name: 'Không phổ biến', color: '#388E3C', border: '#A5D6A7' },
  rare:     { name: 'Hiếm',      color: '#1565C0', border: '#90CAF9' },
  premium:  { name: 'Premium',   color: '#D87C9B', border: '#F4C7D9' },
  luxury:   { name: 'Luxury',    color: '#C8911E', border: '#D9A441' },
};
