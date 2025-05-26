import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Cambiamos a Ionicons

const ConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmación</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.confirmationCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={70} color="#2ecc71" />
        </View>
        <Text style={styles.confirmationTitle}>¡Turno reservado!</Text>
        <Text style={styles.confirmationText}>
          Tu turno ha sido registrado exitosamente
        </Text>

        <View style={styles.turnInfoContainer}>
          <View style={styles.turnInfoItem}>
            <Text style={styles.turnInfoLabel}>Número de turno</Text>
            <Text style={styles.turnInfoValue}>A-45</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.turnInfoItem}>
            <Text style={styles.turnInfoLabel}>Tiempo estimado</Text>
            <Text style={styles.turnInfoValue}>15 min</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle"
            size={20}
            color="#3498db"
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Recibirás una notificación cuando falten 3 turnos para el tuyo
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.buttonText}>Volver al Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("Notification")}
        >
          <Text style={styles.secondaryButtonText}>
            Ver simulación de notificación
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  confirmationCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2ecc71",
  },
  confirmationText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },
  turnInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 25,
  },
  turnInfoItem: {
    alignItems: "center",
    flex: 1,
  },
  turnInfoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  turnInfoValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  infoBox: {
    backgroundColor: "#f1f9fe",
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    color: "#2980b9",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3498db",
  },
  secondaryButtonText: {
    color: "#3498db",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ConfirmationScreen;
