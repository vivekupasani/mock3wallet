import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoginScreen from '../login';
import RegisterScreen from '../register';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../../context/auth_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendScreen from './send';
import HistoryScreen from './history';
import UsersScreen from '../users';
import TabLayout from '../tab-layout';

const Stack = createStackNavigator();

const _layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthState = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
      setLoading(false);
    };
    handleAuthState();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const initialRouteName = isLoggedIn ? 'tab' : 'login';

  return (
    <AuthProvider>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="history" component={HistoryScreen} />
        <Stack.Screen name="send" component={SendScreen} />
        <Stack.Screen name="users" component={UsersScreen} />
        <Stack.Screen name="tab" component={TabLayout} />
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
