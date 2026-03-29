import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

// ---- Data ----
const areaData = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 5000, users: 9800 },
  { month: 'Apr', revenue: 4780, users: 3908 },
  { month: 'May', revenue: 5890, users: 4800 },
  { month: 'Jun', revenue: 4390, users: 3800 },
  { month: 'Jul', revenue: 6490, users: 4300 },
  { month: 'Aug', revenue: 7200, users: 5100 },
];

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Email', value: 200 },
  { name: 'Other', value: 100 },
];
const PIE_COLORS = ['#C62828', '#EF5350', '#FFCDD2', '#8E0000'];

const barData = [
  { day: 'Mon', sales: 120 },
  { day: 'Tue', sales: 180 },
  { day: 'Wed', sales: 150 },
  { day: 'Thu', sales: 210 },
  { day: 'Fri', sales: 290 },
  { day: 'Sat', sales: 340 },
  { day: 'Sun', sales: 190 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Alice Johnson', product: 'MacBook Pro', amount: '$1,299', status: 'Completed' },
  { id: '#ORD-002', customer: 'Bob Smith', product: 'iPhone 15', amount: '$899', status: 'Pending' },
  { id: '#ORD-003', customer: 'Carol White', product: 'AirPods Pro', amount: '$249', status: 'Processing' },
  { id: '#ORD-004', customer: 'David Lee', product: 'iPad Air', amount: '$599', status: 'Completed' },
  { id: '#ORD-005', customer: 'Eva Brown', product: 'Apple Watch', amount: '$399', status: 'Cancelled' },
];

const topCountries = [
  { name: 'United States', sales: 85 },
  { name: 'Germany', sales: 70 },
  { name: 'India', sales: 60 },
  { name: 'United Kingdom', sales: 55 },
  { name: 'Canada', sales: 45 },
];

// ---- Stat Card ----
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive, icon, color }) => (
  <Card>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar sx={{ bgcolor: color, width: 52, height: 52, borderRadius: 2 }}>
        {icon}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>{title}</Typography>
        <Typography variant="h5" fontWeight={700} sx={{ my: 0.25 }}>{value}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {positive ? (
            <ArrowUpIcon sx={{ fontSize: 14, color: '#2e7d32' }} />
          ) : (
            <ArrowDownIcon sx={{ fontSize: 14, color: '#c62828' }} />
          )}
          <Typography variant="caption" sx={{ color: positive ? '#2e7d32' : '#c62828', fontWeight: 600 }}>
            {change}
          </Typography>
          <Typography variant="caption" color="text.secondary">vs last month</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// ---- Order Status Badge ----
const statusColor: Record<string, 'success' | 'warning' | 'info' | 'error' | 'default'> = {
  Completed: 'success',
  Pending: 'warning',
  Processing: 'info',
  Cancelled: 'error',
};

// ---- Dashboard Page ----
const DashboardPage: React.FC = () => {
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={3}>
        {[
          { title: 'Total Users', value: '24,521', change: '12.5%', positive: true, icon: <PeopleIcon />, color: '#C62828' },
          { title: 'Total Orders', value: '8,749', change: '8.2%', positive: true, icon: <ShoppingCartIcon />, color: '#1565C0' },
          { title: 'Total Revenue', value: '$128,430', change: '18.3%', positive: true, icon: <MoneyIcon />, color: '#2e7d32' },
          { title: 'Create Request', value: '14.6%', change: '2.1%', positive: false, icon: <TrendingUpIcon />, color: '#F57C00' },
          { title: 'Create Bulk Request', value: '14.6%', change: '2.1%', positive: false, icon: <TrendingUpIcon />, color: '#F57C00' },
        ].map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 4, xl: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} mb={3}>
        {/* Revenue Area Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Revenue & Users</Typography>
                  <Typography variant="body2" color="text.secondary">Monthly performance</Typography>
                </Box>
                <Tooltip title="More options"><IconButton size="small"><MoreVertIcon /></IconButton></Tooltip>
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C62828" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#C62828" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1565C0" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1565C0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RechartTooltip />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#C62828" fill="url(#colorRevenue)" strokeWidth={2} />
                  <Area type="monotone" dataKey="users" stroke="#1565C0" fill="url(#colorUsers)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Traffic Pie Chart */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Traffic Sources</Typography>
                  <Typography variant="body2" color="text.secondary">Current month</Typography>
                </Box>
                <Tooltip title="More options"><IconButton size="small"><MoreVertIcon /></IconButton></Tooltip>
              </Box>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3}>
        {/* Recent Orders Table */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Recent Orders</Typography>
                  <Typography variant="body2" color="text.secondary">Latest 5 orders</Typography>
                </Box>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { fontWeight: 700, fontSize: 12, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'divider' } }}>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{row.customer}</TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{row.product}</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>{row.amount}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={statusColor[row.status]}
                            size="small"
                            sx={{ fontWeight: 600, fontSize: 11 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            {/* Sales Bar Chart */}
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={0.5}>Daily Sales</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>This week</Typography>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <RechartTooltip />
                      <Bar dataKey="sales" fill="#C62828" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Countries */}
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={0.5}>Top Countries</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>By sales volume</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {topCountries.map((country) => (
                      <Box key={country.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" fontWeight={500}>{country.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{country.sales}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={country.sales}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: '#ffebee',
                            '& .MuiLinearProgress-bar': { bgcolor: '#C62828', borderRadius: 3 },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
