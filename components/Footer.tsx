import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Footer = () => {
  const router = useRouter();
  return (
    <View style={_styles.footer}>
      <Pressable
        style={_styles.button}
        onPress={() => {
          router.push("/");
        }}
      >
        <Text style={_styles.text}>Home</Text>
      </Pressable>
      <Pressable
        style={_styles.button}
        onPress={() => {
          router.push("/exercise");
        }}
      >
        <Text style={_styles.text}>Exercise</Text>
      </Pressable>
      <Pressable
        style={_styles.button}
        onPress={() => {
          console.log("Profile button pressed");
        }}
      >
        <Text style={_styles.text}>Profile</Text>
      </Pressable>
    </View>
  );
};
const _styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#7A7978",
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
});
export default Footer;
