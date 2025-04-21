import { useState, useEffect } from 'react';
import Settings from '../pages/Settings';
import api from '../services/api';

interface SettingsData {
  theme: string;
  font: string;
  logo: string;
}

const SettingsContainer = () => {
  const [settings, setSettings] = useState<SettingsData>({
    theme: 'light',
    font: 'Roboto',
    logo: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/settings');
      setSettings(response.data);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: SettingsData) => {
    try {
      setLoading(true);
      await api.put('/settings', values);
      setSettings(values);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Settings
      settings={settings}
      loading={loading}
      error={error}
      success={success}
      onSubmit={handleSubmit}
    />
  );
};

export default SettingsContainer;