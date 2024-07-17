import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Tabs from "../navigation/tabs";
import { useColorScheme } from "react-native";
const App = () => {

    const scheme = useColorScheme();


  return (
    <NavigationContainer independent={true} theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
