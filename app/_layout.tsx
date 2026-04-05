import "@/global.css";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Footer from "../components/Footer";
import MountainHeader from "../components/Header";
import type { User } from "../interfaces/User";
import { UserContext } from "./UserContext";

const apiEndpoint =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/user/69ce8219833101096f3d7ed7"
    : "http://localhost:3000/user/69ce8219833101096f3d7ed7";

export default function RootLayout() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.warn("Failed to load user data", response.status);
        }
      } catch (error) {
        console.error("Unable to fetch user data", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={_styles.container}>
      <MountainHeader />
      <UserContext.Provider value={userData}>
        <Stack screenOptions={{ headerShown: false }} />
      </UserContext.Provider>
      <Footer />
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    width: "65%",
    minWidth: 300,
    alignSelf: "center",
    paddingHorizontal: 16,
    alignItems: "stretch",
    backgroundColor: "lightblue",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
