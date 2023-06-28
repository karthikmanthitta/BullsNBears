import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../global/styles";
import CustomButton from "../components/button";
import { TransactionCard } from "../components/transactionCard";
import { transactions as dummy } from "../dummy";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { setTransactions } from "../store/transaction";
import { fetchTransactions } from "../db/database";

export const Home = () => {
  const allTransactions = useSelector(
    (state) => state.transactions.transactions
  );
  const dispatch = useDispatch();
  const { params } = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    async function fetchData() {
      await fetchTransactions()
        .then((response) =>
          dispatch(setTransactions({ transactions: response }))
        )
        .catch((error) => console.log(error));
    }

    fetchData();
  }, [allTransactions]);

  const addHandler = () => {
    let names = [];
    allTransactions.forEach((tx) => names.push(tx.name));
    navigation.navigate("Add", { names });
  };

  return (
    <View style={[GlobalStyles.container, {}]}>
      <View style={styles.buttons}>
        <CustomButton
          title="All transactions"
          onPress={() => {
            navigation.navigate("AllTrans");
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
        {allTransactions.map((entry) => (
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
