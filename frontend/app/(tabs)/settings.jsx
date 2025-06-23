import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useContext, useState } from 'react';
import {
  User,
  Shield,
  Globe,
  Bell,
  Moon,
  CircleHelp as HelpCircle,
  LogOut,
  ChevronRight,
  Fingerprint,
  Smartphone,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '@/context/auth_context';
import ProfileModalSheet from '../profile';

export default function SettingsScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { logoutUser, user } = useContext(AuthContext);
  const navigation = useNavigation();

  function handleLogout() {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await logoutUser();
            navigation.reset({
              index: 0,
              routes: [{ name: 'login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  }

  const SettingsSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingsItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    rightElement,
    showChevron = true,
  }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#8B5CF6" />
        </View>
        <View style={styles.settingsInfo}>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingsRight}>
        {rightElement}
        {showChevron && !rightElement && (
          <ChevronRight size={20} color="#64748B" />
        )}
      </View>
    </TouchableOpacity>
  );

  const ToggleItem = ({
    icon: Icon,
    title,
    subtitle,
    value,
    onValueChange,
  }) => (
    <SettingsItem
      icon={Icon}
      title={title}
      subtitle={subtitle}
      rightElement={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#334155', true: '#8B5CF6' }}
          thumbColor={value ? '#FFFFFF' : '#64748B'}
        />
      }
      showChevron={false}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsSection title="Account">
          <SettingsItem
            icon={User}
            title="Profile"
            subtitle="Manage your account settings"
            onPress={() => setModalVisible(true)}
          />

          <SettingsItem
            icon={Shield}
            title="Security"
            subtitle="Password, 2FA, and backup"
            onPress={() => alert('Security settings')}
          />
          <SettingsItem
            icon={Globe}
            title="Networks"
            subtitle="Manage connected networks"
            onPress={() => alert('Network settings')}
          />
        </SettingsSection>

        <SettingsSection title="Privacy & Security">
          <ToggleItem
            icon={Fingerprint}
            title="Biometric Authentication"
            subtitle="Use fingerprint or face recognition"
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
          />
          <SettingsItem
            icon={Smartphone}
            title="Connected Apps"
            subtitle="Manage app permissions"
            onPress={() => alert('Connected apps')}
          />
        </SettingsSection>

        <SettingsSection title="Preferences">
          <ToggleItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Transaction and price alerts"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <ToggleItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Use dark theme"
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="FAQs and contact support"
            onPress={() => alert('Help & Support')}
          />
        </SettingsSection>

        <View style={styles.logoutSection}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      <ProfileModalSheet
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        user={user || null}
      />
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
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#8B5CF6',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsInfo: {
    flex: 1,
  },
  settingsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F1F5F9',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  settingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  versionInfo: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});
