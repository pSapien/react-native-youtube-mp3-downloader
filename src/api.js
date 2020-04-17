import { stringify } from 'qs';
import { YOUTUBE_API_KEY } from './config';

const API_ROOT_URL = 'https://www.googleapis.com/youtube/v3';

async function fetchGet(url) {
  const response = await fetch(API_ROOT_URL + url);
  const data = await response.json();
  return data;
}

export async function fetchVideosFromQuery(queryInput) {
  const data = await fetchGet('/search?' + stringify({
    q: queryInput,
    key: YOUTUBE_API_KEY,
    part: 'snippet',
    type: 'video',
    maxResults: 1,
  }));

  await Promise.all(data.items.map(async vid => {
    const individualData = await fetchGet('/videos?' + stringify({
      key: YOUTUBE_API_KEY,
      part: 'statistics',
      id: vid.id.videoId,
    }));
    vid.statistics = individualData.items[0].statistics;
  }));

  return data.items;
}

export const mock = () => Array.from({ length: 5 }).map(v => item);

const item = {
  "kind": "youtube#searchResult",
  "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/A8m_YPujHB81RmbjdoOq376_LzM\"",
  "id": {
    "kind": "youtube#video",
    "videoId": "9yE59aWM7Z0"
  },
  "snippet": {
    "publishedAt": "2020-04-15T18:00:09.000Z",
    "channelId": "UC_F4Iy5korq2mEWZDQhG07w",
    "title": "SURFING CRAZY SANDBARS WITH KELLY SLATER AND JOHN JOHN! || LEARNING HOW TO FISH!",
    "description": "This video was shot before the lockdown caused by COVID-19. in this episode we convinced our filmers to go surfing and we filmed! also i try catching some fish ...",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/9yE59aWM7Z0/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/9yE59aWM7Z0/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/9yE59aWM7Z0/hqdefault.jpg",
        "width": 480,
        "height": 360
      }
    },
    "channelTitle": "Koa Rothman",
    "liveBroadcastContent": "none"
  }
};