import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "skillswap.test",
  appName: "SkillSwap",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
    },
  },
};

export default config;
