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
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];

  useEffect(() => {
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

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email y contraseña');
      return;
    }

    setIsLoading(true);
    try {
      const user = await authService.login(email, password);
      login(user);
      navigation.navigate('Category');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      let errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';

      if (error.response?.status === 401) {
        errorMessage = 'Email o contraseña incorrectos';
      } else if (error.response?.status === 404) {
        errorMessage = 'Usuario no encontrado';
      }

      Alert.alert('Error de autenticación', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              Ingresa tu email y contraseña para continuar
            </Text>

            {/* Campo de email */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={Colors.gray1} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor={Colors.gray1}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Campo de contraseña */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.gray1} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Contraseña"
                placeholderTextColor={Colors.gray1}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.gray1}
                />
              </TouchableOpacity>
            </View>

            {/* Botón de login */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[Colors.accent, Colors.lavanda]}
                style={styles.loginButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Información adicional */}
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Al continuar, aceptas nuestros términos de servicio y política de privacidad
              </Text>
            </View>

            {/* Enlace para registro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContainer: {
    flexGrow: 1,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray2,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark2,
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
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