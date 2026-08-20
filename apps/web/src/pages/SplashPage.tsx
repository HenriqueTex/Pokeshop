import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./splash.css";

export function SplashPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<number | undefined>(undefined);
  const exitTimerRef = useRef<number | undefined>(undefined);
  const [isFinished, setIsFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const finishIntro = () => {
    window.clearTimeout(fallbackTimerRef.current);
    setIsFinished(true);
  };

  const startVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || isFinished) return;

    try {
      await video.play();
      setIsAutoplayBlocked(false);
    } catch {
      setIsAutoplayBlocked(true);
    }
  }, [isFinished]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute("webkit-playsinline", "");
    void startVideo();

    return () => {
      window.clearTimeout(fallbackTimerRef.current);
      window.clearTimeout(exitTimerRef.current);
    };
  }, [startVideo]);

  const handleLoadedMetadata = () => {
    const duration = videoRef.current?.duration;
    if (typeof duration !== "number" || !Number.isFinite(duration)) return;

    window.clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = window.setTimeout(
      finishIntro,
      duration * 1000 + 400,
    );
  };

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);

    if (!video.muted) await video.play();
  };

  const skipIntro = () => {
    videoRef.current?.pause();
    finishIntro();
  };

  const continueToStore = () => {
    if (isLeaving) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setIsLeaving(true);
    exitTimerRef.current = window.setTimeout(
      () => navigate("/home"),
      reducedMotion ? 0 : 560,
    );
  };

  return (
    <main
      className={`splash ${isFinished ? "splash--finished" : ""} ${isAutoplayBlocked ? "splash--autoplay-blocked" : ""} ${isLeaving ? "splash--leaving" : ""}`}
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
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/media/splash-final.jpeg"
        aria-hidden="true"
        onCanPlay={() => void startVideo()}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={finishIntro}
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
        className={`splash__cta ${isFinished ? "splash__cta--visible" : ""}`}
        type="button"
        onClick={continueToStore}
        disabled={isLeaving}
      >
        Sua aventura começa aqui <span aria-hidden="true">→</span>
      </button>

      {!isFinished && (
        <div className="splash__controls">
          <button
            className="splash__sound"
            type="button"
            aria-pressed={!isMuted}
            onClick={() => void toggleSound()}
          >
            {isMuted ? "Ativar som" : "Desativar som"}
          </button>
          <button className="splash__skip" type="button" onClick={skipIntro}>
            Pular animação →
          </button>
        </div>
      )}
      {isAutoplayBlocked && !isFinished && (
        <button
          className="splash__play-fallback"
          type="button"
          onClick={() => void startVideo()}
        >
          Toque para iniciar →
        </button>
      )}
    </main>
  );
}
