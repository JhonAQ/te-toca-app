import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import EnterpriseCard from '../components/EnterpriseCard';

export default function EnterpriseListScreen({ route, navigation }) {
  const { category } = route.params;

  // Datos de ejemplo para empresas en esta categoría
  const enterprises = [
    {
      id: '1',
      name: 'Banco de Crédito del Perú',
      shortName: 'BCP',
      address: 'Av. Independencia 123, Arequipa',
      distance: '1.2 km',
      queueCount: 4,
      waitTime: '15 min',
      imageUrl: 'https://via.placeholder.com/150?text=BCP'
    },
    {
      id: '2',
      name: 'Interbank',
      shortName: 'IB',
      address: 'Av. Ejército 710, Cayma',
      distance: '2.5 km',
      queueCount: 3,
      waitTime: '20 min',
      imageUrl: 'https://via.placeholder.com/150?text=IB'
    },
    {
      id: '3',
      name: 'BBVA Continental',
      shortName: 'BBVA',
      address: 'Calle Mercaderes 205, Arequipa',
      distance: '0.8 km',
      queueCount: 5,
      waitTime: '30 min',
      imageUrl: 'https://via.placeholder.com/150?text=BBVA'
    },
    {
      id: '4',
      name: 'Scotiabank',
      shortName: 'SB',
      address: 'Av. Trinidad Morán 115, Cayma',
      distance: '3.1 km',
      queueCount: 2,
      waitTime: '10 min',
      imageUrl: 'https://via.placeholder.com/150?text=SB'
    },
  ];

  const handleEnterprisePress = (enterprise) => {
    navigation.navigate('Enterprise', { enterpriseId: enterprise.id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.dark1} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.title}</Text>
        <View style={{ width: 24 }} /> {/* Placeholder para equilibrar el header */}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.gray1} />
          <Text style={styles.searchPlaceholder}>Buscar establecimiento...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={Colors.dark2} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={enterprises}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEnterprisePress(item)}>
            <View style={styles.enterpriseCard}>
              <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.enterpriseImage} 
              />
              <View style={styles.enterpriseInfo}>
                <Text style={styles.enterpriseName}>{item.name}</Text>
                <View style={styles.enterpriseDetails}>
                  <Ionicons name="location" size={16} color={Colors.gray1} />
                  <Text style={styles.enterpriseAddress}>{item.address}</Text>
                </View>
                <View style={styles.enterpriseFooter}>
                  <View style={styles.waitTimeContainer}>
                    <Ionicons name="time" size={14} color={Colors.accent} />
                    <Text style={styles.waitTime}>{item.waitTime}</Text>
                  </View>
                  <Text style={styles.distance}>{item.distance}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray3,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: Colors.gray1,
    fontSize: 15,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.gray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  enterpriseCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  enterpriseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  enterpriseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  enterpriseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginBottom: 4,
  },
  enterpriseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  enterpriseAddress: {
    fontSize: 13,
    color: Colors.gray1,
    marginLeft: 4,
    flex: 1,
  },
  enterpriseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waitTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray3,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  waitTime: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '500',
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: Colors.gray1,
  },
});