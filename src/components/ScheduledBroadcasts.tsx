import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Send,
  Users,
  Edit,
  Trash2,
  Play,
  Pause,
  Plus
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ScheduledBroadcasts = () => {
  const { toast } = useToast();

  // Mock scheduled broadcasts data
  const [scheduledBroadcasts, setScheduledBroadcasts] = useState([
    {
      id: '1',
      title: 'Вечірній дайджест',
      message: 'Підсумки дня: найцікавіші новини, корисні поради та анонси на завтра. Не пропустіть важливу інформацію!',
      scheduledAt: '2024-01-15T18:00:00Z',
      chatsCount: 8,
      recipientsCount: 1200,
      status: 'active',
      repeatType: 'daily',
      nextRun: '2024-01-15T18:00:00Z',
      createdAt: '2024-01-10T14:30:00Z'
    },
    {
      id: '2',
      title: 'Щотижневий звіт продажів',
      message: 'Результати тижня: статистика продажів, топ товари, аналіз трендів та плани на наступний період.',
      scheduledAt: '2024-01-20T12:00:00Z',
      chatsCount: 12,
      recipientsCount: 890,
      status: 'active',
      repeatType: 'weekly',
      nextRun: '2024-01-20T12:00:00Z',
      createdAt: '2024-01-12T09:15:00Z'
    },
    {
      id: '3',
      title: 'Місячний звіт',
      message: 'Комплексний огляд результатів місяця: фінансові показники, досягнення команди, плани розвитку.',
      scheduledAt: '2024-02-01T10:00:00Z',
      chatsCount: 15,
      recipientsCount: 2340,
      status: 'paused',
      repeatType: 'monthly',
      nextRun: '2024-02-01T10:00:00Z',
      createdAt: '2024-01-05T16:45:00Z'
    },
    {
      id: '4',
      title: 'Нагадування про зустріч',
      message: 'Нагадуємо про завтрашню зустріч команди о 14:00. Підготуйте ваші звіти та пропозиції.',
      scheduledAt: '2024-01-16T09:00:00Z',
      chatsCount: 3,
      recipientsCount: 45,
      status: 'active',
      repeatType: 'once',
      nextRun: '2024-01-16T09:00:00Z',
      createdAt: '2024-01-14T17:30:00Z'
    }
  ]);

  const getRepeatTypeText = (type: string) => {
    switch (type) {
      case 'daily':
        return 'Щодня';
      case 'weekly':
        return 'Щотижня';
      case 'monthly':
        return 'Щомісяця';
      case 'once':
        return 'Одноразово';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Активна</Badge>;
      case 'paused':
        return <Badge variant="secondary">Призупинена</Badge>;
      case 'completed':
        return <Badge variant="outline">Завершена</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleToggleStatus = (id: string) => {
    setScheduledBroadcasts(prev => 
      prev.map(broadcast => 
        broadcast.id === id 
          ? { ...broadcast, status: broadcast.status === 'active' ? 'paused' : 'active' }
          : broadcast
      )
    );
    
    const broadcast = scheduledBroadcasts.find(b => b.id === id);
    toast({
      title: broadcast?.status === 'active' ? 'Розсилку призупинено' : 'Розсилку активовано',
      description: `"${broadcast?.title}" ${broadcast?.status === 'active' ? 'призупинена' : 'активована'}`
    });
  };

  const handleDelete = (id: string) => {
    const broadcast = scheduledBroadcasts.find(b => b.id === id);
    setScheduledBroadcasts(prev => prev.filter(b => b.id !== id));
    toast({
      title: 'Розсилку видалено',
      description: `"${broadcast?.title}" успішно видалена`,
      variant: 'destructive'
    });
  };

  const handleSendNow = (id: string) => {
    const broadcast = scheduledBroadcasts.find(b => b.id === id);
    toast({
      title: 'Розсилка надіслана!',
      description: `"${broadcast?.title}" надіслана до ${broadcast?.chatsCount} чатів`
    });
  };

  const isOverdue = (scheduledAt: string) => {
    return new Date(scheduledAt) < new Date();
  };

  const getTimeUntil = (scheduledAt: string) => {
    const now = new Date();
    const scheduled = new Date(scheduledAt);
    const diff = scheduled.getTime() - now.getTime();

    if (diff < 0) return 'Прострочена';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `через ${days} дн.`;
    if (hours > 0) return `через ${hours} год.`;
    if (minutes > 0) return `через ${minutes} хв.`;
    return 'Зараз';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Заплановані розсилки</h2>
          <p className="text-muted-foreground">
            Керування вашими запланованими та повторюваними розсилками
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-telegram-glow">
          <Plus className="w-4 h-4 mr-2" />
          Нова розсилка
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активні</p>
                <p className="text-2xl font-bold text-success">
                  {scheduledBroadcasts.filter(b => b.status === 'active').length}
                </p>
              </div>
              <Play className="w-5 h-5 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Призупинені</p>
                <p className="text-2xl font-bold text-warning">
                  {scheduledBroadcasts.filter(b => b.status === 'paused').length}
                </p>
              </div>
              <Pause className="w-5 h-5 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Сьогодні</p>
                <p className="text-2xl font-bold text-primary">
                  {scheduledBroadcasts.filter(b => 
                    new Date(b.nextRun).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всього чатів</p>
                <p className="text-2xl font-bold">
                  {scheduledBroadcasts.reduce((sum, b) => sum + b.chatsCount, 0)}
                </p>
              </div>
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Broadcasts List */}
      <div className="space-y-4">
        {scheduledBroadcasts.map((broadcast) => (
          <Card key={broadcast.id} className="hover-lift transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{broadcast.title}</CardTitle>
                    {getStatusBadge(broadcast.status)}
                    <Badge variant="outline">
                      {getRepeatTypeText(broadcast.repeatType)}
                    </Badge>
                    {isOverdue(broadcast.nextRun) && broadcast.status === 'active' && (
                      <Badge variant="destructive">Прострочена</Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {broadcast.message}
                  </CardDescription>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleToggleStatus(broadcast.id)}
                  >
                    {broadcast.status === 'active' ? 
                      <Pause className="w-4 h-4" /> : 
                      <Play className="w-4 h-4" />
                    }
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSendNow(broadcast.id)}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(broadcast.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Наступний запуск:</span>
                </div>
                <div className="flex items-center space-x-2 md:col-span-1">
                  <span className={`font-medium ${
                    isOverdue(broadcast.nextRun) && broadcast.status === 'active' 
                      ? 'text-destructive' 
                      : 'text-foreground'
                  }`}>
                    {new Date(broadcast.nextRun).toLocaleString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {getTimeUntil(broadcast.nextRun)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {broadcast.chatsCount} чатів • {broadcast.recipientsCount.toLocaleString()} отримувачів
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Створено: {new Date(broadcast.createdAt).toLocaleDateString('uk-UA')}
                  </span>
                </div>
              </div>

              {/* Progress bar for time until next run */}
              {broadcast.status === 'active' && !isOverdue(broadcast.nextRun) && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>До наступного запуску</span>
                    <span>{getTimeUntil(broadcast.nextRun)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div className="bg-gradient-primary h-1 rounded-full w-1/4" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {scheduledBroadcasts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Немає запланованих розсилок</h3>
            <p className="text-muted-foreground mb-4">
              Створіть вашу першу заплановану розсилку для автоматизації комунікації
            </p>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Створити розсилку
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScheduledBroadcasts;