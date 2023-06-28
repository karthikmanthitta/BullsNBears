import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/button";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import axios from "axios";

const Welcome = () => {
  const navigation = useNavigation();

  nameChangeHandler = (enteredName) => {
    setName(enteredName);
  };

  pressHandler = () => {
    navigation.navigate("ProfileSelection");
  };

  testHandler = () => {
    // axios
    //   .get(
    //     "https://stock-tracker-test-default-rtdb.firebaseio.com/test.json"
    //   )
    //   .then((response) => console.log(Object.values(response.data)));
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <Text style={styles.text}>Please proceed to profile selection</Text>
      <CustomButton onPress={pressHandler} title="Select profile" />
      <CustomButton onPress={testHandler} title="TEST" />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    alignItems: "center",
  },
  text: { color: GlobalColors.primary, fontSize: 18, fontWeight: 600 },
});
