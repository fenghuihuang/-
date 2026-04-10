import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  FileText, 
  Construction, 
  Activity, 
  BarChart3, 
  Monitor, 
  Smartphone, 
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Search,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { id: 'planning', label: '谋划库', icon: Database },
  { id: 'reserve', label: '储备库', icon: FileText },
  { id: 'declaration', label: '申报库', icon: FileText },
  { id: 'implementation', label: '实施库', icon: FileText },
  { 
    id: 'construction', 
    label: '在建库', 
    icon: Construction,
    children: [
      { id: 'construction-tasks', label: '重点项目任务清单' },
      { id: 'construction-progress', label: '进度表' },
      { id: 'construction-midterm', label: '中期调出库' }
    ]
  },
  { id: 'dispatch', label: '项目调度', icon: Activity },
  { id: 'analysis', label: '统计分析', icon: BarChart3 },
  { id: 'cockpit', label: '领导驾驶舱', icon: Monitor },
  { id: 'system', label: '系统管理', icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
}

export default function Layout({ children, activeTab, setActiveTab, isMobileView, setIsMobileView }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "relative flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <span className="text-lg font-bold tracking-tight truncate text-primary-foreground">
              政府项目管理系统
            </span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (item.children) {
                      // If it has children, we might want to toggle expansion
                      // For now, let's just set the first child as active if clicking parent
                      setActiveTab(item.children[0].id);
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    (activeTab === item.id || item.children?.some(c => c.id === activeTab))
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
                
                {!isCollapsed && item.children && (activeTab === item.id || item.children.some(c => c.id === activeTab)) && (
                  <div className="ml-9 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setActiveTab(child.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                          activeTab === child.id
                            ? "text-primary-foreground bg-primary/20"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User size={16} />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">管理员</span>
                <span className="text-xs opacity-70 truncate">admin@gov.cn</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">
              {(() => {
                const item = navItems.find(i => i.id === activeTab || i.children?.some(c => c.id === activeTab));
                if (!item) return '系统首页';
                if (item.children) {
                  const child = item.children.find(c => c.id === activeTab);
                  return child ? `${item.label} - ${child.label}` : item.label;
                }
                return item.label;
              })()}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant={isMobileView ? "default" : "outline"} 
              size="sm" 
              onClick={() => setIsMobileView(!isMobileView)}
              className={cn("gap-2", isMobileView && "bg-blue-600 hover:bg-blue-700")}
            >
              <Smartphone size={16} />
              {isMobileView ? "切换至PC端" : "切换至移动端演示"}
            </Button>
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="搜索项目..."
                className="w-64 rounded-md border bg-muted pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-background/50">
          {children}
        </main>
      </div>
    </div>
  );
}
