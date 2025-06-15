import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Share,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

export default function TicketScreen({ navigation, route }) {
  // Mock data
  const ticketData = {
    ticketId: 'AB25',
    enterprise: 'Banco de Crédito del Perú',
    queueName: 'Atención al Cliente',
    issueDate: '15 de Mayo, 2023',
    issueTime: '10:45 AM',
    currentStatus: 'En espera', // 'En espera', 'Pausado', 'En Atención'
    isPaused: false,
    position: 8,
    currentTicket: 'AB17',
    waitTime: '35 min',
    peopleTime: '4 min',
  };

  // Referencias y estados para animaciones
  const [isPaused, setIsPaused] = useState(ticketData.isPaused);
  const positionAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Efecto para la animación de pulso
  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, []);

  // Función para manejar la pausa del ticket
  const handlePauseTicket = () => {
    if (isPaused) {
      Alert.alert(
        "Reanudar ticket",
        "¿Estás seguro que deseas reanudar tu posición en la fila?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Reanudar",
            onPress: () => setIsPaused(false)
          }
        ]
      );
    } else {
      Alert.alert(
        "Pausar ticket",
        "Al pausar tu ticket, mantendrás tu posición pero no serás llamado hasta que reanudes. ¿Deseas pausar?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Pausar",
            onPress: () => setIsPaused(true)
          }
        ]
      );
    }
  };

  // Función para cancelar el ticket
  const handleCancelTicket = () => {
    Alert.alert(
      "Cancelar ticket",
      "¿Estás seguro que deseas salir de la fila? Esta acción no se puede deshacer.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => navigation.navigate('Category')
        }
      ]
    );
  };

  // Función para compartir/descargar el ticket como PDF
  const handleShareTicket = async () => {
    try {
      await Share.share({
        message: `TeToca App | Ticket ${ticketData.ticketId} para ${ticketData.queueName} en ${ticketData.enterprise}. Tu posición actual es: ${ticketData.position}`,
        title: `Ticket ${ticketData.ticketId}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el ticket');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.dark1, Colors.dark3]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header con botón de regreso */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mi Ticket</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Contenedor principal del ticket */}
          <View style={styles.ticketContainer}>
            {/* Parte superior del ticket con el borde ondulado */}
            <View style={styles.ticketHeader}>
              <View style={styles.ticketHeaderContent}>
                <View style={styles.enterpriseLogo}>
                  <Image
                    source={require('../assets/default-logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.enterpriseInfo}>
                  <Text style={styles.enterpriseName}>{ticketData.enterprise}</Text>
                  <Text style={styles.queueName}>{ticketData.queueName}</Text>
                </View>
              </View>
              {/* Borde ondulado */}
              <View style={styles.dashLine}>
                {[...Array(20)].map((_, index) => (
                  <View key={index} style={styles.dashItem} />
                ))}
              </View>
            </View>

            {/* Contenido principal del ticket */}
            <View style={styles.ticketBody}>
              {/* Estado del ticket */}
              <View style={[
                styles.statusContainer,
                { backgroundColor: isPaused ? Colors.gray3 : Colors.accent }
              ]}>
                <Ionicons
                  name={isPaused ? "pause-circle" : "time-outline"}
                  size={20}
                  color={isPaused ? Colors.dark2 : Colors.white}
                />
                <Text style={[
                  styles.statusText,
                  { color: isPaused ? Colors.dark2 : Colors.white }
                ]}>
                  {isPaused ? "Ticket en pausa" : "Ticket activo"}
                </Text>
              </View>

              {/* Número de ticket destacado */}
              <Animated.View
                style={[
                  styles.ticketNumberContainer,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <Text style={styles.ticketNumberLabel}>Tu número</Text>
                <Text style={styles.ticketNumber}>{ticketData.ticketId}</Text>
                <Text style={styles.ticketDateInfo}>
                  {ticketData.issueDate} • {ticketData.issueTime}
                </Text>
              </Animated.View>

              {/* Información de la cola */}
              <View style={styles.queueInfoContainer}>
                <View style={styles.queueInfoRow}>
                  <View style={styles.queueInfoItem}>
                    <Ionicons name="people-outline" size={22} color={Colors.accent} />
                    <Text style={styles.queueInfoValue}>{ticketData.position}</Text>
                    <Text style={styles.queueInfoLabel}>Personas antes</Text>
                  </View>
                  <View style={styles.queueInfoItem}>
                    <Ionicons name="ticket-outline" size={22} color={Colors.accent} />
                    <Text style={styles.queueInfoValue}>{ticketData.currentTicket}</Text>
                    <Text style={styles.queueInfoLabel}>En atención</Text>
                  </View>
                </View>
                <View style={styles.queueInfoRow}>
                  <View style={styles.queueInfoItem}>
                    <Ionicons name="time-outline" size={22} color={Colors.accent} />
                    <Text style={styles.queueInfoValue}>{ticketData.waitTime}</Text>
                    <Text style={styles.queueInfoLabel}>Tiempo de espera</Text>
                  </View>
                  <View style={styles.queueInfoItem}>
                    <Ionicons name="hourglass-outline" size={22} color={Colors.accent} />
                    <Text style={styles.queueInfoValue}>{ticketData.peopleTime}</Text>
                    <Text style={styles.queueInfoLabel}>Tiempo por persona</Text>
                  </View>
                </View>
              </View>

            </View>

            {/* Borde ondulado inferior */}
            <View style={[styles.dashLine, styles.dashLineBottom]}>
              {[...Array(20)].map((_, index) => (
                <View key={index} style={styles.dashItem} />
              ))}
            </View>
          </View>

          {/* Botones de acciones */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handlePauseTicket}
            >
              <LinearGradient
                colors={[Colors.dark2, Colors.dark3]}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name={isPaused ? "play-circle-outline" : "pause-circle-outline"}
                  size={24}
                  color={Colors.white}
                />
                <Text style={styles.actionButtonText}>
                  {isPaused ? "Reanudar" : "Pausar"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleCancelTicket}
            >
              <LinearGradient
                colors={['#D32F2F', '#B71C1C']}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="close-circle-outline" size={24} color={Colors.white} />
                <Text style={styles.actionButtonText}>Cancelar</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShareTicket}
            >
              <LinearGradient
                colors={[Colors.lavanda, Colors.accent]}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="download-outline" size={24} color={Colors.white} />
                <Text style={styles.actionButtonText}>Compartir</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Texto adicional informativo */}
          <Text style={styles.additionalInfo}>
            Te notificaremos cuando queden 3 personas antes de ti
          </Text>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  ticketContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  ticketHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  ticketHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  enterpriseLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  enterpriseInfo: {
    marginLeft: 15,
    flex: 1,
  },
  enterpriseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark1,
  },
  queueName: {
    fontSize: 14,
    color: Colors.dark2,
    marginTop: 3,
  },
  dashLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dashLineBottom: {
    transform: [{ rotate: '180deg' }],
    marginBottom: 35,
  },
  dashItem: {
    width: 8,
    height: 2,
    backgroundColor: Colors.gray1,
    marginHorizontal: 2,
  },
  ticketBody: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 15,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: Colors.white,
  },
  ticketNumberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ticketNumberLabel: {
    fontSize: 14,
    color: Colors.gray1,
    marginBottom: 5,
  },
  ticketNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.dark1,
    letterSpacing: 2,
  },
  ticketDateInfo: {
    fontSize: 12,
    color: Colors.gray1,
    marginTop: 5,
  },
  queueInfoContainer: {
    marginBottom: 20,
  },
  queueInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  queueInfoItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.gray3,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  queueInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginVertical: 5,
  },
  queueInfoLabel: {
    fontSize: 12,
    color: Colors.dark2,
    textAlign: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  qrCodeText: {
    fontSize: 12,
    color: Colors.gray1,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.dark1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  actionButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  additionalInfo: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.white,
    marginTop: 20,
    opacity: 0.8,
  },
});