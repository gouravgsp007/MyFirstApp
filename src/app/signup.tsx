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

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      Alert.alert(
        'Missing information',
        'Please fill in all fields.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password mismatch',
        'Passwords do not match.'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak password',
        'Password must be at least 6 characters.'
      );
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Signup failed', error.message);
      return;
    }

    if (data.session) {
      router.replace('/(tabs)');
      return;
    }

    Alert.alert(
      'Account created',
      'Your account was created. Please check your email to verify your account, then log in.',
      [
        {
          text: 'Go to Login',
          onPress: () => router.replace('/login'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Sign up to start using your dashboard
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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.signupButtonText}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Text>
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <Pressable onPress={() => router.replace('/login')}>
            <Text style={styles.loginLink}>
              Login
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

  signupButton: {
    height: 55,
    backgroundColor: '#007AFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  signupButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    gap: 5,
  },

  loginText: {
    color: '#6b7280',
    fontSize: 15,
  },

  loginLink: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});