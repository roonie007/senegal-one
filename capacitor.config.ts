import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cometrip.senegal-one",
  appName: "Sénégal one",
  webDir: "dist",

  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: false,
    },
  },
};

export default config;
