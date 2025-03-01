import { PrismaClient, Role, ProductStatus, OrderStatus, PaymentStatus, DeliveryStatus, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    // Create realistic users with detailed addresses
    const alice = await tx.user.create({
      data: {
        email: 'alice.smith@example.com',
        username: 'alicesmith',
        password: Bun.password.hashSync("password", "bcrypt"), // Replace with a proper hash in production
        name: 'Alice Smith',
        phone: '+1-555-123-4567',
        birthday: new Date('1987-04-12'),
        role: Role.CUSTOMER,
        profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
        addresses: {
          create: [
            {
              label: 'Home',
              streetAddress: '742 Evergreen Terrace',
              city: 'Springfield',
              state: 'IL',
              postalCode: '62704',
              country: 'USA',
              isDefault: true,
              phoneNumber: '+1-555-234-5678',
              deliveryNotes: 'Leave package at the back door.',
            },
            {
              label: 'Work',
              streetAddress: '100 Industrial Way',
              city: 'Springfield',
              state: 'IL',
              postalCode: '62701',
              country: 'USA',
              isDefault: false,
              phoneNumber: '+1-555-987-6543',
              deliveryNotes: 'Reception available 9am-5pm.',
            },
          ],
        },
      },
      include: { addresses: true },
    });

    const bob = await tx.user.create({
      data: {
        email: 'bob.johnson@example.com',
        username: 'bobbyj',
        password: Bun.password.hashSync("password", "bcrypt"),
        name: 'Bob Johnson',
        phone: '+1-555-222-3333',
        birthday: new Date('1992-09-30'),
        role: Role.CUSTOMER,
        profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
        addresses: {
          create: [
            {
              label: 'Home',
              streetAddress: '123 Maple Street',
              city: 'Centerville',
              state: 'OH',
              postalCode: '45459',
              country: 'USA',
              isDefault: true,
              phoneNumber: '+1-555-444-5555',
              deliveryNotes: 'Ring doorbell twice.',
            },
          ],
        },
      },
      include: { addresses: true },
    });

    const admin = await tx.user.create({
      data: {
        email: 'admin@shopworld.com',
        username: 'shopadmin',
        password: Bun.password.hashSync("password", "bcrypt"),
        name: 'Shop Admin',
        phone: '+1-555-111-2222',
        birthday: new Date('1980-01-15'),
        role: Role.ADMIN,
        profileImage: 'https://randomuser.me/api/portraits/lego/1.jpg',
        addresses: {
          create: [
            {
              label: 'Headquarters',
              streetAddress: '1 Infinite Loop',
              city: 'Cupertino',
              state: 'CA',
              postalCode: '95014',
              country: 'USA',
              isDefault: true,
              phoneNumber: '+1-555-000-1111',
              deliveryNotes: 'Main reception on floor 1.',
            },
          ],
        },
      },
      include: { addresses: true },
    });

    // Create realistic categories and subcategories
    const electronics = await tx.category.create({
      data: {
        name: 'Electronics',
        description: 'Latest gadgets and consumer electronics.',
        slug: 'electronics',
        isActive: true,
        subCategories: {
          create: [
            {
              name: 'Smartphones',
              description: 'Mobile phones with advanced features.',
              slug: 'smartphones',
              isActive: true,
            },
            {
              name: 'Laptops',
              description: 'Portable computers for everyday use.',
              slug: 'laptops',
              isActive: true,
            },
          ],
        },
      },
      include: { subCategories: true },
    });

    const audioCategory = await tx.category.create({
      data: {
        name: "Audio",
        description: "High-quality audio devices and accessories.",
        slug: "audio",
        isActive: true,
      },
    });

    const wearablesCategory = await tx.category.create({
      data: {
        name: "Wearables",
        description: "Wearable technology including smartwatches and fitness trackers.",
        slug: "wearables",
        isActive: true,
      },
    });

    const gamingCategory = await tx.category.create({
      data: {
        name: "Gaming",
        description: "Gaming consoles and related accessories.",
        slug: "gaming",
        isActive: true,
      },
    });


    const smartphones = electronics.subCategories.find((cat) => cat.slug === 'smartphones');
    const laptops = electronics.subCategories.find((cat) => cat.slug === 'laptops');

    if (!smartphones || !laptops) {
      throw new Error('Subcategories not created properly');
    }

    // Create realistic products with variants
    const iphone = await tx.product.create({
      data: {
        name: 'iPhone 14 Pro',
        description: 'The latest iPhone with the A16 chip and advanced camera system.',
        slug: 'iphone-14-pro',
        quantity: 150,
        brand: 'Apple',
        categoryId: smartphones.id,
        status: ProductStatus.ACTIVE,
        type: 'Smartphone',
        weight: new Prisma.Decimal('0.35'),
        dimensions: '5.8x2.8x0.3',
        variants: {
          create: [
            {
              sku: 'IP14P-BLK-256',
              price: new Prisma.Decimal('999.99'),
              salePrice: new Prisma.Decimal('949.99'),
              quantity: 100,
              image: 'https://example.com/iphone14pro-black.jpg',
            },
          ],
        },
      },
    });

    const macbook = await tx.product.create({
      data: {
        name: 'MacBook Pro 16"',
        description: 'A powerful laptop with the M1 Pro chip, built for professionals.',
        slug: 'macbook-pro-16',
        quantity: 80,
        brand: 'Apple',
        categoryId: laptops.id,
        status: ProductStatus.ACTIVE,
        type: 'Laptop',
        weight: new Prisma.Decimal('4.3'),
        dimensions: '14x9.7x0.7',
        variants: {
          create: [
            {
              sku: 'MBP16-SILVER-512',
              price: new Prisma.Decimal('2499.99'),
              salePrice: new Prisma.Decimal('2399.99'),
              quantity: 60,
              image: 'https://example.com/macbookpro-16-silver.jpg',
            },
          ],
        },
      },
    });

    const wirelessHeadphones = await tx.product.create({
      data: {
        name: "Wireless Headphones",
        description:
          "Experience superior sound quality with our Wireless Headphones featuring active noise cancellation and long battery life.",
        slug: "wireless-headphones",
        quantity: 200,
        brand: "SoundX",
        categoryId: audioCategory.id, // Ensure audioCategory is defined
        status: ProductStatus.ACTIVE,
        type: "Headphones",
        weight: new Prisma.Decimal("0.3"),
        dimensions: "7x6x3",
        variants: {
          create: [
            {
              sku: "WH-001",
              price: new Prisma.Decimal("199.99"),
              salePrice: new Prisma.Decimal("179.99"),
              quantity: 200,
              image: "https://picsum.photos/seed/headphones/600/400",
            },
          ],
        },
      },
    });
    
    // Smartwatch X
    const smartwatch = await tx.product.create({
      data: {
        name: "Smartwatch X",
        description:
          "Keep track of your fitness and notifications with Smartwatch X, blending style with top-notch functionality.",
        slug: "smartwatch-x",
        quantity: 150,
        brand: "TimeTech",
        categoryId: wearablesCategory.id, // Ensure wearablesCategory is defined
        status: ProductStatus.ACTIVE,
        type: "Smartwatch",
        weight: new Prisma.Decimal("0.2"),
        dimensions: "4x4x1.2",
        variants: {
          create: [
            {
              sku: "SWX-001",
              price: new Prisma.Decimal("299.99"),
              salePrice: new Prisma.Decimal("279.99"),
              quantity: 150,
              image: "https://picsum.photos/seed/smartwatch/600/400",
            },
          ],
        },
      },
    });
    
    // Gaming Console Y
    const gamingConsole = await tx.product.create({
      data: {
        name: "Gaming Console Y",
        description:
          "Immerse yourself in the ultimate gaming experience with Gaming Console Y, featuring high-resolution graphics and fast load times.",
        slug: "gaming-console-y",
        quantity: 100,
        brand: "GameMax",
        categoryId: gamingCategory.id, // Ensure gamingCategory is defined
        status: ProductStatus.ACTIVE,
        type: "Console",
        weight: new Prisma.Decimal("3.5"),
        dimensions: "12x10x3",
        variants: {
          create: [
            {
              sku: "GCY-001",
              price: new Prisma.Decimal("499.99"),
              salePrice: new Prisma.Decimal("449.99"),
              quantity: 100,
              image: "https://picsum.photos/seed/gaming/600/400",
            },
          ],
        },
      },
    });
    
    // Tablet Z
    const tablet = await tx.product.create({
      data: {
        name: "Tablet Z",
        description:
          "Tablet Z offers a seamless blend of performance and portability, perfect for both work and play.",
        slug: "tablet-z",
        quantity: 120,
        brand: "TabPro",
        categoryId: laptops.id, // Reusing the laptops category or assign a dedicated tablets category
        status: ProductStatus.ACTIVE,
        type: "Tablet",
        weight: new Prisma.Decimal("0.8"),
        dimensions: "10x7x0.3",
        variants: {
          create: [
            {
              sku: "TZ-001",
              price: new Prisma.Decimal("399.99"),
              salePrice: new Prisma.Decimal("369.99"),
              quantity: 120,
              image: "https://picsum.photos/seed/tablet/600/400",
            },
          ],
        },
      },
    });

    // Create realistic attributes with values
    const colorAttr = await tx.attribute.create({
      data: {
        name: 'Color',
        displayName: 'Color',
        values: {
          create: [
            { value: 'Space Black' },
            { value: 'Silver' },
            { value: 'Gold' },
          ],
        },
      },
    });

    const storageAttr = await tx.attribute.create({
      data: {
        name: 'Storage',
        displayName: 'Storage Capacity',
        values: {
          create: [
            { value: '128GB' },
            { value: '256GB' },
            { value: '512GB' },
            { value: '1TB' },
          ],
        },
      },
    });

    // Link variant options for the iPhone variant
    const iphoneVariant = await tx.productVariant.findFirst({
      where: { productId: iphone.id },
    });
    const blackColor = await tx.attributeValue.findFirst({
      where: { attributeId: colorAttr.id, value: 'Space Black' },
    });
    const storage512 = await tx.attributeValue.findFirst({
      where: { attributeId: storageAttr.id, value: '512GB' },
    });

    if (iphoneVariant && blackColor) {
      await tx.variantOption.create({
        data: {
          variantId: iphoneVariant.id,
          attributeValueId: blackColor.id,
        },
      });
    }
    if (iphoneVariant && storage512) {
      await tx.variantOption.create({
        data: {
          variantId: iphoneVariant.id,
          attributeValueId: storage512.id,
        },
      });
    }

    // Create a realistic order for Alice with detailed order items
    const aliceHomeAddress = alice.addresses.find(addr => addr.label === 'Home');
    if (!aliceHomeAddress) throw new Error('Alice has no home address');

    const aliceOrder = await tx.order.create({
      data: {
        orderCode: 'ORDER-20230501-001',
        userId: alice.id,
        addressId: aliceHomeAddress.id,
        totalAmount: new Prisma.Decimal('1949.98'),
        subtotal: new Prisma.Decimal('1949.98'),
        taxAmount: new Prisma.Decimal('155.98'),
        shippingAmount: new Prisma.Decimal('20.00'),
        discountAmount: new Prisma.Decimal('0'),
        couponCode: null,
        paymentMethod: 'Credit Card',
        status: OrderStatus.PROCESSING,
        paymentStatus: PaymentStatus.PAID,
        orderItems: {
          create: [
            {
              productId: iphone.id,
              quantity: 1,
              unitPrice: new Prisma.Decimal('999.99'),
              totalPrice: new Prisma.Decimal('999.99'),
              discount: new Prisma.Decimal('0'),
              productName: iphone.name,
              productSku: iphoneVariant ? iphoneVariant.sku : 'IP14P-BLK-256',
            },
            {
              productId: macbook.id,
              quantity: 1,
              unitPrice: new Prisma.Decimal('949.99'),
              totalPrice: new Prisma.Decimal('949.99'),
              discount: new Prisma.Decimal('0'),
              productName: macbook.name,
              productSku: 'MBP16-SILVER-512',
            },
          ],
        },
        statusHistory: {
          create: [
            {
              status: OrderStatus.PROCESSING,
              notes: 'Order confirmed; payment received and processing.',
              createdById: alice.id,
            },
          ],
        },
      },
    });

    // Create a cart entry for Bob
    const iphoneVariantForCart = await tx.productVariant.findFirst({
      where: { productId: iphone.id },
    });
    await tx.cart.create({
      data: {
        userId: bob.id,
        productId: iphone.id,
        variantId: iphoneVariantForCart ? iphoneVariantForCart.id : undefined,
        quantity: 1,
      },
    });

    // Create a delivery record for Alice's order with the admin acting as driver
    const adminHQAddress = admin.addresses[0];
    await tx.delivery.create({
      data: {
        orderId: aliceOrder.id,
        driverId: admin.id,
        fromAddressId: adminHQAddress.id,
        toAddressId: aliceHomeAddress.id,
        scheduledDate: new Date(),
        status: DeliveryStatus.ASSIGNED,
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days later
      },
    });

    console.log('Realistic seeding finished.');
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
