import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QueueDetailsScreen = ({ route, navigation }) => {
  const { queueType, company } = route.params;

  // Datos simulados para el detalle de la cola
  const queueDetails = {
    currentNumber: "A-43",
    estimatedWaitingTime: queueType.estimatedTime,
    peopleWaiting: queueType.waitingPeople,
    averageServiceTime: "5 min",
    operatingHours: "8:00 - 17:00",
    status: "Activa",
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles de la cola</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.queueHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name={queueType.icon} size={32} color="#3498db" />
          </View>
          <View>
            <Text style={styles.queueType}>{queueType.type}</Text>
            <Text style={styles.companyName}>{company.name}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Estado</Text>
            <View style={styles.statusValueContainer}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusValue}>{queueDetails.status}</Text>
            </View>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Turno actual</Text>
            <Text style={styles.currentNumber}>{queueDetails.currentNumber}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="people" size={20} color="#3498db" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>{queueDetails.peopleWaiting}</Text>
              <Text style={styles.infoLabel}>Personas en espera</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="time" size={20} color="#3498db" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>{queueDetails.estimatedWaitingTime}</Text>
              <Text style={styles.infoLabel}>Tiempo de espera</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="hourglass" size={20} color="#3498db" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>{queueDetails.averageServiceTime}</Text>
              <Text style={styles.infoLabel}>Tiempo promedio de atención</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="calendar" size={20} color="#3498db" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>{queueDetails.operatingHours}</Text>
              <Text style={styles.infoLabel}>Horario de atención</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => navigation.navigate("Ticket", { 
            queueType, 
            company,
            ticketNumber: "A-" + (queueDetails.peopleWaiting + 44)
          })}
        >
          <Ionicons name="add-circle" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.joinButtonText}>Unirse a la cola</Text>
        </TouchableOpacity>
      </ScrollView>
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
  queueHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e1f0fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  queueType: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: 20,
  },
  statusItem: {
    flex: 1,
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  statusValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2ecc71",
    marginRight: 6,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  currentNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e1f0fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  joinButton: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonIcon: {
    marginRight: 10,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QueueDetailsScreen;
