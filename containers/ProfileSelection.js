import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import Card from "../components/card";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../global/styles";
import { profiles } from "../dummy";

const ProfileSelection = () => {
  const navigation = useNavigation();

  pressHandler = () => {
    Alert.alert("Attention!", "Key was pressed");
  };

  selectionHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <Text style={styles.title}>Select profile</Text>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{gap:30, paddingBottom:20}}>
          {profiles.map((name) => (
            <Card
              icon={<IonIcon name="person" size={60} color={"white"} />}
              body={name}
              onPress={selectionHandler}
              key={name}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileSelection;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  title: { fontSize: 18, fontWeight: 600 },
  body: { marginTop: 15 },
});
