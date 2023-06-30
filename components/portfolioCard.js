import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../global/colors";

export default PortfolioCard = ({ name, avg, qty, pl }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      // onPress={onPress}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>
          P&L:{" "}
          {+pl > 0 ? (
            <Text style={{ color: "green" }}>{+pl}</Text>
          ) : +pl === 0 ? (
            <Text>{+pl}</Text>
          ) : (
            <Text style={{ color: "red" }}>{+pl}</Text>
          )}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Quantity: {qty}</Text>
        <Text style={styles.text}>Inv value: {+avg * +qty}</Text>
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
    fontSize: 18,
  },
  pressed: { backgroundColor: "#12448a" },
  chip: { marginRight: 10 },
});
