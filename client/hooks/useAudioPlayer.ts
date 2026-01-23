import { useState, useCallback, useRef, useEffect } from "react";
import { useAudioPlayer as useExpoAudioPlayer, AudioPlayer } from "expo-audio";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isLoading: boolean;
  currentId: string | null;
  playAudio: (id: string, audioUrl: string) => Promise<void>;
  pauseAudio: () => void;
  stopAudio: () => void;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  
  const player = useExpoAudioPlayer(currentUrl || undefined);

  useEffect(() => {
    if (player) {
      const subscription = player.addListener("playbackStatusUpdate" as any, (status: any) => {
        if (status && typeof status.isPlaying === "boolean") {
          setIsPlaying(status.isPlaying);
          if (!status.isPlaying && currentId) {
            setCurrentId(null);
          }
        }
      });
      return () => subscription?.remove?.();
    }
  }, [player, currentId]);

  const playAudio = useCallback(async (id: string, audioUrl: string) => {
    try {
      setIsLoading(true);

      if (currentId === id && isPlaying && player) {
        player.pause();
        setIsPlaying(false);
        setCurrentId(null);
        setIsLoading(false);
        return;
      }

      setCurrentUrl(audioUrl);
      setCurrentId(id);
      
      setTimeout(() => {
        if (player) {
          player.play();
          setIsPlaying(true);
        }
        setIsLoading(false);
      }, 100);
    } catch (error) {
      console.log("Error playing audio:", error);
      setIsPlaying(false);
      setCurrentId(null);
      setIsLoading(false);
    }
  }, [currentId, isPlaying, player]);

  const pauseAudio = useCallback(() => {
    if (player) {
      player.pause();
      setIsPlaying(false);
    }
  }, [player]);

  const stopAudio = useCallback(() => {
    if (player) {
      player.pause();
      player.seekTo(0);
      setIsPlaying(false);
      setCurrentId(null);
    }
  }, [player]);

  return {
    isPlaying,
    isLoading,
    currentId,
    playAudio,
    pauseAudio,
    stopAudio,
  };
}
