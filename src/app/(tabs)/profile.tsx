import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data } = await supabase.auth.getUser();

    setUser(data.user);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('Logout error:', error);
      return;
    }

    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          My Profile
        </Text>

        <Text style={styles.subtitle}>
          Account information
        </Text>

        <View style={styles.profileCard}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>

          <Text style={styles.name}>
            User
          </Text>

          <Text style={styles.email}>
            {user?.email || 'No email available'}
          </Text>

        </View>

        <View style={styles.infoCard}>

          <Text style={styles.sectionTitle}>
            Account
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Email
            </Text>

            <Text style={styles.infoValue}>
              {user?.email || '-'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Status
            </Text>

            <Text style={styles.verifiedText}>
              Verified
            </Text>
          </View>

        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>
            Logout
          </Text>
        </Pressable>

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
    marginBottom: 30,
  },

  profileCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: 'bold',
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 15,
  },

  email: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 5,
  },

  infoCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  infoLabel: {
    fontSize: 15,
    color: '#6b7280',
  },

  infoValue: {
    fontSize: 14,
    color: '#111827',
    maxWidth: '65%',
    textAlign: 'right',
  },

  verifiedText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
  },

  logoutButton: {
    marginTop: 25,
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },

  logoutButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },
});