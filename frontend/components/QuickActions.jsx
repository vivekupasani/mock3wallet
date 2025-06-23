import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Send,
  ArrowDownToLine,
  MoveHorizontal as MoreHorizontal,
  Users,
} from 'lucide-react-native';

export default function QuickActions({ onSend, onReceive, onScan, onMore }) {
  const ActionButton = ({ icon: Icon, label, onPress, color = '#8B5CF6' }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Icon size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ActionButton icon={Send} label="Send" onPress={onSend} color="#8B5CF6" />
      <ActionButton
        icon={ArrowDownToLine}
        label="Receive"
        onPress={onReceive}
        color="#3B82F6"
      />
      <ActionButton
        icon={Users}
        label="Users"
        onPress={onScan}
        color="#10B981"
      />
      <ActionButton
        icon={MoreHorizontal}
        label="More"
        onPress={onMore}
        color="#F59E0B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#94A3B8',
  },
});
