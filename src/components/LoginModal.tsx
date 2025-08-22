import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send, Shield, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState<'widget' | 'success'>('widget');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const telegramWidgetRef = useRef<HTMLDivElement>(null);

  // Для демонстрації використовуємо тестовий бот. В продакшені потрібен ваш власний бот
  const BOT_USERNAME = '@opl2025_bot'; // Замініть на ваш бот username

  // Обробка callback від Telegram Widget
  useEffect(() => {
    // Створюємо глобальний callback для Telegram Widget
    (window as any).telegramLoginCallback = (user: any) => {
      setLoading(false);
      setStep('success');
      
      setTimeout(() => {
        onLogin({
          id: user.id.toString(),
          firstName: user.first_name,
          lastName: user.last_name || '',
          username: user.username || '',
          photoUrl: user.photo_url || null,
          authDate: user.auth_date,
          hash: user.hash
        });
      }, 1500);
    };

    return () => {
      // Очищуємо callback при відмонтуванні
      delete (window as any).telegramLoginCallback;
    };
  }, [onLogin]);

  // Створюємо Telegram Widget при відкритті модалки
  useEffect(() => {
    if (isOpen && step === 'widget' && telegramWidgetRef.current && (window as any).TelegramLoginWidget) {
      // Очищуємо попередній віджет
      telegramWidgetRef.current.innerHTML = '';
      
      // Створюємо новий віджет
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', BOT_USERNAME);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-onauth', 'telegramLoginCallback(user)');
      script.setAttribute('data-request-access', 'write');
      
      telegramWidgetRef.current.appendChild(script);
      
      // Показуємо повідомлення про налаштування бота
      toast({
        title: "Увага!",
        description: "Для роботи потрібен бот від @BotFather. Створіть бота та вкажіть його username в коді.",
        duration: 5000
      });
    }
  }, [isOpen, step, toast]);

  const handleDemoLogin = () => {
    setLoading(true);
    setStep('success');
    
    setTimeout(() => {
      const demoUser = {
        id: '123456789',
        firstName: 'Demo',
        lastName: 'User',
        username: 'demo_user',
        photoUrl: null,
        authDate: Math.floor(Date.now() / 1000),
        hash: 'demo_hash'
      };
      
      onLogin(demoUser);
    }, 1500);
  };

  const resetModal = () => {
    setStep('widget');
    setLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Send className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-2xl">
            {step === 'widget' && "Вхід через Telegram"}
            {step === 'success' && "Успішно!"}
          </DialogTitle>
          <DialogDescription>
            {step === 'widget' && "Натисніть кнопку нижче для входу через ваш акаунт Telegram"}
            {step === 'success' && "Ваш акаунт успішно підключено"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 'widget' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Ваші дані захищені і використовуються тільки для автентифікації</span>
              </div>

              {/* Telegram Login Widget Container */}
              <div className="flex justify-center py-4">
                <div ref={telegramWidgetRef} />
              </div>

              {/* Demo Login Button для тестування */}
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground text-center mb-3">
                  Або скористайтеся демо-входом для тестування:
                </p>
                <Button 
                  onClick={handleDemoLogin}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? "Входимо..." : "Demo Login"}
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success animate-scale-in" />
              </div>
              <p className="text-muted-foreground">
                Перенаправляємо вас до панелі керування...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
