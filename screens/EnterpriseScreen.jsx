import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';

export default function EnterpriseScreen({ route, navigation }) {
  // En un caso real, usarías el enterpriseId para obtener los datos de la API
  const { enterpriseId } = route.params;
  
  // Datos de ejemplo - normalmente vendrían de la API
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

  const handleQueuePress = (queue) => {
    navigation.navigate('Queue', { 
      queueId: queue.id, 
      enterpriseId: enterprise.id,
      queueName: queue.name,
      enterpriseName: enterprise.name
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header con botón de regreso */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.dark1} />
          </TouchableOpacity>
        </View>
        
        {/* Header - Logo y datos de la empresa */}
        <View style={styles.enterpriseHeader}>
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
                    onPress={() => handleQueuePress(queue)}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterpriseHeader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    backgroundColor: Colors.gray3,
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.dark2,
  },
  queuesSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  queuesSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginBottom: 16,
  },
  queuesContainer: {
    gap: 12,
  },
  queueCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray3,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  queueCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  queueInfo: {
    flex: 1,
  },
  queueName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.dark2,
    marginBottom: 4,
  },
  queueStats: {
    flexDirection: 'row',
    gap: 10,
  },
  queueStatText: {
    fontSize: 13,
    color: Colors.gray1,
  },
  joinButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
