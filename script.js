<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2487.2">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; -webkit-text-stroke: #000000; min-height: 14.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">const apiKey = 'AIzaSyA7KjNd54vFCx1CDdnUVU13Fkp7PqiwlA8';</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">function searchYouTube() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>const searchQuery = document.getElementById('searchQuery').value;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>gapi.client.setApiKey(apiKey);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>gapi.client.load('youtube', 'v3', function() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const request = gapi.client.youtube.search.list({</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>q: searchQuery,</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>part: 'snippet',</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>type: 'video',</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>order: 'viewCount',</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>maxResults: 10 // You can adjust this based on your requirements</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>request.execute(function(response) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const videos = response.items;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const resultTable = document.getElementById('resultTable');</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const resultBody = document.getElementById('resultBody');</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>resultBody.innerHTML = '';</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>videos.forEach(video =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const videoId = video.id.videoId;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const snippet = video.snippet;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Fetch video details</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const videoRequest = gapi.client.youtube.videos.list({</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>part: 'snippet,statistics',</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>id: videoId</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>});</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>videoRequest.execute(function(videoResponse) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>const videoInfo = videoResponse.items[0];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>const statistics = videoInfo.statistics;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>const row = resultBody.insertRow();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>row.insertCell(0).innerHTML = `&lt;a href="https://www.youtube.com/watch?v=${videoId}" target="_blank"&gt;${snippet.title}&lt;/a&gt;`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>row.insertCell(1).innerHTML = snippet.channelTitle;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>row.insertCell(2).innerHTML = snippet.channelId;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>row.insertCell(3).innerHTML = statistics.viewCount;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>row.insertCell(4).innerHTML = statistics.likeCount;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>row.insertCell(5).innerHTML = statistics.commentCount;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>});</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>});</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>});</span></p>
<p class="p1"><span class="s1">}</span></p>
</body>
</html>
