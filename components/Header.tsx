import { StyleSheet, Text, View } from "react-native";

const MountainHeader = () => {
  return (
    <View style={_styles.header}>
      <Text style={_styles.text}>Welcome to Mountain Men!</Text>
    </View>
  );
}

const _styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#7A7978',
    height: 90,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
  },
  });

  export default MountainHeader;