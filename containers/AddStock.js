import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import { useState } from "react";
import CustomButton from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { addStock } from "../db/database";

export const AddStock = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [avg, setAvg] = useState("");
  const [qty, setQty] = useState();
  const [pl, setPL] = useState();
  const [error, setError] = useState({});

  async function addStockHandler() {
    if (formIsValid()) {
      let payload = {
        name: name.toUpperCase(),
        qty,
        avg,
        pl,
      };

      await addStock(payload)
        .then((response) => {
          Alert.alert("Success", "Stock added to portfolio successfully", [
            { text: "OK", onPress: () => navigation.navigate("Home") },
          ]);
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            "Failed",
            "Failure in submission. Please try again after some time",
            [{ text: "OK", onPress: () => navigation.navigate("Home") }]
          );
        });
    } else {
      Alert.alert("Error", "Please check all inputs");
    }
  }

  const formIsValid = () => {
    let err = {};
    if (name === undefined || name === "") {
      err = { ...err, name: true };
    }
    if (qty === undefined || qty === "") {
      err = { ...err, qty: true };
    }
    if (avg === undefined || avg === "") {
      err = { ...err, avg: true };
    }
    setError(err);
    return Object.keys(err).length === 0;
  };

  return (
    <ScrollView
      style={GlobalStyles.container}
      contentContainerStyle={{ paddingBottom: "25%" }}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.formElem}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={[
            styles.input,
            error.name && { backgroundColor: GlobalColors.error },
          ]}
          value={name}
          onChangeText={(text) => setName(text)}
          selectionColor="white"
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Average price per share</Text>
        <TextInput
          style={[
            styles.input,
            error.avg && { backgroundColor: GlobalColors.error },
          ]}
          value={avg}
          onChangeText={(text) => setAvg(text)}
          keyboardType="number-pad"
          selectionColor="white"
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Number of shares</Text>
        <TextInput
          style={[
            styles.input,
            error.qty && { backgroundColor: GlobalColors.error },
          ]}
          value={qty}
          onChangeText={(text) => setQty(text)}
          keyboardType="number-pad"
          selectionColor="white"
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Current P&L</Text>
        <Text style={[styles.text, { fontSize: 14 }]}>
          Please enter (-) in case of negative value
        </Text>
        <TextInput
          style={styles.input}
          value={pl}
          onChangeText={(text) => setPL(text)}
          keyboardType="number-pad"
          selectionColor="white"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 20, marginTop: 60 }}>
        <CustomButton
          title="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <CustomButton title="Add" onPress={addStockHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalColors.primary,
    fontSize: 18,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  input: {
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
});
