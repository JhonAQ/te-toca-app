import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';

// Componente de tarjeta informativa
const InfoCard = ({ icon, title, value, color = Colors.accent }) => (
  <View style={styles.infoCard}>
    <Ionicons name={icon} size={28} color={color} style={styles.infoIcon} />
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoTitle}>{title}</Text>
  </View>
);

export default function QueueScreen({ route, navigation }) {
  // Datos de ejemplo (normalmente vendrían de la API o props)
  const queueInfo = {
    enterpriseName: "Banco de Crédito del Perú",
    queueName: "Operaciones y Consultas",
    peopleWaiting: 8,
    estimatedTime: "25 min",
    timePerPerson: "3 min",
    ticketNumber: "BX42",
    logoUrl: require('../assets/default-logo.png'), // Asegúrate de tener una imagen por defecto
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Sección superior */}
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/TeTocaLogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity> */}
          </View>

          {/* Sección inferior blanca */}
          <View style={styles.bottomSection}>
            {/* Logo de la empresa en la intersección */}
            <View style={styles.enterpriseLogoContainer}>
              <Image
                source={queueInfo.logoUrl}
                style={styles.enterpriseLogo}
                resizeMode="cover"
              />
            </View>

            {/* Información de la cola */}
            <View style={styles.queueInfoContainer}>
              <Text style={styles.enterpriseName}>{queueInfo.enterpriseName}</Text>
              <Text style={styles.queueName}>{queueInfo.queueName}</Text>

              {/* Tarjetas de información */}
              <View style={styles.infoCardsContainer}>
                <InfoCard
                  icon="people-outline"
                  title="Personas en espera"
                  value={queueInfo.peopleWaiting}
                  color={Colors.dark3}
                />
                <InfoCard
                  icon="time-outline"
                  title="Espera estimada"
                  value={queueInfo.estimatedTime}
                  color={Colors.dark2}
                />
                <InfoCard
                  icon="hourglass-outline"
                  title="Tiempo por persona"
                  value={queueInfo.timePerPerson}
                  color={Colors.dark2}
                />
                <InfoCard
                  icon="ticket-outline"
                  title="Tu número"
                  value={queueInfo.ticketNumber}
                  color={Colors.accent}
                />
              </View>

              {/* Botón para unirse a la fila */}
              <TouchableOpacity style={styles.joinButton} onPress={() => navigation.navigate('Ticket')}>
                <View style={styles.joinButtonContent}>
                  <Ionicons name="ticket-outline" size={24} color={Colors.white} style={styles.joinButtonIcon} />
                  <View style={styles.joinButtonTextContainer}>
                    <Text style={styles.joinButtonTitle}>Unirse a la fila</Text>
                    <Text style={styles.joinButtonDescription}>Recibirás notificaciones sobre tu turno</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Información adicional */}
              <View style={styles.additionalInfo}>
                <Text style={styles.additionalInfoText}>
                  Puedes abandonar la cola en cualquier momento
                </Text>
              </View>
            </View>
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
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logo: {
    width: 150,
    height: 180,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 5,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 60, // Para dar espacio al logo de la empresa
    marginTop: 20,
  },
  enterpriseLogoContainer: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 40,
    backgroundColor: Colors.white,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  enterpriseLogo: {
    width: 100,
    height: 100,
    borderRadius: 35,
  },
  queueInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  enterpriseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  queueName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark2,
    marginBottom: 25,
    textAlign: 'center',
  },
  infoCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  infoCard: {
    width: '48%',
    backgroundColor: Colors.gray3,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoIcon: {
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 12,
    color: Colors.dark2,
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: Colors.accent,
    borderRadius: 15,
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  joinButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButtonIcon: {
    marginRight: 10,
  },
  joinButtonTextContainer: {
    alignItems: 'flex-start',
  },
  joinButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  joinButtonDescription: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.8,
  },
  additionalInfo: {
    marginTop: 20,
    padding: 10,
  },
  additionalInfoText: {
    fontSize: 14,
    color: Colors.gray1,
    textAlign: 'center',
  }
});