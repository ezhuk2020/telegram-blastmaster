import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Calendar, Shield, MessageCircle, Zap, CheckCircle } from 'lucide-react';
import LoginModal from '@/components/LoginModal';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  if (isLoggedIn) {
    return <Dashboard user={user} onLogout={() => setIsLoggedIn(false)} />;
  }

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Масові розсилки",
      description: "Надсилайте повідомлення одразу до кількох чатів і каналів"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Планування розсилок",
      description: "Запланувати розсилку на майбутнє або налаштувати повторення"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Керування аудиторією",
      description: "Переглядайте всі ваші чати та канали в одному місці"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Безпечна автентифікація",
      description: "Вхід через Telegram з підтримкою 2FA"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Швидка доставка",
      description: "Миттєве надсилання повідомлень через Telegram API"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Контроль статусу",
      description: "Відстежуйте статус доставки та історію розсилок"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-primary font-medium">
              Telegram Broadcaster
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Масові розсилки в Telegram
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Потужний інструмент для надсилання повідомлень до кількох чатів та каналів Telegram одночасно
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-telegram-glow transition-all duration-300 text-lg px-8 py-4"
                onClick={() => setShowLoginModal(true)}
              >
                <Send className="w-5 h-5 mr-2" />
                Почати роботу
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 hover-lift"
              >
                Дізнатися більше
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="animate-slide-up">
            <Card className="mx-auto max-w-4xl p-8 shadow-telegram-xl bg-gradient-card hover-lift">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Send className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse-glow" />
                  <p className="text-lg text-muted-foreground">Інтерфейс Telegram Broadcaster</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Чому обирають Telegram Broadcaster?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Всі необхідні інструменти для ефективного керування розсилками в одному місці
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover-lift bg-gradient-card transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готові почати?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Приєднуйтесь до тисяч користувачів, які вже використовують Telegram Broadcaster для своїх розсилок
          </p>
          <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-telegram-glow transition-all duration-300 text-lg px-8 py-4"
            onClick={() => setShowLoginModal(true)}
          >
            <Send className="w-5 h-5 mr-2" />
            Увійти через Telegram
          </Button>
        </div>
      </section>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;