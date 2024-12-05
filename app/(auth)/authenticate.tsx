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
import { useSearchParams } from 'expo-router/build/hooks';
import { authenticate } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';

const Authenticate = () => {
  const [code, setCode] = useState('');
  const searchParams = useSearchParams();
  const { updateAuthToken } = useAuth();
  const colorScheme = useColorScheme(); // Detect the theme

  const email = searchParams.get('email');

  const onConfirm = async () => {
    if (typeof email !== 'string') {
      return;
    }
    try {
      const res = await authenticate({ email, emailToken: code });
      console.log(res);
      await updateAuthToken(res.authToken);
    } catch (e) {
      console.error(e); // Log the full error for debugging
      //@ts-expect-error
      if (e.response && e.response.status === 400) {
        Alert.alert('Error', 'Email code is incorrect');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
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
        Confirm your email
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
        placeholder="Email code"
        value={code}
        onChangeText={setCode}
        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
      />

      <Pressable style={styles.button} onPress={onConfirm}>
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

export default Authenticate;
