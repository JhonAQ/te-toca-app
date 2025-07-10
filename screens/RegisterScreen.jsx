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

export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useContext(AuthContext);

  // Animaciones
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email');
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert('Error', 'Por favor ingresa una contraseña');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const user = await authService.register(userData);
      login(user);
      navigation.navigate('Category');
    } catch (error) {
      console.error('Error al registrarse:', error);
      let errorMessage = 'Error al crear la cuenta. Por favor, inténtalo de nuevo.';

      if (error.response?.status === 409) {
        errorMessage = 'Ya existe una cuenta con este email';
      } else if (error.response?.status === 400) {
        errorMessage = 'Datos inválidos. Por favor revisa la información';
      }

      Alert.alert('Error de registro', errorMessage);
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
              Llena los campos para crear tu cuenta
            </Text>

            {/* Campo de nombre */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={Colors.gray1} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Nombre completo"
                placeholderTextColor={Colors.gray1}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>

            {/* Campo de email */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={Colors.gray1} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor={Colors.gray1}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Campo de teléfono */}
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color={Colors.gray1} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Teléfono (opcional)"
                placeholderTextColor={Colors.gray1}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>

            {/* Campo de contraseña */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.gray1} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Contraseña"
                placeholderTextColor={Colors.gray1}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
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

            {/* Campo de confirmar contraseña */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.gray1} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Confirmar contraseña"
                placeholderTextColor={Colors.gray1}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.gray1}
                />
              </TouchableOpacity>
            </View>

            {/* Botón de registro */}
            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[Colors.accent, Colors.lavanda]}
                style={styles.registerButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

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
  registerButton: {
    height: 55,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
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