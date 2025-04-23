"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7days")

  // In a real app, you would fetch analytics data based on the selected time range
  const viewsData = getViewsData(timeRange)
  const usersData = getUsersData(timeRange)
  const categoryData = getCategoryData()
  const deviceData = getDeviceData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thống kê</h1>
          <p className="text-muted-foreground">Xem thống kê và phân tích dữ liệu của trang web My Truyện.</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Khoảng thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 ngày qua</SelectItem>
            <SelectItem value="30days">30 ngày qua</SelectItem>
            <SelectItem value="90days">90 ngày qua</SelectItem>
            <SelectItem value="year">1 năm qua</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lượt xem</CardTitle>
            <CardDescription>Số lượt xem truyện theo thời gian.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={viewsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Người dùng mới</CardTitle>
            <CardDescription>Số lượng người dùng đăng ký mới theo thời gian.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={usersData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Thể loại phổ biến</TabsTrigger>
          <TabsTrigger value="devices">Thiết bị truy cập</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Thể loại phổ biến</CardTitle>
              <CardDescription>Phân bố lượt xem theo thể loại truyện.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Thiết bị truy cập</CardTitle>
              <CardDescription>Phân bố người dùng theo thiết bị truy cập.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions and sample data
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function getViewsData(timeRange) {
  // Sample data - in a real app, this would come from your analytics service
  const data = {
    "7days": [
      { date: "01/05", views: 4000 },
      { date: "02/05", views: 3000 },
      { date: "03/05", views: 2000 },
      { date: "04/05", views: 2780 },
      { date: "05/05", views: 1890 },
      { date: "06/05", views: 2390 },
      { date: "07/05", views: 3490 },
    ],
    "30days": Array.from({ length: 30 }, (_, i) => ({
      date: `${i + 1}/05`,
      views: Math.floor(Math.random() * 5000) + 1000,
    })),
    "90days": Array.from({ length: 12 }, (_, i) => ({
      date: `Tuần ${i + 1}`,
      views: Math.floor(Math.random() * 20000) + 5000,
    })),
    year: Array.from({ length: 12 }, (_, i) => {
      const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]
      return {
        date: months[i],
        views: Math.floor(Math.random() * 100000) + 20000,
      }
    }),
  }

  return data[timeRange]
}

function getUsersData(timeRange) {
  // Sample data - in a real app, this would come from your analytics service
  const data = {
    "7days": [
      { date: "01/05", users: 40 },
      { date: "02/05", users: 30 },
      { date: "03/05", users: 20 },
      { date: "04/05", users: 27 },
      { date: "05/05", users: 18 },
      { date: "06/05", users: 23 },
      { date: "07/05", users: 34 },
    ],
    "30days": Array.from({ length: 30 }, (_, i) => ({
      date: `${i + 1}/05`,
      users: Math.floor(Math.random() * 50) + 10,
    })),
    "90days": Array.from({ length: 12 }, (_, i) => ({
      date: `Tuần ${i + 1}`,
      users: Math.floor(Math.random() * 200) + 50,
    })),
    year: Array.from({ length: 12 }, (_, i) => {
      const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]
      return {
        date: months[i],
        users: Math.floor(Math.random() * 1000) + 200,
      }
    }),
  }

  return data[timeRange]
}

function getCategoryData() {
  return [
    { name: "Tiên Hiệp", value: 35 },
    { name: "Kiếm Hiệp", value: 20 },
    { name: "Ngôn Tình", value: 15 },
    { name: "Đô Thị", value: 10 },
    { name: "Huyền Huyễn", value: 12 },
    { name: "Khác", value: 8 },
  ]
}

function getDeviceData() {
  return [
    { name: "Di động", value: 65 },
    { name: "Máy tính", value: 25 },
    { name: "Máy tính bảng", value: 10 },
  ]
}
