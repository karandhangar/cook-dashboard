import { IStorage } from "./storage";
import { User, UpdateUser, Dish, Menu, InsertDish, InsertMenu } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private dishes: Map<number, Dish>;
  private menus: Map<number, Menu>;
  sessionStore: session.Store;
  currentId: number;
  currentDishId: number;
  currentMenuId: number;

  constructor() {
    this.users = new Map();
    this.dishes = new Map();
    this.menus = new Map();
    this.currentId = 1;
    this.currentDishId = 1;
    this.currentMenuId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: User): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: UpdateUser): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");
    const updated = { ...user, ...data };
    this.users.set(id, updated);
    return updated;
  }

  async getDishes(userId: number): Promise<Dish[]> {
    return Array.from(this.dishes.values()).filter(
      (dish) => dish.userId === userId,
    );
  }

  async createDish(userId: number, data: InsertDish): Promise<Dish> {
    const id = this.currentDishId++;
    const dish: Dish = { ...data, id, userId };
    this.dishes.set(id, dish);
    return dish;
  }

  async deleteDish(userId: number, id: number): Promise<void> {
    const dish = this.dishes.get(id);
    if (!dish || dish.userId !== userId) throw new Error("Dish not found");
    this.dishes.delete(id);
  }

  async getMenus(userId: number): Promise<Menu[]> {
    return Array.from(this.menus.values()).filter(
      (menu) => menu.userId === userId,
    );
  }

  async createMenu(userId: number, data: InsertMenu): Promise<Menu> {
    const id = this.currentMenuId++;
    const menu: Menu = { ...data, id, userId };
    this.menus.set(id, menu);
    return menu;
  }
}

export const storage = new MemStorage();
