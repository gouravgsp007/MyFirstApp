import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing information', 'Please enter email and password.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Login failed', error.message);
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Login to continue to your dashboard
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>
            Don't have an account?
          </Text>

          <Pressable onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}>
              Sign Up
            </Text>
          </Pressable>
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
    justifyContent: 'center',
    paddingHorizontal: 25,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 35,
  },

  input: {
    height: 55,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginBottom: 15,
  },

  loginButton: {
    height: 55,
    backgroundColor: '#007AFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    gap: 5,
  },

  signupText: {
    color: '#6b7280',
    fontSize: 15,
  },

  signupLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});