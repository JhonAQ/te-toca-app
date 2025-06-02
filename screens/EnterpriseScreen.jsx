import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import EnterpriseCard from '../components/EnterpriseCard';
import Colors from '../constants/colors';

export default function EnterpriseScreen({ navigation }) {
  // Datos de ejemplo para las empresas
  const enterprises = [
    {
      id: '1',
      name: 'Banco de Crédito del Perú',
      address: 'Av. Independencia 123, Arequipa',
      logoUrl: 'https://example.com/bcp-logo.png',
      isAvailable: true,
      activeQueues: 3
    },
    {
      id: '2',
      name: 'RENIEC',
      address: 'Av. Dolores Prolongación 456, Arequipa',
      logoUrl: 'https://example.com/reniec-logo.png',
      isAvailable: true,
      activeQueues: 2
    },
    {
      id: '3',
      name: 'Banco Continental',
      address: 'Av. Ejército 789, Arequipa',
      logoUrl: 'https://example.com/bbva-logo.png',
      isAvailable: false,
      activeQueues: 0
    },
    {
      id: '4',
      name: 'SUNAT',
      address: 'Calle Jerusalén 234, Arequipa',
      logoUrl: 'https://example.com/sunat-logo.png',
      isAvailable: true,
      activeQueues: 4
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/TeTocaLogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.topSectionText}>¿Dónde quieres hacer trámites?</Text>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBarSection}>
                <SearchBar placeholder="Buscar institución..." />
              </View>
            </View>

            <View style={styles.enterprisesSection}>
              <Text style={styles.sectionTitle}>Instituciones</Text>
              <ScrollView style={styles.enterprisesContainer}>
                {enterprises.map(enterprise => (
                  <EnterpriseCard
                    key={enterprise.id}
                    name={enterprise.name}
                    address={enterprise.address}
                    logoUrl={enterprise.logoUrl}
                    isAvailable={enterprise.isAvailable}
                    activeQueues={enterprise.activeQueues}
                    onPress={() => navigation.navigate('Queue', { enterpriseId: enterprise.id })}
                  />
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('QrCam')}>
              <Ionicons name="camera" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logo: {
    width: 150,
    height: 170,
  },
  topSectionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomSection: {
    flex: 4,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBarSection: {
    flex: 1,
    marginRight: 10,
  },
  cameraButton: {
    backgroundColor: Colors.dark2,
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
    alignSelf: "center"
  },
  enterprisesSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
  },
  enterprisesContainer: {
    flex: 1,
  },
});