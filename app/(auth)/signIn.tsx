import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onSignIn = async() =>{
    console.warn('Sign in:', email)
    router.push({pathname:'/authenticate', params: {email}})
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in or create an account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email} onChangeText={setEmail}
        placeholderTextColor="#aaa"
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

export default SignIn;