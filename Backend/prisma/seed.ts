import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to hash passwords (similar to how your app might do it)
async function hashPassword(password: string): Promise<string> {
  return Bun.password.hash(password, "bcrypt")
}

async function main() {
  console.log('Starting database seed...');

  // ----- CATEGORIES -----
  console.log('Seeding categories...');
  const categories = [
    { code: 'dienthoai', name: 'Điện thoại' },
    { code: 'laptop', name: 'Laptop' },
    { code: 'tablet', name: 'Máy tính bảng' },
    { code: 'amthanh', name: 'Âm thanh' },
    { code: 'dongho', name: 'Đồng hồ' },
    { code: 'nhathongminh', name: 'Nhà thông minh' },
    { code: 'phukien', name: 'Phụ kiện' },
    { code: 'pc_manhinh', name: 'PC-Màn hình' },
    { code: 'tivi', name: 'Tivi' },
    { code: 'hangcu', name: 'Hàng cũ' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { code: category.code },
      update: {},
      create: category
    });
  }

  // ----- USERS -----
  console.log('Seeding users...');
  const users = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: await hashPassword('admin123'),
      name: 'Site Administrator',
      phone: '0901234567',
      address: '123 Admin Street, Tech City',
      roleId: 1, // Admin
      isEnabled: 1
    },
    {
      username: 'john',
      email: 'john@example.com',
      password: await hashPassword('12345'),
      name: 'John Doe',
      phone: '0912345678',
      address: '456 User Lane, Customer Town',
      roleId: 2, // Regular user
      isEnabled: 1
    },
    {
      username: 'sarah',
      email: 'sarah@example.com',
      password: await hashPassword('sarah123'),
      name: 'Sarah Smith',
      phone: '0923456789',
      address: '789 Client Road, Buyer City',
      roleId: 2, // Regular user
      isEnabled: 1
    },
    {
      username: 'test',
      email: 'test@example.com',
      password: await hashPassword('test123'),
      name: 'Linh Đào Ngọc',
      phone: '0865058159',
      address: 'Tầng 9. Toa nha Lien Hiep Phu Nu 7, Tôn Thất Thuyết Dịch Vọng Hậu Cau giay Hanoi City, 123345, Việt Nam',
      roleId: 2, // Regular user
      isEnabled: 1
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user
    });
  }

  // ----- PRODUCTS -----
  console.log('Seeding products...');
  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'The latest iPhone with advanced camera system and A17 Pro chip',
      price: new Prisma.Decimal(999.00),
      salePrice: new Prisma.Decimal(949.00),
      quantity: 100,
      brand: 'Apple',
      type: 'dienthoai',
      image: 'http://res.cloudinary.com/example/iphone15pro.png',
      thumbnail: 'http://res.cloudinary.com/example/iphone15pro_thumb.png',
      status: 1,
      productView: 1240,
      screenSize: '6.1"',
      screenResolution: '2556 x 1179',
      operatingSystem: 'iOS 17',
      cpu: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      battery: '3274 mAh',
      weight: '187g'
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android smartphone with S Pen and 200MP camera',
      price: new Prisma.Decimal(1199.00),
      salePrice: new Prisma.Decimal(1099.00),
      quantity: 85,
      brand: 'Samsung',
      type: 'dienthoai',
      image: 'http://res.cloudinary.com/example/s24ultra.png',
      thumbnail: 'http://res.cloudinary.com/example/s24ultra_thumb.png',
      status: 1,
      productView: 980,
      screenSize: '6.8"',
      screenResolution: '3088 x 1440',
      operatingSystem: 'Android 14',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '512GB',
      battery: '5000 mAh',
      weight: '233g'
    },
    {
      name: 'MacBook Pro 14"',
      description: 'Powerful laptop for professionals with M3 Pro chip',
      price: new Prisma.Decimal(1999.00),
      salePrice: new Prisma.Decimal(1899.00),
      quantity: 50,
      brand: 'Apple',
      type: 'laptop',
      image: 'http://res.cloudinary.com/example/macbookpro.png',
      thumbnail: 'http://res.cloudinary.com/example/macbookpro_thumb.png',
      status: 1,
      productView: 750,
      screenSize: '14.2"',
      screenResolution: '3024 x 1964',
      operatingSystem: 'macOS Sonoma',
      cpu: 'Apple M3 Pro',
      ram: '16GB',
      storage: '512GB SSD',
      battery: '70 Wh',
      weight: '1.6kg'
    },
    {
      name: 'iPad Air',
      description: 'Lightweight and powerful tablet for productivity and entertainment',
      price: new Prisma.Decimal(599.00),
      salePrice: new Prisma.Decimal(549.00),
      quantity: 120,
      brand: 'Apple',
      type: 'tablet',
      image: 'http://res.cloudinary.com/example/ipadair.png',
      thumbnail: 'http://res.cloudinary.com/example/ipadair_thumb.png',
      status: 1,
      productView: 620,
      screenSize: '10.9"',
      screenResolution: '2360 x 1640',
      operatingSystem: 'iPadOS 17',
      cpu: 'Apple M2',
      ram: '8GB',
      storage: '256GB',
      battery: '28.6 Wh',
      weight: '461g'
    },
    {
      name: 'Sony WH-1000XM5',
      description: 'Premium noise cancelling headphones with advanced audio technology',
      price: new Prisma.Decimal(399.00),
      salePrice: new Prisma.Decimal(349.00),
      quantity: 75,
      brand: 'Sony',
      type: 'amthanh',
      image: 'http://res.cloudinary.com/example/sonywh1000xm5.png',
      thumbnail: 'http://res.cloudinary.com/example/sonywh1000xm5_thumb.png',
      status: 1,
      productView: 480,
      battery: '30 hours',
      weight: '250g'
    },
    {
      name: 'Apple Watch Series 9',
      description: 'Advanced smartwatch with health monitoring and fitness tracking',
      price: new Prisma.Decimal(399.00),
      salePrice: new Prisma.Decimal(379.00),
      quantity: 90,
      brand: 'Apple',
      type: 'dongho',
      image: 'http://res.cloudinary.com/example/applewatch9.png',
      thumbnail: 'http://res.cloudinary.com/example/applewatch9_thumb.png',
      status: 1,
      productView: 510,
      screenSize: '1.9"',
      screenResolution: '484 x 396',
      operatingSystem: 'watchOS 10',
      cpu: 'Apple S9',
      battery: '18 hours',
      weight: '51.5g'
    },
    {
      name: 'Amazon Echo Dot (5th Gen)',
      description: 'Smart speaker with Alexa for home automation',
      price: new Prisma.Decimal(49.99),
      salePrice: new Prisma.Decimal(39.99),
      quantity: 150,
      brand: 'Amazon',
      type: 'nhathongminh',
      image: 'http://res.cloudinary.com/example/echodot.png',
      thumbnail: 'http://res.cloudinary.com/example/echodot_thumb.png',
      status: 1,
      productView: 320,
      weight: '340g'
    },
    {
      name: 'Smart Light Bulb',
      description: 'Wi-Fi connected RGB light bulb for smart home',
      price: new Prisma.Decimal(12.00),
      salePrice: new Prisma.Decimal(10.00),
      quantity: 1106,
      brand: 'Headphones',
      type: 'nhathongminh',
      image: 'http://res.cloudinary.com/dvj4wwihv/image/upload/v1730654202/xfxgtduquqg5ipwvjncj.png',
      thumbnail: 'http://res.cloudinary.com/dvj4wwihv/image/upload/v1730654202/m5xni9fvrbat00cyvi1x.png',
      status: 1,
      productView: 0,
      screenSize: '11',
      screenResolution: '4K (3840x2160)',
      operatingSystem: 'iOS',
      battery: '10000',
      weight: '2'
    },
    {
      name: 'Samsung 65" OLED TV',
      description: 'Premium OLED TV with 4K resolution and smart features',
      price: new Prisma.Decimal(1999.00),
      salePrice: new Prisma.Decimal(1799.00),
      quantity: 30,
      brand: 'Samsung',
      type: 'tivi',
      image: 'http://res.cloudinary.com/example/samsungoled.png',
      thumbnail: 'http://res.cloudinary.com/example/samsungoled_thumb.png',
      status: 1,
      productView: 290,
      screenSize: '65"',
      screenResolution: '3840 x 2160',
      operatingSystem: 'Tizen',
      weight: '23kg'
    },
    {
      name: 'Gaming PC',
      description: 'High-performance gaming desktop with RTX 4080',
      price: new Prisma.Decimal(2499.00),
      salePrice: new Prisma.Decimal(2299.00),
      quantity: 25,
      brand: 'Custom',
      type: 'pc_manhinh',
      image: 'http://res.cloudinary.com/example/gamingpc.png',
      thumbnail: 'http://res.cloudinary.com/example/gamingpc_thumb.png',
      status: 1,
      productView: 420,
      cpu: 'Intel Core i9-14900K',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
      weight: '15kg'
    },
    {
      name: 'USB-C Charging Cable',
      description: 'Durable braided USB-C charging cable, 2m length',
      price: new Prisma.Decimal(19.99),
      salePrice: new Prisma.Decimal(14.99),
      quantity: 200,
      brand: 'Anker',
      type: 'phukien',
      image: 'http://res.cloudinary.com/example/usbc_cable.png',
      thumbnail: 'http://res.cloudinary.com/example/usbc_cable_thumb.png',
      status: 1,
      productView: 180,
      weight: '50g'
    },
    {
      name: 'Refurbished iPhone 13',
      description: 'Certified refurbished iPhone 13 in excellent condition',
      price: new Prisma.Decimal(599.00),
      salePrice: new Prisma.Decimal(549.00),
      quantity: 40,
      brand: 'Apple',
      type: 'hangcu',
      image: 'http://res.cloudinary.com/example/iphone13_refurb.png',
      thumbnail: 'http://res.cloudinary.com/example/iphone13_refurb_thumb.png',
      status: 1,
      productView: 210,
      screenSize: '6.1"',
      screenResolution: '2532 x 1170',
      operatingSystem: 'iOS 17',
      cpu: 'A15 Bionic',
      ram: '4GB',
      storage: '128GB',
      battery: '3240 mAh',
      weight: '174g'
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  // Get user and product IDs for the rest of the seed
  const testUser = await prisma.user.findUnique({ where: { username: 'test' } });
  const sarahUser = await prisma.user.findUnique({ where: { username: 'sarah' } });
  const johnUser = await prisma.user.findUnique({ where: { username: 'john' } });

  const smartLightBulb = await prisma.product.findFirst({ where: { name: 'Smart Light Bulb' } });
  const iPhone = await prisma.product.findFirst({ where: { name: 'iPhone 15 Pro' } });
  const samsung = await prisma.product.findFirst({ where: { name: 'Samsung Galaxy S24 Ultra' } });
  const macbook = await prisma.product.findFirst({ where: { name: 'MacBook Pro 14"' } });

  if (!testUser || !sarahUser || !johnUser || !smartLightBulb || !iPhone || !samsung || !macbook) {
    throw new Error('Required seed data is missing');
  }

  // ----- CARTS -----
  console.log('Seeding carts...');
  const carts = [
    {
      userId: testUser.id,
      productId: iPhone.id,
      quantity: 1
    },
    {
      userId: sarahUser.id,
      productId: samsung.id,
      quantity: 1
    },
    {
      userId: sarahUser.id,
      productId: macbook.id,
      quantity: 1
    },
    {
      userId: johnUser.id,
      productId: smartLightBulb.id,
      quantity: 3
    }
  ];

  for (const cart of carts) {
    await prisma.cart.create({
      data: cart
    });
  }

  // ----- ORDERS -----
  console.log('Seeding orders...');

  // Helper function to generate order code
  function generateOrderCode() {
    const date = new Date();
    const prefix = date.getFullYear().toString().substring(2) +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
    const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `${prefix}${randomStr}`;
  }

  // Create orders
  const orders = [
    {
      orderCode: '241104IP2LON1T',
      nameOrder: 'Linh Đào Ngọc',
      phoneNumber: '0865058159',
      address: 'Tầng 9. Toa nha Lien Hiep Phu Nu 7, Tôn Thất Thuyết Dịch Vọng Hậu Cau giay Hanoi City, 123345, Việt Nam',
      notes: 'dsads',
      orderDate: new Date('2024-11-03T17:37:01.621Z'),
      deliveryDate: new Date('2024-11-03T18:02:56.740Z'),
      orderStatus: 'Đã nhận hàng',
      totalAmount: new Prisma.Decimal(36.00),
      userId: testUser.id
    },
    {
      orderCode: '241104I26DBFK9',
      nameOrder: 'Linh Đào Ngọc',
      phoneNumber: '0865058159',
      address: 'Tầng 9. Toa nha Lien Hiep Phu Nu 7, Tôn Thất Thuyết Dịch Vọng Hậu Cau giay Hanoi City, 123345, Việt Nam',
      notes: '',
      orderDate: new Date('2024-11-03T18:02:15.759Z'),
      deliveryDate: new Date('2024-11-03T18:02:50.700Z'),
      orderStatus: 'Đã nhận hàng',
      totalAmount: new Prisma.Decimal(24.00),
      userId: testUser.id
    },
    {
      orderCode: generateOrderCode(),
      nameOrder: 'Sarah Smith',
      phoneNumber: '0923456789',
      address: '789 Client Road, Buyer City',
      notes: 'Please deliver after 6pm',
      orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      deliveryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      orderStatus: 'Đã nhận hàng',
      totalAmount: new Prisma.Decimal(949.00),
      userId: sarahUser.id
    },
    {
      orderCode: generateOrderCode(),
      nameOrder: 'John Doe',
      phoneNumber: '0912345678',
      address: '456 User Lane, Customer Town',
      notes: 'Leave at the door',
      orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      deliveryDate: null,
      orderStatus: 'Đang giao hàng',
      totalAmount: new Prisma.Decimal(1099.00),
      userId: johnUser.id
    },
    {
      orderCode: generateOrderCode(),
      nameOrder: 'John Doe',
      phoneNumber: '0912345678',
      address: '456 User Lane, Customer Town',
      notes: '',
      orderDate: new Date(), // Today
      deliveryDate: null,
      orderStatus: 'Chờ xác nhận',
      totalAmount: new Prisma.Decimal(1899.00),
      userId: johnUser.id
    }
  ];

  const createdOrders = [];
  for (const order of orders) {
    const createdOrder = await prisma.order.create({
      data: order
    });
    createdOrders.push(createdOrder);
  }

  // ----- ORDER DETAILS -----
  console.log('Seeding order details...');
  const orderDetails = [
    {
      orderId: createdOrders[0].id,
      productId: smartLightBulb.id,
      quantity: 3,
      unitPrice: new Prisma.Decimal(12.00)
    },
    {
      orderId: createdOrders[1].id,
      productId: smartLightBulb.id,
      quantity: 2,
      unitPrice: new Prisma.Decimal(12.00)
    },
    {
      orderId: createdOrders[2].id,
      productId: iPhone.id,
      quantity: 1,
      unitPrice: new Prisma.Decimal(949.00)
    },
    {
      orderId: createdOrders[3].id,
      productId: samsung.id,
      quantity: 1,
      unitPrice: new Prisma.Decimal(1099.00)
    },
    {
      orderId: createdOrders[4].id,
      productId: macbook.id,
      quantity: 1,
      unitPrice: new Prisma.Decimal(1899.00)
    }
  ];

  for (const detail of orderDetails) {
    await prisma.orderDetail.create({
      data: detail
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });