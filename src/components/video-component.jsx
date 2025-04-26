import { getVideoSrc } from "@/lib/getVideoSrc"

export default async function VideoComponent() {
  const src = await getVideoSrc() // This function would fetch the video source URL

  return (
    <video controls preload="metadata" className="w-full">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

