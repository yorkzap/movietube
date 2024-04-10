import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StreamingAvailability.css';

const StreamingAvailability = ({ movieId }) => {
  const [streamingInfo, setStreamingInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '5fd87c2b5fmsh0f2cc898ef94fa1p1d8334jsnb311c44431f8';
      const host = 'streaming-availability.p.rapidapi.com';
      const url = `https://streaming-availability.p.rapidapi.com/get`;

      try {
        const response = await axios.get(url, {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': host,
          },
          params: {
            'tmdb_id': `movie/${movieId}`,
            'output_language': 'en',
            'series_granularity': 'show'
          }
        });
        setStreamingInfo(response.data.result.streamingInfo);
      } catch (error) {
        console.error('Error fetching streaming availability:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) {
    return <p className="streaming-loading">Fetching streaming availability...</p>;
  }

  if (!streamingInfo || Object.keys(streamingInfo).length === 0) {
    return <p className="streaming-not-available">Currently not available on any streaming platform. Look for other ways to watch this movie.</p>;
  }

  const extractPlatformName = (url) => {
    const hostname = new URL(url).hostname;
    const platformMap = {
      'tv.apple.com': 'Apple TV',
      'www.netflix.com': 'Netflix',
      'www.primevideo.com': 'Amazon Prime Video',
      'play.hbomax.com': 'HBO Max',
      // More mappings can be added here
    };
    return platformMap[hostname] || hostname;
  };

  // Avoid redundancy and only prefer .com domains to avoid other languages than English for now
  const uniquePlatforms = Object.values(streamingInfo).reduce((acc, platforms) => {
    Object.entries(platforms).forEach(([platform, { link }]) => {
      const platformName = extractPlatformName(link);
      if (!acc[platformName] && link.includes('.com')) {
        acc[platformName] = link;
      }
    });
    return acc;
  }, {});

  return (
    <div className="streaming-container">
      <h3 className="streaming-title">Watch Now</h3>
      <div className="streaming-links">
        {Object.entries(uniquePlatforms).map(([platformName, link]) => (
          <a key={platformName} href={link} target="_blank" rel="noopener noreferrer" className="streaming-button">
            Watch on {platformName}
          </a>
        ))}
      </div>
    </div>
  );
};

export default StreamingAvailability;
