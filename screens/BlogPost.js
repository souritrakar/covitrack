import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BlogPost() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "NunitoSans_700Bold", fontSize: 30 }}>
        Create post
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
