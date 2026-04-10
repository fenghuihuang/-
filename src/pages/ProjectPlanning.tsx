import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter,
  MoreHorizontal,
  FileText,
  TrendingUp,
  DollarSign,
  ClipboardList,
  Upload,
  AlertTriangle,
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
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

// Unified Options
const FUND_TYPES = ['中央预算内', '超长期特别国债', '专项债券', '新型政策性金融工具'];
const DEPTS = ['投资科', '社发科', '农经科', '经贸科', '环资科', '高新科'];

// Mock Data
const INITIAL_MOCK_DATA = [
  {
    id: 1,
    name: '智慧城市大数据中心建设项目',
    domain: '信息技术',
    year: '2024',
    fundType: '中央预算内',
    content: '建设城市级大数据中心，包含机房建设、服务器采购及软件系统开发。',
    unit: '市大数据局',
    responsible: '张三',
    contact: '13800138000',
    dept: '投资科',
    status: '待审批',
    remark: '急需推进',
    totalInvestment: 5000,
    appliedFund: 2000
  },
  {
    id: 2,
    name: '滨海新区生态修复工程',
    domain: '生态环境',
    year: '2024',
    fundType: '专项债券',
    content: '对滨海新区受损湿地进行修复，建设生态走廊。',
    unit: '市生态环境局',
    responsible: '李四',
    contact: '13900139000',
    dept: '生态科',
    status: '已通过',
    remark: '年度重点',
    totalInvestment: 12000,
    appliedFund: 8000
  },
  {
    id: 3,
    name: '老旧小区改造二期工程',
    domain: '城乡建设',
    year: '2023',
    fundType: '超长期特别国债',
    content: '对全市30个老旧小区进行管网改造、外墙粉刷及环境整治。',
    unit: '市住建局',
    responsible: '王五',
    contact: '13700137000',
    dept: '农经科',
    status: '驳回',
    remark: '资料不全',
    totalInvestment: 8000,
    appliedFund: 4000
  }
];

export default function ProjectPlanning() {
  const [activeTab, setActiveTab] = useState('all');
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  const stats = {
    count: 128,
    totalInvestment: '45.8 亿元',
    appliedFund: '22.3 亿元'
  };

  const handleAdd = () => {
    setIsEdit(false);
    setSelectedProject(null);
    setIsAddEditOpen(true);
  };

  const handleEdit = (project: any) => {
    setIsEdit(true);
    setSelectedProject(project);
    setIsAddEditOpen(true);
  };

  const handleDelete = (project: any) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const handleApprove = (project: any) => {
    setSelectedProject(project);
    setIsApproveOpen(true);
  };

  const confirmDelete = () => {
    toast.success(`项目【${selectedProject?.name}】已成功删除`);
    setIsDeleteOpen(false);
  };

  const confirmSave = () => {
    toast.success(isEdit ? '项目信息已更新' : '新项目已成功谋划入库');
    setIsAddEditOpen(false);
  };

  const confirmApprove = (status: 'pass' | 'reject') => {
    toast.success(status === 'pass' ? '项目审批已通过' : '项目已被驳回');
    setIsApproveOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">申报项目总数</CardTitle>
            <ClipboardList className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.count} 个</div>
            <p className="text-xs text-muted-foreground mt-1">+12% 较上月</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总投资规模</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalInvestment}</div>
            <p className="text-xs text-muted-foreground mt-1">+5.2% 较上月</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">拟申请资金</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.appliedFund}</div>
            <p className="text-xs text-muted-foreground mt-1">+8.4% 较上月</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="border-none shadow-sm bg-muted/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">项目名称</Label>
              <Input placeholder="输入项目名称" className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">申报领域</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="全部领域" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">信息技术</SelectItem>
                  <SelectItem value="eco">生态环境</SelectItem>
                  <SelectItem value="infra">基础设施</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">谋划年份</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="2024" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
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
              <Label className="text-xs font-bold text-muted-foreground">申报单位</Label>
              <Input placeholder="输入申报单位" className="bg-background" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">已完成前期手续</Label>
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

      {/* Tabs & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">全部谋划</TabsTrigger>
            <TabsTrigger value="mine">我的谋划</TabsTrigger>
            <TabsTrigger value="pending">待审批</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info('正在导出谋划库数据...')}>
            <Download className="mr-2 h-4 w-4" /> 导出
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" /> 新增项目
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[60px]">序号</TableHead>
                <TableHead className="min-w-[200px]">项目名称</TableHead>
                <TableHead>申报领域</TableHead>
                <TableHead>谋划年份</TableHead>
                <TableHead>资金类型</TableHead>
                <TableHead className="max-w-[200px]">建设内容</TableHead>
                <TableHead>申报单位</TableHead>
                <TableHead>责任人</TableHead>
                <TableHead>审核状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INITIAL_MOCK_DATA.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-muted/30">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.domain}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {item.fundType}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {item.content}
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.responsible}</TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        item.status === '已通过' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                        item.status === '驳回' ? "bg-red-100 text-red-700 hover:bg-red-100" :
                        "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-primary"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-primary"
                        onClick={() => handleApprove(item)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{isEdit ? '编辑项目谋划' : '新增项目谋划'}</DialogTitle>
            <DialogDescription>请填写项目谋划基础信息，确保数据真实有效。</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label>项目名称 *</Label>
                <Input placeholder="输入项目全称" defaultValue={selectedProject?.name} />
              </div>
              <div className="space-y-2">
                <Label>申报领域 *</Label>
                <Select defaultValue={selectedProject?.domain}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择领域" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">信息技术</SelectItem>
                    <SelectItem value="eco">生态环境</SelectItem>
                    <SelectItem value="infra">基础设施</SelectItem>
                    <SelectItem value="edu">教育医疗</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>谋划年份 *</Label>
                <Select defaultValue={selectedProject?.year || "2024"}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择年份" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>政府资金类型 *</Label>
                <Select defaultValue={selectedProject?.fundType}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUND_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>对口科室</Label>
                <Select defaultValue={selectedProject?.dept}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择科室" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>申报单位 *</Label>
                <Input placeholder="输入申报单位" defaultValue={selectedProject?.unit} />
              </div>
              <div className="space-y-2">
                <Label>单位责任人</Label>
                <Input placeholder="输入责任人姓名" defaultValue={selectedProject?.responsible} />
              </div>
              <div className="space-y-2">
                <Label>联系方式</Label>
                <Input placeholder="输入手机号" defaultValue={selectedProject?.contact} />
              </div>
              <div className="space-y-2">
                <Label>总投资 (万元)</Label>
                <Input type="number" placeholder="0.00" defaultValue={selectedProject?.totalInvestment} />
              </div>
              <div className="space-y-2">
                <Label>拟申请资金 (万元)</Label>
                <Input type="number" placeholder="0.00" defaultValue={selectedProject?.appliedFund} />
              </div>
              <div className="space-y-2">
                <Label>已完成前期手续</Label>
                <Select defaultValue={selectedProject?.preProcedure || "no"}>
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
                <Label>主要建设内容 *</Label>
                <Textarea placeholder="描述项目建设规模、内容等" defaultValue={selectedProject?.content} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>备注</Label>
                <Textarea placeholder="其他补充说明" defaultValue={selectedProject?.remark} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>附件上传</Label>
                <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                  <Upload size={24} className="mb-2" />
                  <p className="text-sm">点击或拖拽文件上传项目建议书、批复文件等</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>取消</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={confirmSave}>确认提交</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>项目审批</DialogTitle>
            <DialogDescription>
              请对项目【{selectedProject?.name}】进行审核。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>审批结论</Label>
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
              <Label>审批意见</Label>
              <Textarea placeholder="输入审批理由或意见" />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsApproveOpen(false)}>取消</Button>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => confirmApprove('reject')}>驳回</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => confirmApprove('pass')}>通过</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">确认删除项目？</DialogTitle>
            <DialogDescription className="text-center">
              确定要删除项目【{selectedProject?.name}】吗？此操作不可撤销，项目数据将从谋划库中移除。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center sm:justify-center gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="flex-1">取消</Button>
            <Button variant="destructive" onClick={confirmDelete} className="flex-1">确认删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
