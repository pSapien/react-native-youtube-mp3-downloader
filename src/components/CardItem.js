import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  image: {
    width: 150,
    height: 90,
  },
  titleDownloadContainer: {
    flex: 1,
    marginLeft: 15,
    width: '100%',
  },
  title: {
    fontSize: 10,
    color: '#111',
  },
  channel: {
    fontSize: 8,
    color: 'rgba(211,211,211,1)',
  },
  titleContainer: {

  }
});

export default function CardItem({ item }) {
  const {
    snippet: { title, thumbnails, channelTitle }
  } = item;
  const { url, height, width } = thumbnails.medium;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url }}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.titleDownloadContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.channel} numberOfLines={1}>
            {channelTitle}
          </Text>
        </View>
      </View>
    </View>
  )
}
