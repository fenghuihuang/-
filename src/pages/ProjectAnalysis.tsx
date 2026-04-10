import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCcw, 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon,
  Table as TableIcon,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileSpreadsheet,
  Image as ImageIcon,
  ArrowUpDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// --- Mock Data ---

const INDICATORS = [
  { label: '项目总数', value: '1,284', unit: '个', trend: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '总投资额', value: '458.2', unit: '亿元', trend: '+8.5%', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '年度计划投资', value: '86.5', unit: '亿元', trend: '+5.2%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: '资金到位率', value: '78.4', unit: '%', trend: '+2.1%', color: 'text-amber-600', bg: 'bg-amber-50' },
];

const FUND_TYPE_DATA = [
  { name: '中央预算内', value: 120, amount: 45.2 },
  { name: '专项债券', value: 190, amount: 112.5 },
  { name: '超长期国债', value: 80, amount: 65.8 },
  { name: '社会资本', value: 45, amount: 156.2 },
  { name: '本级财政', value: 30, amount: 78.5 },
];

const DOMAIN_DATA = [
  { name: '基础设施', value: 450, investment: 1200 },
  { name: '生态环保', value: 320, investment: 850 },
  { name: '社会事业', value: 280, investment: 620 },
  { name: '产业发展', value: 560, investment: 1560 },
  { name: '能源交通', value: 190, investment: 980 },
];

const TREND_DATA = [
  { year: '2020', count: 800, investment: 300 },
  { year: '2021', count: 950, investment: 350 },
  { year: '2022', count: 1100, investment: 420 },
  { year: '2023', count: 1200, investment: 480 },
  { year: '2024', count: 1284, investment: 560 },
];

const STATUS_DATA = [
  { name: '谋划库', value: 300 },
  { name: '储备库', value: 250 },
  { name: '申报库', value: 150 },
  { name: '实施库', value: 200 },
  { name: '在建库', value: 384 },
];

const UNIT_DATA = [
  { name: '县发改局', count: 45, investment: 12.5, rate: 85 },
  { name: '县住建局', count: 32, investment: 8.2, rate: 70 },
  { name: '县交通局', count: 28, investment: 15.1, rate: 92 },
  { name: '县水利局', count: 20, investment: 4.3, rate: 65 },
  { name: '县工信局', count: 15, investment: 3.8, rate: 88 },
];

const DEPT_DATA = [
  { name: '投资科', count: 85, pressure: '高' },
  { name: '农经科', count: 62, pressure: '中' },
  { name: '社发科', count: 48, pressure: '中' },
  { name: '经贸科', count: 36, pressure: '低' },
  { name: '环资科', count: 54, pressure: '中' },
];

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6'];

export default function ProjectAnalysis() {
  const [fundChartType, setFundChartType] = useState<'bar' | 'pie'>('bar');
  const [trendChartType, setTrendChartType] = useState<'line' | 'area'>('line');
  const [isDrillDownOpen, setIsDrillDownOpen] = useState(false);
  const [drillDownTitle, setDrillDownTitle] = useState('');

  const handleDrillDown = (title: string) => {
    setDrillDownTitle(title);
    setIsDrillDownOpen(true);
  };

  const exportData = (type: string) => {
    toast.success(`正在导出 ${type} 数据为 Excel...`);
  };

  const exportImage = (type: string) => {
    toast.success(`正在将 ${type} 统计图导出为图片...`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* 2. Core Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INDICATORS.map((item, idx) => (
          <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", item.bg)}>
                <BarChart3 className={cn("h-6 w-6", item.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{item.value}</span>
                  <span className="text-xs text-muted-foreground">{item.unit}</span>
                  <span className="ml-2 text-xs font-bold text-green-600">{item.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Multi-dimensional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fund Type Chart */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full" />
              按政府资金类型统计
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex bg-muted p-1 rounded-md">
                <Button 
                  variant={fundChartType === 'bar' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="h-7 px-2"
                  onClick={() => setFundChartType('bar')}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant={fundChartType === 'pie' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="h-7 px-2"
                  onClick={() => setFundChartType('pie')}
                >
                  <PieChartIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => exportImage('资金类型')}>
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              {fundChartType === 'bar' ? (
                <BarChart data={FUND_TYPE_DATA} onClick={() => handleDrillDown('资金类型明细')}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="value" name="项目数量" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              ) : (
                <PieChart onClick={() => handleDrillDown('资金类型明细')}>
                  <Pie
                    data={FUND_TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {FUND_TYPE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Domain Chart (Horizontal) */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full" />
              按申报领域统计
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => exportData('申报领域')}>
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DOMAIN_DATA} layout="horizontal" onClick={() => handleDrillDown('领域项目明细')}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="investment" name="投资额(亿)" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              年度趋势统计 (近五年)
            </CardTitle>
            <div className="flex bg-muted p-1 rounded-md">
              <Button 
                variant={trendChartType === 'line' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="h-7 px-2"
                onClick={() => setTrendChartType('line')}
              >
                <LineChartIcon className="h-3.5 w-3.5" />
              </Button>
              <Button 
                variant={trendChartType === 'area' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="h-7 px-2"
                onClick={() => setTrendChartType('area')}
              >
                <BarChart3 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" name="项目数量" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Line yAxisId="right" type="monotone" dataKey="investment" name="投资额(亿)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Chart */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <div className="w-1 h-4 bg-amber-500 rounded-full" />
              按项目状态统计
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                >
                  {STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 4. Unit & Dept Stats Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">责任单位执行情况排名</CardTitle>
            <Button variant="outline" size="sm" onClick={() => exportData('责任单位')}>
              <Download className="mr-2 h-4 w-4" /> 导出排名
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold">单位名称</TableHead>
                  <TableHead className="font-bold text-center">项目数 <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                  <TableHead className="font-bold text-center">总投资(亿) <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                  <TableHead className="font-bold text-center">完成率</TableHead>
                  <TableHead className="font-bold text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {UNIT_DATA.map((unit, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell className="text-center">{unit.count}</TableCell>
                    <TableCell className="text-center text-blue-600 font-bold">{unit.investment}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-24 bg-muted rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: `${unit.rate}%` }} />
                        </div>
                        <span className="text-xs font-bold">{unit.rate}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => handleDrillDown(`${unit.name}项目明细`)}>
                        明细 <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">对口科室监管压力</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {DEPT_DATA.map((dept, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <Badge variant={dept.pressure === '高' ? 'destructive' : dept.pressure === '中' ? 'secondary' : 'outline'}>
                      {dept.pressure}压力
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", dept.pressure === '高' ? 'bg-red-500' : 'bg-blue-500')} 
                        style={{ width: `${(dept.count / 100) * 100}%` }} 
                      />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground w-8">{dept.count}个</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8" onClick={() => handleDrillDown('科室监管明细')}>
              查看完整科室报表
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Drill Down Dialog */}
      <Dialog open={isDrillDownOpen} onOpenChange={setIsDrillDownOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>数据下钻：{drillDownTitle}</DialogTitle>
            <DialogDescription>以下展示该统计维度下的具体项目明细列表</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目名称</TableHead>
                  <TableHead>建设单位</TableHead>
                  <TableHead>总投资(万)</TableHead>
                  <TableHead>当前状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map(i => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">某重点工程建设项目 {i}</TableCell>
                    <TableCell>县发改局</TableCell>
                    <TableCell className="text-blue-600 font-bold">5,000</TableCell>
                    <TableCell><Badge variant="outline">在建</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600">详情</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
