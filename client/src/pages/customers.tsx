import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";

// Mock data for customers - this will be replaced with real data later
const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, City",
    subscriptionStatus: "Active",
    subscriptionPlan: "Weekly Plan",
    joinedDate: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    address: "456 Oak St, City",
    subscriptionStatus: "Active",
    subscriptionPlan: "Monthly Plan",
    joinedDate: "Feb 1, 2024",
  },
];

export default function Customers() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customers</h1>
        <p className="text-muted-foreground">Manage your customer relationships</p>
      </div>

      <div className="grid gap-4">
        {MOCK_CUSTOMERS.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{customer.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {customer.address}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    {customer.subscriptionStatus}
                  </span>
                  <p className="mt-2 text-sm">{customer.subscriptionPlan}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Joined {customer.joinedDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
