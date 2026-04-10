import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Send, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle,
  MoreHorizontal,
  FileText,
  TrendingUp,
  DollarSign,
  ClipboardList,
  Upload,
  ArrowRightLeft,
  Eye,
  RefreshCcw
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
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

// Unified Options
const FUND_TYPES = ['中央预算内', '超长期特别国债', '专项债券', '新型政策性金融工具'];
const DEPTS = ['投资科', '社发科', '农经科', '经贸科', '环资科', '高新科'];

// Mock Data for Project Reserve
const MOCK_RESERVE_DATA = [
  {
    id: 1,
    docNumber: '发改投资〔2026〕102号',
    specialName: '2026年数字经济专项',
    fundType: '中央预算内',
    projectName: '全省算力调度平台建设项目',
    content: '建设全省统一的算力调度中心，整合各市算力资源。',
    softConstruction: '包含调度算法研发及安全防护系统。',
    startTime: '2026-03',
    endTime: '2027-12',
    totalInvestment: 15000,
    plan2026: 5000,
    apply2026: 3000,
    unit: '省发改委',
    leader: '王副县长',
    remark: '重点攻关项目',
    dept: '投资科',
    isPreDone: '是',
    status: '待审核'
  },
  {
    id: 2,
    docNumber: '发改投资〔2026〕085号',
    specialName: '生态环境治理专项',
    fundType: '专项债券',
    projectName: '清江流域水质提升工程',
    content: '对清江中游段进行河道清淤及岸线绿化。',
    softConstruction: '水质实时监测系统。',
    startTime: '2026-05',
    endTime: '2028-06',
    totalInvestment: 28000,
    plan2026: 8000,
    apply2026: 5000,
    unit: '县水利局',
    leader: '李副县长',
    remark: '民生工程',
    dept: '农经科',
    isPreDone: '否',
    status: '已通过'
  },
  {
    id: 3,
    specialName: '新型城镇化专项',
    fundType: '超长期特别国债',
    projectName: '老旧城区立体停车场改造',
    content: '在老旧城区新建5处立体停车场，缓解停车难。',
    softConstruction: '智慧停车管理平台。',
    startTime: '2026-01',
    endTime: '2026-12',
    totalInvestment: 4500,
    plan2026: 4500,
    apply2026: 2000,
    unit: '县住建局',
    leader: '张副县长',
    remark: '年度必办',
    dept: '社发科',
    isPreDone: '是',
    status: '已驳回'
  }
];

export default function ProjectReserve() {
  const [viewMode, setViewMode] = useState<'all' | 'mine'>('all');
  const [activeTab, setActiveTab] = useState('pending');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
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
    count: 42,
    totalInvestment: '125.6 亿元',
    appliedFund: '68.2 亿元'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">储备项目总数</CardTitle>
            <ClipboardList className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.count} 个</div>
            <p className="text-xs text-muted-foreground mt-1">含各级储备项目</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总投资规模</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalInvestment}</div>
            <p className="text-xs text-muted-foreground mt-1">储备库项目总额</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">拟申请资金</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.appliedFund}</div>
            <p className="text-xs text-muted-foreground mt-1">2026年度拟申请总额</p>
          </CardContent>
        </Card>
      </div>

      {/* Header Tabs */}
      <div className="flex justify-between items-center">
        <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">全部项目储备</TabsTrigger>
            <TabsTrigger value="mine">我的项目储备管理</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === 'mine' && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="pending">待审核</TabsTrigger>
            <TabsTrigger value="passed">已通过</TabsTrigger>
            <TabsTrigger value="rejected">已驳回</TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Search & Filters */}
      <Card className="border-none shadow-sm bg-muted/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">文号</Label>
              <Input placeholder="输入文号检索" className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">项目名称</Label>
              <Input placeholder="输入项目名称" className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">政府资金类型</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="全部类型" />
                </SelectTrigger>
                <SelectContent>
                  {FUND_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">对口科室</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="全部科室" />
                </SelectTrigger>
                <SelectContent>
                  {DEPTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">前期手续已完成</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="全部" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">是</SelectItem>
                  <SelectItem value="no">否</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">谋划年份</Label>
              <Input placeholder="如：2026" className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">县级领导</Label>
              <Input placeholder="输入领导姓名" className="bg-background" />
            </div>
            <div className="flex items-end gap-2 lg:col-start-4">
              <Button variant="outline" className="flex-1">
                <RefreshCcw className="mr-2 h-4 w-4" /> 重置
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 shadow-sm">
                <Search className="mr-2 h-4 w-4" /> 查询
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Actions & Add */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => handleBatchAction('推送')}>
            <ArrowRightLeft className="mr-2 h-4 w-4" /> 批量推送
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleBatchAction('导出')}>
            <Download className="mr-2 h-4 w-4" /> 批量导出
          </Button>
          <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleBatchAction('删除')}>
            <Trash2 className="mr-2 h-4 w-4" /> 批量删除
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleBatchAction('审核')}>
            <CheckCircle className="mr-2 h-4 w-4" /> 批量审核
          </Button>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> 新增储备项目
        </Button>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 whitespace-nowrap">
                  <TableHead className="w-[50px]"><Checkbox /></TableHead>
                  <TableHead>文号</TableHead>
                  <TableHead>专项名称</TableHead>
                  <TableHead>资金类型</TableHead>
                  <TableHead className="min-w-[200px]">项目名称</TableHead>
                  <TableHead>总投资(万)</TableHead>
                  <TableHead>2026计划(万)</TableHead>
                  <TableHead>2026拟申请(万)</TableHead>
                  <TableHead>责任单位</TableHead>
                  <TableHead>县级领导</TableHead>
                  <TableHead>前期手续</TableHead>
                  <TableHead>审核状态</TableHead>
                  <TableHead className="text-right sticky right-0 bg-muted/50">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_RESERVE_DATA.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 whitespace-nowrap">
                    <TableCell>
                      <Checkbox 
                        checked={selectedIds.includes(item.id)} 
                        onCheckedChange={() => toggleSelect(item.id)}
                      />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.docNumber}</TableCell>
                    <TableCell>{item.specialName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                        {item.fundType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.projectName}</TableCell>
                    <TableCell className="text-blue-600 font-semibold">{item.totalInvestment}</TableCell>
                    <TableCell>{item.plan2026}</TableCell>
                    <TableCell>{item.apply2026}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.leader}</TableCell>
                    <TableCell>
                      <Badge variant={item.isPreDone === '是' ? 'default' : 'secondary'}>
                        {item.isPreDone}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={cn(
                          item.status === '已通过' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                          item.status === '已驳回' ? "bg-red-100 text-red-700 hover:bg-red-100" :
                          "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right sticky right-0 bg-background shadow-[-4px_0_10px_rgba(0,0,0,0.05)]">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-primary"
                          title="推送申报库"
                          onClick={() => toast.success('推送成功')}
                        >
                          <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-primary"
                          title="详情"
                          onClick={() => {
                            setSelectedProject(item);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" title="编辑">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-primary"
                          title="审核"
                          onClick={() => {
                            setSelectedProject(item);
                            setIsReviewOpen(true);
                          }}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="删除">
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

      {/* Add/Edit Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>新增/编辑储备项目</DialogTitle>
            <DialogDescription>请按要求填写项目储备信息，带 * 为必填项。</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label>文号 *</Label>
                <Input placeholder="输入文号，如：发改投资〔2026〕XXX号" defaultValue={selectedProject?.docNumber} />
              </div>
              <div className="space-y-2">
                <Label>专项名称 *</Label>
                <Input placeholder="输入专项名称" />
              </div>
              <div className="space-y-2">
                <Label>政府资金类型 *</Label>
                <Select defaultValue={selectedProject?.fundType}>
                  <SelectTrigger><SelectValue placeholder="选择类型" /></SelectTrigger>
                  <SelectContent>{FUND_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>对口科室</Label>
                <Select defaultValue={selectedProject?.dept}>
                  <SelectTrigger><SelectValue placeholder="选择科室" /></SelectTrigger>
                  <SelectContent>{DEPTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>项目名称 *</Label>
                <Input placeholder="输入项目名称" defaultValue={selectedProject?.projectName} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>主要建设内容 *</Label>
                <Textarea placeholder="输入主要建设内容" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>软建设</Label>
                <Textarea placeholder="输入软建设内容" />
              </div>
              <div className="space-y-2">
                <Label>预计开工时间</Label>
                <Input type="month" />
              </div>
              <div className="space-y-2">
                <Label>预计完工时间</Label>
                <Input type="month" />
              </div>
              <div className="space-y-2">
                <Label>总投资 (万元) *</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>2026年计划完成投资 (万元)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>2026年拟申请资金额度 (万元)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>责任单位 *</Label>
                <Input placeholder="输入责任单位" />
              </div>
              <div className="space-y-2">
                <Label>县级分管领导</Label>
                <Input placeholder="输入领导姓名" />
              </div>
              <div className="space-y-2">
                <Label>对口科室</Label>
                <Input placeholder="输入对口科室" />
              </div>
              <div className="space-y-2">
                <Label>已完成前期手续</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">是</SelectItem>
                    <SelectItem value="no">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>备注</Label>
                <Textarea placeholder="输入备注信息" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>附件上传</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                  <Upload size={24} className="mb-2" />
                  <p className="text-sm">点击或拖拽文件上传</p>
                  <p className="text-xs mt-1">支持 pdf, doc, docx, xls, xlsx, jpg, png</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>取消</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              toast.success('保存成功');
              setIsAddOpen(false);
            }}>保存提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>项目审核</DialogTitle>
            <DialogDescription>
              请对储备项目【{selectedProject?.projectName}】进行审核。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>审核结论</Label>
              <Select defaultValue="pass">
                <SelectTrigger>
                  <SelectValue placeholder="选择结论" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pass">通过</SelectItem>
                  <SelectItem value="reject">不通过</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>审核意见</Label>
              <Textarea placeholder="输入审核理由或意见" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewOpen(false)}>取消</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              toast.success('审核已提交');
              setIsReviewOpen(false);
            }}>确认提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>项目储备详情</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="col-span-2 flex items-center gap-2 pb-2 border-b">
                  <FileText className="text-primary h-5 w-5" />
                  <span className="font-bold text-base">基本信息</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">文号</span>
                  <span className="font-medium">{selectedProject?.docNumber}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">项目名称</span>
                  <span className="font-medium">{selectedProject?.projectName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">专项名称</span>
                  <span>{selectedProject?.specialName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">资金类型</span>
                  <span>{selectedProject?.fundType}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">责任单位</span>
                  <span>{selectedProject?.unit}</span>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <span className="text-muted-foreground">建设内容</span>
                  <p className="bg-muted/30 p-2 rounded">{selectedProject?.content}</p>
                </div>
                
                <div className="col-span-2 flex items-center gap-2 pb-2 border-b mt-4">
                  <TrendingUp className="text-primary h-5 w-5" />
                  <span className="font-bold text-base">投资计划</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">总投资</span>
                  <span className="text-blue-600 font-bold">{selectedProject?.totalInvestment} 万元</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">2026计划投资</span>
                  <span>{selectedProject?.plan2026} 万元</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">2026拟申请资金</span>
                  <span>{selectedProject?.apply2026} 万元</span>
                </div>
                
                <div className="col-span-2 flex items-center gap-2 pb-2 border-b mt-4">
                  <ClipboardList className="text-primary h-5 w-5" />
                  <span className="font-bold text-base">审批流程</span>
                </div>
                <div className="col-span-2 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px]">1</div>
                      <div className="w-px h-full bg-border" />
                    </div>
                    <div className="pb-4">
                      <p className="font-bold">项目提交</p>
                      <p className="text-xs text-muted-foreground">操作人：张三 | 2024-04-01 10:00</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">2</div>
                    </div>
                    <div>
                      <p className="font-bold">部门审核</p>
                      <p className="text-xs text-muted-foreground">当前环节：待审核</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4 border-t">
            <Button onClick={() => setIsDetailOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
