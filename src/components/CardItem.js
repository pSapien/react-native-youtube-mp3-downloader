import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, PermissionsAndroid } from 'react-native';

import ytdl from "react-native-ytdl";
import RNFetchBlob from 'rn-fetch-blob';

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

  },
  downloadButtonContainer: {

  },
  downloadText: {
    color: 'rgba(211,211,211,1)',
    fontSize: 10,
  },
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
        <DownloadWithProgress videoId={item.id.videoId} songName={title} />
      </View>
    </View>
  )
}

function DownloadWithProgress({ videoId, songName }) {
  async function startDownload() {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ytdl.getInfo(videoId, {}, (err, info) => {
        const format = ytdl.chooseFormat(info.formats, { quality: '134' });
        const SongPromise = RNFetchBlob
          .config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              title: `${songName}.mp3`,
            },
          })
          .fetch("GET", format.url)
      });
    }
  }

  return (
    <TouchableOpacity style={styles.downloadButtonContainer} onPress={startDownload}>
      <Text style={styles.downloadText}>Download Now</Text>
    </TouchableOpacity>
  )
}
