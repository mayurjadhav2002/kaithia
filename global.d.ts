interface TelegramWebApp {
    initDataUnsafe: {
      user: {
        id: string;
      };
    };
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  