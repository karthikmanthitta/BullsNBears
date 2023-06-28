import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../global/colors";

export default Card = ({ title, onPress, icon, body }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      {title && <Text style={styles.text}>{title}</Text>}
      <View>{icon}</View>
      <Text style={styles.text}>{body}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.secondary,
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    width: 160,
    borderRadius: 20,
  },
  text: {
    color: "white",
    padding: 10,
  },
  pressed: { backgroundColor: "#12448a" },
});
