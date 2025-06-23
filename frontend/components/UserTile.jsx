import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { User2, Copy } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';

const UserTile = ({ user }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(user.wallet);
    // Alert.alert('Copied', 'Wallet address copied to clipboard');
  };

  return (
    <TouchableOpacity style={styles.userTile}>
      <View style={styles.avatar}>
        <User2 size={20} color="#FFFFFF" />
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.walletRow}>
          <Text style={styles.wallet}>
            `${user.wallet.slice(0, 10)}...${user.wallet.slice(-8)}`;
          </Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
            <Copy size={16} color="#60A5FA" />
          </TouchableOpacity>
        </View>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userTile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#1E293B',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: '#F1F5F9',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 2,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    gap: 6,
  },
  wallet: {
    color: '#94A3B8',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    flexShrink: 1,
  },
  copyBtn: {
    padding: 4,
  },
  email: {
    color: '#64748B',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});

export default UserTile;
