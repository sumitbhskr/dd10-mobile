import React from 'react';
import { Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LogoutButton() {
  const { signOut } = useAuth();
  return <Button title="Logout" onPress={signOut} />;
}