import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { login } from '@/lib/api/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme(); // Detect the theme

  const onSignIn = async () => {
    console.warn('Sign in:', email);
    try {
      await login({ email });
    } catch (e) {
      //@ts-expect-error
      Alert.alert('error', e.message);
    }
    router.push({ pathname: '/authenticate', params: { email } });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f9f9f9' },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colorScheme === 'dark' ? '#fff' : '#333' },
        ]}
      >
        Sign in or create an account
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff',
            color: colorScheme === 'dark' ? '#fff' : '#000',
            borderColor: colorScheme === 'dark' ? '#555' : '#ccc',
          },
        ]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
      />

      <Pressable style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#f3b240',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignIn;
