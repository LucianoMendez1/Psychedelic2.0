import React, { useState, useEffect } from 'react';
import './scenetv.css';

const SceneTv = () => {
  const [isTvOn, setIsTvOn] = useState(false);
  const [showGifBackground, setShowGifBackground] = useState(true);
  const [currentChannel, setCurrentChannel] = useState(0);
  const [videoRef, setVideoRef] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // New state for video loading


  const channels = [
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692918962/videos%20animated%20pys/This_Will_Destroy_You__New_Topia___Music_Video___Adult_Swim_1080p_wnor41.mp4',
      name: 'Canal 11'
    },
    
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692918999/videos%20animated%20pys/Flying_Lotus_-_Zodiac_Shit_1080p_zu7ala.mp4',
      name: 'Canal 22'
    },


    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692915372/paraiso_ixq3xk.mp4',
      name: 'Canal 8'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692915267/y2mate.com_-_Chelou_Out_Of_Sight_1080p_os8vmk.mp4',
      name: 'Canal 17'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692918962/videos%20animated%20pys/This_Will_Destroy_You__New_Topia___Music_Video___Adult_Swim_1080p_wnor41.mp4',
      name: 'Canal 22'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692582485/Blockhead_-_The_Music_Scene_g1govg.mp4',
      name: 'Canal 33'
    },
    /* {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692323906/moon_-_121799_1080p_yb749v.mp4',
      name: 'Canal 34'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692323906/moon_-_121799_1080p_yb749v.mp4',
      name: 'Canal 66'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692323906/moon_-_121799_1080p_yb749v.mp4',
      name: 'Canal 77'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692323906/moon_-_121799_1080p_yb749v.mp4',
      name: 'Canal 86'
    },
    {
      url: 'https://res.cloudinary.com/dvnhn35l4/video/upload/v1692323906/moon_-_121799_1080p_yb749v.mp4',
      name: 'Canal 90'
    }, */
   
    
    
  ];

  useEffect(() => {
    if (isTvOn) {
      document.documentElement.requestFullscreen().catch((err) => {});
    } else {
      document.exitFullscreen();
      setShowGifBackground(true);
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
    setShowGifBackground(!isTvOn);
    setCurrentChannel(0);
  };

  const handleChannelChange = (channelIndex) => {
    if (isTvOn && channelIndex >= 0 && channelIndex < channels.length) {
      setCurrentChannel(channelIndex);
    }
  };

  const handleVolumeChange = (volume) => {
    if (videoRef) {
      videoRef.volume = volume;
    }
  };


  
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="tv-scene">
      <div className={`background-grid ${showGifBackground ? 'show' : 'hide'}`}>
        {/* Recuadros de GIF */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916607/7UIP_jmsxlv.gif" alt="Background GIF" />{/* gif 1 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916611/3ZO1_ikplkm.gif" alt="Background GIF" />{/* gif 2 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916509/e006c0bf3454b3590a429fc01464e8bb_cots4y.gif" alt="Background GIF" />{/* gif 3 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916520/7K1X_leacmp.gif" alt="Background GIF" />{/* gif 4 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916510/tumblr_510e536024b3c9947531ef07e3c2c521_d47e5eb4_500_kz61eg.gif" alt="Background GIF" />{/* gif 5 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916730/0714b48301f4154160f6ae08e12db796_slpl5c.gif" alt="Background GIF" />{/* gif 6 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917070/1Gyi_q3ecdu.gif" alt="Background GIF" />{/* gif 7 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916607/gg7_y4eijy.gif" alt="Background GIF" />{/* gif 8 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917071/7AxW_j4i8ao.gif" alt="Background GIF" />{/* gif 9 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917070/VGwL_ydshtt.gif" alt="Background GIF" />{/* gif 10 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917369/3RA7_h3np23.gif" alt="Background GIF" />{/* gif 11*/}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917373/P2bY_bmwnpf.gif" alt="Background GIF" />{/* gif 12 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917381/Aa58_evk7db.gif" alt="Background GIF" />{/* gif 13 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917375/vsgif_com__.2888973_wnkqy0.gif" alt="Background GIF" />{/* gif 14 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916607/7UIP_jmsxlv.gif" alt="Background GIF" />{/* gif 15 */}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917070/VGwL_ydshtt.gif" alt="Background GIF" />{/* gif 16*/}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916611/3ZO1_ikplkm.gif" alt="Background GIF" />{/* gif 16*/}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692917070/1Gyi_q3ecdu.gif" alt="Background GIF" />{/* gif 16*/}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916509/e006c0bf3454b3590a429fc01464e8bb_cots4y.gif" alt="Background GIF" />{/* gif 16*/}
        <img className="background-gif" src="https://res.cloudinary.com/dvnhn35l4/image/upload/v1692916730/0714b48301f4154160f6ae08e12db796_slpl5c.gif" alt="Background GIF" />{/* gif 16*/}
        
        
        

        {/* Agrega más recuadros de GIF según necesites */}
      </div>

      <div className={`tv ${isTvOn ? 'on' : 'off'}`}>
        {isTvOn && (
          <video
            className={`tv-screen ${isVideoLoaded ? 'loaded' : ''}`}
            ref={(ref) => {
              setVideoRef(ref);
              if (ref) {
                ref.onloadeddata = handleVideoLoaded;
              }
            }}
            autoPlay
            loop
          >
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
             <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    defaultValue="0.5"
    onChange={(e) => handleVolumeChange(e.target.value)}
  />
  <span className="volume-label">{videoRef ? videoRef.volume.toFixed(2) : ''}</span>
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