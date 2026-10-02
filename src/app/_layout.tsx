import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    console.log('AUTH: RootLayout started');

    const loadSession = async () => {
      console.log('AUTH: Getting session...');

      try {
        const { data, error } =
          await supabase.auth.getSession();

        console.log(
          'AUTH: getSession finished',
          data.session ? 'SESSION FOUND' : 'NO SESSION'
        );

        if (error) {
          console.log(
            'AUTH: getSession error:',
            error.message
          );
        }

        setSession(data.session);
      } catch (error) {
        console.log(
          'AUTH: getSession crashed:',
          error
        );
      } finally {
        console.log('AUTH: Setting loading false');
        setLoading(false);
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        console.log(
          'AUTH: Auth state changed:',
          _event,
          newSession
            ? 'SESSION FOUND'
            : 'NO SESSION'
        );

        setSession(newSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(
      'AUTH: Navigation check',
      'loading:',
      loading,
      'session:',
      session ? 'YES' : 'NO',
      'segments:',
      segments
    );

    if (loading) {
      return;
    }

    const firstSegment = segments[0];

    const inAuthGroup =
      firstSegment === 'login' ||
      firstSegment === 'signup';

    if (!session && !inAuthGroup) {
      console.log(
        'AUTH: No session → Login'
      );

      router.replace('/login');
      return;
    }

    if (session && inAuthGroup) {
      console.log(
        'AUTH: Session found → Dashboard'
      );

      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  if (loading) {
    console.log('AUTH: Rendering loading screen');
    return null;
  }

  console.log('AUTH: Rendering Stack');

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}