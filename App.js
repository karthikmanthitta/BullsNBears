import "react-native-gesture-handler";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import { Provider as PaperProvider } from "react-native-paper";
import store from "./store/store";
import { dropPortfolioTable, dropTrxTable, init } from "./db/database";
import { useEffect } from "react";
import AllTransactions from "./containers/AllTransactions";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Portfolio from "./containers/Portfolio";
import { GlobalColors } from "./global/colors";
import { AddStock } from "./containers/AddStock";
import { DbActions } from "./containers/DbActions";
import StockDetails from "./containers/StockDetails";
import FAQ from "./containers/FAQs";
import PLReport from "./containers/PLReport";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import IonIcon from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: GlobalColors.primary, paddingTop: 30 },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "cyan",
        headerStyle: { backgroundColor: GlobalColors.primary },
        headerTintColor: "white",
        headerTitleAlign: "center",
        drawerLabelStyle: { fontFamily: "ubuntu-reg", fontSize: 16 },
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "ubuntu-bold",
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                Bulls N Bears
              </Text>
              <ImageBackground
                source={require("./assets/icon.png")}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                  marginBottom: 20,
                  backgroundColor: "rgb(0,0,0)",
                  borderBottomWidth: 2,
                  borderColor: GlobalColors.secondary,
                }}
                imageStyle={{ opacity: 0.4 }}
              >
                <Image
                  source={require("./assets/icon.png")}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: "#ccc",
                  }}
                />
              </ImageBackground>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="MainHome"
        component={Home}
        options={{
          title: "Home",
          headerTitleStyle: {
            fontFamily: "ubuntu-bold",
          },
          drawerIcon: ({ focused, size }) => (
            <IonIcon
              name="md-home"
              size={size}
              color={focused ? "cyan" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          headerTitleStyle: {
            fontFamily: "ubuntu-bold",
          },
          drawerIcon: ({ focused, size }) => (
            <IonIcon
              name="wallet-outline"
              size={size}
              color={focused ? "cyan" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="P&LReport"
        component={PLReport}
        options={{
          title: "P&L Report",
          headerTitleStyle: {
            fontFamily: "ubuntu-bold",
          },
          drawerIcon: ({ focused, size }) => (
            <IonIcon
              name="analytics-sharp"
              size={size}
              color={focused ? "cyan" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="DB-Actions"
        component={DbActions}
        options={{
          headerTitleStyle: {
            fontFamily: "ubuntu-bold",
          },
          drawerIcon: ({ focused, size }) => (
            <IonIcon
              name="warning-sharp"
              size={size}
              color={focused ? "cyan" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "ubuntu-reg": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });

  useEffect(() => {
    async function initializeDb() {
      await init();
    }

    initializeDb();
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Provider store={store}>
        <PaperProvider>
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
                title: "Welcome",
                headerTitleStyle: {
                  fontFamily: "ubuntu-bold",
                },
              }}
            />
            {/* <Stack.Screen
            name="ProfileSelection"
            component={ProfileSelection}
            options={{ title: "" }}
          /> */}
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
              options={{
                title: "Add Transaction",
                headerTitleStyle: {
                  fontFamily: "ubuntu-bold",
                },
              }}
            />
            <Stack.Screen
              name="AddStock"
              component={AddStock}
              options={{
                title: "Add Stock",
                headerTitleStyle: {
                  fontFamily: "ubuntu-bold",
                },
              }}
            />
            <Stack.Screen
              name="AllTransactions"
              component={AllTransactions}
              options={{
                title: "All Transactions",
                headerTitleStyle: {
                  fontFamily: "ubuntu-bold",
                },
              }}
            />
            <Stack.Screen
              name="TransDetails"
              component={TransactionDetails}
              options={{
                title: "Transacation Details",
                animation: "slide_from_right",
                headerTitleStyle: {
                  fontFamily: "ubuntu-bold",
                },
              }}
            />
            <Stack.Screen
              name="StockDetails"
              component={StockDetails}
              options={{
                title: "Stock Details",
                animation: "slide_from_right",
                headerTitleStyle: {
                  fontFamily: "ubuntu-bold",
                },
              }}
            />
            <Stack.Screen
              name="FAQ"
              component={FAQ}
              options={{
                headerTitleStyle: {
                  fontFamily: "ubuntu-bold",
                },
              }}
            />
          </Stack.Navigator>
        </PaperProvider>
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
