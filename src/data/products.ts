import { Product } from '../types/game';

export const INITIAL_PRODUCTS: Product[] = [

  // ══════════════════════════════════════════
  // TOPS — ÁO (Level 1–5)
  // ══════════════════════════════════════════

  { id: 'pink-crop-top', name: 'Áo Croptop Hồng Pastel', category: 'tops', subCategory: 'croptop',
    styleTags: ['cute', 'korean', 'feminine'], colors: ['pink', 'white'],
    occasions: ['coffee', 'date', 'shopping', 'picnic'], cost: 75000, price: 160000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Chất thun tăm co giãn mềm mại với nơ nhỏ trước ngực, phong cách kẹo ngọt.',
    visualEmoji: '👚', accentColor: '#F8BBD0' },

  { id: 'white-silk-shirt', name: 'Sơ Mi Lụa Trắng Thanh Lịch', category: 'tops', subCategory: 'shirt',
    styleTags: ['office', 'elegant', 'minimal'], colors: ['white', 'cream'],
    occasions: ['work', 'formal', 'coffee'], cost: 110000, price: 240000,
    stock: 4, maxStock: 10, unlockLevel: 1, rarity: 'rare',
    description: 'Chất lụa ngọc trai mềm rũ cao cấp, cổ đức sắc nét tôn dáng quý cô.',
    visualEmoji: '👔', accentColor: '#ECEFF1' },

  { id: 'oversize-street-tee', name: 'Áo Thun Streetwear Graphic', category: 'tops', subCategory: 'tshirt',
    styleTags: ['streetwear', 'casual', 'y2k'], colors: ['black', 'gray'],
    occasions: ['school', 'shopping', 'street'], cost: 85000, price: 180000,
    stock: 6, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Form rộng cá tính cotton 100% thoáng mát in họa tiết typography hiện đại.',
    visualEmoji: '👕', accentColor: '#37474F' },

  { id: 'knit-cardigan', name: 'Áo Dệt Kim Tay Ngắn Cúc Ngọc', category: 'tops', subCategory: 'cardigan',
    styleTags: ['korean', 'cute', 'vintage'], colors: ['beige', 'cream', 'yellow'],
    occasions: ['coffee', 'date', 'school'], cost: 95000, price: 210000,
    stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'common',
    description: 'Họa tiết vặn thừng mini nhẹ nhàng, phối cùng hàng cúc ngọc trai nữ tính.',
    visualEmoji: '🧶', accentColor: '#FFE082' },

  { id: 'off-shoulder-lace', name: 'Áo Trễ Vai Xếp Ly Tiểu Thư', category: 'tops', subCategory: 'blouse',
    styleTags: ['feminine', 'party', 'cute'], colors: ['white', 'pink'],
    occasions: ['date', 'party', 'travel'], cost: 130000, price: 280000,
    stock: 3, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Thiết kế nhún bèo bồng bềnh khéo léo khoe bờ vai mảnh mai quyến rũ.',
    visualEmoji: '✨', accentColor: '#F48FB1' },

  { id: 'ribbed-tank-top', name: 'Áo Thun Ribbed Crop Cơ Bản', category: 'tops', subCategory: 'croptop',
    styleTags: ['casual', 'minimal', 'sporty'], colors: ['white', 'black', 'beige', 'gray'],
    occasions: ['coffee', 'shopping', 'sport'], cost: 55000, price: 120000,
    stock: 8, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Vải ribbed co giãn 4 chiều, ôm nhẹ khoe eo thon gọn gàng mỗi ngày.',
    visualEmoji: '👕', accentColor: '#CFD8DC' },

  { id: 'pink-hoodie', name: 'Áo Hoodie Oversize Pastel', category: 'tops', subCategory: 'hoodie',
    styleTags: ['casual', 'cute', 'soft_girl'], colors: ['pink', 'purple', 'cream'],
    occasions: ['school', 'shopping', 'picnic'], cost: 140000, price: 300000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Form oversize ấm áp mùa se lạnh, nội lông cừu siêu mềm như ôm gấu bông.',
    visualEmoji: '🧸', accentColor: '#F8BBD0' },

  { id: 'floral-blouse', name: 'Áo Blouse Hoa Nhỏ Cổ Nơ', category: 'tops', subCategory: 'blouse',
    styleTags: ['feminine', 'vintage', 'cute'], colors: ['cream', 'pink', 'white'],
    occasions: ['coffee', 'date', 'picnic'], cost: 105000, price: 225000,
    stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Họa tiết hoa li ti nền kem mộng mơ, cổ nơ xinh xắn chuẩn style vintage French.',
    visualEmoji: '🌸', accentColor: '#FFCCBC' },

  { id: 'knit-sweater', name: 'Áo Sweater Len Đan Chữ V', category: 'tops', subCategory: 'sweater',
    styleTags: ['preppy', 'korean', 'vintage'], colors: ['beige', 'green', 'navy'],
    occasions: ['school', 'coffee', 'travel'], cost: 120000, price: 265000,
    stock: 4, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Len merino mỏng nhẹ không bí, phong cách học sinh Nhật vintage layering hoàn hảo.',
    visualEmoji: '🧥', accentColor: '#A5D6A7' },

  { id: 'black-blazer-slim', name: 'Blazer Đen Form Slim Công Sở', category: 'tops', subCategory: 'blazer',
    styleTags: ['office', 'chic', 'elegant'], colors: ['black'],
    occasions: ['work', 'formal', 'date'], cost: 180000, price: 390000,
    stock: 3, maxStock: 8, unlockLevel: 5, rarity: 'rare',
    description: 'Form slim kẻ sọc tinh tế vai bồng nhẹ tôn dáng, lưu giữ vẻ quyền lực mềm mại.',
    visualEmoji: '👔', accentColor: '#263238' },

  { id: 'cropped-denim-jacket', name: 'Áo Khoác Jean Crop Retro', category: 'tops', subCategory: 'jacket_top',
    styleTags: ['denim', 'retro', 'casual'], colors: ['blue', 'navy'],
    occasions: ['school', 'shopping', 'street'], cost: 150000, price: 320000,
    stock: 4, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Wash acid vintage form crop ngắn cá tính dễ layer, khóa cúc đồng mạ nhẹ retro.',
    visualEmoji: '🧥', accentColor: '#90CAF9' },

  // ══════════════════════════════════════════
  // BOTTOMS — QUẦN (Level 1–7)
  // ══════════════════════════════════════════

  { id: 'wide-linen-pants', name: 'Quần Suông Linen Ống Rộng', category: 'bottoms', subCategory: 'wide_leg',
    styleTags: ['minimal', 'casual', 'summer'], colors: ['beige', 'cream', 'white', 'olive'],
    occasions: ['coffee', 'travel', 'shopping'], cost: 110000, price: 230000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Chất vải sợi lanh tự nhiên mềm rũ mát mẻ, che khuyết điểm chân tuyệt đối.',
    visualEmoji: '👖', accentColor: '#E0D2C7' },

  { id: 'vintage-straight-jeans', name: 'Quần Jeans Ống Đứng Cổ Điển', category: 'bottoms', subCategory: 'jeans',
    styleTags: ['casual', 'vintage', 'denim'], colors: ['blue'],
    occasions: ['school', 'coffee', 'shopping', 'street'], cost: 140000, price: 290000,
    stock: 4, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Màu xanh wash vintage chuẩn form tôn dáng dài miên man, dễ phối đồ.',
    visualEmoji: '👖', accentColor: '#90CAF9' },

  { id: 'tailored-slacks', name: 'Quần Tây Xếp Ly Công Sở', category: 'bottoms', subCategory: 'trousers',
    styleTags: ['office', 'elegant', 'minimal'], colors: ['black', 'brown', 'gray'],
    occasions: ['work', 'formal'], cost: 135000, price: 295000,
    stock: 3, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Chất tuyết mưa dày dặn đứng dáng, đường ly ủi chết chuẩn phong cách sang trọng.',
    visualEmoji: '👔', accentColor: '#4E342E' },

  { id: 'white-mini-shorts', name: 'Quần Short Kaki Trắng Basic', category: 'bottoms', subCategory: 'shorts',
    styleTags: ['casual', 'summer', 'sporty'], colors: ['white', 'beige', 'black'],
    occasions: ['shopping', 'picnic', 'vacation'], cost: 75000, price: 160000,
    stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Chất kaki cotton nhẹ thoáng, viền lai gấp cuff nhanh chóng tăng phần trẻ trung.',
    visualEmoji: '🩳', accentColor: '#ECEFF1' },

  { id: 'cargo-olive-pants', name: 'Quần Cargo Túi Hộp Olive', category: 'bottoms', subCategory: 'cargo',
    styleTags: ['streetwear', 'y2k', 'casual'], colors: ['olive', 'black', 'beige'],
    occasions: ['street', 'shopping', 'travel'], cost: 160000, price: 340000,
    stock: 4, maxStock: 10, unlockLevel: 6, rarity: 'uncommon',
    description: '4 túi hộp siêu to đựng được nhiều đồ, khóa kéo kim loại giữ form chuẩn Streetwear.',
    visualEmoji: '🪖', accentColor: '#8BC34A' },

  { id: 'black-legging', name: 'Quần Legging Bụng Cao Co Giãn', category: 'bottoms', subCategory: 'legging',
    styleTags: ['sporty', 'casual', 'minimal'], colors: ['black', 'navy'],
    occasions: ['sport', 'coffee', 'shopping'], cost: 80000, price: 175000,
    stock: 7, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Cạp cao nịt bụng giữ ấm, vải bốn chiều không bai không lộ chuẩn gym & đời thường.',
    visualEmoji: '🏃', accentColor: '#37474F' },

  { id: 'wide-denim-jeans', name: 'Quần Jeans Ống Rộng Y2K', category: 'bottoms', subCategory: 'wide_leg',
    styleTags: ['y2k', 'retro', 'denim'], colors: ['blue', 'navy'],
    occasions: ['street', 'school', 'shopping'], cost: 145000, price: 310000,
    stock: 4, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Ống rộng siêu to chiều dài tôn dáng 1m70, wash cùng màu chuẩn Y2K TikTok.',
    visualEmoji: '👖', accentColor: '#5C6BC0' },

  // ══════════════════════════════════════════
  // SKIRTS — CHÂN VÁY (Level 1–8)
  // ══════════════════════════════════════════

  { id: 'tennis-pleated-skirt', name: 'Chân Váy Xếp Ly Tennis', category: 'skirts', subCategory: 'tennis_skirt',
    styleTags: ['cute', 'korean', 'sporty', 'preppy'], colors: ['white', 'pink', 'gray'],
    occasions: ['school', 'picnic', 'date', 'sport'], cost: 85000, price: 190000,
    stock: 6, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Xếp ly đều sắc sảo có quần bảo hộ bên trong, năng động và trẻ trung.',
    visualEmoji: '🩷', accentColor: '#F8BBD0' },

  { id: 'midi-floral-skirt', name: 'Chân Váy Midi Hoa Nhí Vintage', category: 'skirts', subCategory: 'midi_skirt',
    styleTags: ['vintage', 'feminine', 'casual'], colors: ['cream', 'pink', 'green'],
    occasions: ['coffee', 'picnic', 'travel'], cost: 110000, price: 240000,
    stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Dáng dài xòe nhẹ hoa nhí phong cách đồng quê Pháp mộng mơ.',
    visualEmoji: '🌸', accentColor: '#C8E6C9' },

  { id: 'slit-pencil-skirt', name: 'Chân Váy Bút Chì Xẻ Tà', category: 'skirts', subCategory: 'midi_skirt',
    styleTags: ['office', 'elegant', 'chic'], colors: ['black', 'beige'],
    occasions: ['work', 'formal', 'party'], cost: 125000, price: 270000,
    stock: 3, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Ôm sát đường cong hông tinh tế với đường xẻ tà sau bước đi nhẹ nhàng.',
    visualEmoji: '👠', accentColor: '#37474F' },

  { id: 'aline-denim-skirt', name: 'Chân Váy Jean Chữ A Mini', category: 'skirts', subCategory: 'aline_skirt',
    styleTags: ['casual', 'denim', 'retro'], colors: ['blue', 'navy'],
    occasions: ['school', 'coffee', 'street'], cost: 100000, price: 220000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Form chữ A phồng nhẹ siêu dễ phối, jeans wash trung cổ điển không lỗi mốt.',
    visualEmoji: '👖', accentColor: '#90CAF9' },

  { id: 'long-satin-skirt', name: 'Chân Váy Lụa Dài Đính Hoa', category: 'skirts', subCategory: 'long_skirt',
    styleTags: ['feminine', 'elegant', 'party'], colors: ['cream', 'pink', 'purple'],
    occasions: ['party', 'date', 'formal'], cost: 155000, price: 340000,
    stock: 3, maxStock: 8, unlockLevel: 7, rarity: 'rare',
    description: 'Lụa satin bóng rũ chảy đính hoa ren 3D viền tà, mỗi bước đi như sóng nước nhẹ nhàng.',
    visualEmoji: '🌺', accentColor: '#CE93D8' },

  { id: 'knit-mini-skirt', name: 'Chân Váy Len Đan Mini Y2K', category: 'skirts', subCategory: 'aline_skirt',
    styleTags: ['y2k', 'cute', 'soft_girl'], colors: ['pink', 'cream', 'yellow'],
    occasions: ['school', 'coffee', 'date'], cost: 90000, price: 195000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Len chunky đan thủ công siêu dày dặn ấm, cạp thun co giãn thoải mái.',
    visualEmoji: '🎀', accentColor: '#FFF9C4' },

  // ══════════════════════════════════════════
  // DRESSES — ĐẦM (Level 1–12)
  // ══════════════════════════════════════════

  { id: 'french-tea-dress', name: 'Đầm Hoa Nhí Cổ V Pháp', category: 'dresses', subCategory: 'floral_dress',
    styleTags: ['vintage', 'feminine', 'cute'], colors: ['pink', 'cream'],
    occasions: ['coffee', 'date', 'picnic'], cost: 170000, price: 360000,
    stock: 4, maxStock: 10, unlockLevel: 1, rarity: 'uncommon',
    description: 'Cổ chữ V duyên dáng kết hợp hàng cúc bọc vải và thắt nơ lưng e ấp.',
    visualEmoji: '👗', accentColor: '#F48FB1' },

  { id: 'satin-evening-gown', name: 'Đầm Dạ Hội Lụa Satin Cao Cấp', category: 'dresses', subCategory: 'party_dress',
    styleTags: ['party', 'luxury', 'elegant'], colors: ['red', 'black', 'white'],
    occasions: ['party', 'formal'], cost: 280000, price: 650000,
    stock: 2, maxStock: 6, unlockLevel: 10, rarity: 'luxury',
    description: 'Lụa tơ tằm bóng bẩy quý phái, lưng khoét sâu kiêu kỳ thu hút mọi ánh nhìn.',
    visualEmoji: '👑', accentColor: '#E91E63' },

  { id: 'korean-minimal-shirtdress', name: 'Đầm Sơ Mi Suông Tối Giản', category: 'dresses', subCategory: 'office_dress',
    styleTags: ['minimal', 'korean', 'casual'], colors: ['white', 'blue', 'beige'],
    occasions: ['work', 'coffee', 'school'], cost: 150000, price: 320000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Dáng suông thoải mái có đai thắt eo linh hoạt, thanh nhã đậm chất Seoul.',
    visualEmoji: '👗', accentColor: '#B0BEC5' },

  { id: 'babydoll-dress', name: 'Đầm Babydoll Nơ Lưng Tiểu Thư', category: 'dresses', subCategory: 'babydoll_dress',
    styleTags: ['cute', 'feminine', 'soft_girl'], colors: ['pink', 'white', 'cream'],
    occasions: ['date', 'coffee', 'picnic'], cost: 165000, price: 350000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Dáng xoè bồng nhẹ nhàng như búp bê, phần thắt nơ sau lưng cực kỳ nữ tính.',
    visualEmoji: '🩷', accentColor: '#FFB3C6' },

  { id: 'maxi-boho-dress', name: 'Đầm Maxi Bohemian Hoa Lớn', category: 'dresses', subCategory: 'maxi_dress',
    styleTags: ['vintage', 'summer', 'feminine'], colors: ['orange', 'cream', 'green'],
    occasions: ['travel', 'vacation', 'picnic'], cost: 195000, price: 420000,
    stock: 3, maxStock: 8, unlockLevel: 6, rarity: 'rare',
    description: 'Vải thô thoáng mát họa tiết hoa lớn phóng khoáng, bay trong gió cực kỳ lãng mạn.',
    visualEmoji: '🌺', accentColor: '#FF8A65' },

  { id: 'office-pencil-dress', name: 'Đầm Công Sở Bút Chì Cúc Bọc', category: 'dresses', subCategory: 'office_dress',
    styleTags: ['office', 'elegant', 'chic'], colors: ['black', 'navy', 'beige'],
    occasions: ['work', 'formal', 'party'], cost: 220000, price: 480000,
    stock: 3, maxStock: 8, unlockLevel: 7, rarity: 'rare',
    description: 'Dáng bút chì ôm form tôn vóc dáng, hàng cúc bọc vải dọc thân tinh tế sang trọng.',
    visualEmoji: '👔', accentColor: '#1A237E' },

  { id: 'mini-party-dress', name: 'Đầm Tiệc Mini Sequin Lấp Lánh', category: 'dresses', subCategory: 'party_dress',
    styleTags: ['party', 'chic', 'y2k'], colors: ['black', 'pink', 'gray'],
    occasions: ['party', 'date', 'formal'], cost: 240000, price: 520000,
    stock: 2, maxStock: 6, unlockLevel: 8, rarity: 'premium',
    description: 'Sequin đính tay 100% lấp lánh mọi ánh đèn, form mini thân thiện thoải mái.',
    visualEmoji: '✨', accentColor: '#E040FB' },

  { id: 'floral-wrap-dress', name: 'Đầm Wrap Hoa Cúc Dại', category: 'dresses', subCategory: 'floral_dress',
    styleTags: ['summer', 'casual', 'feminine'], colors: ['cream', 'yellow', 'green'],
    occasions: ['picnic', 'vacation', 'coffee'], cost: 155000, price: 335000,
    stock: 4, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Kiểu quấn buộc eo uyển chuyển điều chỉnh vừa mọi size, vải linen mỏng nhẹ thoáng.',
    visualEmoji: '🌻', accentColor: '#FFF176' },

  // ══════════════════════════════════════════
  // JACKETS — ÁO KHOÁC (Level 3–12)
  // ══════════════════════════════════════════

  { id: 'rose-blazer', name: 'Blazer Pastel Form Rộng', category: 'jackets', subCategory: 'blazer',
    styleTags: ['korean', 'office', 'chic'], colors: ['pink', 'beige'],
    occasions: ['work', 'coffee', 'date'], cost: 190000, price: 420000,
    stock: 3, maxStock: 8, unlockLevel: 5, rarity: 'rare',
    description: 'Đệm vai mỏng định hình vóc dáng, màu hồng pastel ngọt ngào mà sang trọng.',
    visualEmoji: '🧥', accentColor: '#F48FB1' },

  { id: 'tweed-boucle-jacket', name: 'Áo Khoác Dạ Tweed Tiểu Thư', category: 'jackets', subCategory: 'blazer',
    styleTags: ['luxury', 'elegant', 'chic'], colors: ['white', 'black', 'pink'],
    occasions: ['party', 'formal', 'date'], cost: 250000, price: 580000,
    stock: 2, maxStock: 6, unlockLevel: 12, rarity: 'luxury',
    description: 'Dệt sợi kim tuyến viền nổi cúc mạ vàng phong cách quý cô Chanel.',
    visualEmoji: '✨', accentColor: '#D7CCC8' },

  { id: 'leather-biker-jacket', name: 'Áo Khoác Da Biker Cool Ngầu', category: 'jackets', subCategory: 'jacket_top',
    styleTags: ['streetwear', 'y2k', 'retro'], colors: ['black'],
    occasions: ['party', 'travel', 'street'], cost: 230000, price: 490000,
    stock: 3, maxStock: 8, unlockLevel: 7, rarity: 'rare',
    description: 'Chất da PU mềm chống xước khóa kéo kim loại hầm hố chuẩn chất đường phố.',
    visualEmoji: '🖤', accentColor: '#263238' },

  { id: 'varsity-jacket', name: 'Áo Varsity Jacket Preppy', category: 'jackets', subCategory: 'jacket_top',
    styleTags: ['preppy', 'retro', 'sporty'], colors: ['navy', 'red', 'white'],
    occasions: ['school', 'street', 'shopping'], cost: 200000, price: 430000,
    stock: 3, maxStock: 8, unlockLevel: 6, rarity: 'rare',
    description: 'Phong cách học sinh Mỹ thập niên 90 cổ điển, tay da đối xứng logo thêu tinh tế.',
    visualEmoji: '🏫', accentColor: '#1A237E' },

  { id: 'pastel-cardigan', name: 'Cardigan Cúc Ngọc Dài Pastel', category: 'jackets', subCategory: 'cardigan',
    styleTags: ['soft_girl', 'cute', 'korean'], colors: ['purple', 'pink', 'cream'],
    occasions: ['school', 'coffee', 'date'], cost: 165000, price: 355000,
    stock: 4, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Len mịn nhẹ xuyên thấu nhẹ nhàng, cúc ngọc xếp dọc thân giống outfit KPOP Idol.',
    visualEmoji: '💜', accentColor: '#CE93D8' },

  // ══════════════════════════════════════════
  // SHOES — GIÀY (Level 1–10)
  // ══════════════════════════════════════════

  { id: 'mary-jane-shoes', name: 'Giày Búp Bê Mary Jane Da Bóng', category: 'shoes', subCategory: 'mary_jane',
    styleTags: ['cute', 'vintage', 'korean', 'preppy'], colors: ['black', 'pink', 'white'],
    occasions: ['school', 'coffee', 'date'], cost: 95000, price: 210000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Quai cài cổ chân xinh xắn, gót vuông 3cm êm ái tôn dáng bước đi uyển chuyển.',
    visualEmoji: '🩰', accentColor: '#F48FB1' },

  { id: 'chunky-sneakers', name: 'Giày Thể Thao Chunky Năng Động', category: 'shoes', subCategory: 'sneaker',
    styleTags: ['sporty', 'streetwear', 'y2k'], colors: ['white', 'beige'],
    occasions: ['school', 'travel', 'shopping', 'sport'], cost: 140000, price: 310000,
    stock: 4, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Đế đôn 5cm hack chiều cao khéo léo, đệm khí nâng đỡ từng bước chân di chuyển.',
    visualEmoji: '👟', accentColor: '#CFD8DC' },

  { id: 'stiletto-pumps', name: 'Giày Cao Gót Mũi Nhọn 7cm', category: 'shoes', subCategory: 'heels',
    styleTags: ['elegant', 'office', 'luxury'], colors: ['black', 'cream', 'red'],
    occasions: ['work', 'party', 'formal'], cost: 130000, price: 290000,
    stock: 3, maxStock: 8, unlockLevel: 5, rarity: 'rare',
    description: 'Mũi nhọn thanh thoát kéo dài đôi chân, lót đệm êm giảm áp lực ngón chân.',
    visualEmoji: '👠', accentColor: '#3E2723' },

  { id: 'strappy-sandals', name: 'Sandal Quai Mảnh Mùa Hè', category: 'shoes', subCategory: 'sandal',
    styleTags: ['summer', 'casual', 'feminine'], colors: ['beige', 'white', 'brown'],
    occasions: ['vacation', 'picnic', 'shopping'], cost: 75000, price: 165000,
    stock: 6, maxStock: 12, unlockLevel: 1, rarity: 'common',
    description: 'Quai đan chéo mảnh tôn bàn chân nuột, đế bệt nhẹ êm đi cả ngày không mỏi.',
    visualEmoji: '👡', accentColor: '#BCAAA4' },

  { id: 'ankle-boots', name: 'Boot Cổ Ngắn Da Vintage', category: 'shoes', subCategory: 'boots',
    styleTags: ['vintage', 'retro', 'chic'], colors: ['black', 'brown'],
    occasions: ['date', 'street', 'travel'], cost: 175000, price: 380000,
    stock: 3, maxStock: 8, unlockLevel: 6, rarity: 'rare',
    description: 'Da PU mịn gót block 4cm cực ổn định, kéo khóa siêu dễ không bao giờ lỗi mốt.',
    visualEmoji: '🥾', accentColor: '#4E342E' },

  { id: 'loafer-shoes', name: 'Giày Lười Loafer Khóa Vàng', category: 'shoes', subCategory: 'loafer',
    styleTags: ['preppy', 'office', 'korean'], colors: ['black', 'brown', 'beige'],
    occasions: ['work', 'school', 'date'], cost: 120000, price: 265000,
    stock: 4, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Khóa kim loại mạ vàng đặc trưng, da mềm đế cao su êm hội tụ trend Pháp - Hàn.',
    visualEmoji: '🥿', accentColor: '#795548' },

  { id: 'platform-sneaker', name: 'Sneaker Đế Chunky Platform', category: 'shoes', subCategory: 'sneaker',
    styleTags: ['y2k', 'streetwear', 'cute'], colors: ['white', 'pink', 'black'],
    occasions: ['street', 'shopping', 'school'], cost: 155000, price: 335000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'uncommon',
    description: 'Đế chunky siêu dày 7cm nâng tầm outfit từ thường thành wow, form chunky cực trend.',
    visualEmoji: '👟', accentColor: '#EC407A' },

  { id: 'kitten-heel', name: 'Giày Cao Gót Nhọn Mũi Kitten', category: 'shoes', subCategory: 'heels',
    styleTags: ['feminine', 'elegant', 'soft_girl'], colors: ['pink', 'cream', 'white'],
    occasions: ['date', 'party', 'coffee'], cost: 110000, price: 240000,
    stock: 4, maxStock: 10, unlockLevel: 7, rarity: 'rare',
    description: 'Gót nhỏ 5cm sang trọng vừa đủ, mũi nhọn thon dài nuột nà xinh như búp bê.',
    visualEmoji: '👠', accentColor: '#F8BBD0' },

  // ══════════════════════════════════════════
  // BAGS — TÚI XÁCH (Level 1–12)
  // ══════════════════════════════════════════

  { id: 'baguette-shoulder-bag', name: 'Túi Kẹp Nách Baguette Y2K', category: 'bags', subCategory: 'mini_bag',
    styleTags: ['y2k', 'cute', 'korean'], colors: ['pink', 'white', 'black'],
    occasions: ['coffee', 'shopping', 'date'], cost: 75000, price: 170000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'common',
    description: 'Form kẹp nách thời thượng da mềm mượt, đựng vừa thỏi son và điện thoại.',
    visualEmoji: '👜', accentColor: '#F8BBD0' },

  { id: 'quilted-chain-bag', name: 'Túi Xách Da Chần Bông Dây Xích', category: 'bags', subCategory: 'luxury_bag',
    styleTags: ['luxury', 'elegant', 'party'], colors: ['black', 'white', 'beige'],
    occasions: ['party', 'date', 'formal'], cost: 160000, price: 360000,
    stock: 3, maxStock: 8, unlockLevel: 10, rarity: 'premium',
    description: 'Quả trám chần nổi tinh xảo phối dây xích mạ vàng bóng loáng chuẩn tiểu thư.',
    visualEmoji: '👛', accentColor: '#FFD54F' },

  { id: 'canvas-tote-bag', name: 'Túi Vải Canvas Eco Minimal', category: 'bags', subCategory: 'tote',
    styleTags: ['minimal', 'casual', 'sporty'], colors: ['cream', 'white', 'black'],
    occasions: ['school', 'picnic', 'shopping'], cost: 50000, price: 120000,
    stock: 6, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Vải bố bền bỉ thân thiện môi trường, ngăn rộng thoải mái chứa sách vở.',
    visualEmoji: '🛍️', accentColor: '#E0D2C7' },

  { id: 'mini-crossbody', name: 'Túi Mini Đeo Chéo Tassle', category: 'bags', subCategory: 'mini_bag',
    styleTags: ['cute', 'feminine', 'soft_girl'], colors: ['pink', 'cream', 'brown'],
    occasions: ['coffee', 'date', 'shopping'], cost: 85000, price: 190000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'common',
    description: 'Size mini xíu gọn nhẹ treo tassel satin lắc lư cực kỳ dễ thương mọi outfit.',
    visualEmoji: '💼', accentColor: '#FFCCBC' },

  { id: 'office-tote', name: 'Túi Tote Công Sở Da PU Sang', category: 'bags', subCategory: 'office_bag',
    styleTags: ['office', 'minimal', 'elegant'], colors: ['black', 'brown', 'beige'],
    occasions: ['work', 'formal', 'travel'], cost: 145000, price: 315000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'rare',
    description: 'Dung tích lớn chứa laptop 13inch, da PU cao cấp không bong tróc theo năm tháng.',
    visualEmoji: '💼', accentColor: '#5D4037' },

  { id: 'bucket-hat-bag', name: 'Túi Đeo Vai Bucket Form Mềm', category: 'bags', subCategory: 'shoulder_bag',
    styleTags: ['casual', 'summer', 'vintage'], colors: ['beige', 'brown', 'cream'],
    occasions: ['travel', 'picnic', 'shopping'], cost: 95000, price: 210000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Hình chiếc bucket mềm dẻo da lộn nhung nhẹ đeo vai chéo đều siêu thời thượng.',
    visualEmoji: '🪣', accentColor: '#8D6E63' },

  // ══════════════════════════════════════════
  // ACCESSORIES — PHỤ KIỆN (Level 1–10)
  // ══════════════════════════════════════════

  { id: 'french-beret-hat', name: 'Mũ Beret Nỉ Phong Cách Pháp', category: 'accessories', subCategory: 'hat',
    styleTags: ['vintage', 'cute', 'korean'], colors: ['beige', 'brown', 'black', 'pink'],
    occasions: ['coffee', 'travel', 'date'], cost: 45000, price: 110000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Chất dạ len mềm giữ form chuẩn, tạo điểm nhấn nghệ sĩ lãng mạn cho mái tóc.',
    visualEmoji: '🎩', accentColor: '#8D6E63' },

  { id: 'pearl-earrings', name: 'Khuyên Tai Ngọc Trai Giọt Nước', category: 'accessories', subCategory: 'earrings',
    styleTags: ['elegant', 'luxury', 'office'], colors: ['white', 'cream'],
    occasions: ['work', 'party', 'formal', 'date'], cost: 55000, price: 135000,
    stock: 5, maxStock: 10, unlockLevel: 1, rarity: 'common',
    description: 'Ngọc trai nhân tạo ánh xà cừ lung linh, chuôi bạc 925 chống dị ứng da nhạy cảm.',
    visualEmoji: '✨', accentColor: '#FFF9C4' },

  { id: 'cat-eye-sunglasses', name: 'Kính Râm Gọng Mắt Mèo Cá Tính', category: 'accessories', subCategory: 'glasses',
    styleTags: ['streetwear', 'y2k', 'summer', 'retro'], colors: ['black', 'brown'],
    occasions: ['travel', 'shopping', 'vacation'], cost: 60000, price: 145000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'uncommon',
    description: 'Tròng kính UV400 bảo vệ mắt, form mắt mèo nâng tầm outfit thêm phần thời thượng.',
    visualEmoji: '🕶️', accentColor: '#424242' },

  { id: 'satin-ribbon-bow', name: 'Kẹp Tóc Nơ Lụa Ruy Băng', category: 'accessories', subCategory: 'hair_clip',
    styleTags: ['cute', 'feminine', 'korean', 'soft_girl'], colors: ['pink', 'white', 'black'],
    occasions: ['date', 'coffee', 'school'], cost: 30000, price: 75000,
    stock: 8, maxStock: 15, unlockLevel: 1, rarity: 'common',
    description: 'Ruy băng satin cao cấp mềm mại bay bổng, gài tóc tựa nàng công chúa.',
    visualEmoji: '🎀', accentColor: '#F8BBD0' },

  { id: 'layered-necklace', name: 'Vòng Cổ Dây Mảnh Nhiều Tầng', category: 'accessories', subCategory: 'necklace',
    styleTags: ['minimal', 'elegant', 'chic'], colors: ['white', 'yellow'],
    occasions: ['date', 'party', 'coffee'], cost: 65000, price: 155000,
    stock: 5, maxStock: 10, unlockLevel: 3, rarity: 'uncommon',
    description: 'Bộ 3 dây bạc và vàng 18K xếp tầng sang trọng, mặt pendant ngôi sao & mặt trăng.',
    visualEmoji: '⭐', accentColor: '#FFC107' },

  { id: 'pearl-headband', name: 'Băng Đô Ngọc Trai Đính Thủ Công', category: 'accessories', subCategory: 'hair_clip',
    styleTags: ['elegant', 'feminine', 'vintage'], colors: ['white', 'cream'],
    occasions: ['date', 'party', 'formal'], cost: 50000, price: 125000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'uncommon',
    description: 'Nhựa plastic cứng nhẹ đính ngọc trai xung quanh, giữ tóc gọn cả ngày dài.',
    visualEmoji: '💫', accentColor: '#FFFDE7' },

  { id: 'scrunchie-set', name: 'Set 3 Scrunchie Nhung Pastel', category: 'accessories', subCategory: 'hair_clip',
    styleTags: ['cute', 'casual', 'soft_girl'], colors: ['pink', 'purple', 'cream'],
    occasions: ['school', 'sport', 'picnic'], cost: 25000, price: 65000,
    stock: 10, maxStock: 20, unlockLevel: 1, rarity: 'common',
    description: 'Vải nhung bông mềm không làm gãy tóc, 3 màu đồng bộ phối được cả tuần.',
    visualEmoji: '🌀', accentColor: '#CE93D8' },

  { id: 'gold-belt', name: 'Thắt Lưng Khóa Vuông Mạ Vàng', category: 'accessories', subCategory: 'belt',
    styleTags: ['chic', 'elegant', 'office'], colors: ['yellow', 'black', 'brown'],
    occasions: ['work', 'date', 'party'], cost: 70000, price: 165000,
    stock: 4, maxStock: 10, unlockLevel: 5, rarity: 'uncommon',
    description: 'Khóa hình vuông mạ vàng cân đối sang trọng, da PU mềm ôm eo không đau cả ngày.',
    visualEmoji: '🏅', accentColor: '#D9A441' },

  { id: 'charm-bracelet', name: 'Vòng Tay Charm Cute Collection', category: 'accessories', subCategory: 'bracelet',
    styleTags: ['cute', 'y2k', 'soft_girl'], colors: ['pink', 'white', 'yellow'],
    occasions: ['school', 'coffee', 'date'], cost: 40000, price: 95000,
    stock: 6, maxStock: 12, unlockLevel: 2, rarity: 'common',
    description: 'Xỏ charm handmade đám mây, trái tim, cầu vồng — mỗi ngày xỏ kiểu khác nhau.',
    visualEmoji: '🌈', accentColor: '#FFD54F' },

  { id: 'oversized-glasses', name: 'Kính Gọng Nhựa Oversize Trendy', category: 'accessories', subCategory: 'glasses',
    styleTags: ['y2k', 'retro', 'streetwear'], colors: ['brown', 'black', 'pink'],
    occasions: ['street', 'shopping', 'coffee'], cost: 55000, price: 130000,
    stock: 4, maxStock: 10, unlockLevel: 6, rarity: 'uncommon',
    description: 'Gọng nhựa dày oversized vintage che nửa mặt siêu cool, tròng trong suốt không độ.',
    visualEmoji: '👓', accentColor: '#6D4C41' },
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
  tshirt: 'Áo thun', croptop: 'Croptop', blouse: 'Blouse', shirt: 'Sơ mi',
  hoodie: 'Hoodie', sweater: 'Sweater', cardigan: 'Cardigan', jacket_top: 'Jacket', blazer: 'Blazer',
  jeans: 'Jeans', trousers: 'Quần tây', shorts: 'Quần short', wide_leg: 'Ống rộng',
  cargo: 'Cargo', legging: 'Legging',
  aline_skirt: 'Chữ A', tennis_skirt: 'Tennis', midi_skirt: 'Midi', long_skirt: 'Dài', denim_skirt: 'Jean',
  office_dress: 'Công sở', party_dress: 'Dự tiệc', floral_dress: 'Hoa', body_dress: 'Body',
  maxi_dress: 'Maxi', babydoll_dress: 'Babydoll',
  sneaker: 'Sneaker', heels: 'Cao gót', sandal: 'Sandal', boots: 'Boot', loafer: 'Loafer', mary_jane: 'Mary Jane',
  tote: 'Tote', mini_bag: 'Mini', shoulder_bag: 'Đeo vai', office_bag: 'Công sở', luxury_bag: 'Luxury',
  glasses: 'Kính', hat: 'Mũ', earrings: 'Khuyên tai', necklace: 'Vòng cổ',
  bracelet: 'Vòng tay', belt: 'Thắt lưng', hair_clip: 'Phụ kiện tóc',
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
