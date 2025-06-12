import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/colors';

const EnterpriseCard = ({
  logoUrl,
  name,
  address,
  isAvailable = true,
  activeQueues = 0,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.contentContainer}>
        {/* Logo a la izquierda */}
        <View style={styles.logoContainer}>
          <Image
            source={logoUrl ? { uri: logoUrl } : require('../assets/default-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Información en columna a la derecha */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.status}>
            {isAvailable ? 'Disponible' : 'No disponible'} • {activeQueues} {activeQueues === 1 ? 'cola activa' : 'colas activas'}
          </Text>
        </View>
      </View>

      {/* Botón Ver colas */}
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Ver colas</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray3,
    marginRight: 12,
  },
  logo: {
    width: 50,
    height: 50,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  buttonText: {
    color: Colors.accent,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default EnterpriseCard;
