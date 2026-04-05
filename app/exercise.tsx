import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import exerciseConstructor, {
  ExerciseItem,
} from "../helpers/constructExerciseSession";
import { UserContext } from "./UserContext";

const exerciseHeader = require("../assets/images/exerciseHeader.jpg");

export default function Exercise() {
  const router = useRouter();
  const userData = useContext(UserContext);
  const [exercises, setExercises] = useState<ExerciseItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const endpoint = "http://localhost:3000/exercise";
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const exerciseData = await res.json();
        const exerciseSession = exerciseConstructor(
          Array.isArray(exerciseData) ? exerciseData : [],
          userData ?? null,
        );
        setExercises(exerciseSession);
      } catch (err) {
        console.error(err);
        setError("Failed to load exercises.");
        setExercises([]);
      }
    };

    fetchExercises();
  }, [userData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercise</Text>
      <Image
        source={exerciseHeader}
        style={styles.headerImage}
        resizeMode="contain"
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : exercises === null ? (
        <Text style={styles.loadingText}>Loading exercises...</Text>
      ) : exercises.length === 0 ? (
        <Text style={styles.loadingText}>No exercises available.</Text>
      ) : (
        <View style={styles.exerciseList}>
          {exercises.map((exercise) => (
            <Text key={exercise.id} style={styles.exerciseItem}>
              • {exercise.name}: {exercise.reps} reps
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  headerImage: {
    width: "85%",
    maxWidth: 600,
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  exerciseList: {
    width: "100%",
    marginBottom: 24,
  },
  exerciseItem: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 8,
  },
  body: {
    width: "100%",
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  errorText: {
    fontSize: 16,
    color: "#c00",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#7A7978",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
