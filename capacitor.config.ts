import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 've.gob.inea.visitantes',
  appName: 'visitantes',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
