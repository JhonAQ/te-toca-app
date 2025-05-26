import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TicketScreen = ({ route, navigation }) => {
  const { queueType, company, ticketNumber } = route.params;
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const togglePause = () => {
    setIsPaused(!isPaused);
    Alert.alert(
      isPaused ? "Ticket reanudado" : "Ticket pausado",
      isPaused
        ? "Tu lugar en la fila ha sido restablecido."
        : "Tu lugar en la fila se mantendrá, pero no avanzarás hasta que reanudes.",
      [{ text: "OK" }]
    );
  };

  const confirmCancel = () => {
    setShowModal(true);
  };

  const cancelTicket = () => {
    setShowModal(false);
    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tu Ticket</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.ticketContainer}>
        <View style={styles.ticketHeader}>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.queueType}>{queueType.type}</Text>
        </View>

        <View style={styles.ticketBody}>
          <Text style={styles.ticketLabel}>Tu número</Text>
          <Text style={styles.ticketNumber}>{ticketNumber}</Text>

          <View style={styles.ticketInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Turno actual</Text>
              <Text style={styles.infoValue}>A-43</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Personas delante</Text>
              <Text style={styles.infoValue}>{parseInt(ticketNumber.split('-')[1]) - 43}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tiempo estimado</Text>
              <Text style={styles.infoValue}>{parseInt(ticketNumber.split('-')[1]) - 43 <= 0 ? "0 min" : ((parseInt(ticketNumber.split('-')[1]) - 43) * 5) + " min"}</Text>
            </View>
          </View>

          <View style={[styles.statusBadge, isPaused && styles.pausedBadge]}>
            <View
              style={[
                styles.statusIndicator,
                isPaused ? styles.pausedIndicator : styles.activeIndicator,
              ]}
            />
            <Text style={styles.statusText}>
              {isPaused ? "Pausado" : "Activo"}
            </Text>
          </View>

          <Text style={styles.notificationText}>
            Recibirás una notificación cuando falten 3 turnos para el tuyo
          </Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, isPaused && styles.resumeButton]}
          onPress={togglePause}
        >
          <Ionicons
            name={isPaused ? "play" : "pause"}
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.actionButtonText}>
            {isPaused ? "Reanudar turno" : "Pausar turno"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={confirmCancel}
        >
          <Ionicons name="close-circle" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.actionButtonText}>Cancelar turno</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Ionicons name="home" size={20} color="#3498db" style={styles.buttonIcon} />
        <Text style={styles.dashboardButtonText}>Ir al Dashboard</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="warning" size={50} color="#e74c3c" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>¿Cancelar turno?</Text>
            <Text style={styles.modalText}>
              Si cancelas perderás tu lugar en la fila. ¿Estás seguro?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalCancelText}>No, mantener</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={cancelTicket}
              >
                <Text style={styles.modalConfirmText}>Sí, cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ticketContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
  ticketHeader: {
    backgroundColor: "#3498db",
    padding: 20,
    alignItems: "center",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  queueType: {
    fontSize: 14,
    color: "#e1f0fa",
  },
  ticketBody: {
    padding: 25,
    alignItems: "center",
  },
  ticketLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  ticketNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 25,
  },
  ticketInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e1f9e3",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  pausedBadge: {
    backgroundColor: "#fef1e6",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  activeIndicator: {
    backgroundColor: "#2ecc71",
  },
  pausedIndicator: {
    backgroundColor: "#e67e22",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  notificationText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#3498db",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  resumeButton: {
    backgroundColor: "#2ecc71",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
  },
  buttonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  dashboardButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  dashboardButtonText: {
    color: "#3498db",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    width: "80%",
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalCancelButton: {
    backgroundColor: "#f1f2f6",
  },
  modalConfirmButton: {
    backgroundColor: "#e74c3c",
  },
  modalCancelText: {
    color: "#666",
    fontWeight: "bold",
  },
  modalConfirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TicketScreen;
