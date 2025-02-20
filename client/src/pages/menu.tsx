import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDishSchema, type InsertDish, type Dish } from "@shared/schema";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const WEEKS = [1, 2, 3, 4];

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1563897539633-7374c276c212",
  "https://images.unsplash.com/photo-1564844536311-de546a28c87d",
  "https://images.unsplash.com/photo-1492683962492-deef0ec456c0",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55",
  "https://images.unsplash.com/photo-1560963805-6c64417e3413",
  "https://images.unsplash.com/photo-1560963689-02e82017fb3c",
  "https://images.unsplash.com/photo-1503767849114-976b67568b02",
  "https://images.unsplash.com/photo-1560963806-394647f30329",
];

export default function Menu() {
  const { toast } = useToast();
  const { data: dishes, isLoading } = useQuery<Dish[]>({ queryKey: ["/api/dishes"] });

  const form = useForm<InsertDish>({
    resolver: zodResolver(insertDishSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: FOOD_IMAGES[Math.floor(Math.random() * FOOD_IMAGES.length)],
    },
  });

  const createDishMutation = useMutation({
    mutationFn: async (data: InsertDish) => {
      const res = await apiRequest("POST", "/api/dishes", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dishes"] });
      toast({
        title: "Dish created",
        description: "The dish has been added to your pool.",
      });
      form.reset();
    },
  });

  const deleteDishMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/dishes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dishes"] });
      toast({
        title: "Dish deleted",
        description: "The dish has been removed from your pool.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
          <p className="text-muted-foreground">Manage your dishes and weekly menus.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Dish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Dish</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => createDishMutation.mutate(data))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={createDishMutation.isPending}>
                  {createDishMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Dish
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {dishes?.map((dish) => (
          <Card key={dish.id}>
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{dish.name}</h3>
                  <p className="text-sm text-muted-foreground">${dish.price}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteDishMutation.mutate(dish.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm">{dish.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Menu Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Week</th>
                  {DAYS.map((day) => (
                    <th key={day} className="text-left p-2">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEEKS.map((week) => (
                  <tr key={week} className="border-t">
                    <td className="p-2 font-medium">Week {week}</td>
                    {DAYS.map((day) => (
                      <td key={day} className="p-2">
                        <Button variant="outline" className="w-full h-20">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
