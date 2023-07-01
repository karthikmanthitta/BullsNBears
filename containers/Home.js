import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../global/styles";
import CustomButton from "../components/button";
import { TransactionCard } from "../components/transactionCard";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setTransactions, setStockNames } from "../store/transaction";
import { fetchStocks, fetchTransactions } from "../db/database";
import { useIsFocused } from "@react-navigation/native";
import { adjustPortfolio } from "../utils/calc";

export const Home = () => {
  const [recentTrx, setRecentTrx] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      await fetchTransactions()
        .then((response) => {
          dispatch(setTransactions({ transactions: sortData(response) }));
          getRecentTransactions(sortData(response));
          setNames();
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "Error while fetching transactions");
        });
    }

    if (isFocused) {
      fetchData();
      // adjustPortfolio({})
    }
  }, [isFocused]);

  const setNames = () => {
    fetchStocks()
      .then((response) => {
        let names = [];
        response.forEach((stock) => {
          names.push({ id: stock.id, name: stock.name });
        });
        dispatch(setStockNames({ names }));
      })
      .catch((error) => console.log(error));
  };

  const sortData = (data) => {
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getRecentTransactions = (trx) => {
    setRecentTrx(
      trx.filter((x) => new Date() - new Date(x.date) < 1000 * 60 * 60 * 24 * 7)
    );
  };

  const addHandler = () => {
    navigation.navigate("Add");
  };

  return (
    <View style={[GlobalStyles.container, {}]}>
      <View style={styles.buttons}>
        <CustomButton
          title="All transactions"
          onPress={() => {
            navigation.navigate("AllTransactions");
          }}
        />
        <CustomButton title="Add new" onPress={addHandler} />
      </View>
      <Text style={styles.title}>Recent transactions</Text>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          gap: 20,
          marginTop: 10,
          paddingBottom: 20,
        }}
      >
        {recentTrx.map((entry) => (
          <TransactionCard
            name={entry.name}
            date={entry.date}
            id={entry.id}
            key={entry.id}
            type={entry.type}
            onPress={() => {
              navigation.navigate("TransDetails", { transaction: entry });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 18, fontWeight: 600, marginTop: 10 },
  buttons: { flexDirection: "row", gap: 30 },
  test: { marginTop: 40 },
});
