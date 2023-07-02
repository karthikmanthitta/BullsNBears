import { ScrollView, Text, View } from "react-native";
import { GlobalStyles } from "../global/styles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomButton from "../components/button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PortfolioCard from "../components/portfolioCard";
import { fetchStocks } from "../db/database";

export default Portfolio = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetchStocks()
        .then((response) => setPortfolio(response))
        .catch((error) => console.log(error));
    }

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <View style={GlobalStyles.container}>
      <View style={{ alignItems: "center" }}>
        <CustomButton
          title="Add stock"
          onPress={() => navigation.navigate("AddStock")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          gap: 20,
          marginTop: 10,
          paddingBottom: 20,
        }}
      >
        {portfolio.map((entry) => (
          <PortfolioCard
            name={entry.name}
            avg={entry.avg}
            key={entry.id}
            qty={entry.quantity}
            pl={entry.pl}
          />
        ))}
      </ScrollView>
    </View>
  );
};
