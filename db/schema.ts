import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

// ── Users ─────────────────────────────────────────────
export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  phone: text("phone"),
  avatar: text("avatar"),
  role: text("role", { enum: ["user", "factory", "supplier", "importer", "authority", "government", "admin"] }).notNull().default("user"),
  companyName: text("company_name"),
  commercialRegister: text("commercial_register"),
  taxCard: text("tax_card"),
  isVerified: integer("is_verified", { mode: "boolean" }).notNull().default(false),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
  bio: text("bio"),
  address: text("address"),
  lat: text("lat"),
  lng: text("lng"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Categories ────────────────────────────────────────
export const categories = sqliteTable("categories", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  icon: text("icon").default("Factory"),
  image: text("image"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Factories ─────────────────────────────────────────
export const factories = sqliteTable("factories", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  logo: text("logo"),
  coverImage: text("cover_image"),
  categoryId: integer("category_id").references(() => categories.id),
  membershipTier: text("membership_tier", { enum: ["bronze", "silver", "gold"] }).notNull().default("bronze"),
  address: text("address"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  email: text("email"),
  website: text("website"),
  facebook: text("facebook"),
  instagram: text("instagram"),
  twitter: text("twitter"),
  youtube: text("youtube"),
  linkedin: text("linkedin"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  viewCount: integer("view_count").notNull().default(0),
  qrCode: text("qr_code"),
  rating: real("rating").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Products ──────────────────────────────────────────
export const products = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  factoryId: integer("factory_id").notNull().references(() => factories.id),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  specifications: text("specifications"),
  mainImage: text("main_image"),
  categoryId: integer("category_id").references(() => categories.id),
  availability: text("availability", { enum: ["available", "limited", "out_of_stock"] }).notNull().default("available"),
  price: text("price"),
  currency: text("currency").notNull().default("ج.م"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Factory Images ────────────────────────────────────
export const factoryImages = sqliteTable("factory_images", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  factoryId: integer("factory_id").notNull().references(() => factories.id),
  imageUrl: text("image_url").notNull(),
  captionAr: text("caption_ar"),
  captionEn: text("caption_en"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Product Images ────────────────────────────────────
export const productImages = sqliteTable("product_images", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull().references(() => products.id),
  imageUrl: text("image_url").notNull(),
  captionAr: text("caption_ar"),
  captionEn: text("caption_en"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Keywords ──────────────────────────────────────────
export const keywords = sqliteTable("keywords", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  word: text("word").notNull().unique(),
  wordEn: text("word_en"),
  searchCount: integer("search_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Factory Keywords ──────────────────────────────────
export const factoryKeywords = sqliteTable("factory_keywords", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  factoryId: integer("factory_id").notNull().references(() => factories.id),
  keywordId: integer("keyword_id").notNull().references(() => keywords.id),
});

// ── Product Keywords ──────────────────────────────────
export const productKeywords = sqliteTable("product_keywords", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull().references(() => products.id),
  keywordId: integer("keyword_id").notNull().references(() => keywords.id),
});

// ── Contact Messages ──────────────────────────────────
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role"),
  subject: text("subject"),
  message: text("message").notNull(),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Search Logs ───────────────────────────────────────
export const searchLogs = sqliteTable("search_logs", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  query: text("query").notNull(),
  userType: text("user_type"),
  resultsCount: integer("results_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Job Listings ──────────────────────────────────────
export const jobListings = sqliteTable("job_listings", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  factoryId: integer("factory_id").notNull().references(() => factories.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  salary: text("salary"),
  type: text("type", { enum: ["full_time", "part_time", "contract", "internship"] }).notNull().default("full_time"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Job Applications ──────────────────────────────────
export const jobApplications = sqliteTable("job_applications", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  jobId: integer("job_id").notNull().references(() => jobListings.id),
  applicantName: text("applicant_name").notNull(),
  applicantEmail: text("applicant_email"),
  applicantPhone: text("applicant_phone"),
  cvUrl: text("cv_url"),
  message: text("message"),
  status: text("status", { enum: ["pending", "reviewed", "accepted", "rejected"] }).notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Site Settings ─────────────────────────────────────
export const siteSettings = sqliteTable("site_settings", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value"),
  type: text("type", { enum: ["text", "image", "video", "color", "json"] }).notNull().default("text"),
  group: text("group").notNull().default("general"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ── Association News ───────────────────────────────────
export const news = sqliteTable("news", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  titleAr: text("title_ar").notNull(),
  contentAr: text("content_ar").notNull(),
  image: text("image"),
  category: text("category", { enum: ["اتفاقيات", "فعاليات", "قرارات", "اخبار"] }).notNull().default("اخبار"),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
  publishedAt: integer("published_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Factory = typeof factories.$inferSelect;
export type InsertFactory = typeof factories.$inferInsert;
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type JobListing = typeof jobListings.$inferSelect;
export type JobApplication = typeof jobApplications.$inferSelect;
export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;
