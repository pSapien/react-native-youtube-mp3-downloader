import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Keyboard, FlatList, Image } from 'react-native';

import { CardItem } from './components';
import * as api from './api';

const styles = StyleSheet.create({
  textInputStyles: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [videos, setVideos] = React.useState(null);

  React.useEffect(() => {
    setVideos(api.mock);
  }, []);

  const handleSearch = async () => {
    Keyboard.dismiss();
    const data = await api.fetchVideosFromQuery(searchTerm);
    setVideos(data);
  };

  return (
    <View>
      <TextInput
        style={styles.textInputStyles}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Button
        title="Search"
        onPress={handleSearch}
      />
      <FlatList
        data={videos}
        renderItem={CardItem}
        keyExtractor={item => item && item.id && item.id.videoId}
      />
    </View>
  );
}
