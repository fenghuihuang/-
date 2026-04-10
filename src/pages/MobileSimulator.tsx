import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Library, 
  ClipboardCheck, 
  Bell, 
  BarChart3, 
  Search, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  ArrowLeft,
  Share2,
  Edit3,
  History,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Send,
  User,
  Scan,
  Plus,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// --- Mock Data ---

const PROJECTS = [
  { id: 1, name: '城区智慧停车系统(二期)', type: '专项债券', investment: '1.2亿', status: '实施中', statusColor: 'bg-blue-500', library: 'implementation' },
  { id: 2, name: 'XX县产业园基础设施建设', type: '中央预算内', investment: '4.5亿', status: '在建', statusColor: 'bg-green-500', library: 'construction' },
  { id: 3, name: 'XX镇水利枢纽加固工程', type: '超长期国债', investment: '0.8亿', status: '待审批', statusColor: 'bg-blue-500', library: 'planning' },
  { id: 4, name: '县中医院综合大楼', type: '本级财政', investment: '2.1亿', status: '储备中', statusColor: 'bg-purple-500', library: 'reserve' },
];

const TASK_LIST = [
  { id: 1, docNo: '发改投资〔2026〕102号', year: '2026', date: '2026-04-01' },
  { id: 2, docNo: '发改投资〔2026〕085号', year: '2026', date: '2026-03-15' },
  { id: 3, docNo: '发改投资〔2025〕210号', year: '2025', date: '2025-12-20' },
];

const NOTIFICATIONS = [
  { id: 1, title: '审批通过通知', content: '您申报的“XX镇水利枢纽”已通过初审。', time: '10:30', unread: true },
  { id: 2, title: '系统维护公告', content: '系统将于今晚22:00进行例行维护。', time: '昨天', unread: false },
];

const WARNINGS = [
  { id: 1, project: '城区智慧停车系统', type: '进度滞后预警', time: '09:00', level: 'high' },
  { id: 2, project: 'XX县产业园项目', type: '填报超时提醒', time: '昨天', level: 'medium' },
];

const DISTRIBUTION_DATA = [
  { name: '谋划库', value: 45 },
  { name: '储备库', value: 52 },
  { name: '申报库', value: 38 },
  { name: '实施库', value: 65 },
  { name: '在建库', value: 48 },
];

const TREND_DATA = [
  { month: '1月', actual: 110 },
  { month: '2月', actual: 135 },
  { month: '3月', actual: 190 },
  { month: '4月', actual: 260 },
  { month: '5月', actual: 310 },
  { month: '6月', actual: 385 },
];

const COLORS = ['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

// --- Components ---

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-[375px] h-[760px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
    {/* Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-[70]" />
    
    {/* Screen Content */}
    <div className="h-full bg-slate-50 flex flex-col overflow-hidden relative">
      {children}
    </div>
  </div>
);

export default function MobileSimulator() {
  const [activeTab, setActiveTab] = useState('workbench');
  const [projectLibraryTab, setProjectLibraryTab] = useState('planning');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [notificationTab, setNotificationTab] = useState('notice');
  const [reportingPeriod, setReportingPeriod] = useState('2026年4月第1周');
  const [isDrillDownOpen, setIsDrillDownOpen] = useState(false);
  const [drillDownTitle, setDrillDownTitle] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowDetail(false);
    setShowPdf(false);
  };

  const handleDrillDown = (title: string) => {
    setDrillDownTitle(title);
    setIsDrillDownOpen(true);
  };

  const renderWorkbench = () => (
    <div className="flex-1 overflow-auto bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 pt-10 text-white rounded-b-[2rem] shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center overflow-hidden">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">张三</h3>
            <p className="text-xs opacity-80">项目申报员 · 投资科</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <Scan className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-center border border-white/10" onClick={() => handleTabChange('notice')}>
            <p className="text-xl font-bold">12</p>
            <p className="text-[10px] opacity-80">待审批</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-center border border-white/10" onClick={() => handleTabChange('reporting')}>
            <p className="text-xl font-bold">5</p>
            <p className="text-[10px] opacity-80">待填报</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-center border border-white/10" onClick={() => handleTabChange('notice')}>
            <p className="text-xl font-bold">8</p>
            <p className="text-[10px] opacity-80">待审核</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-4 gap-4 border border-slate-100">
          {[
            { label: '谋划新增', icon: Plus, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '进度填报', icon: ClipboardCheck, color: 'text-blue-500', bg: 'bg-blue-50', tab: 'reporting' },
            { label: '扫码查看', icon: Scan, color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: '更多', icon: MoreHorizontal, color: 'text-slate-500', bg: 'bg-slate-50' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2" onClick={() => item.tab && handleTabChange(item.tab)}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bg)}>
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
              <span className="text-[10px] font-medium text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Views */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-800">最近浏览</h4>
          <Button variant="ghost" size="sm" className="text-xs text-slate-400">全部</Button>
        </div>
        <div className="space-y-3">
          {PROJECTS.slice(0, 3).map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-transform" onClick={() => { setSelectedProject(p); setShowDetail(true); setActiveTab('library'); }}>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">{p.name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-normal py-0">{p.type}</Badge>
                  <span className="text-[10px] text-slate-400">投资: {p.investment}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectLibrary = () => (
    <div className="flex-1 flex flex-col bg-slate-50 pb-20 overflow-hidden">
      {/* Search & Filter */}
      <div className="bg-white p-4 pt-10 space-y-4 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input className="pl-9 bg-slate-100 border-none rounded-full h-10 text-sm" placeholder="搜索项目名称..." />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="bg-slate-100 rounded-full h-10 w-10">
                <Filter className="h-4 w-4 text-slate-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[2rem] h-[70%]">
              <SheetHeader>
                <SheetTitle>高级筛选</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <Label>政府资金类型</Label>
                  <div className="flex flex-wrap gap-2">
                    {['全部', '中央预算内', '专项债券', '社会资本'].map(t => (
                      <Badge key={t} variant={t === '全部' ? 'default' : 'outline'} className="px-4 py-1 rounded-full">{t}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>对口科室</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="选择科室" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">投资科</SelectItem>
                      <SelectItem value="2">农经科</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter className="flex-row gap-3">
                <SheetClose asChild><Button variant="outline" className="flex-1 rounded-full">重置</Button></SheetClose>
                <SheetClose asChild><Button className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700">确定</Button></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Sub Tabs */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar border-b border-slate-100 pb-2">
          {[
            { id: 'planning', label: '谋划库' },
            { id: 'reserve', label: '储备库' },
            { id: 'declaration', label: '申报库' },
            { id: 'implementation', label: '实施库' },
            { id: 'tasks', label: '任务清单' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setProjectLibraryTab(tab.id)}
              className={cn(
                "text-sm font-medium whitespace-nowrap pb-2 relative transition-colors",
                projectLibraryTab === tab.id ? "text-blue-600" : "text-slate-400"
              )}
            >
              {tab.label}
              {projectLibraryTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {projectLibraryTab === 'tasks' ? (
          TASK_LIST.map(task => (
            <div 
              key={task.id} 
              onClick={() => { setSelectedDoc(task); setShowPdf(true); }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-2 active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">{task.docNo}</span>
                <Badge variant="secondary" className="text-[10px]">{task.year}年</Badge>
              </div>
              <p className="text-[10px] text-slate-400">发布时间: {task.date}</p>
            </div>
          ))
        ) : (
          PROJECTS.map(p => (
            <div 
              key={p.id} 
              onClick={() => { setSelectedProject(p); setShowDetail(true); }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3 active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-bold text-slate-800 flex-1 pr-4">{p.name}</h5>
                <div className="flex items-center gap-1.5">
                  <div className={cn("w-1.5 h-1.5 rounded-full", p.statusColor)} />
                  <span className="text-[10px] font-medium text-slate-500">{p.status}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] font-normal border-none">
                  {p.type}
                </Badge>
                <span className="text-xs font-bold text-blue-600">投资: {p.investment}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Page Overlay */}
      {showDetail && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-4 pt-10 flex items-center gap-4 border-b border-slate-100">
            <Button variant="ghost" size="icon" onClick={() => setShowDetail(false)} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h4 className="font-bold text-slate-800">项目详情</h4>
            <Button variant="ghost" size="icon" className="ml-auto rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-6 space-y-8">
            <div className="space-y-2">
              <Badge className={cn("mb-2", selectedProject.statusColor)}>{selectedProject.status}</Badge>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">{selectedProject.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { label: '政府资金类型', value: selectedProject.type },
                { label: '总投资额', value: selectedProject.investment },
                { label: '建设性质', value: '新建' },
                { label: '所属库', value: '实施库' },
                { label: '责任单位', value: '县发改局' },
                { label: '项目简介', value: '该项目旨在提升城区停车效率，通过智能化手段解决停车难问题。' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-slate-800 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-slate-100 flex gap-3 bg-white">
            <Button variant="outline" className="flex-1 rounded-full" onClick={() => setShowDetail(false)}>返回</Button>
            <Button className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700">
              <Edit3 className="mr-2 h-4 w-4" /> 编辑项目
            </Button>
          </div>
        </div>
      )}

      {/* PDF Preview Overlay */}
      {showPdf && (
        <div className="absolute inset-0 bg-slate-900 z-[100] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="p-4 pt-10 flex items-center justify-between text-white border-b border-white/10">
            <Button variant="ghost" size="icon" onClick={() => setShowPdf(false)} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-bold truncate px-4">{selectedDoc?.docNo}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Maximize2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 flex flex-col items-center gap-4 bg-slate-800">
            <div className="w-full aspect-[1/1.414] bg-white shadow-2xl rounded-sm p-8 space-y-6">
              <div className="h-4 w-3/4 bg-slate-100 rounded mx-auto" />
              <div className="h-4 w-1/2 bg-slate-100 rounded mx-auto" />
              <div className="space-y-3 pt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="h-2 bg-slate-50 rounded" style={{ width: `${Math.random() * 40 + 60}%` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-900/80 backdrop-blur-md flex justify-center gap-8 text-white/60 text-xs">
            <span>第 1 / 2 页</span>
            <span>100%</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderProgressReporting = () => (
    <div className="flex-1 flex flex-col bg-slate-50 pb-20 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 pt-10 shadow-sm z-10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-800">进度填报</h4>
          <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
            <History className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-6 bg-slate-100 rounded-2xl p-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-bold text-slate-700">{reportingPeriod}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 font-bold uppercase">当前填报项目</p>
              <h5 className="font-bold text-slate-800">XX县产业园基础设施建设</h5>
              <p className="text-[10px] text-slate-400">文号: 发改投资〔2026〕102号</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="space-y-1">
                <p className="text-[10px] text-blue-400 font-bold">本年计划投资</p>
                <p className="text-sm font-bold text-blue-700">5,000 万元</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-blue-400 font-bold">累计已完成</p>
                <p className="text-sm font-bold text-blue-700">1,250 万元</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">本周完成投资 (万元) *</Label>
                <Input type="number" placeholder="请输入本周完成额" className="rounded-xl bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">项目当前进展 *</Label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="描述本周施工内容、形象进度等..."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">存在问题</Label>
                <textarea 
                  className="w-full min-h-[80px] p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="如有困难或阻碍请说明..."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">现场照片</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-200 transition-colors">
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-[8px]">上传照片</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 bg-white flex gap-3">
        <Button variant="outline" className="flex-1 rounded-full h-12">暂存</Button>
        <Button 
          className="flex-1 rounded-full h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
          onClick={() => toast.success('进度已提交，待审核')}
        >
          提交填报
        </Button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="flex-1 flex flex-col bg-slate-50 pb-20 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 pt-10 shadow-sm z-10">
        <h4 className="font-bold text-slate-800 mb-4">消息中心</h4>
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setNotificationTab('notice')}
            className={cn(
              "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
              notificationTab === 'notice' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
            )}
          >
            通知公告
          </button>
          <button 
            onClick={() => setNotificationTab('warning')}
            className={cn(
              "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
              notificationTab === 'warning' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
            )}
          >
            预警提醒
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {notificationTab === 'notice' ? (
          NOTIFICATIONS.map(n => (
            <div key={n.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative">
              {n.unread && <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full" />}
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-sm font-bold text-slate-800">{n.title}</h5>
                <span className="text-[10px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{n.content}</p>
            </div>
          ))
        ) : (
          WARNINGS.map(w => (
            <div key={w.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-1.5 rounded-lg",
                    w.level === 'high' ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-600"
                  )}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{w.type}</h5>
                    <p className="text-[10px] text-slate-400">{w.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400" onClick={() => toast.success('提醒已发送至责任人')}>
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-600 font-medium">{w.project}</p>
              </div>
              <Button variant="outline" className="w-full rounded-xl h-10 text-xs text-blue-600 border-blue-100 hover:bg-blue-50">
                去处理
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCockpit = () => (
    <div className="flex-1 flex flex-col bg-slate-900 pb-20 overflow-hidden text-white">
      {/* Header */}
      <div className="p-6 pt-10 border-b border-white/5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-lg tracking-tight">领导驾驶舱</h4>
          <Badge variant="outline" className="text-[10px] border-white/20 text-white/60">数据更新: 今日 08:00</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '项目总数', value: '248', unit: '个', color: 'text-blue-400' },
            { label: '总投资', value: '1,280.6', unit: '亿', color: 'text-blue-400' },
            { label: '年度计划', value: '356.2', unit: '亿', color: 'text-emerald-400' },
            { label: '已完成投资', value: '187.5', unit: '亿', color: 'text-amber-400' },
            { label: '整体开工率', value: '76.4', unit: '%', color: 'text-purple-400' },
            { label: '资金到位率', value: '68.2', unit: '%', color: 'text-pink-400' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl" onClick={() => handleDrillDown(kpi.label)}>
              <p className="text-[10px] text-white/40 font-medium mb-1">{kpi.label}</p>
              <div className="flex items-baseline gap-1">
                <span className={cn("text-lg font-bold font-mono", kpi.color)}>{kpi.value}</span>
                <span className="text-[8px] text-white/20">{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="space-y-4">
          <Card className="bg-white/5 border-white/10 text-white rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <h5 className="text-xs font-bold text-white/60">各库项目占比</h5>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DISTRIBUTION_DATA}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {DISTRIBUTION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <h5 className="text-xs font-bold text-white/60">近6个月投资趋势</h5>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREND_DATA}>
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drill Down Dialog */}
      <Dialog open={isDrillDownOpen} onOpenChange={setIsDrillDownOpen}>
        <DialogContent className="sm:max-w-[100%] h-[60%] top-auto bottom-0 translate-y-0 rounded-t-[2rem] bg-slate-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">数据下钻: {drillDownTitle}</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto py-4">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold">某重点工程建设项目 {i}</p>
                    <p className="text-[10px] text-white/40">责任单位: 县发改局</p>
                  </div>
                  <p className="text-sm font-bold text-blue-400">5,000万</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'workbench': return renderWorkbench();
      case 'library': return renderProjectLibrary();
      case 'reporting': return renderProgressReporting();
      case 'notice': return renderNotifications();
      case 'cockpit': return renderCockpit();
      default: return renderWorkbench();
    }
  };

  return (
    <PhoneFrame>
      {/* Status Bar Simulation */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-10 flex items-end justify-between px-8 pb-1 z-[60] text-[11px] font-bold",
        activeTab === 'cockpit' ? "text-white" : "text-slate-900"
      )}>
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-2.5 border border-current rounded-sm relative">
            <div className="absolute top-0.5 left-0.5 bottom-0.5 right-1 bg-current rounded-sm" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex items-center justify-around px-2 pb-4 z-[60]">
        {[
          { id: 'workbench', label: '工作台', icon: LayoutDashboard },
          { id: 'library', label: '项目库', icon: Library },
          { id: 'reporting', label: '进度填报', icon: ClipboardCheck },
          { id: 'notice', label: '通知', icon: Bell, badge: 2 },
          { id: 'cockpit', label: '驾驶舱', icon: BarChart3 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 relative transition-all",
              activeTab === tab.id ? "text-blue-600 scale-110" : "text-slate-400"
            )}
          >
            <div className="relative">
              <tab.icon className="h-5 w-5" />
              {tab.badge && (
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full border border-white">
                  {tab.badge}
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </PhoneFrame>
  );
}
