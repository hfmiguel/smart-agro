// App.js
import {
  NavigationContainer,
  DrawerActions,
  useWindowDimensions,
} from "@react-navigation/native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ClassificacaoScreen from "./screens/ClassificacaoScreen";
import ResultadoScreen from "./screens/ResultadoScreen";
import Verificacao from "./screens/Verificacao";
import { StatusBar } from "expo-status-bar";
import "./styles.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#c6cbef",
            width: 240,
          },
          overlayColor: "transparent",
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Classificacao" component={ClassificacaoScreen} />
        <Drawer.Screen name="Verificacao" component={Verificacao} />
        <Drawer.Screen
          name="Resultado"
          component={ResultadoScreen}
          initialParams={{ result: null }}
        />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;

export const DrawerButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon icon={faBars} className="text-white text-2xl ml-4" />
    </TouchableOpacity>
  );
};
