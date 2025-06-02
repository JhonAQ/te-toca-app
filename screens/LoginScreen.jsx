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
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let isValid = true;

    if (!email) {
      setEmailError('El correo es requerido');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Ingrese un correo válido');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Aquí iría la lógica de autenticación
      navigation.navigate('Category');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']} onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.container}>
          {/* Fondo con gradiente */}
          <LinearGradient
            colors={[Colors.dark1, Colors.dark3, Colors.accent]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          {/* Elementos decorativos */}
          <View style={styles.decorativeCircle1} pointerEvents="none" />
          <View style={styles.decorativeCircle2} pointerEvents="none" />

          {/* Logo y título principal */}
          <View style={styles.headerSection}>
            <Image
              source={require('../assets/TeTocaLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>TeToca</Text>
            <Text style={styles.appSlogan}>Tu tiempo es valioso, organízalo</Text>
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
            <Text style={styles.formTitle}>Iniciar Sesión</Text>

            {/* Campos de entrada */}
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Botón de ingreso */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[Colors.accent, Colors.dark3]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Opciones alternativas */}
            <View style={styles.alternativeLoginContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>O continúa con</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={22} color={Colors.dark2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={22} color={Colors.dark2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={22} color={Colors.dark2} />
              </TouchableOpacity>
            </View>

            {/* Enlace para registro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Regístrate ahora</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
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
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  appSlogan: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 25,
  },
  formContainer: {
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
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark2,
    marginBottom: 25,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: Colors.accent,
    fontSize: 14,
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  alternativeLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray2,
  },
  orText: {
    marginHorizontal: 10,
    color: Colors.gray1,
    fontSize: 14,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 25,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray2,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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