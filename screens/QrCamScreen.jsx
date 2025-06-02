import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');
const qrScanSize = width * 0.8; // 80% del ancho de la pantalla
const cameraSize = qrScanSize * 0.7; // Cámara será el 80% del tamaño del marco

export default function QrCamScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Configurar la animación de pulso del marco
  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ]);

    // Repetir la animación de manera infinita
    Animated.loop(pulseAnimation).start();

    return () => {
      // Detener animación cuando se desmonta el componente
      scaleAnim.stopAnimation();
    };
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    // Aquí procesamos el código QR escaneado
    console.log(`Código QR escaneado: ${data}`);
    // Navegar a la pantalla que corresponda según el QR escaneado
    // navigation.navigate('Queue', { qrData: data });
  };

  if (!permission) {
    // Los permisos de cámara están aún cargando
    return (
      <View style={styles.permissionContainer}>
        <Text>Cargando permisos de cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // No se han concedido los permisos de cámara todavía
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Necesitamos tu permiso para usar la cámara y escanear códigos QR
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Logo grande y centrado */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/TeTocaLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Área de escaneo QR con marco animado */}
          <Animated.View
            style={[
              styles.qrContainer,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <Image
              source={require('../assets/qr-border.png')}
              style={styles.qrBorder}
              resizeMode="contain"
            />
            {/* Cámara dentro del marco */}
            <View style={styles.cameraContainer}>
              <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                  barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={handleBarCodeScanned}
              />
            </View>
          </Animated.View>

          {/* Texto informativo */}
          <Text style={styles.instructionText}>
            Escanea el código QR del establecimiento para tomar tu turno
          </Text>

          {/* Botón de cámara */}
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="camera" size={24} color={Colors.white} />
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: Colors.dark1,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.white,
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  logoContainer: {
  },
  logo: {
    width: 220, // Logo más grande
    height: 180, // Altura proporcional
  },
  qrContainer: {
    position: 'relative',
    width: qrScanSize,
    height: qrScanSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  qrBorder: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  cameraContainer: {
    width: cameraSize,
    height: cameraSize,
    overflow: 'hidden',
    borderRadius: 10,
  },
  camera: {
    flex: 1,
  },
  instructionText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  cameraButton: {
    backgroundColor: Colors.dark3,
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.dark2,
  },
});
