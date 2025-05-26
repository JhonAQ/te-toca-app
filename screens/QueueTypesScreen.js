import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Datos simulados de tipos de colas
const queueTypesData = [
  {
    id: "1",
    type: "Atención General",
    description: "Para consultas y trámites generales",
    icon: "people-outline",
    waitingPeople: 12,
    estimatedTime: "25 min",
  },
  {
    id: "2",
    type: "Atención Preferencial",
    description: "Para adultos mayores, embarazadas y personas con discapacidad",
    icon: "accessibility-outline",
    waitingPeople: 5,
    estimatedTime: "15 min",
  },
  {
    id: "3",
    type: "Pagos y Depósitos",
    description: "Para realizar pagos, depósitos o retiros",
    icon: "cash-outline",
    waitingPeople: 8,
    estimatedTime: "20 min",
  },
  {
    id: "4",
    type: "Servicio al Cliente",
    description: "Para reclamaciones y consultas específicas",
    icon: "help-buoy-outline",
    waitingPeople: 6,
    estimatedTime: "18 min",
  },
];

const QueueTypesScreen = ({ route, navigation }) => {
  const { company } = route.params;

  const renderQueueTypeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.queueCard}
      onPress={() => navigation.navigate("QueueDetails", { queueType: item, company: company })}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={28} color="#3498db" />
      </View>
      <View style={styles.queueInfo}>
        <Text style={styles.queueType}>{item.type}</Text>
        <Text style={styles.queueDescription}>{item.description}</Text>
        <View style={styles.queueStats}>
          <View style={styles.stat}>
            <Ionicons name="people" size={14} color="#666" />
            <Text style={styles.statText}>{item.waitingPeople} en espera</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="time" size={14} color="#666" />
            <Text style={styles.statText}>{item.estimatedTime}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#3498db" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Colas disponibles</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.companyHeader}>
        <Text style={styles.companyName}>{company.name}</Text>
        <Text style={styles.companyCategory}>{company.category}</Text>
      </View>

      <FlatList
        data={queueTypesData}
        keyExtractor={(item) => item.id}
        renderItem={renderQueueTypeItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
  companyHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 15,
  },
  companyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  companyCategory: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  queueCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e1f0fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  queueInfo: {
    flex: 1,
  },
  queueType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  queueDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  queueStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  statText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
});

export default QueueTypesScreen;
