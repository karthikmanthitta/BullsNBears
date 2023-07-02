import { Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "../global/colors";

export default CustomButton = ({ onPress, title }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.secondary,
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { backgroundColor: "#12448a" },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
