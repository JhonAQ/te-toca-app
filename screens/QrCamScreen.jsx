import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Button
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');
const qrScanSize = width * 0.7; // 70% del ancho de la pantalla

export default function QrCamScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();

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
        <Button
          title="Conceder permiso"
          onPress={requestPermission}
          color={Colors.accent}
        />
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

          {/* Área de escaneo QR con marco */}
          <View style={styles.qrContainer}>
            <Image
              source={require('../assets/qr-border.png')}
              style={styles.qrBorder}
              resizeMode="contain"
            />
            <View style={styles.cameraContainer}>
              <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                  barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={handleBarCodeScanned}
              />
            </View>
          </View>

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
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 80,
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
    width: qrScanSize,
    height: qrScanSize,
    position: 'absolute',
    zIndex: 2,
  },
  cameraContainer: {
    width: qrScanSize - 30, // Un poco más pequeño que el marco
    height: qrScanSize - 30,
    overflow: 'hidden',
    borderRadius: 15,
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
    backgroundColor: Colors.dark2,
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
});
