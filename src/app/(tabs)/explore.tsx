import { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const COUNTER_KEY = '@my_first_app_counter';
const INCREASES_KEY = '@my_first_app_total_increases';

export default function ExploreScreen() {
  const [count, setCount] = useState(0);
  const [totalIncreases, setTotalIncreases] = useState(0);

  const loadData = async () => {
    try {
      const savedCount =
        await AsyncStorage.getItem(COUNTER_KEY);

      const savedIncreases =
        await AsyncStorage.getItem(INCREASES_KEY);

      setCount(
        savedCount !== null ? Number(savedCount) : 0
      );

      setTotalIncreases(
        savedIncreases !== null
          ? Number(savedIncreases)
          : 0
      );
    } catch (error) {
      console.log('Error loading statistics:', error);
    }
  };

  // Reload data whenever this screen becomes active
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Statistics
        </Text>

        <Text style={styles.subtitle}>
          Your counter activity
        </Text>

        {/* Current Count */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Current Count
          </Text>

          <Text style={styles.cardValue}>
            {count}
          </Text>
        </View>

        {/* Total Increases */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Total Increases
          </Text>

          <Text style={styles.cardValue}>
            {totalIncreases}
          </Text>
        </View>

        {/* Storage Status */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Counter Storage
          </Text>

          <Text style={styles.status}>
            ✓ Saved locally
          </Text>
        </View>

        {/* App Status */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            App Status
          </Text>

          <Text style={styles.status}>
            ✓ Working
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 30,
  },

  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    marginBottom: 15,

    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardLabel: {
    fontSize: 15,
    color: '#6b7280',
  },

  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },

  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 8,
  },
});