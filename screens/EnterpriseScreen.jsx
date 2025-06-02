import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';

export default function EnterpriseScreen({ route, navigation }) {
  // Datos de ejemplo - normalmente vendrían de la API o de las props
  const enterprise = {
    id: '1',
    name: 'Banco de Crédito del Perú',
    shortName: 'BCP',
    type: 'Entidad bancaria',
    logo: require('../assets/default-logo.png'), // Asegúrate de tener este recurso o usar una URL
    address: 'Av. Independencia 123, Arequipa',
    schedule: 'Lun - Vie: 9:00 - 18:00, Sáb: 9:00 - 13:00',
    phone: '+51 954 123 456',
    queues: [
      { id: '1', name: 'Operaciones en ventanilla', icon: 'cash-outline', peopleWaiting: 12, avgTime: '15 min' },
      { id: '2', name: 'Atención al cliente', icon: 'people-outline', peopleWaiting: 8, avgTime: '20 min' },
      { id: '3', name: 'Apertura de cuentas', icon: 'document-text-outline', peopleWaiting: 5, avgTime: '25 min' },
      { id: '4', name: 'Préstamos y créditos', icon: 'card-outline', peopleWaiting: 3, avgTime: '30 min' }
    ]
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header - Logo y datos de la empresa */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={enterprise.logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.enterpriseInfo}>
              <Text style={styles.enterpriseName}>{enterprise.name}</Text>
              <Text style={styles.enterpriseType}>{enterprise.type}</Text>
            </View>
          </View>
        </View>

        {/* Sección de datos principales */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={Colors.dark2} />
            <Text style={styles.infoText}>{enterprise.address}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color={Colors.dark2} />
            <Text style={styles.infoText}>{enterprise.schedule}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={Colors.dark2} />
            <Text style={styles.infoText}>{enterprise.phone}</Text>
          </View>
        </View>

        {/* Sección de trámites y colas */}
        <View style={styles.queuesSection}>
          <Text style={styles.queuesSectionTitle}>Selecciona un trámite y únete a la fila</Text>

          <View style={styles.queuesContainer}>
            {enterprise.queues.map(queue => (
              <View key={queue.id} style={styles.queueCard}>
                <View style={styles.queueCardContent}>
                  <View style={styles.queueIconContainer}>
                    <Ionicons name={queue.icon} size={28} color={Colors.dark2} />
                  </View>

                  <View style={styles.queueInfo}>
                    <Text style={styles.queueName}>{queue.name}</Text>
                    <View style={styles.queueStats}>
                      <Text style={styles.queueStatText}>
                        <Ionicons name="people-outline" size={14} color={Colors.gray1} /> {queue.peopleWaiting} en fila
                      </Text>
                      <Text style={styles.queueStatText}>
                        <Ionicons name="time-outline" size={14} color={Colors.gray1} /> {queue.avgTime}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => navigation.navigate('Queue', { queueId: queue.id, enterpriseId: enterprise.id })}
                  >
                    <Text style={styles.joinButtonText}>Unirse</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.gray3,
  },
  enterpriseInfo: {
    marginLeft: 16,
    flex: 1,
  },
  enterpriseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginBottom: 4,
  },
  enterpriseType: {
    fontSize: 14,
    color: Colors.gray1,
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.dark2,
    marginLeft: 10,
    flex: 1,
  },
  queuesSection: {
    padding: 16,
  },
  queuesSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.accent,
    marginBottom: 16,
  },
  queuesContainer: {
    gap: 16,
  },
  queueCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray3,
    shadowColor: Colors.dark1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 2,
  },
  queueCardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  queueIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queueInfo: {
    flex: 1,
    marginLeft: 12,
  },
  queueName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark1,
    marginBottom: 6,
  },
  queueStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueStatText: {
    fontSize: 12,
    color: Colors.gray1,
    marginRight: 12,
  },
  joinButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  joinButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
