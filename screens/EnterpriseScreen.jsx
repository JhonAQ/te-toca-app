import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import enterpriseService from '../services/enterpriseService';
import queueService from '../services/queueService';

export default function EnterpriseScreen({ route, navigation }) {
  const { enterpriseId } = route.params;

  const [enterprise, setEnterprise] = useState(null);
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEnterpriseData();
  }, [enterpriseId]);

  const loadEnterpriseData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar datos de la empresa
      const enterpriseData = await enterpriseService.getEnterpriseById(enterpriseId);
      setEnterprise(enterpriseData);

      // Cargar colas de la empresa
      const queueData = await queueService.getQueuesByEnterprise(enterpriseId);
      setQueues(queueData);
    } catch (err) {
      console.error('Error al cargar datos de la empresa:', err);
      setError('No se pudieron cargar los datos. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['bottom', 'top']}>
        <ActivityIndicator size="large" color={Colors.accent} />
        <Text style={styles.loadingText}>Cargando información...</Text>
      </SafeAreaView>
    );
  }

  if (error || !enterprise) {
    return (
      <SafeAreaView style={styles.errorContainer} edges={['bottom', 'top']}>
        <Ionicons name="alert-circle-outline" size={50} color={Colors.accent} />
        <Text style={styles.errorText}>{error || 'No se encontró la empresa.'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadEnterpriseData}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header - Logo y datos de la empresa */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={typeof enterprise.logo === 'string' ? { uri: enterprise.logo } : enterprise.logo}
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
            {queues.length > 0 ? (
              queues.map(queue => (
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
                      onPress={() => navigation.navigate('Queue', {
                        queueId: queue.id,
                        enterpriseId: enterprise.id
                      })}
                    >
                      <Text style={styles.joinButtonText}>Unirse</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noQueuesContainer}>
                <Ionicons name="alert-circle-outline" size={40} color={Colors.gray1} />
                <Text style={styles.noQueuesText}>No hay colas disponibles en este momento</Text>
              </View>
            )}
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
    color: Colors.dark3,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.dark2,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.dark2,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: Colors.dark2,
    fontSize: 16,
  },
  noQueuesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  noQueuesText: {
    fontSize: 16,
    color: Colors.gray1,
    textAlign: 'center',
    marginTop: 10,
  },
});
