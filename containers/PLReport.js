import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import DropdownComponent from "../components/dropdown";
import {
  applyCustomPeriodFilter,
  applyPredefinedPeriodFilter,
  getTotalBuySellAmt,
  prepareDataObj,
} from "../utils/calc";
import CustomButton from "../components/button";
import { RadioButton } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";

const period = [
  { label: "Today", value: "today" },
  { label: "This week", value: "week" },
  { label: "This month", value: "month" },
  { label: "This year", value: "year" },
];

export default PLReport = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const stockNames = useSelector((state) => state.transactions.stockNames);
  const [tableData, setTableData] = useState(transactions);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [checked, setChecked] = useState("pre");
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDay, setStartDay] = useState(new Date().toDateString());
  const [endDay, setEndDay] = useState(new Date().toDateString());
  const tableHead = [
    "Name",
    "Date",
    "Total Buy Amt",
    "Total Sell Amt",
    "No. of shares",
    "P&L",
  ];

  const widthArr = [160, 160, 90, 90, 60, 90];

  const pl = (data) => {
    return (
      <Text
        style={{
          textAlign: "center",
          color:
            data !== null && data > 0 ? "green" : data < 0 ? "red" : "black",
        }}
      >
        {data}
      </Text>
    );
  };

  const applyFilters = () => {
    let finalData = transactions;
    if (selectedName.length !== 0) {
      finalData = finalData.filter((data) => data.name === selectedName);
    }
    if (selectedPeriod.length !== 0 && checked === "pre") {
      finalData = applyPredefinedPeriodFilter(finalData, selectedPeriod);
    }
    if (checked === "custom") {
      finalData = applyCustomPeriodFilter(finalData, startDay, endDay);
    }
    setTableData(finalData);
  };

  const resetPeriodParams = () => {
    setShowCalendar(false);
    setStartDay(new Date().toDateString());
    setEndDay(new Date().toDateString());
    setSelectedPeriod("");
  };

  const handleDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDay(new Date(date).toDateString());
      setEndDay("");
    } else {
      setEndDay(new Date(date).toDateString());
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: GlobalColors.light,
        paddingHorizontal: 15,
        gap: 10,
      }}
      style={{ backgroundColor: GlobalColors.light }}
    >
      <View>
        <Text style={styles.header}>Filters</Text>
      </View>
      <View>
        <DropdownComponent
          label="Name"
          data={prepareDataObj(stockNames)}
          val={selectedName}
          onChange={(name) => setSelectedName(name)}
        />
        <View style={styles.flexRow}>
          <View style={[styles.flexRow, { alignItems: "center" }]}>
            <RadioButton
              value="pre"
              status={checked === "pre" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("pre");
                resetPeriodParams();
              }}
              color={GlobalColors.primary}
            />
            <Text style={styles.text}>Predefined period</Text>
          </View>
          <View style={[styles.flexRow, { alignItems: "center" }]}>
            <RadioButton
              value="custom"
              status={checked === "custom" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("custom");
                resetPeriodParams();
              }}
              color={GlobalColors.primary}
            />
            <Text style={styles.text}>Custom period</Text>
          </View>
        </View>
        {checked === "pre" ? (
          <DropdownComponent
            label="Period"
            data={period}
            val={selectedPeriod}
            onChange={(period) => setSelectedPeriod(period)}
          />
        ) : (
          <>
            <Pressable
              onPress={() => setShowCalendar(!showCalendar)}
              style={({ pressed }) => [
                {
                  color: pressed ? "dark-blue" : "blue",
                },
                { marginVertical: 10 },
              ]}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "blue",
                  textAlign: "center",
                }}
              >
                {showCalendar ? "Close" : "Select date range"}
              </Text>
            </Pressable>
            <View style={{ backgroundColor: GlobalColors.primary }}>
              {showCalendar && (
                <CalendarPicker
                  width={Dimensions.get("window").width - 40}
                  onDateChange={handleDateChange}
                  textStyle={{ color: "white" }}
                  selectedDayColor="white"
                  selectedDayTextColor={GlobalColors.primary}
                  todayBackgroundColor={GlobalColors.purple}
                  maxDate={new Date()}
                  allowRangeSelection
                />
              )}
            </View>
            <View style={styles.flexRow}>
              <View style={styles.formElem2}>
                <Text style={{ textAlign: "left" }}>From</Text>
                <TextInput
                  style={styles.input}
                  value={new Date(startDay).toDateString()}
                  editable={false}
                />
              </View>
              <View style={styles.formElem2}>
                <Text style={{ textAlign: "left" }}>To</Text>
                <TextInput
                  style={styles.input}
                  value={new Date(endDay).toDateString()}
                  editable={false}
                />
              </View>
            </View>
          </>
        )}
        <View
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginVertical: 20,
          }}
        >
          <CustomButton title="Apply filters" onPress={applyFilters} />
        </View>
      </View>
      <View>
        <Text style={styles.header}>Overview</Text>
      </View>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderColor: "#C1C0B9" }}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.head}
                textStyle={styles.headerText}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                {tableData.map((trx, index) => (
                  <Row
                    key={index}
                    data={[
                      trx.name,
                      trx.date,
                      getTotalBuySellAmt(
                        trx.type,
                        trx.pl,
                        trx.net,
                        trx.quantity
                      )[0] * trx.quantity,
                      getTotalBuySellAmt(
                        trx.type,
                        trx.pl,
                        trx.net,
                        trx.quantity
                      )[1] * trx.quantity,
                      trx.quantity,
                      pl(trx.pl),
                    ]}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#ffffff" },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: GlobalColors.light,
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {
    padding: 0,
    backgroundColor: GlobalColors.light,
  },
  head: {
    height: 50,
    backgroundColor: GlobalColors.secondary,
  },
  text: {
    textAlign: "center",
    fontWeight: 400,
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontWeight: 600,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#F7F8FA",
  },
  header: {
    fontWeight: 600,
    fontSize: 16,
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: GlobalColors.purple,
    color: "white",
    borderRadius: 10,
    paddingLeft: 10,
  },
  formElem2: { marginTop: 20, width: "50%", paddingHorizontal: 5 },
});
