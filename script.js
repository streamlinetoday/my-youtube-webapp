const apiKey = 'AIzaSyA7KjNd54vFCx1CDdnUVU13Fkp7PqiwlA8';

function searchYouTube() {
  const searchQuery = document.getElementById('searchQuery').value;
  gapi.client.setApiKey(apiKey);
  gapi.client.load('youtube', 'v3', function() {
    const request = gapi.client.youtube.search.list({
      q: searchQuery,
      part: 'snippet',
      type: 'video',
      order: 'viewCount',
      maxResults: 10 // You can adjust this based on your requirements
    });

    request.execute(function(response) {
      const videos = response.items;

      const resultTable = document.getElementById('resultTable');
      const resultBody = document.getElementById('resultBody');
      resultBody.innerHTML = '';

      videos.forEach(video => {
        const videoId = video.id.videoId;
        const snippet = video.snippet;

        // Fetch video details
        const videoRequest = gapi.client.youtube.videos.list({
          part: 'snippet,statistics',
          id: videoId
        });

        videoRequest.execute(function(videoResponse) {
          const videoInfo = videoResponse.items[0];
          const statistics = videoInfo.statistics;

          const row = resultBody.insertRow();
          row.insertCell(0).innerHTML = `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${snippet.title}</a>`;
          row.insertCell(1).innerHTML = snippet.channelTitle;
          row.insertCell(2).innerHTML = snippet.channelId;
          row.insertCell(3).innerHTML = statistics.viewCount;
          row.insertCell(4).innerHTML = statistics.likeCount;
          row.insertCell(5).innerHTML = statistics.commentCount;
        });
      });
    });
  });
}
