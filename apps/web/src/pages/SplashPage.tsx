import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./splash.css";

const EXIT_DURATION_MS = 900;
const END_AUDIO_FADE_SECONDS = 2;

export function SplashPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<number | undefined>(undefined);
  const exitTimerRef = useRef<number | undefined>(undefined);
  const audioFadeTimerRef = useRef<number | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [hasPlaybackStarted, setHasPlaybackStarted] = useState(false);

  const stopAudioFade = useCallback(() => {
    if (audioFadeTimerRef.current === undefined) return;
    window.clearInterval(audioFadeTimerRef.current);
    audioFadeTimerRef.current = undefined;
  }, []);

  const fadeAudioToSilence = useCallback(
    (durationMs: number) => {
      const video = videoRef.current;
      stopAudioFade();
      if (!video || video.muted || video.volume <= 0) return;

      if (durationMs <= 0) {
        video.volume = 0;
        return;
      }

      const initialVolume = video.volume;
      const startedAt = performance.now();
      const updateVolume = () => {
        const progress = Math.min(
          (performance.now() - startedAt) / durationMs,
          1,
        );
        video.volume = initialVolume * (1 - progress);

        if (progress >= 1 && audioFadeTimerRef.current !== undefined) {
          window.clearInterval(audioFadeTimerRef.current);
          audioFadeTimerRef.current = undefined;
        }
      };

      updateVolume();
      audioFadeTimerRef.current = window.setInterval(updateVolume, 50);
    },
    [stopAudioFade],
  );

  const continueToStore = useCallback(() => {
    if (isLeaving) return;

    window.clearTimeout(fallbackTimerRef.current);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const exitDuration = reducedMotion ? 0 : EXIT_DURATION_MS;
    fadeAudioToSilence(exitDuration);
    setIsLeaving(true);
    exitTimerRef.current = window.setTimeout(
      () => navigate("/home"),
      exitDuration,
    );
  }, [fadeAudioToSilence, isLeaving, navigate]);

  const startVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
    } catch {
      setHasPlaybackStarted(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.autoplay = false;
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.removeAttribute("autoplay");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    return () => {
      window.clearTimeout(fallbackTimerRef.current);
      window.clearTimeout(exitTimerRef.current);
      stopAudioFade();
    };
  }, [stopAudioFade]);

  const handlePlaying = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasPlaybackStarted(true);
    const remainingDuration = video.duration - video.currentTime;
    if (!Number.isFinite(remainingDuration) || remainingDuration <= 0) return;

    window.clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = window.setTimeout(
      continueToStore,
      remainingDuration * 1000 + 400,
    );
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (
      !video ||
      video.muted ||
      audioFadeTimerRef.current !== undefined ||
      !Number.isFinite(video.duration)
    )
      return;

    const remainingDuration = video.duration - video.currentTime;
    if (remainingDuration > END_AUDIO_FADE_SECONDS + 0.25) return;

    const lowerVolume = () => {
      if (video.muted || video.paused || video.ended) {
        stopAudioFade();
        return;
      }

      const remaining = Math.max(video.duration - video.currentTime, 0);
      video.volume = Math.min(remaining / END_AUDIO_FADE_SECONDS, 1);
      if (remaining <= 0) stopAudioFade();
    };

    lowerVolume();
    audioFadeTimerRef.current = window.setInterval(lowerVolume, 50);
  };

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) await startVideo();
  };

  const startIntro = async () => {
    const video = videoRef.current;
    if (!video || hasPlaybackStarted || isLeaving) return;

    stopAudioFade();
    video.currentTime = 0;
    video.volume = 1;
    video.muted = false;
    setIsMuted(false);
    await startVideo();
  };

  return (
    <main
      className={`splash ${!hasPlaybackStarted ? "splash--awaiting-start" : ""} ${isLeaving ? "splash--leaving" : ""}`}
      aria-busy={isLeaving}
    >
      <img
        className="splash__final-frame"
        src="/media/splash-final.jpeg"
        alt=""
      />
      <video
        ref={videoRef}
        className="splash__video"
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        poster="/media/splash-final.jpeg"
        aria-hidden="true"
        onPlaying={handlePlaying}
        onTimeUpdate={handleTimeUpdate}
        onEnded={continueToStore}
      >
        <source src="/media/splash.mp4" type="video/mp4" />
      </video>

      <div className="splash__veil" aria-hidden="true" />
      <div className="splash__glow" aria-hidden="true" />

      <section className="splash__brand" aria-labelledby="splash-title">
        <h1 id="splash-title">
          PokeShop<span>Pokémon Store</span>
        </h1>
      </section>

      <button
        className={`splash__cta ${!hasPlaybackStarted ? "splash__cta--ready" : ""}`}
        type="button"
        onClick={() => void startIntro()}
        disabled={isLeaving}
      >
        Sua aventura começa aqui <span aria-hidden="true">→</span>
      </button>

      {hasPlaybackStarted && (
        <div className="splash__controls">
          <button
            className="splash__sound"
            type="button"
            aria-pressed={!isMuted}
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
            onClick={() => void toggleSound()}
          >
            {isMuted ? (
              <svg
                className="splash__control-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z" />
                <path d="m16 9 5 6m0-6-5 6" />
              </svg>
            ) : (
              <svg
                className="splash__control-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
              </svg>
            )}
          </button>
          <button
            className="splash__skip"
            type="button"
            aria-label="Avançar para a loja"
            onClick={continueToStore}
          >
            <svg
              className="splash__control-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="m5 5 8 7-8 7V5Zm9 0 7 7-7 7V5Z" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}
