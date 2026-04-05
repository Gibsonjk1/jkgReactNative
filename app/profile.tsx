import { useContext } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { UserContext } from "./UserContext";

export default function Profile() {
  const userData = useContext(UserContext);
  const profile = userData?.profile;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>
        {profile ? `${profile.firstName} ${profile.lastName}` : "Unknown"}
      </Text>
      <Text style={styles.label}>Age</Text>
      <Text style={styles.value}>{profile?.age ?? "N/A"}</Text>
      <Text style={styles.label}>Height</Text>
      <Text style={styles.value}>{profile?.heightCm ?? "N/A"} cm</Text>
      <Text style={styles.label}>Weight</Text>
      <Text style={styles.value}>{profile?.weightKg ?? "N/A"} kg</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});
