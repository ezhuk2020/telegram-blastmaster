import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Send, 
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  RotateCcw,
  Download
} from 'lucide-react';

const BroadcastHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'sent' | 'failed' | 'scheduled'>('all');

  // Mock broadcast history data
  const broadcasts = [
    {
      id: '1',
      title: 'Щоденні новини технологій',
      message: 'Сьогодні у світі технологій: нові оновлення від Apple, Google анонсувала нові AI-функції...',
      sentAt: '2024-01-15T10:30:00Z',
      status: 'sent',
      chatsCount: 15,
      recipientsCount: 2340,
      deliveredCount: 2338,
      failedCount: 2,
      type: 'immediate'
    },
    {
      id: '2',
      title: 'Вечірній дайджест',
      message: 'Підсумки дня: найцікавіші новини, корисні поради та анонси на завтра...',
      sentAt: '2024-01-15T18:00:00Z',
      status: 'scheduled',
      chatsCount: 8,
      recipientsCount: 1200,
      deliveredCount: 0,
      failedCount: 0,
      type: 'scheduled'
    },
    {
      id: '3',
      title: 'Промо-акція - знижки до 50%',
      message: 'Не пропустіть! Великі знижки на всі товари до кінця тижня. Використовуйте промокод...',
      sentAt: '2024-01-15T09:15:00Z',
      status: 'sent',
      chatsCount: 22,
      recipientsCount: 3120,
      deliveredCount: 3115,
      failedCount: 5,
      type: 'immediate'
    },
    {
      id: '4',
      title: 'Системне повідомлення',
      message: 'Планові технічні роботи будуть проводитися завтра з 02:00 до 04:00...',
      sentAt: '2024-01-14T15:45:00Z',
      status: 'failed',
      chatsCount: 5,
      recipientsCount: 890,
      deliveredCount: 723,
      failedCount: 167,
      type: 'immediate'
    },
    {
      id: '5',
      title: 'Тижневий звіт продажів',
      message: 'Результати тижня: зростання на 23%, найпопулярніші товари, плани на наступний тиждень...',
      sentAt: '2024-01-14T12:00:00Z',
      status: 'sent',
      chatsCount: 12,
      recipientsCount: 1890,
      deliveredCount: 1890,
      failedCount: 0,
      type: 'immediate'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Надіслано';
      case 'failed':
        return 'Помилка';
      case 'scheduled':
        return 'Заплановано';
      default:
        return 'Невідомо';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'sent':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'scheduled':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const filteredBroadcasts = broadcasts.filter(broadcast => {
    const matchesSearch = broadcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         broadcast.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || broadcast.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getSuccessRate = (broadcast: any) => {
    if (broadcast.recipientsCount === 0) return 0;
    return Math.round((broadcast.deliveredCount / broadcast.recipientsCount) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Історія розсилок</h2>
          <p className="text-muted-foreground">
            Переглядайте всі ваші попередні розсилки та їх статистику
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Експорт звіту
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Пошук по заголовку або тексту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                Всі
              </Button>
              <Button 
                variant={filterStatus === 'sent' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('sent')}
              >
                Надіслані
              </Button>
              <Button 
                variant={filterStatus === 'scheduled' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('scheduled')}
              >
                Заплановані
              </Button>
              <Button 
                variant={filterStatus === 'failed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('failed')}
              >
                Помилки
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Broadcasts List */}
      <div className="space-y-4">
        {filteredBroadcasts.map((broadcast) => (
          <Card key={broadcast.id} className="hover-lift transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(broadcast.status)}
                    <CardTitle className="text-lg">{broadcast.title}</CardTitle>
                    <Badge variant={getStatusVariant(broadcast.status)}>
                      {getStatusText(broadcast.status)}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {broadcast.message}
                  </CardDescription>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {broadcast.status === 'failed' && (
                    <Button variant="ghost" size="sm">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Чати:</span>
                  <span className="font-medium">{broadcast.chatsCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Отримувачі:</span>
                  <span className="font-medium">{broadcast.recipientsCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Доставлено:</span>
                  <span className="font-medium text-success">{broadcast.deliveredCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Дата:</span>
                  <span className="font-medium">
                    {new Date(broadcast.sentAt).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Success Rate Bar */}
              {broadcast.status === 'sent' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Успішність доставки</span>
                    <span className="font-medium">{getSuccessRate(broadcast)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getSuccessRate(broadcast)}%` }}
                    />
                  </div>
                  {broadcast.failedCount > 0 && (
                    <p className="text-xs text-destructive">
                      {broadcast.failedCount} повідомлень не доставлено
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBroadcasts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Розсилки не знайдено</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Спробуйте змінити параметри пошуку' : 'Ви ще не надсилали розсилок'}
            </p>
            {!searchQuery && (
              <Button className="bg-gradient-primary">
                <Send className="w-4 h-4 mr-2" />
                Створити першу розсилку
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BroadcastHistory;