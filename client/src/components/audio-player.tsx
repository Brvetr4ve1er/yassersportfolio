import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export default function AudioPlayer({ 
  src, 
  title = "Background Music", 
  artist = "Portfolio Ambient", 
  autoPlay = true, 
  loop = true 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for accessibility
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
    audio.loop = loop;

    const handleLoadedData = () => {
      if (autoPlay && !isMuted) {
        audio.play().catch(console.error);
        setIsPlaying(true);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [autoPlay, isMuted, loop, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audio.muted = newMutedState;
    
    // Auto-play when unmuted if not already playing
    if (!newMutedState && !isPlaying) {
      audio.play().catch(console.error);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={src}
        preload="metadata"
        aria-label={`Background music: ${title} by ${artist}`}
      />
      
      <div className="audio-player-container" role="region" aria-label="Audio player controls">
        <button
          className="audio-player-button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <div className="audio-player-info">
          <div className="audio-player-title">{title}</div>
          <div className="audio-player-artist">{artist}</div>
        </div>
        
        <div className="audio-player-controls">
          <button
            className={`audio-control-button ${isMuted ? '' : 'active'}`}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </>
  );
}