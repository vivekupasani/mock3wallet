import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

export default function TokenList({ tokens, onTokenPress }) {
  const TokenItem = ({ token }) => (
    <TouchableOpacity
      style={styles.tokenItem}
      onPress={() => onTokenPress(token)}
    >
      <View style={styles.tokenLeft}>
        <View style={styles.tokenIcon}>
          <Text style={styles.tokenSymbol}>{token.symbol.charAt(0)}</Text>
        </View>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenName}>{token.name}</Text>
          <Text style={styles.tokenAmount}>
            {token.balance} {token.symbol}
          </Text>
        </View>
      </View>
      <View style={styles.tokenRight}>
        <Text style={styles.tokenValue}>${token.value.toLocaleString()}</Text>
        <View style={styles.changeContainer}>
          {token.change >= 0 ? (
            <TrendingUp size={12} color="#10B981" />
          ) : (
            <TrendingDown size={12} color="#EF4444" />
          )}
          <Text
            style={[
              styles.changeText,
              { color: token.change >= 0 ? '#10B981' : '#EF4444' },
            ]}
          >
            {token.change >= 0 ? '+' : ''}
            {token.change.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Assets</Text>
      <ScrollView style={styles.tokenList} showsVerticalScrollIndicator={false}>
        {tokens.map((token, index) => (
          <TokenItem key={index} token={token} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#F1F5F9',
    marginBottom: 16,
  },
  tokenList: {
    flex: 1,
  },
  tokenItem: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tokenSymbol: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F1F5F9',
    marginBottom: 2,
  },
  tokenAmount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
  tokenRight: {
    alignItems: 'flex-end',
  },
  tokenValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F1F5F9',
    marginBottom: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
});
