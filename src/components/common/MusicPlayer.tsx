import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles, Upload } from 'lucide-react';
import { soundscape } from '../../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(soundscape.getIsPlaying());
  const [volume, setVolume] = useState(soundscape.getVolume());
  const [showControls, setShowControls] = useState(false);
  const [trackName, setTrackName] = useState('music.mp3');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = soundscape.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleToggle = () => {
    soundscape.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundscape.setVolume(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      soundscape.setCustomAudioUrl(url);
      setTrackName(file.name);
    }
  };

  return (
    <div id="music-player-container" className="fixed bottom-5 right-5 z-50">
      <div className="relative flex items-center gap-2">
        {showControls && (
          <div className="flex items-center gap-3 bg-[#13151b]/95 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl animate-in fade-in slide-in-from-right duration-200 text-xs">
            <span className="text-amber-300/80 font-mono text-[11px] truncate max-w-[100px]" title={trackName}>
              {trackName}
            </span>

            <div className="h-3 w-[1px] bg-white/15" />

            <button
              onClick={() => soundscape.playChime()}
              title="Play blessing chime"
              className="text-amber-400/80 hover:text-amber-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chime</span>
            </button>

            <div className="h-3 w-[1px] bg-white/15" />

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/50 tracking-wider">VOL</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#c0392b]"
              />
            </div>

            <div className="h-3 w-[1px] bg-white/15" />

            {/* Optional Manual File Upload trigger */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Upload / Select music file"
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        )}

        <button
          id="music-toggle-button"
          onClick={handleToggle}
          onMouseEnter={() => setShowControls(true)}
          className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-2xl ${
            isPlaying
              ? 'bg-[#181a22]/90 border-amber-500/40 text-amber-200 shadow-amber-950/20'
              : 'bg-[#13151c]/80 border-white/10 text-white/70 hover:text-white hover:border-white/20'
          }`}
        >
          {isPlaying ? (
            <>
              <Disc3 className="w-4 h-4 animate-spin text-amber-400" />
              <div className="flex items-end gap-[2px] h-3.5 w-4 px-0.5">
                <span className="w-[3px] bg-amber-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-full" />
                <span className="w-[3px] bg-amber-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2/3" />
                <span className="w-[3px] bg-amber-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-4/5" />
              </div>
              <span className="text-xs font-medium tracking-wide">music.mp3</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-white/60 group-hover:text-white/90" />
              <span className="text-xs font-medium tracking-wide text-white/70 group-hover:text-white">Music</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
