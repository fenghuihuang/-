import React from 'react';
import { 
  Activity, 
  MessageSquare, 
  PhoneCall, 
  FileWarning,
  Users,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ProjectDispatch() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* Left: Dispatch Tasks */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">待协调问题清单</CardTitle>
            <Button size="sm" className="bg-primary hover:bg-primary/90">发起协调</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: '环城高速项目土地征收补偿争议', project: '环城高速南段', type: '土地征收', priority: '高', time: '2小时前' },
              { title: '图书馆项目电力增容审批缓慢', project: '市图书馆新馆', type: '行政审批', priority: '中', time: '5小时前' },
              { title: '体育中心改造项目原材料供应短缺', project: '体育中心游泳馆', type: '物资供应', priority: '低', time: '1天前' },
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className={cn(
                  "p-2 rounded-full shrink-0",
                  task.priority === '高' ? "bg-red-100 text-red-600" :
                  task.priority === '中' ? "bg-blue-100 text-blue-600" :
                  "bg-blue-100 text-blue-600"
                )}>
                  <FileWarning size={20} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{task.title}</h4>
                    <Badge variant={task.priority === '高' ? 'destructive' : 'secondary'}>{task.priority}优先级</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">所属项目：{task.project}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> {task.time}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Activity size={12} /> {task.type}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">去处理</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">调度会议安排</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="bg-primary text-primary-foreground p-2 rounded text-center min-w-[60px]">
                  <div className="text-xs uppercase">四月</div>
                  <div className="text-xl font-bold">12</div>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">全市重点在建项目月度调度会</h5>
                  <p className="text-sm text-muted-foreground">地点：市政府3号会议室 | 主持人：张副市长</p>
                </div>
                <Button size="sm">参会回执</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Contacts & Activity */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> 调度联系人
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {[
                  { name: '陈主任', dept: '市发改委', status: '在线' },
                  { name: '林局长', dept: '市住建局', status: '忙碌' },
                  { name: '周科长', dept: '市自然资源局', status: '离线' },
                  { name: '赵经理', dept: '城投集团', status: '在线' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.dept}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MessageSquare size={14} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><PhoneCall size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">实时动态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                '发改委陈主任回复了“土地征收”问题',
                '住建局提交了本周进度报告',
                '系统自动触发了“环城高速”延期预警',
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">{log}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
