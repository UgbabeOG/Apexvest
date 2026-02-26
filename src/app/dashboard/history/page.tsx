"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Transaction History</h1>
          <p className="text-muted-foreground">A detailed record of all your deposits, withdrawals, and asset adjustments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TRANSACTIONS.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize bg-muted/50">
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.assetName}</TableCell>
                  <TableCell className={cn(
                    "font-bold",
                    tx.type === 'withdrawal' ? "text-red-600" : "text-green-600"
                  )}>
                    {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        tx.status === 'completed' ? "bg-green-500" : tx.status === 'pending' ? "bg-yellow-500" : "bg-red-500"
                      )} />
                      <span className="capitalize text-xs font-medium">{tx.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}