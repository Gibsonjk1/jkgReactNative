import { Pressable, StyleSheet, Text, View } from "react-native";

const Footer = () => {
  return (
    <View style={_styles.footer}>
      <Pressable style={_styles.button} onPress={() => console.log("Contact Us button pressed")}>
        <Text style={_styles.text}>Contact Us</Text>
      </Pressable>
    </View>
  );
};

const _styles = StyleSheet.create({
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#7A7978',
    height: 90,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  }
});

export default Footer;
