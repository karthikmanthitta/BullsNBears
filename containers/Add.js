import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import CustomButton from "../components/button";
import { useNavigation } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import { adjustPortfolio, buyTrans, sellTrans } from "../utils/calc";
import AutocompleteInput from "react-native-autocomplete-input";
import { addTransaction, fetchStocks } from "../db/database";
import { useSelector } from "react-redux";

export const Add = () => {
  const navigation = useNavigation();
  const datas = useSelector((state) => state.transactions.stockNames).map(
    (stock) => stock.name
  );
  const [name, setName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date().toDateString());
  const [qty, setQty] = useState();
  const [totalAmt, setTotalAmt] = useState();
  const [taxAmt, setTaxAmt] = useState();
  const [brokerage, setBrokerage] = useState();
  const [checked, setChecked] = useState("buy");
  const [error, setError] = useState({});

  async function addTransactionHandler() {
    if (await formIsValid()) {
      let netAmt =
        checked === "buy"
          ? buyTrans(totalAmt, taxAmt, brokerage)
          : sellTrans(totalAmt, taxAmt, brokerage);
      let payload = {
        name: name.toUpperCase(),
        date,
        type: checked,
        qty,
        netAmt,
        taxAmt,
        brokerage,
      };

      await addTransaction(payload)
        .then((response) => {
          Alert.alert("Success", "Transaction added successfully", [
            { text: "OK", onPress: () => navigation.navigate("Home") },
          ]);
          adjustPortfolio(payload);
        })
        .catch((error) => {
          Alert.alert(
            "Failed",
            "Failure in submission. Please try again after some time",
            [{ text: "OK", onPress: () => navigation.navigate("Home") }]
          );
        });
    }
  }

  async function formIsValid() {
    let err = {};
    if (name === undefined || name === "") {
      err = { ...err, name: true };
    }
    if (qty === undefined || qty === "") {
      err = { ...err, qty: true };
    }
    if (totalAmt === undefined || totalAmt === "") {
      err = { ...err, totalAmt: true };
    }
    if (taxAmt === undefined || taxAmt === "") {
      err = { ...err, taxAmt: true };
    }
    if (brokerage === undefined || brokerage === "") {
      err = { ...err, brokerage: true };
    }
    const stocks = await fetchStocks();
    const availableQty = stocks.filter((stock) => stock.name === name)[0]
      ?.quantity;
    if (
      availableQty !== undefined &&
      checked === "sell" &&
      qty > availableQty
    ) {
      Alert.alert(
        "Insufficient stocks",
        `You have only ${availableQty} shares of ${name}`
      );
      err = { ...err, qty: true };
    }
    if (
      checked === "sell" &&
      (availableQty === undefined || availableQty === 0)
    ) {
      Alert.alert("Error", `You have no shares of ${name} to sell yet`);
      err = { ...err, type: true };
    }
    if (taxAmt + brokerage > totalAmt) {
      Alert.alert(
        "Error",
        "Sum of tax and brokerage cannot exceed total transaction amount"
      );
      err = { ...err, totalAmt: true, taxAmt: true, brokerage: true };
    }
    setError(err);
    return Object.keys(err).length === 0;
  }

  const filterData = (input) => {
    setNameList(
      datas.filter(
        (item) => item.toLowerCase().indexOf(input.toLowerCase()) !== -1
      )
    );
  };

  return (
    <ScrollView
      style={GlobalStyles.container}
      contentContainerStyle={{ paddingBottom: "25%" }}
      keyboardShouldPersistTaps="always"
    >
      <View style={[styles.formElem, { flex: 1 }]}>
        <Text style={styles.text}>Name</Text>
        <AutocompleteInput
          inputContainerStyle={{ borderColor: GlobalColors.light }}
          style={[
            styles.input,
            name !== "" &&
              nameList.length !== 0 && {
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              },
            error.name && { backgroundColor: GlobalColors.error },
          ]}
          data={nameList}
          value={name}
          defaultValue=""
          onChangeText={(name) => {
            setName(name);
            filterData(name);
          }}
          onBlur={() => setNameList([])}
          onFocus={() => filterData(name)}
          renderResultList={() => {
            return name === "" ? null : (
              <View style={{ backgroundColor: GlobalColors.secondary }}>
                {nameList.map((name) => (
                  <Pressable
                    onPress={() => {
                      setName(name);
                      setNameList([]);
                    }}
                    style={{
                      paddingLeft: 10,
                      paddingVertical: 10,
                    }}
                    key={name}
                  >
                    <Text style={{ color: "white" }}>{name}</Text>
                  </Pressable>
                ))}
              </View>
            );
          }}
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Date</Text>
        <View style={[styles.flexRow, { gap: 30, alignItems: "center" }]}>
          <Pressable
            onPress={() => setShowCalendar(!showCalendar)}
            style={({ pressed }) => [
              {
                color: pressed ? "dark-blue" : "blue",
              },
            ]}
          >
            <Text style={{ textDecorationLine: "underline", color: "blue" }}>
              Select date
            </Text>
          </Pressable>
          <TextInput
            style={styles.input}
            value={new Date(date).toDateString()}
            editable={false}
          />
        </View>
        {showCalendar && (
          <View
            style={{ backgroundColor: GlobalColors.primary, marginTop: 20 }}
          >
            <CalendarPicker
              width={350}
              onDateChange={(date) => {
                setDate(new Date(date).toDateString());
                setShowCalendar(false);
              }}
              textStyle={{ color: "white" }}
              selectedDayColor="white"
              selectedDayTextColor={GlobalColors.primary}
              todayBackgroundColor={GlobalColors.purple}
              maxDate={new Date()}
            />
          </View>
        )}
      </View>
      <View style={styles.flexRow}>
        <View style={styles.formElem2}>
          <Text style={[styles.text, error.type && { color: "red" }]}>
            Type
          </Text>
          <View style={styles.flexRow}>
            <View style={styles.flexRow}>
              <RadioButton
                value="buy"
                status={checked === "buy" ? "checked" : "unchecked"}
                onPress={() => setChecked("buy")}
                color={GlobalColors.primary}
              />
              <Text style={[styles.text, error.type && { color: "red" }]}>
                Buy
              </Text>
            </View>
            <View style={styles.flexRow}>
              <RadioButton
                value="sell"
                status={checked === "sell" ? "checked" : "unchecked"}
                onPress={() => setChecked("sell")}
                color={GlobalColors.primary}
              />
              <Text style={[styles.text, error.type && { color: "red" }]}>
                Sell
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Quantity</Text>
          <TextInput
            style={[
              styles.input,
              error.qty && { backgroundColor: GlobalColors.error },
            ]}
            value={qty}
            onChangeText={(text) => setQty(text)}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Total transaction amount</Text>
        <TextInput
          style={[
            styles.input,
            error.totalAmt && { backgroundColor: GlobalColors.error },
          ]}
          value={totalAmt}
          onChangeText={(text) => setTotalAmt(text)}
          keyboardType="decimal-pad"
        />
      </View>
      <View style={styles.flexRow}>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Tax amt.</Text>
          <TextInput
            style={[
              styles.input,
              { width: "90%" },
              error.taxAmt && { backgroundColor: GlobalColors.error },
            ]}
            value={taxAmt}
            onChangeText={(text) => setTaxAmt(text)}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.formElem2}>
          <Text style={styles.text}>Brokerage amt.</Text>
          <TextInput
            style={[
              styles.input,
              error.brokerage && { backgroundColor: GlobalColors.error },
            ]}
            value={brokerage}
            onChangeText={(text) => setBrokerage(text)}
            keyboardType="decimal-pad"
          />
        </View>
      </View>
      {Object.keys(error).length > 0 && (
        <View style={[styles.formElem, { flex: 1 }]}>
          <Text style={[styles.text, { color: "red" }]}>
            Please check all inputs
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "row", gap: 20, marginTop: 60 }}>
        <CustomButton
          title="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <CustomButton title="Add" onPress={addTransactionHandler} />
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
