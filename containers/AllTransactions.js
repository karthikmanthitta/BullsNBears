import { ScrollView } from "react-native";
import { GlobalStyles } from "../global/styles";
import { useSelector } from "react-redux";
import { TransactionCard } from "../components/transactionCard";
import { useNavigation } from "@react-navigation/native";

export default AllTransactions = () => {
  const navigation = useNavigation();
  const allTransactions = useSelector(
    (state) => state.transactions.transactions
  );

  return (
    <ScrollView
      style={[GlobalStyles.container, { paddingBottom: 100 }]}
      contentContainerStyle={{
        width: "100%",
        gap: 20,
        paddingBottom: 50,
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
  );
};
