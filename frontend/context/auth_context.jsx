import { View, Text } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      loadWallet(parsedUser.wallet);
    } else {
      setUser(null);
      setToken('');
      setWallet(null);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    setToken('');
    setWallet(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.clear();
  };

  const loadWallet = async (walletId) => {
    try {
      const response = await axios.get(
        `https://web3-server-u0zp.onrender.com/api/wallets/${walletId}`
      );
      setWallet(response.data);
    } catch (error) {
      console.error('Failed to load wallet:', error);
    }
  };

  const loadWalletFromUser = async (userData) => {
    setUser(userData);
    await loadWallet(userData.wallet);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        wallet,
        logoutUser,
        loadWalletFromUser,
        loadWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
