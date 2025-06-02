import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const EnterpriseCard = ({ enterprise, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: enterprise.imageUrl }} 
        style={styles.image} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{enterprise.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color={Colors.gray1} />
          <Text style={styles.address} numberOfLines={1}>{enterprise.address}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={14} color={Colors.accent} />
            <Text style={styles.statValue}>{enterprise.waitTime}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={14} color={Colors.dark2} />
            <Text style={styles.statValue}>{enterprise.queueCount} colas</Text>
          </View>
          <Text style={styles.distance}>{enterprise.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark1,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    fontSize: 13,
    color: Colors.gray1,
    marginLeft: 4,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statValue: {
    fontSize: 12,
    color: Colors.dark2,
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: Colors.gray1,
    marginLeft: 'auto',
  },
});

export default EnterpriseCard;
