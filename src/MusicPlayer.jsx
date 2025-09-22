import React, { useState, useRef, useEffect } from 'react';
import music from './assets/music/GrowOldWithYou.mp3';
const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  
  useEffect(() => {
  const handleUserGesture = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    window.removeEventListener("click", handleUserGesture);
  };

  window.addEventListener("click", handleUserGesture);
  return () => window.removeEventListener("click", handleUserGesture);
}, []);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <audio
        ref={audioRef}
        src={music}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      />
      <button onClick={togglePlay} style={{border: "1px solid black", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px"}}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      
    </div>
  );
};

export default MusicPlayer;