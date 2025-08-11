import { useState, useEffect } from "react";

interface Settings {
  pushNotifications: boolean;
  darkMode: boolean;
  autoCapture: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  pushNotifications: false,
  darkMode: false,
  autoCapture: true,
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

  // Apply dark mode class to document
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

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
    updateSetting('darkMode', !settings.darkMode);
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