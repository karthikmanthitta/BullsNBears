import { StyleSheet, Text, View } from "react-native";

export default Chip = ({ content, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    borderRadius: 10,
  },
  text: { color: "white" },
});
