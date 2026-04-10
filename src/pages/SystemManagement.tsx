import React from 'react';
import { 
  Users, 
  Shield, 
  Key, 
  History, 
  Database,
  Search,
  Plus
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SystemManagement() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={16} /> 用户管理
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield size={16} /> 角色权限
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <History size={16} /> 操作日志
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Database size={16} /> 系统配置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索用户..." className="pl-9 w-64" />
              </div>
              <Button variant="outline">筛选部门</Button>
            </div>
            <Button className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" /> 新增用户</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>用户名</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>所属部门</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>最后登录</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { username: 'admin', name: '系统管理员', dept: '信息中心', role: '超级管理员', lastLogin: '2024-04-08 10:30', status: '正常' },
                    { username: 'zhangsan', name: '张三', dept: '发改委', role: '业务经办', lastLogin: '2024-04-08 09:15', status: '正常' },
                    { username: 'lisi', name: '李四', dept: '住建局', role: '部门审批', lastLogin: '2024-04-07 16:45', status: '禁用' },
                  ].map((user, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono">{user.username}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.dept}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{user.lastLogin}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === '正常' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="text-primary p-0 h-auto mr-2">编辑</Button>
                        <Button variant="link" className="text-destructive p-0 h-auto">重置密码</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>角色权限配置</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">此处配置不同角色的功能访问权限与数据范围权限。</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
           <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>操作人</TableHead>
                    <TableHead>操作模块</TableHead>
                    <TableHead>操作内容</TableHead>
                    <TableHead>IP地址</TableHead>
                    <TableHead>操作时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { user: 'admin', module: '项目谋划库', action: '审批项目：智慧城市建设', ip: '192.168.1.10', time: '2024-04-08 11:20:05' },
                    { user: 'zhangsan', module: '项目储备', action: '新增储备项目：供水管网', ip: '192.168.1.55', time: '2024-04-08 10:45:12' },
                    { user: 'admin', module: '系统管理', action: '修改用户权限：lisi', ip: '192.168.1.10', time: '2024-04-08 09:30:00' },
                  ].map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.module}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-xs font-mono">{log.ip}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{log.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
