import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Users, 
  Calendar, 
  History,
  Settings,
  LogOut,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateBroadcast from '@/components/CreateBroadcast';
import ChatsList from '@/components/ChatsList';
import BroadcastHistory from '@/components/BroadcastHistory';
import ScheduledBroadcasts from '@/components/ScheduledBroadcasts';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Активні чати",
      value: "24",
      change: "+2 за тиждень",
      icon: <Users className="w-4 h-4" />,
      color: "text-primary"
    },
    {
      title: "Надіслано сьогодні",
      value: "156",
      change: "+23%",
      icon: <Send className="w-4 h-4" />,
      color: "text-success"
    },
    {
      title: "Заплановано",
      value: "8",
      change: "3 сьогодні",
      icon: <Clock className="w-4 h-4" />,
      color: "text-warning"
    },
    {
      title: "Успішність",
      value: "98.2%",
      change: "+0.3%",
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: "text-success"
    }
  ];

  const recentActivity = [
    {
      type: 'sent',
      title: 'Розсилка "Щоденні новини"',
      description: '15 чатів • 2,340 отримувачів',
      time: '2 хвилини тому',
      status: 'success'
    },
    {
      type: 'scheduled',
      title: 'Розсилка "Вечірній дайджест"',
      description: '8 чатів • Заплановано на 18:00',
      time: '1 година тому',
      status: 'pending'
    },
    {
      type: 'sent',
      title: 'Розсилка "Промо-акція"',
      description: '22 чати • 3,120 отримувачів',
      time: '3 години тому',
      status: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Telegram Broadcaster</h1>
              <p className="text-sm text-muted-foreground">Панель керування</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Огляд</span>
            </TabsTrigger>
            <TabsTrigger value="broadcast" className="flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Розсилка</span>
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Чати</span>
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Заплановані</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Історія</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover-lift">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={stat.color}>{stat.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Швидкі дії</CardTitle>
                <CardDescription>
                  Найчастіші операції для керування розсилками
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  className="h-20 flex-col bg-gradient-primary hover:shadow-telegram-glow"
                  onClick={() => setActiveTab('broadcast')}
                >
                  <Send className="w-6 h-6 mb-2" />
                  Нова розсилка
                </Button>
                <Button variant="outline" className="h-20 flex-col hover-lift">
                  <Calendar className="w-6 h-6 mb-2" />
                  Запланувати
                </Button>
                <Button variant="outline" className="h-20 flex-col hover-lift">
                  <Users className="w-6 h-6 mb-2" />
                  Керувати чатами
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Остання активність</CardTitle>
                <CardDescription>
                  Ваші нещодавні розсилки та події
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-success' : 
                      activity.status === 'pending' ? 'bg-warning' : 'bg-muted'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="broadcast">
            <CreateBroadcast />
          </TabsContent>

          <TabsContent value="chats">
            <ChatsList />
          </TabsContent>

          <TabsContent value="scheduled">
            <ScheduledBroadcasts />
          </TabsContent>

          <TabsContent value="history">
            <BroadcastHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;