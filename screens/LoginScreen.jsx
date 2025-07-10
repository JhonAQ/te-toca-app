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

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await authService.loginWithGoogle();
      login(user);
      navigation.navigate('Category');
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      let errorMessage = 'No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo.';
      
      if (error.message.includes('cancelada')) {
        errorMessage = 'Autenticación cancelada';
      }
      
      Alert.alert(
        'Error de autenticación',
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuthSessionLogin = async () => {
    // Ahora ambos métodos son iguales
    handleGoogleLogin();
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

        {/* Logo y título principal */}
        <View style={styles.headerSection}>
          <Image
            source={require('../assets/TeTocaLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appSlogan}>Tu tiempo es valioso, organízalo</Text>
        </View>

        {/* Contenedor de autenticación animado */}
        <Animated.View
          style={[
            styles.authContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateY }]
            }
          ]}
        >
          <Text style={styles.authTitle}>Iniciar Sesión</Text>
          <Text style={styles.authSubtitle}>
            Accede con tu cuenta de Google para continuar
          </Text>

          {/* Botón de Google Sign In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <View style={styles.googleButtonContent}>
              <Ionicons name="logo-google" size={24} color="#4285F4" />
              <Text style={styles.googleButtonText}>
                {isLoading ? 'Iniciando sesión...' : 'Continuar con Google'}
              </Text>
              {isLoading && (
                <ActivityIndicator size="small" color={Colors.accent} style={{ marginLeft: 10 }} />
              )}
            </View>
          </TouchableOpacity>

          {/* Botón alternativo con AuthSession - ahora oculto o con texto diferente */}
          <TouchableOpacity
            style={styles.alternativeButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text style={styles.alternativeButtonText}>
              ¿Primera vez? Registrarse
            </Text>
          </TouchableOpacity>

          {/* Información adicional */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Al continuar, aceptas nuestros términos de servicio y política de privacidad
            </Text>
          </View>

          {/* Enlace para registro manual */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿Problemas para acceder? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Contactar soporte</Text>
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
    height: height * 0.5,
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
  headerSection: {
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  appSlogan: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 25,
  },
  authContainer: {
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
  authTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark2,
    marginBottom: 10,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 16,
    color: Colors.gray1,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  googleButton: {
    height: 55,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray2,
    marginBottom: 15,
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
  alternativeButton: {
    height: 45,
    borderRadius: 12,
    backgroundColor: Colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  alternativeButtonText: {
    color: Colors.dark2,
    fontSize: 14,
    fontWeight: '500',
  },
  infoContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 12,
    color: Colors.gray1,
    textAlign: 'center',
    lineHeight: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: Colors.dark2,
    fontSize: 14,
  },
  registerLink: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: 'bold',
  },
});