import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Copy } from 'lucide-react-native';
import { useState } from 'react';

export default function WalletCard({ balance, address, onCopyAddress }) {
  const [showBalance, setShowBalance] = useState(true);

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <LinearGradient
      colors={['#8B5CF6', '#3B82F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.walletTitle}>Total Balance</Text>
        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
          {showBalance ? (
            <Eye size={20} color="#FFFFFF" />
          ) : (
            <EyeOff size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.balance}>{showBalance ? `$${balance}` : '****'}</Text>

      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Wallet Address</Text>
        <TouchableOpacity style={styles.addressRow} onPress={onCopyAddress}>
          <Text style={styles.address}>{formatAddress(address)}</Text>
          <Copy size={16} color="#E2E8F0" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#E2E8F0',
  },
  balance: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  addressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  addressLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#E2E8F0',
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
