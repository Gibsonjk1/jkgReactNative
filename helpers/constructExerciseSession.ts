export type ExerciseItem = {
  id: string;
  name: string;
  reps: number;
  bodyRegion?: string;
  original?: any;
};

export default function exerciseConstructor(
  exerciseData: any[],
  userData: any,
): ExerciseItem[] {
  const focusRegion = userData
    ? (userData.activity?.nextSessionFocus ?? "upper_body")
    : "upper_body";

  const exercisesInRegion = Array.isArray(exerciseData)
    ? exerciseData.filter((item: any) => item.bodyRegion === focusRegion)
    : [];

  function getUserStrength(muscleId: string): number {
    if (!userData?.strengthProfile) {
      return 0;
    }
    const { upperBody, core, lowerBody } = userData.strengthProfile;
    const muscle =
      upperBody?.find((m: any) => m.muscleId === muscleId) ??
      core?.find((m: any) => m.muscleId === muscleId) ??
      lowerBody?.find((m: any) => m.muscleId === muscleId);
    return muscle?.strength ?? 0;
  }

  const strengthMatchedExercises = exercisesInRegion.filter((exercise: any) => {
    if (!exercise.strengthProfile || exercise.strengthProfile.length === 0) {
      return true;
    }

    return exercise.strengthProfile.some((muscle: any) => {
      const userStrength = getUserStrength(muscle.muscleId);
      return (
        userStrength >= muscle.minStrength && userStrength <= muscle.maxStrength
      );
    });
  });

  const exerciseSessionLength: number =
    userData?.preferences?.workoutDurationMinutes ?? 30;

  function shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const uniqueExercises = Array.from(
    new Map(
      strengthMatchedExercises.map((exercise: any) => [
        exercise.id?.toString() ?? exercise.name ?? JSON.stringify(exercise),
        exercise,
      ]),
    ).values(),
  );

  const shuffledExercises = shuffleArray(uniqueExercises);

  const randomExercises = shuffledExercises.slice(
    0,
    Math.min(exerciseSessionLength, shuffledExercises.length),
  );

  const finalExerciseList: ExerciseItem[] = randomExercises.map(
    (exercise: any) => {
      const primaryMuscles = Array.isArray(exercise.strengthProfile)
        ? exercise.strengthProfile.filter(
            (muscle: any) => muscle.role === "primary",
          )
        : [];

      let strengthProfile = 0;
      primaryMuscles.forEach((muscle: any) => {
        const userStrength = getUserStrength(muscle.muscleId);
        const minStrength = muscle.minStrength ?? 0;
        const maxStrength = muscle.maxStrength ?? 1;
        const range = maxStrength - minStrength || 1;
        strengthProfile += (userStrength - minStrength) / range;
      });

      const difficultyRatio =
        primaryMuscles.length > 0
          ? strengthProfile / primaryMuscles.length
          : 0.5;
      const reps = Math.max(Math.round(10 * difficultyRatio + 1.65), 1);

      return {
        id:
          exercise.id?.toString() ?? exercise.name ?? Math.random().toString(),
        name: exercise.name ?? "Unnamed exercise",
        reps,
        bodyRegion: exercise.bodyRegion,
        original: exercise,
      };
    },
  );

  return finalExerciseList;
}
