import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  ArrowRightLeft,
  Eye,
  Upload,
  ClipboardList,
  TrendingUp,
  DollarSign,
  FileText,
  Bell,
  Import,
  AlertTriangle,
  History,
  Clock,
  FileSearch,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

// Unified Options
const CONSTRUCTION_NATURES = ['新建', '续建'];
const PROJECT_STATUSES = ['已开工', '未开工', '已完工'];
const YEARS = ['2026', '2025', '2024', '2023'];

// Mock Data for Task List
const MOCK_TASK_DATA = [
  {
    id: 1,
    docNumber: '发改投资〔2026〕102号',
    name: '县城供水管网改造工程',
    nature: '续建',
    totalInvestment: 3500,
    plan2026: 1500,
    completed2026: 800,
    rate: '53.3%',
    annualTask: '完成老城区10公里管网铺设',
    progress: '已完成5公里，正在进行路面开挖',
    problems: '部分路段地下管线复杂，施工进度受限',
    status: '已开工',
    owner: '县水利局',
    coordinationUnit: '县发改局',
    leader: '张副县长',
    responsibleUnit: '县水务公司',
    contact: '13811112222'
  },
  {
    id: 2,
    docNumber: '发改投资〔2026〕085号',
    name: '现代农业产业园基础设施',
    nature: '新建',
    totalInvestment: 8000,
    plan2026: 3000,
    completed2026: 0,
    rate: '0%',
    annualTask: '完成土地平整及灌溉系统招标',
    progress: '正在进行土地平整方案设计',
    problems: '无',
    status: '未开工',
    owner: '县农业农村局',
    coordinationUnit: '县农办',
    leader: '王副县长',
    responsibleUnit: '县农业投资公司',
    contact: '13933334444'
  }
];

export default function ProjectConstruction({ defaultTab = 'taskList' }: { defaultTab?: string }) {
  const [activeSubTab, setActiveSubTab] = useState(defaultTab);
  
  // Sync tab if prop changes
  React.useEffect(() => {
    setActiveSubTab(defaultTab);
  }, [defaultTab]);

  const [viewMode, setViewMode] = useState<'all' | 'mine'>('all');
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBatchAction = (action: string) => {
    if (selectedIds.length === 0) {
      toast.error('请先选择项目');
      return;
    }
    toast.success(`批量${action}成功`);
    setSelectedIds([]);
  };

  const stats = {
    started: 32,
    notStarted: 12,
    completed: 4
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Statistics Cards - Removed as per request */}

      {/* Sub-module Tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
          <TabsTrigger value="taskList">重点项目任务清单</TabsTrigger>
          <TabsTrigger value="progressTable">进度表（在建库管理）</TabsTrigger>
          <TabsTrigger value="midtermTable">中期调出库</TabsTrigger>
        </TabsList>

        <TabsContent value="taskList" className="space-y-6 mt-6">
          {/* Batch Actions for Task List */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="bg-background" onClick={() => handleBatchAction('导出')}>
                <Download className="mr-2 h-4 w-4" /> 批量导出
              </Button>
            </div>
            <Button className="bg-primary hover:bg-primary/90 shadow-md" onClick={() => { setIsEdit(false); setSelectedProject(null); setIsAddEditOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> 新增任务清单
            </Button>
          </div>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 whitespace-nowrap border-none">
                      <TableHead className="font-bold pl-6">文号</TableHead>
                      <TableHead className="font-bold">年份</TableHead>
                      <TableHead className="font-bold">发布时间</TableHead>
                      <TableHead className="font-bold text-right pr-6 sticky right-0 bg-muted/50">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: 1, docNumber: '发改投资〔2026〕102号', year: '2026', date: '2026-01-15' },
                      { id: 2, docNumber: '发改投资〔2026〕085号', year: '2026', date: '2026-02-20' },
                      { id: 3, docNumber: '发改办〔2025〕001号', year: '2025', date: '2025-01-05' },
                    ].map((item) => (
                      <TableRow key={item.id} className="hover:bg-primary/5 transition-colors whitespace-nowrap border-b border-muted/50">
                        <TableCell className="pl-6 text-xs text-muted-foreground">{item.docNumber}</TableCell>
                        <TableCell className="font-semibold text-foreground">{item.year}</TableCell>
                        <TableCell className="text-muted-foreground">{item.date}</TableCell>
                        <TableCell className="text-right pr-6 sticky right-0 bg-background/80 backdrop-blur-sm shadow-[-8px_0_12px_rgba(0,0,0,0.03)]">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" title="预览文件内容" onClick={() => { setSelectedProject(item); setIsPdfPreviewOpen(true); }}>
                              <FileSearch className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" title="删除">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progressTable" className="space-y-6 mt-6">
          {/* Beautified Search & Filters */}
          <Card className="border-none shadow-sm bg-muted/30">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Filter className="h-4 w-4" />
                    <span>高级筛选查询</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <History className="mr-2 h-4 w-4" /> 历史查询记录
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">年份</Label>
                    <Select defaultValue="2026">
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="选择年份" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">文号</Label>
                    <Input placeholder="输入文号检索" className="bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">时间维度</Label>
                    <Input type="month" defaultValue="2026-04" className="bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">项目名称</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="搜索关键字..." className="pl-9 bg-background" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">建设性质</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="全部性质" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONSTRUCTION_NATURES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">项目状态</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="全部状态" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROJECT_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">业主单位</Label>
                    <Input placeholder="输入业主单位" className="bg-background" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> 正常推进</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> 进度滞后</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> 严重预警</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="px-8 border-primary/20 text-primary hover:bg-primary/5">
                      重置
                    </Button>
                    <Button className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                      <Search className="mr-2 h-4 w-4" /> 立即查询
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="bg-background" onClick={() => handleBatchAction('导入')}>
                <Import className="mr-2 h-4 w-4" /> 批量导入
              </Button>
              <Button variant="outline" size="sm" className="bg-background" onClick={() => handleBatchAction('导出')}>
                <Download className="mr-2 h-4 w-4" /> 批量导出
              </Button>
              <Button variant="outline" size="sm" className="text-destructive bg-background border-destructive/20 hover:bg-destructive/5" onClick={() => handleBatchAction('删除')}>
                <Trash2 className="mr-2 h-4 w-4" /> 批量删除
              </Button>
              <Button variant="outline" size="sm" className="bg-background" onClick={() => handleBatchAction('提醒')}>
                <Bell className="mr-2 h-4 w-4" /> 批量提醒
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-background">
                <History className="mr-2 h-4 w-4" /> 历史记录
              </Button>
              <Button className="bg-primary hover:bg-primary/90 shadow-md" onClick={() => { setIsEdit(false); setSelectedProject(null); setIsAddEditOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" /> 新增进度填报
              </Button>
            </div>
          </div>

          {/* Data Table (Moved from Task List) */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 whitespace-nowrap border-none">
                      <TableHead className="w-[50px] pl-6"><Checkbox /></TableHead>
                      <TableHead className="font-bold">文号</TableHead>
                      <TableHead className="font-bold">项目名称</TableHead>
                      <TableHead className="font-bold">建设性质</TableHead>
                      <TableHead className="font-bold">总投资(万)</TableHead>
                      <TableHead className="font-bold">2026计划(万)</TableHead>
                      <TableHead className="font-bold">2026已完成(万)</TableHead>
                      <TableHead className="font-bold">投资完成率</TableHead>
                      <TableHead className="font-bold">项目状态</TableHead>
                      <TableHead className="font-bold">业主单位</TableHead>
                      <TableHead className="font-bold text-right pr-6 sticky right-0 bg-muted/50">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_TASK_DATA.map((item) => (
                      <TableRow key={item.id} className="hover:bg-primary/5 transition-colors whitespace-nowrap border-b border-muted/50">
                        <TableCell className="pl-6">
                          <Checkbox 
                            checked={selectedIds.includes(item.id)} 
                            onCheckedChange={() => toggleSelect(item.id)}
                          />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{item.docNumber}</TableCell>
                        <TableCell className="font-semibold text-foreground">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal border-primary/20 text-primary">
                            {item.nature}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-blue-600 font-bold">{item.totalInvestment}</TableCell>
                        <TableCell className="font-medium">{item.plan2026}</TableCell>
                        <TableCell className="text-green-600 font-bold">{item.completed2026}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-muted rounded-full h-2 overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  parseInt(item.rate) > 50 ? "bg-primary" : "bg-blue-500"
                                )} 
                                style={{ width: item.rate }} 
                              />
                            </div>
                            <span className="text-xs font-bold tabular-nums">{item.rate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={cn(
                              "font-medium shadow-none",
                              item.status === '已开工' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                              item.status === '已完工' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                              "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            )}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{item.owner}</TableCell>
                        <TableCell className="text-right pr-6 sticky right-0 bg-background/80 backdrop-blur-sm shadow-[-8px_0_12px_rgba(0,0,0,0.03)]">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" title="预览文件内容" onClick={() => { setSelectedProject(item); setIsPdfPreviewOpen(true); }}>
                              <FileSearch className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" title="导出" onClick={() => toast.success('点击导出成功')}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" title="详情">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10" title="进度填报" onClick={() => { setIsEdit(true); setSelectedProject(item); setIsAddEditOpen(true); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" title="删除">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Progress Warning Monitoring (Moved to bottom of progress table) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-red-200 bg-red-50/50 rounded-xl flex items-start gap-3 transition-all hover:shadow-md">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-red-900">进度严重滞后项目 (2)</p>
                <p className="text-sm text-red-700/80">投资完成率低于计划50%以上，需立即介入调度</p>
              </div>
            </div>
            <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-xl flex items-start gap-3 transition-all hover:shadow-md">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-blue-900">进度轻微滞后项目 (5)</p>
                <p className="text-sm text-blue-700/80">投资完成率低于计划20%-50%，建议加强跟踪</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="midtermTable" className="space-y-6 mt-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center gap-3 text-blue-800">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm font-medium">当前处于“中期调出库”只读查看模式，所有数据仅供查阅，不可进行新增、编辑或删除操作。</p>
          </div>

          {/* Search & Filters (Same as progressTable) */}
          <Card className="border-none shadow-sm bg-muted/30">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Filter className="h-4 w-4" />
                    <span>高级筛选查询</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">年份</Label>
                    <Select defaultValue="2026">
                      <SelectTrigger className="bg-background"><SelectValue placeholder="选择年份" /></SelectTrigger>
                      <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">文号</Label>
                    <Input placeholder="输入文号检索" className="bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">项目名称</Label>
                    <Input placeholder="搜索关键字..." className="bg-background" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">建设性质</Label>
                    <Select>
                      <SelectTrigger className="bg-background"><SelectValue placeholder="全部性质" /></SelectTrigger>
                      <SelectContent>{CONSTRUCTION_NATURES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">项目状态</Label>
                    <Select>
                      <SelectTrigger className="bg-background"><SelectValue placeholder="全部状态" /></SelectTrigger>
                      <SelectContent>{PROJECT_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2 border-t border-primary/5">
                  <div className="flex gap-3">
                    <Button variant="outline" className="px-8 border-primary/20 text-primary hover:bg-primary/5">重置</Button>
                    <Button className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                      <Search className="mr-2 h-4 w-4" /> 立即查询
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Table (Read-only, No Action Column) */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 whitespace-nowrap border-none">
                      <TableHead className="font-bold pl-6">文号</TableHead>
                      <TableHead className="font-bold">项目名称</TableHead>
                      <TableHead className="font-bold">建设性质</TableHead>
                      <TableHead className="font-bold">总投资(万)</TableHead>
                      <TableHead className="font-bold">2026计划(万)</TableHead>
                      <TableHead className="font-bold">2026已完成(万)</TableHead>
                      <TableHead className="font-bold">投资完成率</TableHead>
                      <TableHead className="font-bold">项目状态</TableHead>
                      <TableHead className="font-bold pr-6">业主单位</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_TASK_DATA.map((item) => (
                      <TableRow key={item.id} className="hover:bg-primary/5 transition-colors whitespace-nowrap border-b border-muted/50">
                        <TableCell className="pl-6 text-xs text-muted-foreground">{item.docNumber}</TableCell>
                        <TableCell className="font-semibold text-foreground">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal border-primary/20 text-primary">{item.nature}</Badge>
                        </TableCell>
                        <TableCell className="text-blue-600 font-bold">{item.totalInvestment}</TableCell>
                        <TableCell className="font-medium">{item.plan2026}</TableCell>
                        <TableCell className="text-green-600 font-bold">{item.completed2026}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-muted rounded-full h-2 overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  parseInt(item.rate) > 50 ? "bg-primary" : "bg-blue-500"
                                )} 
                                style={{ width: item.rate }} 
                              />
                            </div>
                            <span className="text-xs font-bold tabular-nums">{item.rate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={cn(
                              "font-medium shadow-none",
                              item.status === '已开工' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                              item.status === '已完工' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                              "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            )}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground pr-6">{item.owner}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{isEdit ? '编辑在建项目任务' : '新增在建项目任务'}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label>文号 *</Label>
                <Input placeholder="输入文号，如：发改投资〔2026〕XXX号" defaultValue={selectedProject?.docNumber} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>项目名称 *</Label>
                <Input placeholder="输入项目名称" defaultValue={selectedProject?.name} />
              </div>
              <div className="space-y-2">
                <Label>建设性质 *</Label>
                <Select defaultValue={selectedProject?.nature}>
                  <SelectTrigger><SelectValue placeholder="选择性质" /></SelectTrigger>
                  <SelectContent>{CONSTRUCTION_NATURES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>项目状态 *</Label>
                <Select defaultValue={selectedProject?.status}>
                  <SelectTrigger><SelectValue placeholder="选择状态" /></SelectTrigger>
                  <SelectContent>{PROJECT_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>总投资 (万元) *</Label>
                <Input type="number" defaultValue={selectedProject?.totalInvestment} />
              </div>
              <div className="space-y-2">
                <Label>2026年投资计划 (万元) *</Label>
                <Input type="number" defaultValue={selectedProject?.plan2026} />
              </div>
              <div className="space-y-2">
                <Label>2026年已完成投资 (万元) *</Label>
                <Input type="number" defaultValue={selectedProject?.completed2026} />
              </div>
              <div className="space-y-2">
                <Label>业主单位</Label>
                <Input defaultValue={selectedProject?.owner} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>年度目标任务 *</Label>
                <Textarea defaultValue={selectedProject?.annualTask} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>项目当前进展及下步计划 *</Label>
                <Textarea defaultValue={selectedProject?.progress} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>存在问题与困难 *</Label>
                <Textarea defaultValue={selectedProject?.problems} />
              </div>
              <div className="space-y-2">
                <Label>责任单位</Label>
                <Input defaultValue={selectedProject?.responsibleUnit} />
              </div>
              <div className="space-y-2">
                <Label>联系人电话</Label>
                <Input defaultValue={selectedProject?.contact} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>任务清单PDF上传 *</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                  <Upload size={24} className="mb-2" />
                  <p className="text-sm font-medium">点击或拖拽上传任务清单PDF文件</p>
                  <p className="text-xs mt-1">支持PDF格式，大小不超过20MB</p>
                </div>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>现场照片上传</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                  <Upload size={24} className="mb-2" />
                  <p className="text-sm">上传现场施工照片、进度报表等</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>取消</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => { toast.success('保存成功'); setIsAddEditOpen(false); }}>保存提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      <Dialog open={isPdfPreviewOpen} onOpenChange={setIsPdfPreviewOpen}>
        <DialogContent className="sm:max-w-[900px] h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileSearch className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-base">任务清单预览 - {selectedProject?.name}</DialogTitle>
                  <DialogDescription className="text-xs">文号：{selectedProject?.docNumber}</DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 mr-8">
                <Button variant="outline" size="icon" className="h-8 w-8"><ZoomOut className="h-4 w-4" /></Button>
                <span className="text-xs font-medium w-12 text-center">100%</span>
                <Button variant="outline" size="icon" className="h-8 w-8"><ZoomIn className="h-4 w-4" /></Button>
                <div className="w-px h-4 bg-border mx-2" />
                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-xs font-medium">1 / 5</span>
                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                <div className="w-px h-4 bg-border mx-2" />
                <Button variant="outline" size="sm" onClick={() => toast.success('正在下载文件...')}>
                  <Download className="mr-2 h-4 w-4" /> 下载
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 bg-muted/50 overflow-auto p-8 flex justify-center">
            {/* Simulated PDF Page */}
            <div className="w-[800px] min-h-[1100px] bg-white shadow-2xl p-12 relative animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-red-600 tracking-[0.2em] border-b-2 border-red-600 pb-4">XX县人民政府文件</h1>
                <p className="text-sm font-medium">{selectedProject?.docNumber}</p>
              </div>
              <div className="mt-12 space-y-6 text-gray-800 leading-relaxed">
                <h2 className="text-xl font-bold text-center">关于下达2026年重点项目任务清单的通知</h2>
                <p className="indent-8">各乡镇人民政府，县政府各部门，各直属机构：</p>
                <p className="indent-8">为加快推进我县经济社会高质量发展，确保年度投资目标顺利完成，经县政府研究决定，现将《2026年重点项目任务清单》下达给你们，请认真贯彻执行。</p>
                <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50/50">
                  <h3 className="font-bold mb-4 border-b pb-2">项目核心指标：</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <p><span className="text-gray-500">项目名称：</span>{selectedProject?.name}</p>
                    <p><span className="text-gray-500">建设性质：</span>{selectedProject?.nature}</p>
                    <p><span className="text-gray-500">总投资：</span>{selectedProject?.totalInvestment} 万元</p>
                    <p><span className="text-gray-500">年度计划：</span>{selectedProject?.plan2026} 万元</p>
                    <p><span className="text-gray-500">责任单位：</span>{selectedProject?.responsibleUnit}</p>
                    <p><span className="text-gray-500">分管领导：</span>{selectedProject?.leader}</p>
                  </div>
                </div>
                <p className="indent-8">各责任单位要严格按照任务清单要求，倒排工期，挂图作战，确保项目按计划开工、按进度推进、按节点完工。县发改局要加强督导考核，定期通报进展情况。</p>
              </div>
              <div className="mt-24 text-right space-y-2">
                <p className="font-bold">XX县人民政府</p>
                <p className="text-sm">2026年1月15日</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
