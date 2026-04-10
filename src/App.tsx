import React, { useState } from 'react';
import Layout from './components/Layout';
import ProjectPlanning from './pages/ProjectPlanning';
import ProjectReserve from './pages/ProjectReserve';
import ProjectDeclaration from './pages/ProjectDeclaration';
import ProjectImplementation from './pages/ProjectImplementation';
import ProjectConstruction from './pages/ProjectConstruction';
import ProjectDispatch from './pages/ProjectDispatch';
import ProjectAnalysis from './pages/ProjectAnalysis';
import LeadershipCockpit from './pages/LeadershipCockpit';
import SystemManagement from './pages/SystemManagement';
import MobileSimulator from './pages/MobileSimulator';

export default function App() {
  const [activeTab, setActiveTab] = useState('planning');
  const [isMobileView, setIsMobileView] = useState(false);

  const renderContent = () => {
    if (isMobileView) {
      return (
        <div className="flex items-center justify-center min-h-full py-10">
          <MobileSimulator />
        </div>
      );
    }

    switch (activeTab) {
      case 'planning':
        return <ProjectPlanning />;
      case 'reserve':
        return <ProjectReserve />;
      case 'declaration':
        return <ProjectDeclaration />;
      case 'implementation':
        return <ProjectImplementation />;
      case 'construction':
      case 'construction-tasks':
      case 'construction-progress':
      case 'construction-midterm':
        return <ProjectConstruction defaultTab={
          activeTab === 'construction-progress' ? 'progressTable' : 
          activeTab === 'construction-midterm' ? 'midtermTable' : 'taskList'
        } />;
      case 'dispatch':
        return <ProjectDispatch />;
      case 'analysis':
        return <ProjectAnalysis />;
      case 'cockpit':
        return <LeadershipCockpit />;
      case 'system':
        return <SystemManagement />;
      default:
        return <ProjectPlanning />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isMobileView={isMobileView} 
      setIsMobileView={setIsMobileView}
    >
      {renderContent()}
    </Layout>
  );
}

