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
  const transactions = useSelector((state) => state.transactions.transactions);

  const allTrx = transactions.filter((trx) => trx.name === stock.name);

  return (
    <View style={GlobalStyles.container}>
      <View style={{ paddingHorizontal: 30 }}>
        <View style={styles.formElem}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>{stock.name}</Text>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.formElem2}>
            <Text style={styles.text}>Avg. price</Text>
            <Text style={styles.text}>{stock.avg.toLocaleString("en-IN")}</Text>
          </View>
          <View style={styles.formElem2}>
            <Text style={styles.text}>Investment value</Text>
            <Text style={styles.text}>{stock.inv.toLocaleString("en-IN")}</Text>
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
                  stock.pl !== null
                    ? stock.pl > 0
                      ? "green"
                      : "red"
                    : "black",
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
        {allTrx.map((entry) => (
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
    fontFamily: "ubuntu-reg",
  },
});
