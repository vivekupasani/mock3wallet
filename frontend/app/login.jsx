import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth_context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { loadWalletFromUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        console.error('Email and password are required');
        return;
      }

      const res = await axios.post(
        'https://web3-server-u0zp.onrender.com/api/auth/login',
        {
          email,
          password,
        }
      );

      const userData = res.data.user;

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await loadWalletFromUser(userData); // ✅ make sure wallet loads first

      navigation.replace('tab'); // ✅ navigate only after wallet is ready
    } catch (err) {
      console.error('Login failed:', err.response?.data.error || err.message);
    }
  };

  const goFromLogin = () => {
    navigation.navigate('register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#64748B"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#64748B"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogin}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View
          style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row' }}
        >
          <Text style={styles.settingsSubtitle}>Don't have an account?</Text>
          <TouchableOpacity onPress={goFromLogin}>
            <Text style={styles.settingsTitle}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  inputContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#F1F5F9',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 10,
  },
  sendButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sendButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  settingsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F1F5F9',
    marginBottom: 2,
    marginStart: 5,
  },
  settingsSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});
