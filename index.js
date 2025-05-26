import "react-native-gesture-handler"; // Debe ser el primer import
import { registerRootComponent } from "expo";
import { LogBox } from "react-native";

// Ignorar warnings específicos
LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  "useInsertionEffect must not schedule updates",
]);

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
