import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Keyboard, FlatList, Image } from 'react-native';

import { YOUTUBE_API_KEY } from './config';
import CardItem from './CardItem';

const styles = StyleSheet.create({
  textInputStyles: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const constructUrl = (query) => `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${YOUTUBE_API_KEY}&part=snippet&type=video&max_results=1`;

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [videos, setVideos] = React.useState(null);

  async function handleSearch() {
    const response = await fetch(constructUrl(searchTerm));
    const data = await response.json();
    setVideos(data.items);
  };

  return (
    <View>
      <TextInput
        autoFocus
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        style={styles.textInputStyles}
      />
      <Button
        title="Search"
        onPress={async () => {
          Keyboard.dismiss();
          await handleSearch();
        }}
      />
      <FlatList
        data={videos}
        keyExtractor={item => item && item.id && item.id.videoId}
        renderItem={CardItem}
      />
    </View>
  );
}
