import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  Hash, 
  Settings, 
  RefreshCw,
  UserPlus,
  MessageSquare
} from 'lucide-react';

const ChatsList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock chat data
  const chats = [
    {
      id: '1',
      name: 'Tech News Channel',
      type: 'channel',
      members: 1234,
      description: 'Останні новини світу технологій',
      lastActivity: '2 години тому',
      isAdmin: true,
      canPost: true
    },
    {
      id: '2',
      name: 'Marketing Team',
      type: 'group',
      members: 45,
      description: 'Внутрішня група маркетингової команди',
      lastActivity: '30 хвилин тому',
      isAdmin: true,
      canPost: true
    },
    {
      id: '3',
      name: 'Product Updates',
      type: 'channel',
      members: 890,
      description: 'Оновлення продукту та релізи',
      lastActivity: '1 день тому',
      isAdmin: false,
      canPost: false
    },
    {
      id: '4',
      name: 'Customer Support',
      type: 'group',
      members: 23,
      description: 'Команда підтримки клієнтів',
      lastActivity: '15 хвилин тому',
      isAdmin: true,
      canPost: true
    },
    {
      id: '5',
      name: 'Weekly Digest',
      type: 'channel',
      members: 2100,
      description: 'Щотижневий дайджест новин компанії',
      lastActivity: '3 дні тому',
      isAdmin: true,
      canPost: true
    },
    {
      id: '6',
      name: 'Development Team',
      type: 'group',
      members: 78,
      description: 'Команда розробників',
      lastActivity: '1 година тому',
      isAdmin: false,
      canPost: true
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    return type === 'channel' ? <Hash className="w-4 h-4" /> : <Users className="w-4 h-4" />;
  };

  const getTypeColor = (type: string) => {
    return type === 'channel' ? 'text-primary' : 'text-success';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Мої чати та канали</h2>
          <p className="text-muted-foreground">
            Керування вашими Telegram чатами та каналами
          </p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-telegram-glow">
          <RefreshCw className="w-4 h-4 mr-2" />
          Оновити список
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Пошук чатів та каналів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Всі ({chats.length})
              </Button>
              <Button variant="outline" size="sm">
                Канали ({chats.filter(c => c.type === 'channel').length})
              </Button>
              <Button variant="outline" size="sm">
                Групи ({chats.filter(c => c.type === 'group').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChats.map((chat) => (
          <Card key={chat.id} className="hover-lift transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${getTypeColor(chat.type)}`}>
                    {getTypeIcon(chat.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{chat.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {chat.type === 'channel' ? 'Канал' : 'Група'}
                      </Badge>
                      {chat.isAdmin && (
                        <Badge variant="outline" className="text-xs">
                          Адмін
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {chat.description}
              </CardDescription>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{chat.members.toLocaleString()} учасників</span>
                </div>
                <span>{chat.lastActivity}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    chat.canPost ? 'bg-success' : 'bg-muted'
                  }`} />
                  <span className="text-xs text-muted-foreground">
                    {chat.canPost ? 'Можу надсилати' : 'Тільки читання'}
                  </span>
                </div>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChats.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Чати не знайдено</h3>
            <p className="text-muted-foreground mb-4">
              Спробуйте змінити параметри пошуку або оновити список чатів
            </p>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Оновити список
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatsList;