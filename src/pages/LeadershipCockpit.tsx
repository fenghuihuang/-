import React, { useState, useEffect } from 'react';
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
  AreaChart,
  Area,
  ComposedChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Maximize2, 
  Minimize2, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Send,
  Map as MapIcon,
  ChevronRight,
  ExternalLink,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// --- Mock Data ---

const KPI_DATA = [
  { label: '项目总数', value: '248', unit: '个', trend: '+12%', isUp: true },
  { label: '总投资', value: '1,280.6', unit: '亿元', trend: '+8.3%', isUp: true },
  { label: '年度计划投资', value: '356.2', unit: '亿元', trend: null },
  { label: '年度完成投资', value: '187.5', unit: '亿元', trend: null },
  { label: '整体开工率', value: '76.4', unit: '%', trend: null },
  { label: '资金到位率', value: '68.2', unit: '%', trend: null },
];

const DISTRIBUTION_DATA = [
  { name: '谋划库', value: 45 },
  { name: '储备库', value: 52 },
  { name: '申报库', value: 38 },
  { name: '实施库', value: 65 },
  { name: '在建库', value: 48 },
];

const TREND_DATA = [
  { month: '1月', plan: 120, actual: 110 },
  { month: '2月', plan: 150, actual: 135 },
  { month: '3月', plan: 200, actual: 190 },
  { month: '4月', plan: 280, actual: 260 },
  { month: '5月', plan: 320, actual: 310 },
  { month: '6月', plan: 400, actual: 385 },
  { month: '7月', plan: 380, actual: 370 },
  { month: '8月', plan: 350, actual: 340 },
  { month: '9月', plan: 420, actual: 410 },
  { month: '10月', plan: 450, actual: 440 },
  { month: '11月', plan: 480, actual: 475 },
  { month: '12月', plan: 500, actual: 495 },
];

const FUND_TYPE_DATA = [
  { name: '中央预算内', value: 450 },
  { name: '专项债券', value: 380 },
  { name: '超长期国债', value: 220 },
  { name: '本级财政', value: 150 },
  { name: '社会资本', value: 80 },
];

const WARNING_TOP5 = [
  { name: 'XX县产业园基础设施建设项目', unit: '县发改局', days: 15, status: 'red' },
  { name: 'XX镇水利枢纽加固工程', unit: '县水利局', days: 12, status: 'red' },
  { name: '城区智慧停车系统(二期)', unit: '县住建局', days: 8, status: 'blue' },
  { name: 'XX乡中心小学扩建项目', unit: '县教育局', days: 5, status: 'blue' },
  { name: '县中医院综合大楼建设项目', unit: '县卫健局', days: 3, status: 'green' },
];

const PENDING_TASKS = [
  { label: '待审批谋划项目', count: 12, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '待审核储备项目', count: 8, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '待推送项目数量', count: 15, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#10b981', '#f59e0b'];

export default function LeadershipCockpit() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDrillDownOpen, setIsDrillDownOpen] = useState(false);
  const [drillDownTitle, setDrillDownTitle] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const handleDrillDown = (title: string) => {
    setDrillDownTitle(title);
    setIsDrillDownOpen(true);
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 -m-6 animate-in fade-in duration-1000",
      isFullScreen && "fixed inset-0 z-50 overflow-auto m-0"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 bg-blue-600 rounded-full" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            政府投资项目全生命周期监测驾驶舱
          </h1>
        </div>
        <div className="flex items-center gap-6 text-slate-600">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Clock className="h-4 w-4" />
            <span>{currentTime.toLocaleString()}</span>
          </div>
          <div className="h-4 w-px bg-slate-300" />
          <div className="text-xs">
            数据更新时间：{new Date().toLocaleDateString()} 08:00
          </div>
          <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hover:bg-slate-200">
            {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {KPI_DATA.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-slate-500 mb-1">{kpi.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-slate-900">{kpi.value}</span>
                <span className="text-[10px] text-slate-400">{kpi.unit}</span>
              </div>
              {kpi.trend && (
                <div className={cn(
                  "flex items-center gap-1 mt-1 text-[10px] font-bold",
                  kpi.isUp ? "text-emerald-600" : "text-rose-600"
                )}>
                  {kpi.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.trend}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2: Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Project Distribution Donut */}
        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">各库项目分布</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={() => handleDrillDown('各库项目明细')}>
                <Pie
                  data={DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-[10px] text-slate-400">项目总数</p>
              <p className="text-xl font-bold font-mono">248</p>
            </div>
          </CardContent>
        </Card>

        {/* Investment Trend Area Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">近12个月投资完成趋势</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '10px', top: -10 }} />
                <Area type="monotone" dataKey="plan" name="计划投资" stroke="#94a3b8" fillOpacity={1} fill="url(#colorPlan)" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" name="实际完成" stroke="#2563eb" fillOpacity={1} fill="url(#colorActual)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fund Type Pie Chart */}
        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">政府资金类型构成</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={FUND_TYPE_DATA}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                >
                  {FUND_TYPE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Warning & Pending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Warning TOP 5 */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-500" />
              进度预警 TOP 5
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-slate-500">查看全部</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {WARNING_TOP5.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      item.status === 'red' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" :
                      item.status === 'blue' ? "bg-blue-500" : "bg-emerald-500"
                    )} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-500">{item.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs font-bold text-rose-600">滞后 {item.days} 天</p>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
                      督办
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approval Reminders */}
        <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-600" />
              待审批事项提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {PENDING_TASKS.map((task, i) => (
              <div key={i} className={cn("p-4 rounded-xl flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity", task.bg)}>
                <span className="text-sm font-medium text-slate-700">{task.label}</span>
                <div className="flex items-center gap-2">
                  <span className={cn("text-2xl font-bold font-mono", task.color)}>{task.count}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 border border-dashed border-slate-300 rounded-xl text-center">
              <p className="text-xs text-slate-400">暂无紧急待办事项</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Map Placeholder */}
      <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <MapIcon className="h-4 w-4 text-blue-500" />
            区域项目分布热力图
          </CardTitle>
          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-100" /> 低</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-300" /> 中</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> 高</div>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] p-0 relative bg-slate-200/30 flex items-center justify-center">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/china-map/1600/900')] bg-cover grayscale pointer-events-none" />
          
          {/* Simulated Heatmap Points */}
          <div className="relative w-full h-full">
            {[
              { top: '30%', left: '20%', size: 60, opacity: 0.4, label: '城关镇', count: 45 },
              { top: '50%', left: '45%', size: 100, opacity: 0.6, label: '高新区', count: 82 },
              { top: '20%', left: '70%', size: 40, opacity: 0.3, label: '工业园', count: 28 },
              { top: '70%', left: '30%', size: 80, opacity: 0.5, label: '南湖区', count: 56 },
              { top: '60%', left: '80%', size: 50, opacity: 0.4, label: '东部新城', count: 37 },
            ].map((point, i) => (
              <div 
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: point.top, left: point.left }}
                onClick={() => handleDrillDown(`${point.label}项目分布`)}
              >
                <div 
                  className="rounded-full bg-blue-600 animate-pulse"
                  style={{ 
                    width: point.size, 
                    height: point.size, 
                    opacity: point.opacity 
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-slate-200 scale-0 group-hover:scale-100 transition-transform whitespace-nowrap z-10">
                  <p className="text-[10px] font-bold">{point.label}</p>
                  <p className="text-[8px] text-slate-500">项目数: {point.count}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-slate-200 text-[10px] shadow-sm">
            <p className="font-bold mb-1">区域概况</p>
            <p className="text-slate-500">当前热力点：12个</p>
            <p className="text-slate-500">覆盖率：98.5%</p>
          </div>
        </CardContent>
      </Card>

      {/* Drill Down Dialog */}
      <Dialog open={isDrillDownOpen} onOpenChange={setIsDrillDownOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-blue-600" />
              数据下钻：{drillDownTitle}
            </DialogTitle>
            <DialogDescription>展示该维度下的详细项目清单与实时状态</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left p-3 font-bold">项目名称</th>
                    <th className="text-left p-3 font-bold">责任单位</th>
                    <th className="text-left p-3 font-bold">总投资(万)</th>
                    <th className="text-left p-3 font-bold">当前进度</th>
                    <th className="text-right p-3 font-bold">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-medium">某重点工程建设项目 {i}</td>
                      <td className="p-3 text-slate-500">县发改局</td>
                      <td className="p-3 font-bold text-blue-600">5,000</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full" style={{ width: '65%' }} />
                          </div>
                          <span className="text-[10px] font-bold">65%</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" className="text-blue-600 h-7 text-xs">详情</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
