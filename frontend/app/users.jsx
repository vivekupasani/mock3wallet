import UserTile from '@/components/UserTile';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
export default function UsersScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        'https://web3-server-u0zp.onrender.com/api/auth/profiles'
      );
      setUsers(res.data);
      // console.log('Fetched users:', res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Platform Users</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <UserTile user={item} />}
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
});
