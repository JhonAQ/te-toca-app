import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Image } from "react-native";
import SearchBar from '../components/SearchBar';

export default function CategoryScreen() {
  return (
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
          <View style={styles.searchBarSection}>
            <SearchBar placeholder="Buscar categoría..." />
          </View>

          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <ScrollView style={styles.categoriesContainer}>
              {/* Aquí van los elementos de categorías */}
              {/* Ejemplo de contenedor de categorías */}
              <View style={styles.categoryItemContainer}>
                {/* Elementos de categoría irían aquí */}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 15,
  },
  logo: {
    width: 150,
    height: 60,
  },
  topSectionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
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
  searchBarSection: {
    marginBottom: 15,
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
  },
});
