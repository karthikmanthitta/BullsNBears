import React, { Component, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../global/styles";

export default PLReport = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const tableHead = [
    "Name",
    "Date",
    "Total Buy",
    "Total Sell",
    "Quantity",
    "P&L",
  ];

  const widthArr = [160, 160, 100, 100, 60, 100];

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: "#C1C0B9" }}>
              {transactions.map((trx, index) => (
                <Row
                  key={index}
                  data={[
                    trx.name,
                    trx.date,
                    trx.brokerage,
                    trx.tax,
                    trx.quantity,
                    trx.pl,
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
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#ffffff",
  },
  head: {
    height: 50,
    backgroundColor: "#6F7BD9",
  },
  text: {
    textAlign: "center",
    fontWeight: "200",
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#F7F8FA",
  },
});
