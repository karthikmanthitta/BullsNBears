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
import { init } from "./db/database";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    async function initializeDb() {
      await init();
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
            component={Home}
            options={{ title: "Home", animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="Add" component={Add} options={{ title: "Add" }} />
          {/* <Stack.Screen
          name="AllTransactions"
          component={}
          options={{ title: "All Transactions" }}
        /> */}
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
