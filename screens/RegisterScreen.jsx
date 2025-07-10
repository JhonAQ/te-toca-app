import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import authService from '../services/authService';
import AuthContext from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  // Animaciones
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];

  useEffect(() => {
    // Inicializar Google Sign In
    authService.initializeGoogleSignIn();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const user = await authService.loginWithGoogle();
      login(user);
      navigation.navigate('Category');
    } catch (error) {
      console.error('Error al registrarse con Google:', error);
      Alert.alert(
        'Error de registro',
        'No se pudo crear tu cuenta con Google. Por favor, inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        {/* Fondo con gradiente */}
        <LinearGradient
          colors={[Colors.dark1, Colors.dark3, Colors.accent]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Elementos decorativos */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />

        {/* Botón de regresar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>

        {/* Logo y título principal */}
        <View style={styles.headerSection}>
          <Image
            source={require('../assets/TeTocaLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appSlogan}>Únete a la comunidad</Text>
        </View>

        {/* Contenedor de registro animado */}
        <Animated.View
          style={[
            styles.registerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          <Text style={styles.registerTitle}>Crear Cuenta</Text>
          <Text style={styles.registerSubtitle}>
            Registrate con tu cuenta de Google para empezar a organizar tu tiempo
          </Text>

          {/* Botón de Google Sign Up */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignUp}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <View style={styles.googleButtonContent}>
              <Ionicons name="logo-google" size={24} color="#4285F4" />
              <Text style={styles.googleButtonText}>
                {isLoading ? 'Creando cuenta...' : 'Registrarse con Google'}
              </Text>
              {isLoading && (
                <ActivityIndicator size="small" color={Colors.accent} style={{ marginLeft: 10 }} />
              )}
            </View>
          </TouchableOpacity>

          {/* Beneficios del registro */}
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>¿Por qué registrarte?</Text>

            <View style={styles.benefitItem}>
              <Ionicons name="time-outline" size={20} color={Colors.accent} />
              <Text style={styles.benefitText}>Ahorra tiempo en filas</Text>
            </View>

            <View style={styles.benefitItem}>
              <Ionicons name="notifications-outline" size={20} color={Colors.accent} />
              <Text style={styles.benefitText}>Recibe notificaciones en tiempo real</Text>
            </View>

            <View style={styles.benefitItem}>
              <Ionicons name="bookmark-outline" size={20} color={Colors.accent} />
              <Text style={styles.benefitText}>Guarda tus lugares favoritos</Text>
            </View>
          </View>

          {/* Información adicional */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Al registrarte, aceptas nuestros términos de servicio y política de privacidad
            </Text>
          </View>

          {/* Enlace para login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.45,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -width * 0.1,
    right: -width * 0.1,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: width * 0.15,
    left: -width * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: height * 0.08,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  appSlogan: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 25,
  },
  registerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
    marginTop: 10,
    elevation: 10,
    shadowColor: Colors.dark1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  registerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark2,
    marginBottom: 10,
    textAlign: 'center',
  },
  registerSubtitle: {
    fontSize: 14,
    color: Colors.gray1,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  googleButton: {
    height: 55,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray2,
    marginBottom: 25,
    elevation: 2,
    shadowColor: Colors.dark1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  googleButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    color: Colors.dark2,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark2,
    marginBottom: 15,
    textAlign: 'center',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.dark2,
    marginLeft: 12,
    flex: 1,
  },
  infoContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 11,
    color: Colors.gray1,
    textAlign: 'center',
    lineHeight: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: Colors.dark2,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: 'bold',
  },
});