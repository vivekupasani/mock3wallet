import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useContext, useState } from 'react';
import { ArrowLeft, Scan, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '@/context/auth_context';
import axios from 'axios';
export default function SendScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH');

  const tokens = ['ETH', 'BTC', 'MATIC', 'USDC'];

  const { user } = useContext(AuthContext);

  const handleSend = async () => {
    if (!recipient || !amount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(
        'https://web3-server-u0zp.onrender.com/api/transactions/send',
        {
          from: user?.wallet,
          to: recipient,
          amount: Number(amount),
          type: selectedToken.toLowerCase(),
        }
      );

      // console.log(res.data);
      alert(`Transaction sent successfully!`);
      setRecipient('');
      setAmount('');
      setSelectedToken('ETH');
    } catch (error) {
      console.error('Error sending transaction:', error);
      alert('Failed to send transaction. Please try again.');
      return;
    }
    alert(`Sending ${amount} ${selectedToken} to ${recipient}`);
  };

  const TokenSelector = () => (
    <View style={styles.tokenSelector}>
      <Text style={styles.label}>Select Token</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tokenList}
      >
        {tokens.map((token) => (
          <TouchableOpacity
            key={token}
            style={[
              styles.tokenButton,
              selectedToken === token && styles.tokenButtonActive,
            ]}
            onPress={() => setSelectedToken(token)}
          >
            <Text
              style={[
                styles.tokenButtonText,
                selectedToken === token && styles.tokenButtonTextActive,
              ]}
            >
              {token}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Crypto</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Recipient Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter wallet address or ENS name"
              placeholderTextColor="#64748B"
              value={recipient}
              onChangeText={setRecipient}
              autoCapitalize="none"
            />
            {/* <TouchableOpacity style={styles.inputButton}>
              <Scan size={20} color="#8B5CF6" />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.inputButton}>
              <Users size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        <TokenSelector />

        <View style={styles.section}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#64748B"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <Text style={styles.currency}>{selectedToken}</Text>
          </View>
          <Text style={styles.usdValue}>≈ $0.00</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.feeContainer}>
            <Text style={styles.feeLabel}>Network Fee</Text>
            <Text style={styles.feeValue}>$2.50</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {amount || '0.00'} {selectedToken}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSend}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  section: {
    marginTop: 24,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#F1F5F9',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  input: {
    flex: 1,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#F1F5F9',
  },
  inputButton: {
    padding: 12,
    marginRight: 8,
  },
  tokenSelector: {
    marginTop: 24,
  },
  tokenList: {
    flexDirection: 'row',
  },
  tokenButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tokenButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  tokenButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#94A3B8',
  },
  tokenButtonTextActive: {
    color: '#FFFFFF',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
  },
  amountInput: {
    flex: 1,
    paddingVertical: 20,
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#F1F5F9',
  },
  currency: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#8B5CF6',
  },
  usdValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  feeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
  },
  feeValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#F1F5F9',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#F1F5F9',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#8B5CF6',
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
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
});
