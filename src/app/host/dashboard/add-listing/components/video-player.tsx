'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Maximize2, X } from 'lucide-react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  thumbnailSrc: string
  videoSrc: string
}

export default function VideoPlayer({ thumbnailSrc, videoSrc }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
    setIsPlaying(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div className="relative w-64 h-36">
      {!isPlaying && (
        <div className="absolute inset-0">
          <img src={thumbnailSrc} alt="Video thumbnail" className="w-full h-full object-cover" />
          <Button 
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/70"
            onClick={togglePlay}
          >
            <Play className="w-6 h-6 text-white" />
          </Button>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoSrc}
        className={`w-full h-full object-cover ${isPlaying ? 'block' : 'hidden'}`}
        onClick={togglePlay}
      />
      {isPlaying && (
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <Button size="icon" variant="secondary" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="secondary" onClick={openFullscreen}>
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      )}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-full max-h-full p-0">
          <div className="relative w-screen h-screen">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-contain"
              autoPlay
              onClick={togglePlay}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button size="icon" variant="secondary" onClick={togglePlay}>
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button size="icon" variant="secondary" onClick={closeFullscreen}>
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

