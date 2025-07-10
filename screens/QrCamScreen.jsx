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
  Easing,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');
const qrScanSize = width * 0.8;
const cameraSize = qrScanSize * 0.7;

// Importación condicional de la cámara
let CameraView, useCameraPermissions;
if (Platform.OS !== 'web') {
  try {
    const cameraModule = require('expo-camera');
    CameraView = cameraModule.CameraView;
    useCameraPermissions = cameraModule.useCameraPermissions;
  } catch (error) {
    console.warn('Expo Camera no disponible');
  }
}

export default function QrCamScreen({ navigation }) {
  const [qrCode, setQrCode] = useState('');
  const [permission, requestPermission] = Platform.OS !== 'web' && useCameraPermissions ? useCameraPermissions() : [null, () => {}];
  const [webCameraStream, setWebCameraStream] = useState(null);
  const [webCameraError, setWebCameraError] = useState(null);
  const [scanningMode, setScanningMode] = useState(Platform.OS === 'web' ? 'manual' : 'camera'); // 'camera', 'manual'
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

    Animated.loop(pulseAnimation).start();

    // Para web, intentar inicializar la cámara
    if (Platform.OS === 'web' && scanningMode === 'camera') {
      initWebCamera();
    }

    return () => {
      scaleAnim.stopAnimation();
      stopWebCamera();
    };
  }, [scanningMode]);

  const initWebCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Cámara trasera preferida
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      setWebCameraStream(stream);
      setWebCameraError(null);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      setWebCameraError('No se pudo acceder a la cámara. Usa entrada manual.');
      setScanningMode('manual');
    }
  };

  const stopWebCamera = () => {
    if (webCameraStream) {
      webCameraStream.getTracks().forEach(track => track.stop());
      setWebCameraStream(null);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    console.log(`Código QR escaneado: ${data}`);
    navigation.navigate('Ticket', { qrData: data });
  };

  const handleManualEntry = () => {
    if (!qrCode.trim()) {
      Alert.alert('Error', 'Por favor ingresa un código QR válido');
      return;
    }
    console.log(`Código QR ingresado: ${qrCode}`);
    navigation.navigate('Ticket', { qrData: qrCode });
  };

  const toggleScanningMode = () => {
    if (Platform.OS === 'web') {
      setScanningMode(scanningMode === 'camera' ? 'manual' : 'camera');
    }
  };

  // Renderizar para web con cámara o entrada manual
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/TeTocaLogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

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
              
              {scanningMode === 'camera' && !webCameraError ? (
                <View style={styles.webCameraContainer}>
                  <video
                    ref={videoRef}
                    style={styles.webCamera}
                    autoPlay
                    playsInline
                    muted
                  />
                  <canvas
                    ref={canvasRef}
                    style={{ display: 'none' }}
                  />
                </View>
              ) : (
                <View style={styles.manualEntryContainer}>
                  <Ionicons name="qr-code-outline" size={80} color={Colors.white} />
                  <Text style={styles.instructionText}>
                    {webCameraError ? webCameraError : 'Ingresa el código QR manualmente'}
                  </Text>
                  <TextInput
                    style={styles.qrInput}
                    placeholder="Ingresa el código QR aquí"
                    placeholderTextColor={Colors.gray1}
                    value={qrCode}
                    onChangeText={setQrCode}
                    autoCapitalize="characters"
                  />
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleManualEntry}
                  >
                    <Text style={styles.submitButtonText}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>

            <Text style={styles.instructionText}>
              {scanningMode === 'camera' 
                ? 'Enfoca el código QR en el recuadro' 
                : 'Ingresa el código manualmente o activa la cámara'
              }
            </Text>

            {/* Botones de control */}
            <View style={styles.controlButtonsContainer}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleScanningMode}
              >
                <Ionicons 
                  name={scanningMode === 'camera' ? 'create-outline' : 'camera-outline'} 
                  size={24} 
                  color={Colors.white} 
                />
                <Text style={styles.controlButtonText}>
                  {scanningMode === 'camera' ? 'Entrada manual' : 'Usar cámara'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.alternativeButton}
                onPress={() => navigation.navigate('Category')}
              >
                <Ionicons name="search" size={24} color={Colors.white} />
                <Text style={styles.alternativeButtonText}>Buscar por categorías</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // Para dispositivos nativos - mantener lógica original
  if (!permission) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>Cargando permisos de cámara...</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={styles.backgroundImage}
        >
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
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // Renderizar cámara para dispositivos nativos con permisos
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/TeTocaLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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
            <View style={styles.cameraContainer}>
              {CameraView && (
                <CameraView
                  style={styles.camera}
                  barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                  }}
                  onBarcodeScanned={handleBarCodeScanned}
                />
              )}
            </View>
          </Animated.View>

          <Text style={styles.instructionText}>
            Escanea el código QR del establecimiento para tomar tu turno
          </Text>

          <TouchableOpacity
            style={styles.alternativeButton}
            onPress={() => navigation.navigate('Category')}
          >
            <Ionicons name="search" size={24} color={Colors.white} />
            <Text style={styles.alternativeButtonText}>Buscar por categorías</Text>
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
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 220,
    height: 180,
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
  webCameraContainer: {
    width: cameraSize,
    height: cameraSize,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: Colors.dark1,
  },
  webCamera: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  manualEntryContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 30,
    width: cameraSize,
    height: cameraSize,
    justifyContent: 'center',
  },
  instructionText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  qrInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    width: '100%',
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.dark1,
    outline: 'none',
    border: 'none',
  },
  submitButton: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  controlButton: {
    backgroundColor: Colors.dark2,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
    marginRight: 10,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '600',
  },
  alternativeButton: {
    backgroundColor: Colors.dark3,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  alternativeButtonText: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '600',
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
});