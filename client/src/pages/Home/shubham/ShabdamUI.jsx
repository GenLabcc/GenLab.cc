import React from 'react';
import './ShabdamUI.css';
import declineIcon from '@/assets/decline.png';
import AkshenV from '../../../DemoVoices/aayan_tts_audio.mp3';
import ReshamV from '../../../DemoVoices/ishita_tts_audio.mp3';
import BrittaV from '../../../DemoVoices/simran_tts_audio.mp3';

const voices = [
  { id: 'v1', name: 'Reshma J', language: 'Tamil · Female', sampleUrl: ReshamV },
  { id: 'v2', name: 'Akshen', language: 'Tamil · Male', sampleUrl: AkshenV },
  { id: 'v3', name: 'Britta J', language: 'Tamil-English · Female', sampleUrl: BrittaV},
  { id: 'v4', name: 'Ravi', language: 'Tamil-English · Male', sampleUrl: '/samples/ravi.mp3' },
];

const formatTime = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds)) return '0:00';
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const VoiceCard = ({ voice, isSelected, onSelect }) => {
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const handlePlayToggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`voice-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(voice.id)}
    >
      <audio ref={audioRef} src={voice.sampleUrl} preload="metadata" />
      <button
        className={`voice-play-button ${isPlaying ? 'playing' : ''}`}
        onClick={handlePlayToggle}
        aria-label={isPlaying ? 'Pause sample' : 'Play sample'}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="4" height="12" />
            <rect x="8" y="1" width="4" height="12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <polygon points="2,1 13,7 2,13" />
          </svg>
        )}
      </button>

      <div className="voice-info">
        <span className="voice-name">{voice.name}</span>
        <span className="voice-language">{voice.language}</span>

        <div className="voice-progress-row">
          <div className="voice-progress-track">
            <div
              className="voice-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="voice-time-label">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      {isSelected && (
        <span className="voice-selected-badge">Selected</span>
      )}
    </div>
  );
};

const VoiceSelector = () => {
  const [selectedVoice, setSelectedVoice] = React.useState(voices[0].id);

  return (
    <div className="voice-selector">
      <h2 className="voice-selector-title">Demo voice</h2>
      <div className="voice-grid">
        {voices.map((voice) => (
          <VoiceCard
            key={voice.id}
            voice={voice}
            isSelected={selectedVoice === voice.id}
            onSelect={setSelectedVoice}
          />
        ))}
      </div>
    </div>
  );
};


const UseCaseCard = ({ label }) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setSeconds(0);
    } else {
      setIsRecording(true);
      setSeconds(0);
    }
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const generateDots = () => {
    const dots = [];
    const numRings = 7;
    const dotsPerRing = 44;
    const center = 150;
    const innerRadius = 75;
    const radiusStep = 11;

    for (let r = 1; r < numRings; r++) {
      const radius = innerRadius + r * radiusStep;
      // Start with large dots, decrease size as we go out
      const dotSize = Math.max(0.5, 4.5 - (r * 0.6));

      for (let i = 0; i < dotsPerRing; i++) {
        // Add a slight rotation offset per ring for the spiral effect
        const angle = (i / dotsPerRing) * Math.PI * 2 + (r * 0.06);
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        dots.push(
          <circle
            key={`${r}-${i}`}
            cx={x}
            cy={y}
            r={dotSize}
            fill={isRecording ? "#bcf000" : "black"}
            style={{
              transition: 'fill 0.3s ease',
              animation: isRecording ? `wave-pulse 1.5s infinite ease-in-out ${r * 0.15}s` : 'none',
              transformOrigin: `${x}px ${y}px`
            }}
          />
        );
      }
    }
    return dots;
  };

  return (
    <div className="use-case-card">
      <div className="visual-container">
        <svg className="dotted-pattern" viewBox="0 0 300 300">
          {generateDots()}
        </svg>
        <button
          className={`start-button ${isRecording ? 'recording' : ''}`}
          onClick={handleToggle}
        >
          {isRecording ? (
            <div className="recording-content">
              <img src={declineIcon} alt="Decline" className="decline-icon" />
              <span>{formatTime(seconds)}</span>
            </div>
          ) : 'Start speaking'}
        </button>
      </div>
      <div className="label-container">
        <span>{label.split(' ')[0]}</span>
        <span>{label.split(' ').slice(1).join(' ')}</span>
      </div>
    </div>
  );
};

const ShabdamUI = () => {
  const useCases = [
    "Appointment booking",
    "Payment follow-up",
    "Sales outreach",
    "Onboarding & hiring"
  ];

  React.useEffect(() => {
    // Smooth transition
    document.body.style.transition = "background-color 0.3s ease";
    document.body.style.backgroundColor = "#ffffff";

    const pageWrapper = document.querySelector(".page-wrapper");
    let originalWrapperBg = "";
    if (pageWrapper) {
      pageWrapper.style.transition = "background 0.3s ease";
      originalWrapperBg = pageWrapper.style.background;
      pageWrapper.style.background = "#ffffff";
    }

    return () => {
      document.body.style.backgroundColor = "";
      if (pageWrapper) {
        pageWrapper.style.background = originalWrapperBg;
      }
    };
  }, []);

  return (
    <div className="shabdam-page">
      <div className="main-container">
        <header className="header">
          <div className="header-left">
            <h1>EXPERIENCE SHABDAM</h1>
            <p>
              Four enterprise use cases. Tamil-first.<br />
              Ready to connect to your CRM, ERP, and telephony stack today.
            </p>
          </div>
          <div className="live-badge">
            <span className="pulse-dot"></span>
            Under Developement
          </div>
        </header>

        <div className="use-case-grid">
          {useCases.map((label, index) => (
            <UseCaseCard key={index} label={label} />
          ))}
        </div>

        <VoiceSelector />
      </div>
    </div>
  );
};

export default ShabdamUI;
