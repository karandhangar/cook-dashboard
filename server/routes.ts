import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertDishSchema, insertMenuSchema, updateUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Profile routes
  app.get("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const user = await storage.getUser(req.user.id);
    res.json(user);
  });

  app.patch("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = updateUserSchema.parse(req.body);
    const user = await storage.updateUser(req.user.id, data);
    res.json(user);
  });

  // Dish routes
  app.get("/api/dishes", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const dishes = await storage.getDishes(req.user.id);
    res.json(dishes);
  });

  app.post("/api/dishes", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = insertDishSchema.parse(req.body);
    const dish = await storage.createDish(req.user.id, data);
    res.json(dish);
  });

  app.delete("/api/dishes/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.deleteDish(req.user.id, parseInt(req.params.id));
    res.sendStatus(200);
  });

  // Menu routes
  app.get("/api/menus", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const menus = await storage.getMenus(req.user.id);
    res.json(menus);
  });

  app.post("/api/menus", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = insertMenuSchema.parse(req.body);
    const menu = await storage.createMenu(req.user.id, data);
    res.json(menu);
  });

  const httpServer = createServer(app);
  return httpServer;
}
