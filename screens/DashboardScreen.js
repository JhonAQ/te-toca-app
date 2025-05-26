import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Cambiamos a Ionicons

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Ionicons name="log-out" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Bienvenido, Usuario</Text>
        <Text style={styles.subtext}>¿Qué deseas hacer hoy?</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Estado actual</Text>
        <View style={styles.statusContent}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>No tienes turnos activos</Text>
            <Text style={styles.statusDescription}>Solicita un nuevo turno para entrar en la fila virtual</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.requestButton}
        onPress={() => navigation.navigate('Confirmation')}
      >
        <Ionicons name="add-circle" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.requestButtonText}>Solicitar turno</Text>
      </TouchableOpacity>

      <View style={styles.recentSection}>
        <Text style={styles.recentTitle}>Actividad reciente</Text>
        <View style={styles.emptyActivity}>
          <Ionicons name="time" size={40} color="#ccc" />
          <Text style={styles.emptyText}>No hay actividad reciente</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeSection: {
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3498db',
  },
  subtext: {
    fontSize: 16,
    color: '#666',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  requestButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 10,
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recentSection: {
    marginTop: 30,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emptyActivity: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  }
});

export default DashboardScreen;
