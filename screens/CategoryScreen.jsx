import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import Colors from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryScreen() {
  const categories = [
    { id: '1', iconName: 'document-text', label: 'Documentos', color: '#4b7bec' },
    { id: '2', iconName: 'home', label: 'Vivienda', color: '#2ecc71' },
    { id: '3', iconName: 'car', label: 'Vehículos', color: '#e74c3c' },
    { id: '4', iconName: 'school', label: 'Educación', color: '#f39c12' },
    { id: '5', iconName: 'business', label: 'Empresas', color: '#9b59b6' },
    { id: '6', iconName: 'medkit', label: 'Salud', color: '#3498db' },
    { id: '7', iconName: 'people', label: 'Identidad', color: '#e67e22' },
    { id: '8', iconName: 'card', label: 'Impuestos', color: '#16a085' },
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
            <Text style={styles.topSectionText}>¿Qué trámite quieres realizar?</Text>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBarSection}>
                <SearchBar placeholder="Buscar categoría..." />
              </View>
            </View>

            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Categorías</Text>
              <ScrollView style={styles.categoriesContainer}>
                <View style={styles.categoryItemContainer}>
                  {categories.map(category => (
                    <CategoryCard
                      key={category.id}
                      iconName={category.iconName}
                      label={category.label}
                      color={category.color}
                      onPress={() => console.log(`Categoría seleccionada: ${category.label}`)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.cameraButton} onPress={() => console.log('Cámara presionada')}>
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
  categoriesSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
  },
  categoriesContainer: {
    flex: 1,
  },
  categoryItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
