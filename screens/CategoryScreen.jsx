import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

// Componente para tarjetas de categoría
const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity 
    style={styles.categoryCard}
    onPress={onPress}
  >
    <View style={styles.cardImageContainer}>
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
    </View>
    <Text style={styles.categoryTitle}>{category.title}</Text>
    <Text style={styles.categoryCount}>{category.enterpriseCount} establecimientos</Text>
  </TouchableOpacity>
);

export default function CategoryScreen({ navigation }) {
  // Datos de ejemplo
  const categories = [
    { 
      id: 'bank', 
      title: 'Bancos', 
      enterpriseCount: 15, 
      imageUrl: 'https://via.placeholder.com/150?text=Bank'
    },
    { 
      id: 'government', 
      title: 'Entidades Públicas', 
      enterpriseCount: 8, 
      imageUrl: 'https://via.placeholder.com/150?text=Gov'
    },
    { 
      id: 'health', 
      title: 'Servicios de Salud', 
      enterpriseCount: 12, 
      imageUrl: 'https://via.placeholder.com/150?text=Health'
    },
    { 
      id: 'education', 
      title: 'Educación', 
      enterpriseCount: 6, 
      imageUrl: 'https://via.placeholder.com/150?text=Edu'
    },
    { 
      id: 'retail', 
      title: 'Tiendas', 
      enterpriseCount: 20, 
      imageUrl: 'https://via.placeholder.com/150?text=Shop'
    }
  ];

  // Navegar a la lista de empresas con la categoría seleccionada
  const handleCategoryPress = (category) => {
    navigation.navigate('EnterpriseList', { category });
  };

  // Navegar a la pantalla de escaneo QR
  const handleQRScan = () => {
    navigation.navigate('QrCam');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <Image
          source={require('../assets/TeTocaLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Puedes añadir un botón de perfil aquí si es necesario */}
      </View>
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Bienvenido</Text>
        <Text style={styles.welcomeSubtitle}>¿Qué estás buscando hoy?</Text>
      </View>
      
      {/* Botón de escanear QR prominente */}
      <TouchableOpacity 
        style={styles.scanQRButton} 
        onPress={handleQRScan}
      >
        <Ionicons name="qr-code" size={24} color={Colors.white} />
        <Text style={styles.scanQRText}>Escanear código QR</Text>
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>Categorías</Text>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            onPress={() => handleCategoryPress(category)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark1,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.dark2,
    marginTop: 5,
  },
  scanQRButton: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
  },
  scanQRText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
    color: Colors.dark2,
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  categoryCard: {
    backgroundColor: Colors.gray3,
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImageContainer: {
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark1,
  },
  categoryCount: {
    fontSize: 13,
    color: Colors.gray1,
    marginTop: 4,
  },
});
