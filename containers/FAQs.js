import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import { useNavigation } from "@react-navigation/native";

export default FAQ = () => {
  const navigation = useNavigation();
  return (
    <View style={GlobalStyles.container}>
      <View>
        <Text style={styles.title}>Where do I add a new transaction?</Text>
        <Text style={styles.text}>
          You can add a new transaction{" "}
          <Text
            style={[styles.text, styles.hyperlink]}
            onPress={() => navigation.navigate("Add")}
          >
            here
          </Text>
          .
        </Text>
      </View>
      <View>
        <Text style={styles.title}>
          Where do I add a new stock to my portfolio?
        </Text>
        <Text style={styles.text}>
          You can add a new stock{" "}
          <Text
            style={[styles.text, styles.hyperlink]}
            onPress={() => navigation.navigate("AddStock")}
          >
            here
          </Text>
          .
        </Text>
      </View>
      <View>
        <Text style={styles.title}>
          Do I need to add the stock to my portfolio after every transaction?
        </Text>
        <Text style={styles.text}>
          No, setting up your portfolio is a one time setup process. Portfolio
          will later on be adjusted according to your transactions.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: GlobalColors.primary, fontSize: 16, fontWeight: 400 },
  title: { color: GlobalColors.primary, fontSize: 18, fontWeight: 600 },
  hyperlink: { textDecorationLine: "underline", color: "blue" },
});
