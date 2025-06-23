import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CircleCheck as CheckCircle,
  Circle as XCircle,
} from 'lucide-react-native';
import axios from 'axios';
import { AuthContext } from '@/context/auth_context';
import { RefreshControl } from 'react-native-gesture-handler';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);
  const { wallet, loadWallet } = useContext(AuthContext);
  const [refere, setRefere] = useState(false);

  useEffect(() => {
    if (wallet?.address) {
      getTransactions();
    }
  }, [wallet]);

  // Fetch transactions for the current wallet
  const getTransactions = async () => {
    try {
      const res = await axios.get(
        `https://web3-server-u0zp.onrender.com/api/transactions/wallet/${wallet.address}`
      );
      const reversedTransactions = res.data.reverse();
      setTransactions(reversedTransactions);
      // console.log('Fetched transactions:', res.data);
    } catch (error) {
      console.error('Fetch error:', error.message);
      console.log('Full error:', error.response?.data || error);
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#10B981" />;
      case 'pending':
        return <Clock size={16} color="#F59E0B" />;
      case 'failed':
        return <XCircle size={16} color="#EF4444" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const onRefresh = () => {
    setRefere(true);
    loadWallet(wallet?.address);
    setRefere(false);
  };

  if (!wallet) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
          Loading wallet...
        </Text>
      </SafeAreaView>
    );
  }

  const TransactionItem = ({ transaction }) => {
    const isSent = wallet?.address && transaction.from === wallet.address;

    return (
      <TouchableOpacity style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <View
            style={[
              styles.transactionIcon,
              {
                backgroundColor: isSent ? '#EF4444' : '#10B981',
              },
            ]}
          >
            {isSent ? (
              <ArrowUpRight size={20} color="#FFFFFF" />
            ) : (
              <ArrowDownLeft size={20} color="#FFFFFF" />
            )}
          </View>

          <View style={styles.transactionInfo}>
            <Text style={styles.transactionType}>
              {isSent ? 'Sent' : 'Received'}
            </Text>
            <Text style={styles.transactionAddress}>
              {isSent ? `To: ${transaction.to}` : `From: ${transaction.from}`}
            </Text>
            <Text style={styles.transactionDate}>
              {new Date(transaction.createdAt).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isSent ? '#EF4444' : '#10B981' },
            ]}
          >
            {isSent ? '-' : '+'}
            {transaction.amount}
          </Text>
          <Text style={styles.transactionUsd}>
            ${transaction.usd ? transaction.usd.toLocaleString() : '0'}
          </Text>
          <View style={styles.statusContainer}>
            {getStatusIcon(transaction.status)}
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(transaction.status) },
              ]}
            >
              {transaction.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refere}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
            colors={['#3B82F6']}
          />
        }
      >
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
            No transactions found.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#F1F5F9',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionItem: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F1F5F9',
    marginBottom: 2,
  },
  transactionAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  transactionUsd: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
    textTransform: 'capitalize',
  },
});
