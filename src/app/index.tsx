import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COUNTER_KEY = '@my_first_app_counter';
const INCREASES_KEY = '@my_first_app_total_increases';

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [totalIncreases, setTotalIncreases] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedCount = await AsyncStorage.getItem(COUNTER_KEY);
      const savedIncreases =
        await AsyncStorage.getItem(INCREASES_KEY);

      if (savedCount !== null) {
        setCount(Number(savedCount));
      }

      if (savedIncreases !== null) {
        setTotalIncreases(Number(savedIncreases));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    saveData();
  }, [count, totalIncreases, isLoaded]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        COUNTER_KEY,
        count.toString()
      );

      await AsyncStorage.setItem(
        INCREASES_KEY,
        totalIncreases.toString()
      );
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const increaseCount = () => {
    setCount((currentCount) => currentCount + 1);

    setTotalIncreases(
      (currentTotal) => currentTotal + 1
    );
  };

  const decreaseCount = () => {
    setCount((currentCount) =>
      currentCount > 0 ? currentCount - 1 : 0
    );
  };

  const resetCount = async () => {
    setCount(0);

    try {
      await AsyncStorage.setItem(COUNTER_KEY, '0');
    } catch (error) {
      console.log('Error resetting counter:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          My Dashboard
        </Text>

        <Text style={styles.subtitle}>
          Simple Counter Application
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Counter
          </Text>

          <Text style={styles.number}>
            {count}
          </Text>

          <Text style={styles.description}>
            Current count
          </Text>
        </View>

        <View style={styles.buttonRow}>

          <Pressable
            style={styles.secondaryButton}
            onPress={decreaseCount}
          >
            <Text style={styles.secondaryButtonText}>
              −
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={increaseCount}
          >
            <Text style={styles.primaryButtonText}>
              +1
            </Text>
          </Pressable>

        </View>

        <Pressable
          style={styles.resetButton}
          onPress={resetCount}
        >
          <Text style={styles.resetButtonText}>
            Reset Counter
          </Text>
        </Pressable>

        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>
            Total Increases
          </Text>

          <Text style={styles.statsValue}>
            {totalIncreases}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
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
    marginBottom: 40,
  },

  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },

  number: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 15,
  },

  description: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 5,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 30,
  },

  primaryButton: {
    backgroundColor: '#007AFF',
    width: 100,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#e5e7eb',
    width: 100,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#111827',
    fontSize: 28,
    fontWeight: 'bold',
  },

  resetButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },

  resetButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },

  statsCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 25,
    alignItems: 'center',
  },

  statsLabel: {
    fontSize: 15,
    color: '#6b7280',
  },

  statsValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 5,
  },
});