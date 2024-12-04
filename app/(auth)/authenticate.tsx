import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useSearchParams } from 'expo-router/build/hooks';
import { authenticate } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';

const Authenticate = () => {
  const [code, setCode] = useState('');
  const searchParams = useSearchParams();
  //@ts-expect-error
  const {setAuthToken} = useAuth();

  const email = searchParams.get('email'); // Corrigido aqui


  const onConfirm = async () => {
    if (typeof email !== 'string'){
      return;
    }
    try {
      const res = await authenticate({email, emailToken:code})
      console.log(res);
      setAuthToken(res.authToken);
    } catch (e) {
      Alert.alert("Error:", "Email code is incorrect")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your email</Text>

      <TextInput
        style={styles.input}
        placeholder="Email code"
        value={code}
        onChangeText={setCode}
        placeholderTextColor="#aaa"
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
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
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