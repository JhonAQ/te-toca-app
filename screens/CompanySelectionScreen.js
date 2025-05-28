import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const companiesData = [
  {
    id: "1",
    name: "Banco Nacional",
    category: "Servicios Financieros",
    image: "https://via.placeholder.com/100",
    waitTime: "15 min",
  },
  {
    id: "2",
    name: "Clínica San Rafael",
    category: "Salud",
    image: "https://via.placeholder.com/100",
    waitTime: "25 min",
  },
  {
    id: "3",
    name: "Municipalidad Central",
    category: "Servicios Públicos",
    image: "https://via.placeholder.com/100",
    waitTime: "40 min",
  },
  {
    id: "4",
    name: "Supermercado Express",
    category: "Comercio",
    image: "https://via.placeholder.com/100",
    waitTime: "10 min",
  },
  {
    id: "5",
    name: "Oficina de Migración",
    category: "Servicios Públicos",
    image: "https://via.placeholder.com/100",
    waitTime: "60 min",
  },
];

const CompanySelectionScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = companiesData.filter((company) =>
      company.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const renderCompanyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.companyCard}
      onPress={() => navigation.navigate("QueueTypes", { company: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.companyImage}
        resizeMode="cover"
      />
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{item.name}</Text>
        <Text style={styles.companyCategory}>{item.category}</Text>
        <View style={styles.waitTimeContainer}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text style={styles.waitTime}>Tiempo promedio: {item.waitTime}</Text>
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
        <Text style={styles.headerTitle}>Seleccionar empresa</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar empresa..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.id}
        renderItem={renderCompanyItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="business" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No se encontraron empresas</Text>
          </View>
        }
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  companyCard: {
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
  companyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  companyCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  waitTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  waitTime: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 10,
    color: "#999",
    fontSize: 16,
  },
});

export default CompanySelectionScreen;
