import { useState, useEffect } from "react";

interface Settings {
  pushNotifications: boolean;
  darkMode: boolean;
  autoCapture: boolean;
  theme: 'light' | 'dark' | 'green-metallic';
}

const DEFAULT_SETTINGS: Settings = {
  pushNotifications: false,
  darkMode: false,
  autoCapture: true,
  theme: 'light',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kudiscan-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kudiscan-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply theme classes to document
  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'green-metallic');
    
    // Apply current theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'green-metallic') {
      document.documentElement.classList.add('green-metallic');
    }
  }, [settings.theme]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const togglePushNotifications = () => {
    const newValue = !settings.pushNotifications;
    updateSetting('pushNotifications', newValue);
    
    // Request notification permission if enabling
    if (newValue && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          updateSetting('pushNotifications', false);
        }
      });
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !settings.darkMode;
    updateSetting('darkMode', newDarkMode);
    
    // Update theme based on dark mode preference
    if (newDarkMode) {
      updateSetting('theme', 'green-metallic');
    } else {
      updateSetting('theme', 'light');
    }
  };

  const toggleAutoCapture = () => {
    updateSetting('autoCapture', !settings.autoCapture);
  };

  return {
    settings,
    togglePushNotifications,
    toggleDarkMode,
    toggleAutoCapture,
  };
}