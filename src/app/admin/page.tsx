"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Wallet,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_USERS, MOCK_TRANSACTIONS } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const pendingTransactions = MOCK_TRANSACTIONS.filter(
    (tx) => tx.status === "pending",
  );
  const activeUsers = INITIAL_USERS.filter((u) => u.status === "active");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast({
      title: "User Onboarded",
      description: "Invitation email has been sent successfully.",
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Admin Control Center
          </h1>
          <p className="text-muted-foreground">
            Manage users, approve transactions, and monitor platform health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <AlertCircle className="h-4 w-4" /> System Logs
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary gap-2 shadow-lg">
                <UserPlus className="h-4 w-4" /> Onboard User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Onboard New User</DialogTitle>
                <DialogDescription>
                  Enter the details of the new user to send them an invitation
                  link.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleOnboard}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Invitation</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Total Managed Assets
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.5M</div>
            <p className="text-xs text-muted-foreground mt-1">
              +15% this quarter
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Active Investors
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {INITIAL_USERS.length - activeUsers.length} suspended accounts
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingTransactions.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires approval
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Security Status
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Optimal</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last audit: 2h ago
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-xl">
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>
              Overview of onboarding and account modifications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {INITIAL_USERS.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        user.status === "active" ? "secondary" : "destructive"
                      }
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Tasks requiring admin attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTransactions.length > 0 ? (
              pendingTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 border rounded-lg space-y-3 bg-muted/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase">
                      {tx.type} Request
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tx.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold">
                        ${tx.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        for {tx.assetName}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 text-green-600 border-green-200"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 text-red-600 border-red-200"
                      >
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground italic text-sm">
                No pending requests at this time.
              </div>
            )}
            <Button variant="link" className="w-full text-xs">
              View all balance operations
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
