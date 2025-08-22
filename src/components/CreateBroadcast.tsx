import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Send, 
  Image, 
  Link as LinkIcon, 
  Calendar,
  Clock,
  Users,
  Eye,
  Paperclip
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CreateBroadcast = () => {
  const [messageText, setMessageText] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const { toast } = useToast();

  // Mock chat data
  const availableChats = [
    { id: '1', name: 'Tech News Channel', type: 'channel', members: 1234 },
    { id: '2', name: 'Marketing Team', type: 'group', members: 45 },
    { id: '3', name: 'Product Updates', type: 'channel', members: 890 },
    { id: '4', name: 'Customer Support', type: 'group', members: 23 },
    { id: '5', name: 'Weekly Digest', type: 'channel', members: 2100 }
  ];

  const toggleChat = (chatId: string) => {
    setSelectedChats(prev => 
      prev.includes(chatId) 
        ? prev.filter(id => id !== chatId)
        : [...prev, chatId]
    );
  };

  const getTotalRecipients = () => {
    return selectedChats.reduce((total, chatId) => {
      const chat = availableChats.find(c => c.id === chatId);
      return total + (chat?.members || 0);
    }, 0);
  };

  const handleSendBroadcast = () => {
    if (!messageText.trim()) {
      toast({
        title: "Помилка",
        description: "Будь ласка, введіть текст повідомлення",
        variant: "destructive"
      });
      return;
    }

    if (selectedChats.length === 0) {
      toast({
        title: "Помилка",
        description: "Виберіть принаймні один чат для розсилки",
        variant: "destructive"
      });
      return;
    }

    if (isScheduled && (!scheduleDate || !scheduleTime)) {
      toast({
        title: "Помилка",
        description: "Вкажіть дату та час для запланованої розсилки",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending broadcast
    toast({
      title: isScheduled ? "Розсилка запланована!" : "Розсилка надіслана!",
      description: `${isScheduled ? 'Заплановано' : 'Надіслано'} до ${selectedChats.length} чатів (${getTotalRecipients()} отримувачів)`
    });

    // Reset form
    setMessageText('');
    setMessageTitle('');
    setSelectedChats([]);
    setIsScheduled(false);
    setScheduleDate('');
    setScheduleTime('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Створити розсилку</h2>
        <p className="text-muted-foreground">
          Складіть повідомлення та виберіть чати для розсилки
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Composition */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Повідомлення</span>
              </CardTitle>
              <CardDescription>
                Створіть ваше повідомлення для розсилки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Заголовок (необов'язково)</Label>
                <Input
                  id="title"
                  placeholder="Введіть заголовок повідомлення..."
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Текст повідомлення</Label>
                <Textarea
                  id="message"
                  placeholder="Введіть ваше повідомлення тут..."
                  className="min-h-32"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{messageText.length} символів</span>
                  <span>Telegram підтримує форматування Markdown</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Image className="w-4 h-4 mr-2" />
                  Зображення
                </Button>
                <Button variant="outline" size="sm">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Посилання
                </Button>
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Файл
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Планування</span>
                </div>
                <Switch
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
              </CardTitle>
              <CardDescription>
                Запланувати розсилку на пізніше
              </CardDescription>
            </CardHeader>
            {isScheduled && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Час</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Preview */}
          {messageText && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Попередній перегляд</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted/30">
                  {messageTitle && (
                    <div className="font-semibold mb-2 text-primary">{messageTitle}</div>
                  )}
                  <div className="whitespace-pre-wrap">{messageText}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Вибір чатів</span>
              </CardTitle>
              <CardDescription>
                Виберіть чати для розсилки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableChats.map((chat) => (
                <div 
                  key={chat.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
                    selectedChats.includes(chat.id) ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => toggleChat(chat.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{chat.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Badge variant="secondary" className="text-xs">
                          {chat.type}
                        </Badge>
                        <span>• {chat.members} учасників</span>
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded border-2 ${
                      selectedChats.includes(chat.id) 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {selectedChats.includes(chat.id) && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Підсумок розсилки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Обрано чатів:</span>
                <span className="font-medium">{selectedChats.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Всього отримувачів:</span>
                <span className="font-medium">{getTotalRecipients().toLocaleString()}</span>
              </div>
              {isScheduled && scheduleDate && scheduleTime && (
                <div className="flex justify-between text-sm">
                  <span>Заплановано на:</span>
                  <span className="font-medium text-warning">
                    {new Date(`${scheduleDate}T${scheduleTime}`).toLocaleString('uk-UA')}
                  </span>
                </div>
              )}
              
              <Button 
                onClick={handleSendBroadcast}
                className="w-full bg-gradient-primary hover:shadow-telegram-glow"
                disabled={!messageText.trim() || selectedChats.length === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                {isScheduled ? 'Запланувати розсилку' : 'Надіслати зараз'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateBroadcast;