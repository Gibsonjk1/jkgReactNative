import { Header } from "@react-navigation/elements";
import { StyleSheet, Text, View } from "react-native";
import Footer from "../components/Footer";
import MountainHeader from "../components/Header";

export default function Index() {
  return (
    <View
      style={_styles.container}
    >
      <MountainHeader />
      <Header title="Home" />
      <Footer />
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 40,
    alignItems: "center",
    backgroundColor: 'lightblue',
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
