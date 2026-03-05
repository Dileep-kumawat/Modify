import { useRef, useState, useEffect, useContext } from "react";
import "../styles/player.scss";
import { context } from "../Context";

const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
};

const Player = () => {
    const { song } = useContext(context);

    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            setIsPlaying(false);
            setCurrentTime(0);
        }
    }, [song?.songUrl]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) audio.pause();
        else audio.play();

        setIsPlaying(!isPlaying);
    };

    const skip = (secs) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = Math.min(
            Math.max(audio.currentTime + secs, 0),
            duration
        );
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSongEnd = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleProgressClick = (e) => {
        const bar = progressRef.current;
        const rect = bar.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;

        const newTime = ratio * duration;

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolume = (e) => {
        const val = parseFloat(e.target.value);

        setVolume(val);
        audioRef.current.volume = val;
        setIsMuted(val === 0);
    };

    const toggleMute = () => {
        const audio = audioRef.current;

        if (isMuted) {
            audio.volume = volume || 0.5;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    if (!song) return null;

    return (
        <footer className="player glass">

            <audio
                ref={audioRef}
                src={song.songUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
            />

            {/* Currently Playing */}
            <div className="player__current">
                <div
                    className="player__cover glow-purple"
                    style={{ backgroundImage: `url(${song.posterUrl})` }}
                />

                <div className="player__info">
                    <h4>{song.title}</h4>
                    <p>{song.artist} - {song.mood}</p>
                </div>

                <button className="icon-btn">
                    <span className="material-symbols-outlined">favorite</span>
                </button>
            </div>

            {/* Controls */}
            <div className="player__controls">

                <div className="player__buttons">

                    <button className="icon-btn">
                        <span className="material-symbols-outlined">shuffle</span>
                    </button>

                    <button className="icon-btn" onClick={() => skip(-5)}>
                        <span className="material-symbols-outlined">
                            skip_previous
                        </span>
                    </button>

                    <button className="play-btn" onClick={togglePlay}>
                        <span className="material-symbols-outlined">
                            {isPlaying ? "pause" : "play_arrow"}
                        </span>
                    </button>

                    <button className="icon-btn" onClick={() => skip(5)}>
                        <span className="material-symbols-outlined">
                            skip_next
                        </span>
                    </button>

                    <button className="icon-btn">
                        <span className="material-symbols-outlined">repeat</span>
                    </button>

                </div>

                {/* Progress Bar */}
                <div className="player__progress">

                    <span>{formatTime(currentTime)}</span>

                    <div
                        className="progress-bar"
                        ref={progressRef}
                        onClick={handleProgressClick}
                    >
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />

                        <div
                            className="progress-handle"
                            style={{ left: `${progress}%` }}
                        />
                    </div>

                    <span>{formatTime(duration)}</span>

                </div>

            </div>

            {/* Volume + Extras */}
            <div className="player__extras">

                <button className="icon-btn">
                    <span className="material-symbols-outlined">lyrics</span>
                </button>

                <button className="icon-btn">
                    <span className="material-symbols-outlined">
                        queue_music
                    </span>
                </button>

                <div className="volume">

                    <button className="icon-btn" onClick={toggleMute}>
                        <span className="material-symbols-outlined">
                            {isMuted ? "volume_off" : "volume_up"}
                        </span>
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolume}
                        className="volume-slider"
                        style={{ "--volume": `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                </div>

                <button className="icon-btn">
                    <span className="material-symbols-outlined">
                        fullscreen
                    </span>
                </button>

            </div>

        </footer>
    );
};

export default Player;