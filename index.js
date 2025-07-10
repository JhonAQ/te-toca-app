import "react-native-gesture-handler"; // Debe ser el primer import
import { Platform } from "react-native";
import { LogBox } from "react-native";
import { AppRegistry } from "react-native";

LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  "useInsertionEffect must not schedule updates",
  "expo-splash-screen",
  "expo-camera",
]);

import App from "./App";

// Para web usamos AppRegistry directamente, para nativo expo maneja esto automáticamente
if (Platform.OS === "web") {
  AppRegistry.registerComponent("main", () => App);
  AppRegistry.runApplication("main", {
    initialProps: {},
    rootTag: document.getElementById("root"),
  });
} else {
  const { registerRootComponent } = require("expo");
  registerRootComponent(App);
}
