import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { GlobalColors } from "../global/colors";

const DropdownComponent = ({
  label,
  val,
  data,
  onChange,
  reset,
  disableReset,
}) => {
  const [value, setValue] = useState(val);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "white" }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  useEffect(() => {
    if (reset) {
      setValue("");
      disableReset();
    }
  }, [reset]);

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `Select ${label.toLowerCase()}` : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setValue(item.value);
          setIsFocus(false);
        }}
        itemTextStyle={{ color: "white", fontFamily: "ubuntu-reg" }}
        containerStyle={{ backgroundColor: GlobalColors.primary }}
        activeColor={GlobalColors.purple}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.light,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: GlobalColors.primary,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "white",
    borderRadius: 10,
    fontFamily: "ubuntu-reg",
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "ubuntu-reg",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "ubuntu-reg",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "white",
    fontFamily: "ubuntu-reg",
  },
});
