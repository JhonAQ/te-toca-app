import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function QrCamScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>TE</Text>
        <MaterialCommunityIcons
          name="bell"
          size={36}
          color={colors.primary}
          style={styles.bellIcon}
        />
        <Text style={styles.logoTextBelow}>TOCA</Text>
      </View>

      <View style={styles.qrSection}>
        <View style={styles.qrPlaceholder} />
        <TouchableOpacity style={styles.cameraButton}>
          <MaterialCommunityIcons
            name="camera"
            size={32}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.instructionText}>
        Escanea el código QR del establecimiento para tomar tu turno
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 44,
    fontWeight: "bold",
    color: colors.text,
    fontFamily: "sans-serif",
    marginBottom: 0,
  },
  bellIcon: {
    marginVertical: 6,
  },
  logoTextBelow: {
    fontSize: 28,
    color: colors.text,
    marginTop: 0,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  qrSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: colors.lightGray,
    borderRadius: 24,
    borderWidth: 5,
    borderColor: colors.primary,
    marginBottom: 18,
  },
  cameraButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    elevation: 3,
  },
  instructionText: {
    color: colors.primary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 0,
    fontWeight: "500",
    lineHeight: 22,
    maxWidth: 260,
  },
});
