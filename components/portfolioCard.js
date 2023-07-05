import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../global/colors";
import { useNavigation } from "@react-navigation/native";

export default PortfolioCard = ({ name, avg, qty, pl }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    let obj = { name, quantity: qty, inv: +qty * +avg, pl, avg };
    navigation.navigate("StockDetails", { stock: obj });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={pressHandler}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>
          P&L:{" "}
          <Text
            style={{
              color: pl !== null ? (pl > 0 ? "green" : "red") : "white",
            }}
          >
            {pl === null || pl === 0 ? 0 : pl.toLocaleString("en-IN")}
          </Text>
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Quantity: {qty}</Text>
        <Text style={styles.text}>
          Inv value: {(+avg * +qty).toLocaleString("en-IN")}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.secondary,
    justifyContent: "center",
    height: 120,
    width: "100%",
    borderRadius: 20,
  },
  text: {
    color: "white",
    padding: 10,
    fontSize: 16,
    fontFamily: "ubuntu-reg",
  },
  pressed: { backgroundColor: "#12448a" },
  chip: { marginRight: 10 },
});
