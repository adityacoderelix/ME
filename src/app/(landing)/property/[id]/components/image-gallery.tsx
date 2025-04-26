import Image from "next/image"

interface ImageGalleryProps {
  images: string[]
}

export default function ImageGallery({ images = [] }: ImageGalleryProps) {
  return (
    <div className="mt-6 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
        <div className="sm:col-span-2 sm:row-span-2">
          <Image
            src={images[0] ?? "/placeholder.svg"}
            alt="Main property image"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
        {images.slice(1).map((image, index) => (
          <div key={index} className={index > 1 ? "hidden md:block" : "hidden sm:block"}>
            <Image
              src={image ?? "/placeholder.svg"}
              alt={`Property image ${index + 2}`}
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <button className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100">
        Show all photos
      </button>
    </div>
  )
}

