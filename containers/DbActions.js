import { Alert, View } from "react-native";
import { GlobalStyles } from "../global/styles";
import CustomButton from "../components/button";
import {
  deletePortfolio,
  deleteTransactions,
  dropPortfolioTable,
  dropTrxTable,
} from "../db/database";

export const DbActions = () => {
  return (
    <View style={[GlobalStyles.container, { alignItems: "center" }]}>
      <CustomButton
        title="Delete transactions"
        onPress={() =>
          deleteTransactions()
            .then((response) =>
              Alert.alert("SUCCESS", "Transactions deleted successfuly")
            )
            .catch((error) =>
              Alert.alert("ERROR", "Error while deleting transactions")
            )
        }
      />
      <CustomButton
        title="Delete portfolio"
        onPress={() =>
          deletePortfolio()
            .then((response) =>
              Alert.alert("SUCCESS", "Portfolio deleted successfuly")
            )
            .catch((error) =>
              Alert.alert("ERROR", "Error while deleting portfolio")
            )
        }
      />
      <CustomButton
        title="Drop table transaction"
        onPress={() =>
          dropTrxTable()
            .then((response) =>
              Alert.alert("SUCCESS", "Transactions table deleted successfuly")
            )
            .catch((error) =>
              Alert.alert("ERROR", "Error while deleting transactions table")
            )
        }
      />
      <CustomButton
        title="Drop table portfolio"
        onPress={() =>
          dropPortfolioTable()
            .then((response) =>
              Alert.alert("SUCCESS", "Portfolio table deleted successfuly")
            )
            .catch((error) =>
              Alert.alert("ERROR", "Error while deleting portfolio table")
            )
        }
      />
    </View>
  );
};
