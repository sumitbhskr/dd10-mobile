// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, Text } from 'react-native';
// import { useAuth } from '../context/AuthContext';
// import { useNavigation } from '@react-navigation/native';

// export default function LoginScreen() {
//   const { signIn } = useAuth();
//   const navigation = useNavigation<any>();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Email and password required');
//       return;
//     }

//     try {
//       await signIn(email, password);
//       // success → AppNavigator automatically Home dikha dega
//     } catch (e: any) {
//       Alert.alert('Login failed', e.message);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 22, marginBottom: 20 }}>Login</Text>

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
//       />

//       <Button title="Login" onPress={handleLogin} />

//       {/* 👇 Go to Signup */}
//       <Text
//         style={{ marginTop: 15, textAlign: 'center', color: '#007AFF' }}
//         onPress={() => navigation.navigate('Signup')}
//       >
//         New user? Create an account
//       </Text>
//     </View>
//   );
// }


import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password required');
      return;
    }

    try {
      await signIn(email, password);
    } catch (e: any) {
      Alert.alert('Login failed', e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      {/* 🔑 Password with eye icon */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#ccc',
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{ flex: 1, paddingVertical: 10 }}
        />

     s   <Ionicons
          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
          size={22}
          color="#555"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <Button title="Login" onPress={handleLogin} />

      <Text
        style={{ marginTop: 15, textAlign: 'center', color: '#007AFF' }}
        onPress={() => navigation.navigate('Signup')}
      >
        New user? Create an account
      </Text>
    </View>
  );
}

