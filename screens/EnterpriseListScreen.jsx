import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import EnterpriseCard from '../components/EnterpriseCard';
import Colors from '../constants/colors';
import enterpriseService from '../services/enterpriseService';

export default function EnterpriseListScreen({ navigation, route }) {
  const [enterprises, setEnterprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Obtener el ID de la categoría si viene de CategoryScreen
  const categoryId = route.params?.categoryId;

  useEffect(() => {
    loadEnterprises();
  }, [categoryId]);

  const loadEnterprises = async () => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (categoryId) {
        // Si hay categoría, filtramos por categoría
        data = await enterpriseService.getEnterprisesByCategory(categoryId);
        console.log("Agarrado por categoria")
      } else {
        // Si no hay categoría, obtenemos todas las empresas
        data = await enterpriseService.getAllEnterprises();
        console.log("Agarrado por todas las empresas")
        console.log("Data:", data)
      }

      setEnterprises(data);
    } catch (err) {
      console.error('Error al cargar empresas:', err);
      setError('No se pudieron cargar las empresas. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setSearchText(text);

    if (!text.trim()) {
      // Si el texto de búsqueda está vacío, cargamos todas las empresas
      loadEnterprises();
      return;
    }

    try {
      setLoading(true);
      const results = await enterpriseService.searchEnterprises(text);
      setEnterprises(results);
    } catch (err) {
      console.error('Error en búsqueda:', err);
    } finally {
      setLoading(false);
    }
  };

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
                <SearchBar
                  placeholder="Buscar institución..."
                  onChangeText={handleSearch}
                  value={searchText}
                />
              </View>
            </View>

            <View style={styles.enterprisesSection}>
              <Text style={styles.sectionTitle}>Instituciones</Text>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={Colors.accent} />
                </View>
              ) : error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                  <TouchableOpacity style={styles.retryButton} onPress={loadEnterprises}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView style={styles.enterprisesContainer}>
                  {enterprises.length > 0 ? (
                    enterprises.map(enterprise => (
                      <EnterpriseCard
                        key={enterprise.id}
                        name={enterprise.name}
                        address={enterprise.address}
                        logoUrl={enterprise.logo}
                        isAvailable={enterprise.isAvailable}
                        activeQueues={enterprise.activeQueues}
                        onPress={() => navigation.navigate('Enterprise', { enterpriseId: enterprise.id })}
                      />
                    ))
                  ) : (
                    <View style={styles.noResultsContainer}>
                      <Ionicons name="search-outline" size={50} color={Colors.gray1} />
                      <Text style={styles.noResultsText}>
                        No se encontraron instituciones
                      </Text>
                    </View>
                  )}
                </ScrollView>
              )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.dark2,
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.gray1,
    textAlign: 'center',
    marginTop: 10,
  },
});