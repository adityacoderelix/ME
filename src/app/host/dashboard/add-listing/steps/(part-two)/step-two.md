"use client";

import { useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import axios from "axios";

const API_URL = "http://localhost:5005";

interface Photo {
  id: string;
  url: string;
}

interface MakeItStandOutProps {
  updateFormData: (data: { photos: string[] }) => void;
  formData: { photos: string[] };
}

export function AddPhotos({ updateFormData, formData }: MakeItStandOutProps) {
  const [photos, setPhotos] = useState<Photo[]>(
    formData?.photos?.map((url: string) => ({
      id: crypto.randomUUID(),
      url,
    })) || []
  );
  const [draggedPhoto, setDraggedPhoto] = useState<Photo | null>(null);
  const draggedNodeRef = useRef<HTMLDivElement | null>(null);
  const [uploading, setUploading] = useState(false); // Optional: Show loading state

  // const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files || files.length === 0) return;

  //   setUploading(true);
  //   const formData = new FormData();
  //   Array.from(files).forEach((file) => {
  //     formData.append("images", file); // Match backend field name
  //   });

  //   try {
  //     const res = await axios.post(`${API_URL}/uploads/`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     const newPhotos = res.data.urls.map((url: string) => ({
  //       id: crypto.randomUUID(),
  //       url,
  //     }));
  //     const updatedPhotos = [...photos, ...newPhotos];
  //     setPhotos(updatedPhotos);
  //     updateFormData({ photos: updatedPhotos.map((photo) => photo.url) });
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     alert("Failed to upload photos");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const removePhoto = (id: string) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    setPhotos(updatedPhotos);
    updateFormData({ photos: updatedPhotos.map((photo) => photo.url) });
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    photo: Photo
  ) => {
    setDraggedPhoto(photo);
    draggedNodeRef.current = e.target as HTMLDivElement;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", photo.id);

    requestAnimationFrame(() => {
      if (draggedNodeRef.current) {
        draggedNodeRef.current.style.opacity = "0.5";
      }
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetPhoto: Photo) => {
      e.preventDefault();
      if (draggedPhoto && draggedPhoto.id !== targetPhoto.id) {
        setPhotos((prevPhotos) => {
          const newPhotos = [...prevPhotos];
          const draggedIndex = newPhotos.findIndex(
            (photo) => photo.id === draggedPhoto.id
          );
          const targetIndex = newPhotos.findIndex(
            (photo) => photo.id === targetPhoto.id
          );
          newPhotos.splice(draggedIndex, 1);
          newPhotos.splice(targetIndex, 0, draggedPhoto);
          return newPhotos;
        });
      }
    },
    [draggedPhoto]
  );

  const handleDragEnd = useCallback(() => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current.style.opacity = "1";
    }
    setDraggedPhoto(null);
    updateFormData({ photos: photos.map((photo) => photo.url) });
  }, [photos, updateFormData]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-4">
      <TextReveal>
        <h3 className="text-xl md:text-2xl font-bricolage text-absoluteDark font-semibold">
          Add photos to make your place stand out
        </h3>
      </TextReveal>
      <TextReveal>
        <div>
          <div className="space-y-4">
            <Input
              id="photos"
              type="file"
              accept="image/*"
              multiple
              // onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading} // Disable during upload
            />
            <Label
              htmlFor="photos"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primaryGreen"
            >
              <div className="text-center">
                <span className="text-2xl">📷</span>
                <p className="mt-2">
                  {uploading ? "Uploading..." : "Click to upload photos"}
                </p>
              </div>
            </Label>
            {photos.length < 5 && (
              <p className="text-red-500">Please upload at least 5 photos</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, photo)}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, photo)}
                  onDragEnd={handleDragEnd}
                  className="relative transition-transform duration-300 ease-in-out"
                  style={{
                    transform:
                      draggedPhoto && draggedPhoto.id === photo.id
                        ? "scale(1.05)"
                        : "scale(1)",
                  }}
                >
                  <img
                    src={photo.url}
                    alt={`Property photo`}
                    className="w-full h-40 object-cover rounded-lg transition-opacity duration-300 ease-in-out"
                    style={{
                      opacity:
                        draggedPhoto && draggedPhoto.id === photo.id ? 0.5 : 1,
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100 transition-opacity duration-300 ease-in-out"
                    onClick={() => removePhoto(photo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove photo</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TextReveal>
    </div>
  );
}
