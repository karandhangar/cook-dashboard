import { pgTable, text, serial, integer, PgArray, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  bio: text("bio"),
  cuisine: text("cuisine"),
  experience: text("experience"),
  profileImage: text("profile_image"),
});

export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  image: text("image"),
  isSpecial: boolean("is_special").default(false),
  availableUntil: timestamp("available_until"),
});

export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  weekNumber: integer("week_number").notNull(),
  day: text("day").notNull(),
  dishId: integer("dish_id").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const updateUserSchema = createInsertSchema(users).omit({
  id: true,
  username: true,
  password: true,
});

export const insertDishSchema = createInsertSchema(dishes)
  .omit({
    id: true,
    userId: true,
  })
  .extend({
    isSpecial: z.boolean().optional(),
    availableUntil: z.string().optional(),
  });

export const insertMenuSchema = z.object({
  weekNumber: z.number(),
  day: z.string(),
  dishId: z.number(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type InsertDish = z.infer<typeof insertDishSchema>;
export type InsertMenu = z.infer<typeof insertMenuSchema>;
export type User = typeof users.$inferSelect;
export type Dish = typeof dishes.$inferSelect;
export type Menu = typeof menus.$inferSelect;