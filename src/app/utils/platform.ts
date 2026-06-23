import { Capacitor } from "@capacitor/core";

export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const getPlatformName = (): "android" | "ios" | "web" => {
  if (Capacitor.isNativePlatform()) {
    const platform = Capacitor.getPlatform();
    return (platform === "android" || platform === "ios") ? platform : "web";
  }
  return "web";
};
