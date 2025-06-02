import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  // Estados para los campos del formulario
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados para mensajes de error
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Animaciones
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];

  useEffect(() => {
    // Iniciar animaciones al cargar la pantalla
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

  // Funciones de validación
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    let isValid = true;

    // Validar nombre
    if (!fullName.trim()) {
      setNameError('El nombre es requerido');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validar email
    if (!email) {
      setEmailError('El correo es requerido');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Ingrese un correo válido');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validar contraseña
    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      // Aquí iría la lógica de registro
      console.log('Datos del registro:', { fullName, email, password, phone });
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              {/* Logo y título principal */}
              <View style={styles.headerSection}>
                <Image
                  source={require('../assets/TeTocaLogo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.appName}>TeToca</Text>
                <Text style={styles.appSlogan}>Únete a nuestra comunidad</Text>
              </View>

              {/* Contenedor de formulario animado */}
              <Animated.View
                style={[
                  styles.formContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: translateY }]
                  }
                ]}
              >
                <Text style={styles.formTitle}>Crear cuenta</Text>

                {/* Campo para nombre completo */}
                <View style={styles.inputWrapper}>
                  <View style={styles.iconBackground}>
                    <Ionicons name="person" size={18} color={Colors.white} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor={Colors.gray1}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                {/* Campo para correo electrónico */}
                <View style={styles.inputWrapper}>
                  <View style={styles.iconBackground}>
                    <Ionicons name="mail" size={18} color={Colors.white} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor={Colors.gray1}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                {/* Campo para contraseña */}
                <View style={styles.inputWrapper}>
                  <View style={styles.iconBackground}>
                    <Ionicons name="lock-closed" size={18} color={Colors.white} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={Colors.gray1}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color={Colors.gray1}
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {/* Campo para confirmar contraseña */}
                <View style={styles.inputWrapper}>
                  <View style={styles.iconBackground}>
                    <Ionicons name="lock-closed" size={18} color={Colors.white} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor={Colors.gray1}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color={Colors.gray1}
                    />
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                {/* Botón de registro */}
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[Colors.accent, Colors.dark3]}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.registerButtonText}>Crear cuenta</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Términos y condiciones */}
                <Text style={styles.termsText}>
                  Al registrarte, aceptas nuestros{' '}
                  <Text style={styles.termsLink}>Términos y condiciones</Text> y{' '}
                  <Text style={styles.termsLink}>Política de privacidad</Text>
                </Text>

                {/* Enlace para iniciar sesión */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Inicia sesión</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
    paddingTop: height * 0.04,
    marginBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  appSlogan: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    paddingVertical: 25,
    elevation: 10,
    shadowColor: Colors.dark1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark2,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray3,
    borderRadius: 12,
    marginBottom: 15,
    height: 55,
    paddingRight: 15,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: 55,
    paddingLeft: 15,
    color: Colors.dark1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -10,
    marginBottom: 10,
  },
  registerButton: {
    height: 55,
    borderRadius: 12,
    marginVertical: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: Colors.dark2,
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: 'bold',
    color: Colors.accent,
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