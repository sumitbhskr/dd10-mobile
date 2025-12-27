import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password required');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert('Success', 'Account created. Please login.');
      navigation.navigate('Login'); // 🔥 Login par redirect
    } catch (e: any) {
      Alert.alert('Signup failed', e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Signup</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <Button title="Create Account" onPress={handleSignup} />

      {/* 👇 Back to Login */}
      <Text
        style={{ marginTop: 15, textAlign: 'center', color: '#007AFF' }}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}
