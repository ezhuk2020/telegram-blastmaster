import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Shield, CheckCircle2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState<'telegram' | 'code' | 'success'>('telegram');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTelegramLogin = async () => {
    if (!phoneNumber) {
      toast({
        title: "Помилка",
        description: "Будь ласка, введіть номер телефону",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call to Telegram
    setTimeout(() => {
      setLoading(false);
      setStep('code');
      toast({
        title: "Код надіслано!",
        description: "Перевірте Telegram для отримання коду підтвердження"
      });
    }, 2000);
  };

  const handleCodeVerification = async () => {
    if (!verificationCode) {
      toast({
        title: "Помилка",
        description: "Будь ласка, введіть код підтвердження",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      
      setTimeout(() => {
        const mockUser = {
          id: '123456789',
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          phone: phoneNumber,
          avatar: null
        };
        
        onLogin(mockUser);
      }, 1500);
    }, 2000);
  };

  const resetModal = () => {
    setStep('telegram');
    setPhoneNumber('');
    setVerificationCode('');
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
            {step === 'telegram' && "Вхід через Telegram"}
            {step === 'code' && "Підтвердження"}
            {step === 'success' && "Успішно!"}
          </DialogTitle>
          <DialogDescription>
            {step === 'telegram' && "Введіть ваш номер телефону для входу через Telegram"}
            {step === 'code' && "Введіть код, який ви отримали в Telegram"}
            {step === 'success' && "Ваш акаунт успішно підключено"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 'telegram' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефону</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-center"
                />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Ваші дані захищені і використовуються тільки для автентифікації</span>
              </div>

              <Button 
                onClick={handleTelegramLogin}
                disabled={loading}
                className="w-full bg-gradient-primary hover:shadow-telegram-glow"
              >
                {loading ? "Надсилаємо код..." : "Надіслати код"}
              </Button>
            </div>
          )}

          {step === 'code' && (
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="mb-4">
                  Код надіслано на {phoneNumber}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="code">Код підтвердження</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="12345"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-2xl tracking-widest"
                  maxLength={5}
                />
              </div>

              <Button 
                onClick={handleCodeVerification}
                disabled={loading}
                className="w-full bg-gradient-primary hover:shadow-telegram-glow"
              >
                {loading ? "Підтвердження..." : "Підтвердити"}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => setStep('telegram')}
                className="w-full"
              >
                Назад
              </Button>
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