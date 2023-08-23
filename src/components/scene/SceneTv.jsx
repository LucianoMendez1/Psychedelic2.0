import React, { useState, useEffect } from 'react';
import './scenetv.css';

const SceneTv = () => {
  const [isTvOn, setIsTvOn] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(0);
  const [videoRef, setVideoRef] = useState(null);

  const channels = [
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692582485/Blockhead_-_The_Music_Scene_g1govg.mp4',
      name: 'Channel 1'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692323906/moon_-_121799_1080p_yb749v.mp4',
      name: 'Channel 2'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692750118/TV_Static_Sound_Effect_-_Bzz_m5nyix.mp4',
      name: 'Channel 3'
    }
  ];

  useEffect(() => {
    if (isTvOn) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }, [isTvOn]);

  useEffect(() => {
    if (videoRef) {
      videoRef.load();
      videoRef.play();
    }
  }, [videoRef, currentChannel]);

  const handlePowerToggle = () => {
    setIsTvOn(!isTvOn);
    setCurrentChannel(0); // Reset channel when turning off the TV
  };

  const handleChannelChange = (channelIndex) => {
    if (isTvOn && channelIndex >= 0 && channelIndex < channels.length) {
      setCurrentChannel(channelIndex);
    }
  };

  return (
    <div className="tv-scene">
      <video className="background-video" autoPlay loop muted>
        <source src="https://res.cloudinary.com/dvnhn35l4/video/upload/v1692756361/tv_-_29552_1080p_dcm0xe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={`tv ${isTvOn ? 'on' : 'off'}`}>
        {isTvOn && (
          <video className="tv-screen" ref={setVideoRef} autoPlay loop >
            <source src={channels[currentChannel].url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="tv-overlay">
          {isTvOn && (
            <div className="channel-buttons">
              {channels.map((channel, index) => (
                <button
                  key={index}
                  className={`channel-button ${currentChannel === index ? 'active' : ''}`}
                  onClick={() => handleChannelChange(index)}
                >
                  {channel.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button className="power-button" onClick={handlePowerToggle}>
        {isTvOn ? 'Apagar' : 'Encender'}
      </button>
    </div>
  );
};

export default SceneTv;
