import { db } from "../api/queries/connection";
import * as schema from "./schema";
import bcryptjs from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(schema.jobApplications);
  await db.delete(schema.jobListings);
  await db.delete(schema.productImages);
  await db.delete(schema.products);
  await db.delete(schema.factoryImages);
  await db.delete(schema.factories);
  await db.delete(schema.categories);
  await db.delete(schema.contactMessages);
  await db.delete(schema.siteSettings);
  await db.delete(schema.searchLogs);
  await db.delete(schema.users);

  const hashedPassword = await bcryptjs.hash("password123", 10);

  // ── Users ──────────────────────────────────────────
  const adminUser = await db.insert(schema.users).values({ name: "مدير النظام", email: "admin@damietta.gov.eg", password: hashedPassword, role: "admin", isVerified: true, status: "approved" }).returning();
  const authorityUser = await db.insert(schema.users).values({ name: "جمعية المستثمرين", email: "authority@damietta.gov.eg", password: hashedPassword, role: "authority", isVerified: true, status: "approved" }).returning();
  const govUser = await db.insert(schema.users).values({ name: "وزارة الصناعة", email: "gov@industry.gov.eg", password: hashedPassword, role: "government", isVerified: true, status: "approved" }).returning();
  const factoryUser1 = await db.insert(schema.users).values({ name: "محمد النور", email: "elnour@factory.com", password: hashedPassword, role: "factory", companyName: "مصنع النور للأثاث", isVerified: true, status: "approved" }).returning();
  const factoryUser2 = await db.insert(schema.users).values({ name: "أحمد الرحمة", email: "rahma@factory.com", password: hashedPassword, role: "factory", companyName: "مصنع الرحمة للأخشاب", isVerified: true, status: "approved" }).returning();
  const factoryUser3 = await db.insert(schema.users).values({ name: "خالد السعيد", email: "saeed@factory.com", password: hashedPassword, role: "factory", companyName: "مصنع السعيد للمنسوجات", isVerified: true, status: "approved" }).returning();
  const factoryUser4 = await db.insert(schema.users).values({ name: "سامي الحديدي", email: "steel@factory.com", password: hashedPassword, role: "factory", companyName: "مصنع الحديدي للمعادن", isVerified: true, status: "approved" }).returning();
  const factoryUser5 = await db.insert(schema.users).values({ name: "تامر البلاستيك", email: "plastic@factory.com", password: hashedPassword, role: "factory", companyName: "مصنع النيل للبلاستيك", isVerified: true, status: "approved" }).returning();
  const factoryUser6 = await db.insert(schema.users).values({ name: "محمود الصناعي", email: "food@factory.com", password: hashedPassword, role: "factory", companyName: "مصنع الصناعي للمواد الغذائية", isVerified: true, status: "approved" }).returning();
  const supplierUser = await db.insert(schema.users).values({ name: "شركة الموردون", email: "supplier@example.com", password: hashedPassword, role: "supplier", companyName: "موردون للخامات الصناعية", isVerified: true, status: "approved" }).returning();
  const importerUser = await db.insert(schema.users).values({ name: "جون سميث", email: "importer@example.com", password: hashedPassword, role: "importer", isVerified: true, status: "approved" }).returning();
  const normalUser = await db.insert(schema.users).values({ name: "عبدالله محمد", email: "user@example.com", password: hashedPassword, role: "user", isVerified: true, status: "approved" }).returning();

  // ── Categories ─────────────────────────────────────
  const cat1 = await db.insert(schema.categories).values({ nameAr: "أثاث", nameEn: "Furniture", icon: "Sofa", descriptionAr: "مصانع الأثاث المنزلي والمكتبي", sortOrder: 1 }).returning();
  const cat2 = await db.insert(schema.categories).values({ nameAr: "أخشاب ونجارة", nameEn: "Woodworking", icon: "TreePine", descriptionAr: "مصانع النجارة والأخشاب", sortOrder: 2 }).returning();
  const cat3 = await db.insert(schema.categories).values({ nameAr: "منسوجات", nameEn: "Textiles", icon: "Shirt", descriptionAr: "مصانع المنسوجات والملابس", sortOrder: 3 }).returning();
  const cat4 = await db.insert(schema.categories).values({ nameAr: "صناعات غذائية", nameEn: "Food Industry", icon: "ChefHat", descriptionAr: "مصانع المواد الغذائية والمشروبات", sortOrder: 4 }).returning();
  const cat5 = await db.insert(schema.categories).values({ nameAr: "معادن", nameEn: "Metals", icon: "Hammer", descriptionAr: "مصانع الحديد والصلب والمعادن", sortOrder: 5 }).returning();
  const cat6 = await db.insert(schema.categories).values({ nameAr: "بلاستيك", nameEn: "Plastics", icon: "Package", descriptionAr: "مصانع البلاستيك والمطاط", sortOrder: 6 }).returning();
  const cat7 = await db.insert(schema.categories).values({ nameAr: "إلكترونيات", nameEn: "Electronics", icon: "Cpu", descriptionAr: "مصانع الإلكترونيات والأجهزة الكهربائية", sortOrder: 7 }).returning();
  const cat8 = await db.insert(schema.categories).values({ nameAr: "تعبئة وتغليف", nameEn: "Packaging", icon: "Box", descriptionAr: "مصانع التعبئة والتغليف", sortOrder: 8 }).returning();
  const cat9 = await db.insert(schema.categories).values({ nameAr: "مواد بناء", nameEn: "Construction", icon: "Building2", descriptionAr: "مصانع مواد البناء", sortOrder: 9 }).returning();
  const cat10 = await db.insert(schema.categories).values({ nameAr: "ديكور وإضاءة", nameEn: "Decor & Lighting", icon: "Lamp", descriptionAr: "مصانع الديكور والإضاءة", sortOrder: 10 }).returning();

  // ── Factories ──────────────────────────────────────
  const f1 = await db.insert(schema.factories).values({
    userId: factoryUser1[0].id, nameAr: "مصنع النور للأثاث", nameEn: "El Nour Furniture",
    descriptionAr: "مصنع رائد في إنتاج الأثاث المنزلي والمكتبي بجودة عالمية. نستخدم أحدث التقنيات في التصنيع مع التركيز على التصميم العصري والمتانة.",
    logo: "/images/factory-1.jpg", coverImage: "/images/factory-1.jpg",
    categoryId: cat1[0].id, membershipTier: "gold", rating: 4.8, viewCount: 1250,
    address: "القطاع الأول، شارع 5، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4235", longitude: "31.6800",
    phone: "01555551234", whatsapp: "01555551234", email: "info@elnour-furniture.com", website: "https://elnour-furniture.com",
    facebook: "https://facebook.com/elnour", instagram: "https://instagram.com/elnour",
    isFeatured: true, isActive: true,
  }).returning();

  const f2 = await db.insert(schema.factories).values({
    userId: factoryUser2[0].id, nameAr: "مصنع الرحمة للأخشاب", nameEn: "Rahma Wood",
    descriptionAr: "متخصصون في تصنيع ومعالجة الأخشاب بجميع أنواعها. نقدم خشب خام ومنتجات نصف مصنعة بجودة عالية.",
    logo: "/images/factory-2.jpg", coverImage: "/images/factory-2.jpg",
    categoryId: cat2[0].id, membershipTier: "silver", rating: 4.5, viewCount: 890,
    address: "القطاع الثاني، شارع 12، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4230", longitude: "31.6830",
    phone: "01555552345", whatsapp: "01555552345", email: "info@rahma-wood.com",
    isFeatured: true, isActive: true,
  }).returning();

  const f3 = await db.insert(schema.factories).values({
    userId: factoryUser3[0].id, nameAr: "مصنع السعيد للمنسوجات", nameEn: "El Saeed Textiles",
    descriptionAr: "أكبر مصنع منسوجات في المنطقة. ننتج الأقمشة والملايات والمناشف والسجاد بأعلى معايير الجودة.",
    logo: "/images/factory-3.jpg", coverImage: "/images/factory-2.jpg",
    categoryId: cat3[0].id, membershipTier: "gold", rating: 4.7, viewCount: 1100,
    address: "القطاع الثالث، شارع 8، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4220", longitude: "31.6860",
    phone: "01555553456", whatsapp: "01555553456", email: "info@elsaeed-textiles.com",
    facebook: "https://facebook.com/elsaeed",
    isFeatured: true, isActive: true,
  }).returning();

  const f4 = await db.insert(schema.factories).values({
    userId: factoryUser4[0].id, nameAr: "مصنع الحديدي للمعادن", nameEn: "Hadidy Metals",
    descriptionAr: "مصنع متخصص في تشكيل المعادن والحديد والصلب. نقدم حلول معدنية مخصصة للمباني والصناعات.",
    logo: "/images/factory-3.jpg", coverImage: "/images/factory-3.jpg",
    categoryId: cat5[0].id, membershipTier: "bronze", rating: 4.2, viewCount: 650,
    address: "القطاع الرابع، شارع 15، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4210", longitude: "31.6890",
    phone: "01555554567", whatsapp: "01555554567",
    isFeatured: false, isActive: true,
  }).returning();

  const f5 = await db.insert(schema.factories).values({
    userId: factoryUser5[0].id, nameAr: "مصنع النيل للبلاستيك", nameEn: "Nile Plastics",
    descriptionAr: "ننتج جميع أنواع المنتجات البلاستيكية من مواد خام عالية الجودة. نصدر لأكثر من 10 دول.",
    logo: "/images/factory-6.jpg", coverImage: "/images/factory-6.jpg",
    categoryId: cat6[0].id, membershipTier: "silver", rating: 4.4, viewCount: 780,
    address: "القطاع الخامس، شارع 20، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4195", longitude: "31.6820",
    phone: "01555555678", whatsapp: "01555555678", email: "info@nileplastics.com",
    isFeatured: true, isActive: true,
  }).returning();

  const f6 = await db.insert(schema.factories).values({
    userId: factoryUser6[0].id, nameAr: "مصنع الصناعي للمواد الغذائية", nameEn: "Sanaey Foods",
    descriptionAr: "مصنع حائز على شهادات الجودة العالمية ISO وHACCP. ننتج المواد الغذائية المعبأة والمشروبات.",
    logo: "/images/factory-4.jpg", coverImage: "/images/factory-4.jpg",
    categoryId: cat4[0].id, membershipTier: "gold", rating: 4.9, viewCount: 950,
    address: "القطاع السادس، شارع 3، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4245", longitude: "31.6850",
    phone: "01555556789", whatsapp: "01555556789", email: "info@sanaeyfoods.com",
    facebook: "https://facebook.com/sanaey",
    isFeatured: true, isActive: true,
  }).returning();

  const f7 = await db.insert(schema.factories).values({
    userId: factoryUser1[0].id, nameAr: "مصجر الدلتا للإلكترونيات", nameEn: "Delta Electronics",
    descriptionAr: "نصنع الأجهزة الإلكترونية والكهربائية المنزلية. شعارنا الجودة أولاً.",
    logo: "/images/factory-5.jpg", coverImage: "/images/factory-5.jpg",
    categoryId: cat7[0].id, membershipTier: "bronze", rating: 4.0, viewCount: 420,
    address: "القطاع السابع، شارع 25، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4185", longitude: "31.6910",
    phone: "01555557890", whatsapp: "01555557890",
    isFeatured: false, isActive: true,
  }).returning();

  const f8 = await db.insert(schema.factories).values({
    userId: factoryUser2[0].id, nameAr: "مصنع الفرعون للديكور", nameEn: "Pharaoh Decor",
    descriptionAr: "متخصصون في الإضاءة الديكورية والتحف الفنية. نجمع بين الأصالة المصرية والتصميم العصري.",
    logo: "/images/product-6.jpg", coverImage: "/images/product-6.jpg",
    categoryId: cat10[0].id, membershipTier: "silver", rating: 4.6, viewCount: 560,
    address: "القطاع الثامن، شارع 30، المنطقة الصناعية بدمياط الجديدة", latitude: "31.4225", longitude: "31.6780",
    phone: "01555558901", whatsapp: "01555558901", email: "info@pharaohdecor.com",
    isFeatured: true, isActive: true,
  }).returning();

  // ── Products ───────────────────────────────────────
  const productsData = [
    { factoryId: f1[0].id, nameAr: "كنبة مودرن 3 مقاعد", nameEn: "Modern 3-Seater Sofa", descriptionAr: "كنبة عصرية من القماش الفاخر مع هيكل خشبي متين. متوفرة بعدة ألوان.", mainImage: "/images/product-1.jpg", categoryId: cat1[0].id, availability: "available" as const, price: "8500", isFeatured: true },
    { factoryId: f1[0].id, nameAr: "طاولة طعام خشبية 6 كراسي", nameEn: "Wooden Dining Table 6 Chairs", descriptionAr: "طاولة طعام مصنوعة من خشب الزان الطبيعي مع 6 كراسي مطلة.", mainImage: "/images/product-2.jpg", categoryId: cat1[0].id, availability: "available" as const, price: "12000", isFeatured: true },
    { factoryId: f1[0].id, nameAr: "غرفة نوم كاملة", nameEn: "Complete Bedroom Set", descriptionAr: "غرفة نوم مودرن تشمل سرير كينج، دولاب، تسريحة، و2 كومود.", mainImage: "/images/product-2.jpg", categoryId: cat1[0].id, availability: "limited" as const, price: "25000", isFeatured: false },
    { factoryId: f3[0].id, nameAr: "طقم ملايات قطن مصري", nameEn: "Egyptian Cotton Bed Sheets", descriptionAr: "طقم ملايات 4 قطع من القطن المصري 100%، 600 خيط.", mainImage: "/images/product-3.jpg", categoryId: cat3[0].id, availability: "available" as const, price: "1800", isFeatured: true },
    { factoryId: f3[0].id, nameAr: "سجادة يدوية الصنع", nameEn: "Handmade Carpet", descriptionAr: "سجادة يدوية من الصوف الطبيعي بألوان طبيعية، مقاس 2x3 متر.", mainImage: "/images/product-3.jpg", categoryId: cat3[0].id, availability: "available" as const, price: "4500", isFeatured: false },
    { factoryId: f6[0].id, nameAr: "طقم أواني ستانلس ستيل", nameEn: "Stainless Steel Cookware Set", descriptionAr: "طقم 8 قطع من الأواني المصنوعة من الستانلس ستيل عالي الجودة.", mainImage: "/images/product-4.jpg", categoryId: cat4[0].id, availability: "available" as const, price: "3200", isFeatured: true },
    { factoryId: f8[0].id, nameAr: "ثريا مودرن LED", nameEn: "Modern LED Chandelier", descriptionAr: "ثريا عصرية بتصميم هندسي مع إضاءة LED متغيرة الألوان.", mainImage: "/images/product-5.jpg", categoryId: cat10[0].id, availability: "available" as const, price: "5600", isFeatured: true },
    { factoryId: f8[0].id, nameAr: "طقم فازات خزفية", nameEn: "Ceramic Vases Set", descriptionAr: "طقم 3 فازات خزفية يدوية الصنع بألوان ترابية دافئة.", mainImage: "/images/product-6.jpg", categoryId: cat10[0].id, availability: "limited" as const, price: "2200", isFeatured: true },
    { factoryId: f5[0].id, nameAr: "حاويات تخزين بلاستيكية", nameEn: "Plastic Storage Containers", descriptionAr: "طقم 5 حاويات تخزين متعددة الأحجام، آمنة للأطعمة.", mainImage: "/images/product-4.jpg", categoryId: cat6[0].id, availability: "available" as const, price: "450", isFeatured: false },
    { factoryId: f5[0].id, nameAr: "أوعية زراعة بلاستيكية", nameEn: "Plastic Plant Pots", descriptionAr: "أوعية زراعة دائرية بألوان متعددة، مقاسات من 10 إلى 50 سم.", mainImage: "/images/product-6.jpg", categoryId: cat6[0].id, availability: "available" as const, price: "120", isFeatured: false },
    { factoryId: f1[0].id, nameAr: "مكتب خشبي مودرن", nameEn: "Modern Wooden Desk", descriptionAr: "مكتب عمل من خشب MDF عالي الجودة مع أدراج تخزين.", mainImage: "/images/product-2.jpg", categoryId: cat1[0].id, availability: "out_of_stock" as const, price: "6800", isFeatured: false },
    { factoryId: f6[0].id, nameAr: "عصير طبيعي عبوة 1 لتر", nameEn: "Natural Juice 1L", descriptionAr: "عصير طبيعي 100% بدون إضافات، عبوة 1 لتر.", mainImage: "/images/product-3.jpg", categoryId: cat4[0].id, availability: "available" as const, price: "45", isFeatured: false },
  ];

  for (const p of productsData) {
    await db.insert(schema.products).values(p);
  }

  // ── Job Listings ───────────────────────────────────
  const jobsData = [
    { factoryId: f1[0].id, title: "مهندس إنتاج أثاث", description: "مطلوب مهندس إنتاج ذو خبرة في مصانع الأثاث للإشراف على خطوط الإنتاج.", requirements: "بكالوريوس هندسة، خبرة 3+ سنوات", salary: "8000 - 12000 جنيه", type: "full_time" as const, isActive: true },
    { factoryId: f3[0].id, title: "فني صيانة ماكينات خياطة", description: "مطلوب فني صيانة لماكينات الخياطة الصناعية.", requirements: "خبرة 2+ سنوات في صيانة الماكينات", salary: "5000 - 7000 جنيه", type: "full_time" as const, isActive: true },
    { factoryId: f6[0].id, title: "مشرف جودة غذائية", description: "مشرف جودة للإشراف على عمليات الإنتاج الغذائي وضمان تطبيق معايير HACCP.", requirements: "بكالوريوس علوم غذائية، شهادة HACCP", salary: "10000 - 15000 جنيه", type: "full_time" as const, isActive: true },
    { factoryId: f5[0].id, title: "مندوب مبيعات", description: "مطلوب مندوب مبيعات لتسويق منتجات البلاستيك داخلياً وخارجياً.", requirements: "رخصة قيادة، مهارات تواصل ممتازة", salary: "4000 - 6000 جنيه + عمولة", type: "full_time" as const, isActive: true },
    { factoryId: f8[0].id, title: "مصمم ديكور داخلي", description: "مطلوب مصمم ديكور لتصميم قطع إضاءة وديكور فريدة.", requirements: "خبرة في التصميم الداخلي، إتقان برامج التصميم", salary: "7000 - 10000 جنيه", type: "part_time" as const, isActive: true },
    { factoryId: f4[0].id, title: "لحام محترف", description: "مطلوب لحام ذو خبرة في اللحام بالقوس الكهربائي والغاز.", requirements: "خبرة 3+ سنوات، شهادة مهنية", salary: "6000 - 9000 جنيه", type: "contract" as const, isActive: true },
  ];

  for (const j of jobsData) {
    await db.insert(schema.jobListings).values(j);
  }

  // ── Contact Messages ───────────────────────────────
  await db.insert(schema.contactMessages).values([
    { name: "أحمد محمد", email: "ahmed@test.com", phone: "01001234567", subject: "استفسار", message: "أود الاستفسار عن إجراءات تسجيل مصنع جديد في المنطقة الصناعية", isRead: false },
    { name: "سارة علي", email: "sara@test.com", phone: "01009876543", subject: "شكوى", message: "أواجه مشكلة في التواصل مع أحد المصنعين عبر المنصة", isRead: true },
    { name: "محمود خالد", email: "mahmoud@test.com", subject: "اقتراح", message: "أقترح إضافة خاصية البحث المتقدم حسب الموقع الجغرافي", isRead: false },
  ]);

  // ── Site Settings ──────────────────────────────────
  await db.insert(schema.siteSettings).values([
    { key: "hero_title", value: "بوابة دمياط الجديدة الصناعية", type: "text", group: "hero" },
    { key: "hero_subtitle", value: "أكبر دليل صناعي متكامل في المنطقة الصناعية بدمياط الجديدة", type: "text", group: "hero" },
    { key: "stats_factories", value: "150", type: "text", group: "stats" },
    { key: "stats_workers", value: "50000", type: "text", group: "stats" },
    { key: "stats_investment", value: "2", type: "text", group: "stats" },
    { key: "stats_export", value: "25", type: "text", group: "stats" },
    { key: "contact_address", value: "مبنى جمعية المستثمرين، المنطقة الصناعية بدمياط الجديدة، مصر", type: "text", group: "contact" },
    { key: "contact_phone", value: "057-2385000", type: "text", group: "contact" },
    { key: "contact_email", value: "info@damietta-industrial.gov.eg", type: "text", group: "contact" },
    { key: "contact_whatsapp", value: "01555550000", type: "text", group: "contact" },
  ]);

  console.log("Seeding complete!");
}

seed().catch(console.error);
