import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { registerRootComponent } from "expo";
import Welcome from "./containers/Welcome";
import ProfileSelection from "./containers/ProfileSelection";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Home } from "./containers/Home";
import { Add } from "./containers/Add";
import { TransactionDetails } from "./containers/TransactionDetails";
import { Provider } from "react-redux";
import store from "./store/store";
import { dropPortfolioTable, dropTrxTable, init } from "./db/database";
import { useEffect } from "react";
import AllTransactions from "./containers/AllTransactions";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Portfolio from "./containers/Portfolio";
import { GlobalColors } from "./global/colors";
import { AddStock } from "./containers/AddStock";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: GlobalColors.primary, paddingTop: 30 },
        drawerInactiveTintColor: "white",
        headerStyle: { backgroundColor: GlobalColors.primary },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Portfolio" component={Portfolio} />
    </Drawer.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    async function initializeDb() {
      await init();
      // await dropPortfolioTable();
      // await dropTrxTable();
    }

    initializeDb();
  });

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0b2447",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            animation: "fade_from_bottom",
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              title: "Welcome!",
            }}
          />
          <Stack.Screen
            name="ProfileSelection"
            component={ProfileSelection}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            options={{ title: "Add Transaction" }}
          />
          <Stack.Screen
            name="AddStock"
            component={AddStock}
            options={{ title: "Add Stock" }}
          />
          <Stack.Screen
            name="AllTransactions"
            component={AllTransactions}
            options={{ title: "All Transactions" }}
          />
          <Stack.Screen
            name="TransDetails"
            component={TransactionDetails}
            options={{
              title: "Transacation Details",
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  container: { flex: 1 },
  grad: { flex: 1 },
});

registerRootComponent(App);
