import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Copy, X } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';

const ProfileModalSheet = ({ isVisible, onClose, user }) => {
  const getInitials = (name) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(user.wallet);
    // Alert.alert('Copied', 'Wallet address copied to clipboard');
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.sheet}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <X size={20} color="#94A3B8" />
        </TouchableOpacity>

        <View style={styles.avatar}>
          <Text style={styles.initials}>{getInitials(user?.name)}</Text>
        </View>

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email || user?.phone}</Text>

        <View style={styles.walletRow}>
          <Text style={styles.wallet}>{user?.wallet}</Text>
          <TouchableOpacity onPress={handleCopy} style={styles.copyBtn}>
            <Copy size={16} color="#60A5FA" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: '#1E293B',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  name: {
    fontSize: 20,
    color: '#F1F5F9',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  email: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 12,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  wallet: {
    color: '#CBD5E1',
    fontSize: 13,
    flexShrink: 1,
  },
  copyBtn: {
    marginLeft: 8,
    padding: 4,
  },
});

export default ProfileModalSheet;
