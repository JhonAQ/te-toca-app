import "react-native-gesture-handler"; // Debe ser el primer import
import "nativewind"; // Importación necesaria para NativeWind
import { registerRootComponent } from "expo";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  "useInsertionEffect must not schedule updates",
]);

import App from "./App";

registerRootComponent(App);
