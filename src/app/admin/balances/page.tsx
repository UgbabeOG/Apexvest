"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function BalanceOperationsPage() {
  const pendingRequests = MOCK_TRANSACTIONS.filter(t => t.status === 'pending');
  const completedHistory = MOCK_TRANSACTIONS.filter(t => t.status !== 'pending');

  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Balance Operations</h1>
          <p className="text-muted-foreground">Approve or decline user deposit and withdrawal requests.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter by Type
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="shadow-xl border-accent/20 border-2">
          <CardHeader className="bg-accent/5">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Pending Approvals
            </CardTitle>
            <CardDescription>Requests currently awaiting administrator intervention</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {pendingRequests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-semibold">Jane Doe</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {req.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-primary">${req.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{req.date}</TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Approve
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2">
                          <XCircle className="h-4 w-4" /> Decline
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-12 text-center text-muted-foreground italic">
                All requests have been processed.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Operation History</CardTitle>
            <CardDescription>Recently processed balance adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Investor</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedHistory.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-xs font-mono text-muted-foreground">{tx.id}</TableCell>
                    <TableCell className="font-medium text-sm">Jane Doe</TableCell>
                    <TableCell className="capitalize text-sm">{tx.type} ({tx.assetType})</TableCell>
                    <TableCell className="font-bold text-sm">${tx.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={tx.status === 'completed' ? 'secondary' : 'destructive'} className="text-[10px]">
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}