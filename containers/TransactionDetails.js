import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import { useRoute } from "@react-navigation/native";

export const TransactionDetails = () => {
  const { params } = useRoute();
  const transaction = params.transaction;

  const calculateShareValue = () => {
    const [type, net, tax, bkg] = [
      transaction.type,
      transaction.net,
      transaction.tax,
      transaction.brokerage,
    ];
    return type.toUpperCase() === "BUY" ? net - tax - bkg : net + tax + bkg;
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.formElem}>
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>{transaction.name}</Text>
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Date</Text>
        <Text style={styles.text}>{transaction.date}</Text>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Type</Text>
          <Text style={styles.text}>{transaction.type.toUpperCase()}</Text>
        </View>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Quantity</Text>
          <Text style={styles.text}>{transaction.quantity}</Text>
        </View>
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Share value</Text>
        <Text style={styles.text}>{calculateShareValue()}</Text>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Tax amt.</Text>
          <Text style={styles.text}>{transaction.tax}</Text>
        </View>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Brokerage amt.</Text>
          <Text style={styles.text}>{transaction.brokerage}</Text>
        </View>
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>
          {transaction.type.toUpperCase() === "BUY"
            ? "Total amount spent"
            : "Total amount received"}
        </Text>
        <Text style={styles.text}>{transaction.net}</Text>
      </View>
      {/* <View style={{ flexDirection: "row", gap: 20, marginTop: 60 }}>
        <CustomButton
          title="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <CustomButton title="Add" onPress={addTransactionHandler} />
      </View> */}
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
