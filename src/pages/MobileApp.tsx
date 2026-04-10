import React from 'react';
import { 
  Smartphone, 
  QrCode, 
  Download, 
  ShieldCheck,
  Zap,
  Bell,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MobileApp() {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center justify-center min-h-[calc(100vh-12rem)] animate-in zoom-in duration-500">
      {/* Phone Mockup */}
      <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
        
        {/* Screen Content */}
        <div className="h-full bg-slate-50 flex flex-col">
          {/* Status Bar */}
          <div className="h-12 flex items-end justify-between px-6 pb-2 text-[10px] font-bold">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-slate-800/20" />
              <div className="w-3 h-3 rounded-full bg-slate-800/20" />
            </div>
          </div>

          {/* App Header */}
          <div className="bg-primary p-6 pt-2 text-primary-foreground rounded-b-3xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm opacity-80">欢迎回来，管理员</span>
              <Bell size={18} />
            </div>
            <h4 className="text-xl font-bold">项目管理移动端</h4>
          </div>

          {/* App Body */}
          <div className="flex-1 p-4 space-y-4 overflow-auto">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '项目查询', icon: Smartphone, color: 'bg-blue-500' },
                { label: '进度填报', icon: Zap, color: 'bg-blue-600' },
                { label: '现场核查', icon: MapPin, color: 'bg-green-500' },
                { label: '预警处理', icon: ShieldCheck, color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 border border-slate-100">
                  <div className={cn("p-2 rounded-xl text-white", item.color)}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h5 className="text-sm font-bold mb-3">待办事项 (3)</h5>
              <div className="space-y-3">
                {[
                  '环城高速项目进度异常提醒',
                  '市图书馆项目资金拨付审批',
                  '月度调度会议通知',
                ].map((todo, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs border-b border-slate-50 pb-2 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="truncate">{todo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-around px-4">
            <div className="flex flex-col items-center gap-1 text-primary">
              <Smartphone size={18} />
              <span className="text-[10px]">首页</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-400">
              <MapPin size={18} />
              <span className="text-[10px]">地图</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-400">
              <ShieldCheck size={18} />
              <span className="text-[10px]">我的</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info & Download */}
      <div className="max-w-md space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">随时随地，掌控全局</h2>
          <p className="text-muted-foreground leading-relaxed">
            移动端应用专为现场核查与快速审批设计。支持拍照留痕、GPS定位、离线填报等功能，确保项目数据实时同步，打通项目管理“最后一公里”。
          </p>
        </div>

        <div className="flex items-center gap-8 p-6 bg-card border rounded-2xl shadow-sm">
          <div className="bg-white p-2 rounded-xl border-2 border-primary/20">
            <QrCode size={100} className="text-primary" />
          </div>
          <div className="space-y-3">
            <p className="font-bold">扫码下载移动端</p>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" className="justify-start">
                <Download className="mr-2 h-4 w-4" /> iOS 版下载
              </Button>
              <Button size="sm" variant="outline" className="justify-start">
                <Download className="mr-2 h-4 w-4" /> Android 版下载
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <h6 className="font-bold text-primary mb-1">多端同步</h6>
            <p className="text-xs text-muted-foreground">PC与移动端数据实时互通</p>
          </div>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <h6 className="font-bold text-primary mb-1">安全加密</h6>
            <p className="text-xs text-muted-foreground">政务级数据加密传输</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
