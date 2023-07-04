import React, { Component, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../global/styles";
import { GlobalColors } from "../global/colors";
import DropdownComponent from "../components/dropdown";
import { getTotalBuySellAmt } from "../utils/calc";

export default PLReport = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const [tableData, setTableData] = useState(transactions);
  const tableHead = [
    "Name",
    "Date",
    "Total Buy Amt",
    "Total Sell Amt",
    "No. of shares",
    "P&L",
  ];

  const widthArr = [160, 160, 90, 90, 60, 90];

  const pl = (data, index) => {
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

  return (
    <View style={styles.main}>
      <View>
        <Text>P&L</Text>
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
      <View>
        <Text>P&L</Text>
      </View>
      {/* <View style={{ flexDirection: "row" }}> */}
      <DropdownComponent />
      <DropdownComponent />
      {/* </View> */}

      <View>
        <Text>P&L</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 40,
    gap: 10,
    backgroundColor: GlobalColors.light,
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
});
