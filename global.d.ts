interface TelegramWebApp {
    initDataUnsafe: {
      user: {
        username: string;
        id: string;
      };
    };
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  