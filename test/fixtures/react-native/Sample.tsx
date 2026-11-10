import { useState } from "react";
import {
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
} from "react-native";

const styles = StyleSheet.create({
  zebra: { margin: 1 },
  apple: { padding: 2, color: "red" },
  unused: { flex: 1 },
});

export function Screen({ start }: { start: number }) {
  if (start > 0) {
    const [value] = useState(start);
    return <Text>{value}</Text>;
  }
  return (
    <View style={[styles.zebra]}>
      <View style={{ backgroundColor: "#fff", marginTop: 4 }}>raw text</View>
      <Text style={styles.apple}>ok</Text>
      <ActivityIndicatorIOS />
      <ProgressBarAndroid />
    </View>
  );
}
