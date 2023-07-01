import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../global/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalColors } from "../global/colors";
import { useSelector } from "react-redux";
import { TransactionCard } from "../components/transactionCard";

export default StockDetails = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const stock = params.stock;
  const transactions = useSelector((state) =>
    state.transactions.transactions.filter((trx) => trx.name === stock.name)
  );
  console.log(stock);
  console.log(transactions);

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.flexRow}>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>{stock.name}</Text>
        </View>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Investment value</Text>
          <Text style={styles.text}>{stock.inv.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Quantity</Text>
          <Text style={styles.text}>{stock.quantity}</Text>
        </View>
        <View style={styles.formElem2}>
          <Text style={styles.text}>P&L</Text>
          <Text
            style={{
              color:
                stock.pl !== null ? (stock.pl > 0 ? "green" : "red") : "black",
              fontSize: 18,
              fontWeight: 500,
              alignSelf: "flex-start",
            }}
          >
            {stock.pl === null || stock.pl === 0
              ? 0
              : stock.pl.toLocaleString("en-IN")}
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.text, { alignSelf: "center", marginTop: 20 }]}>
          Recent transactions
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          gap: 20,
          marginTop: 10,
          paddingBottom: 20,
        }}
      >
        {transactions.map((entry) => (
          <TransactionCard
            name={entry.name}
            date={entry.date}
            id={entry.id}
            key={entry.id}
            type={entry.type}
            net={entry.net}
            onPress={() => {
              navigation.navigate("TransDetails", { transaction: entry });
            }}
            isStockDetailsSection
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: GlobalColors.secondary,
    width: "100%",
    height: 40,
    backgroundColor: GlobalColors.purple,
    color: "white",
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  formElem: { marginTop: 20, width: "100%" },
  formElem2: { marginTop: 20, width: "50%" },
  flexRow: {
    flexDirection: "row",
  },
  text: {
    color: GlobalColors.primary,
    fontSize: 18,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
});
