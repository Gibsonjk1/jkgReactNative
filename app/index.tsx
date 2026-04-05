import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./UserContext";
const theMountain = require("../assets/images/theMountain.jpg");

export default function Index() {
  const userData = useContext(UserContext);
  const name = userData?.profile?.firstName ?? "Random Customer";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Mountain</Text>
      <Text style={styles.subtitle}>{name}</Text>
      <Image source={theMountain} style={styles.image} resizeMode="cover" />
      <Text style={styles.body}>
        Discover your fitness potential with our personalized workout plans.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#222",
    textAlign: "center",
  },
});
