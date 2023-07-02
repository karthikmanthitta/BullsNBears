import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/button";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import { useEffect, useState } from "react";
import { fetchStocks } from "../db/database";

const Welcome = () => {
  const navigation = useNavigation();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetchStocks()
        .then((response) => setPortfolio(response))
        .catch((error) => console.log(error));
    }

    fetchData();
  }, []);

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <Text style={styles.text}>About StockTracker</Text>
      <Text style={styles.text}>
        A simple app created to track your portfolio. All you need to do is make
        an entry for every transaction carried out with the appropriate details.
      </Text>
      <Text style={styles.text}>
        You will have a view of your portfolio available anytime as we operate
        offline.
      </Text>
      {portfolio.length === 0 && (
        <>
          <Text style={[styles.text, { width: "100%" }]}>
            If you have an existing portfolio, please enter all details{" "}
            <Text
              style={[
                styles.text,
                { textDecorationLine: "underline", color: "blue" },
              ]}
              onPress={() =>
                navigation.navigate("Home", { screen: "Portfolio" })
              }
            >
              here
            </Text>
            .
          </Text>
          <Text style={[styles.text, { width: "100%" }]}>
            If you don't have an existing portfolio, let's start by recording
            your first transaction.
          </Text>
        </>
      )}
      <Text style={[styles.text, { width: "100%" }]}>
        You may visit the FAQs section anytime for help.
      </Text>
      <View style={[styles.flexRow, { gap: 20 }]}>
        <CustomButton
          onPress={() => navigation.navigate("FAQ")}
          title="FAQs and Setup"
        />
        <CustomButton
          title="Let's start"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: { color: GlobalColors.primary, fontSize: 18, fontWeight: 600 },
  flexRow: { flexDirection: "row" },
});
