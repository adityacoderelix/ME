"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrendingUp, Download, Search, CalendarIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";
import { format, subMonths } from "date-fns";

// Mock data for revenue insights (extended for longer periods)
const revenueData = {
  today: [
    { hour: "00:00", revenue: 200 },
    { hour: "04:00", revenue: 300 },
    { hour: "08:00", revenue: 400 },
    { hour: "12:00", revenue: 600 },
    { hour: "16:00", revenue: 800 },
    { hour: "20:00", revenue: 1000 },
  ],
  last7Days: [
    { day: "Mon", revenue: 1500 },
    { day: "Tue", revenue: 2000 },
    { day: "Wed", revenue: 1800 },
    { day: "Thu", revenue: 2200 },
    { day: "Fri", revenue: 2500 },
    { day: "Sat", revenue: 3000 },
    { day: "Sun", revenue: 2800 },
  ],
  thisMonth: [
    { date: "1", revenue: 5000 },
    { date: "5", revenue: 6200 },
    { date: "10", revenue: 7800 },
    { date: "15", revenue: 8400 },
    { date: "20", revenue: 9100 },
    { date: "25", revenue: 10500 },
    { date: "30", revenue: 12000 },
  ],
  threeMonths: Array.from({ length: 90 }, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: Math.floor(Math.random() * 10000) + 5000,
  })),
  sixMonths: Array.from({ length: 180 }, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: Math.floor(Math.random() * 15000) + 5000,
  })),
  oneYear: Array.from({ length: 365 }, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: Math.floor(Math.random() * 20000) + 5000,
  })),
};

// Mock data for property revenue share
const propertyRevenueShare = [
  { name: "Sunset View", value: 35 },
  { name: "Palm Grove", value: 25 },
  { name: "Ocean Breeze", value: 20 },
  { name: "Mountain Mist", value: 15 },
  { name: "City Lights", value: 5 },
];

// Updated color palette using shades of green
const GREEN_COLORS = ["#2ecc71", "#27ae60", "#1abc9c", "#16a085", "#3498db"];

// Mock data for bookings
const bookings = [
  {
    id: 1,
    property: "Sunset View",
    guest: "John Doe",
    checkIn: "2023-06-15",
    checkOut: "2023-06-20",
    amount: 1500,
    status: "Completed",
  },
  {
    id: 2,
    property: "Palm Grove",
    guest: "Jane Smith",
    checkIn: "2023-06-18",
    checkOut: "2023-06-22",
    amount: 800,
    status: "Upcoming",
  },
  {
    id: 3,
    property: "Ocean Breeze",
    guest: "Mike Johnson",
    checkIn: "2023-06-10",
    checkOut: "2023-06-13",
    amount: 600,
    status: "Completed",
  },
  {
    id: 4,
    property: "Mountain Mist",
    guest: "Sarah Brown",
    checkIn: "2023-06-25",
    checkOut: "2023-06-30",
    amount: 1200,
    status: "Upcoming",
  },
  {
    id: 5,
    property: "City Lights",
    guest: "Chris Wilson",
    checkIn: "2023-06-05",
    checkOut: "2023-06-08",
    amount: 750,
    status: "Completed",
  },
];

const RevenuePage = () => {
  const [timePeriod, setTimePeriod] = useState("today");
  const [dateRange, setDateRange] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRevenueStats = () => {
    let data;
    switch (timePeriod) {
      case "today":
        data = revenueData.today;
        break;
      case "last7Days":
        data = revenueData.last7Days;
        break;
      case "thisMonth":
        data = revenueData.thisMonth;
        break;
      case "3months":
        data = revenueData.threeMonths;
        break;
      case "6months":
        data = revenueData.sixMonths;
        break;
      case "1year":
        data = revenueData.oneYear;
        break;
      default:
        data = revenueData.today;
    }
    const total = data.reduce((sum, item) => sum + item.revenue, 0);
    return {
      total,
      average: total / data.length,
      highest: Math.max(...data.map((item) => item.revenue)),
    };
  };

  const stats = getRevenueStats();

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-bricolage text-absoluteDark mb-2">
          Revenue Insights
        </h1>

        <p className="text-sm text-muted-foreground">
          Track your earnings and analyze revenue trends across properties.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7Days">Last 7 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[280px] justify-start text-left font-normal ${
                  !dateRange && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button className="text-white bg-primaryGreen hover:bg-brightGreen rounded-3xl">
          <Download className="mr-2 h-4 w-4" />
          Export Revenue Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{stats.total.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Daily Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0</div>
            {/* <div className="text-2xl font-bold">₹{stats.average.toLocaleString(undefined, {maximumFractionDigits: 0})}</div> */}
            <p className="text-xs text-muted-foreground">No records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Highest Daily Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{0}</div>
            {/* <div className="text-2xl font-bold">₹{stats.highest.toLocaleString()}</div> */}
            <p className="text-xs text-muted-foreground">No records</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData[timePeriod]}>
                <XAxis dataKey={timePeriod === "today" ? "hour" : "date"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2ecc71" />{" "}
                {/* Updated to use a shade of green */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Share by Property</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyRevenueShare}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {propertyRevenueShare.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={GREEN_COLORS[index % GREEN_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.property}</TableCell>
                  <TableCell>{booking.guest}</TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "Completed" ? "default" : "secondary"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenuePage;
