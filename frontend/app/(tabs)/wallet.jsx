import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import WalletCard from '@/components/WalletCard';
import QuickActions from '@/components/QuickActions';
import TokenList from '@/components/TokenList';
import { AuthContext } from '@/context/auth_context';
import { RefreshControl } from 'react-native-gesture-handler';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from 'expo-router';

export default function WalletScreen() {
  // const [walletData, setWalletData] = useState({
  //   balance: 12459.32,
  //   address: '0x742d35Cc6663C0532939d4e6e01CaB9eb4C77b21',
  // });

  const { user, wallet, loadWallet } = useContext(AuthContext);
  const [tokens, setTokens] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTokens([
      {
        id: 1,
        name: 'Ethereum',
        symbol: 'ETH',
        balance: (wallet?.eth ?? 0).toLocaleString(),
        value: ((wallet?.eth ?? 0) * 3500).toLocaleString(),
        change: 2.45,
      },
      {
        id: 2,
        name: 'Bitcoin',
        symbol: 'BTC',
        balance: (wallet?.btc ?? 0).toLocaleString(),
        value: ((wallet?.btc ?? 0) * 65000).toLocaleString(),
        change: -1.23,
      },
      {
        id: 3,
        name: 'Polygon',
        symbol: 'MATIC',
        balance: (wallet?.matic ?? 0).toLocaleString(),
        value: ((wallet?.matic ?? 0) * 1.2).toLocaleString(),
        change: 5.67,
      },
      {
        id: 4,
        name: 'USDC',
        symbol: 'USDC',
        balance: (wallet?.usdc ?? 0).toLocaleString(),
        value: ((wallet?.usdc ?? 0) * 1).toLocaleString(),
        change: 5.67,
      },
    ]);
  }, [wallet]);

  const handleCopyAddress = () => {
    Clipboard.setStringAsync(wallet?.address ?? '');
  };

  const handleSend = () => {
    navigation.navigate('send');
  };

  const handleReceive = () => {
    navigation.navigate('history');
  };

  const handleScan = () => {
    navigation.navigate('users');
  };

  const handleMore = () => {
    Alert.alert('More Options', 'Show additional wallet options');
  };

  const handleTokenPress = (token) => {
    Alert.alert(token.name, `View ${token.name} details`);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    loadWallet(user?.wallet);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
            colors={['#3B82F6']}
          />
        }
      >
        <WalletCard
          balance={wallet?.balance || '0.00'}
          address={wallet?.address}
          onCopyAddress={handleCopyAddress}
        />
        <QuickActions
          onSend={handleSend}
          onReceive={handleReceive}
          onScan={handleScan}
          onMore={handleMore}
        />
        <TokenList tokens={tokens} onTokenPress={handleTokenPress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
});
