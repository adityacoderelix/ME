"use client"

import type React from "react"
import { useRef, useState } from "react"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect: (file: File) => void
  children: React.ReactNode
}

export const FileInput: React.FC<FileInputProps> = ({ onFileSelect, children, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <div
      className={`relative ${props.className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} {...props} />
      <div
        className={`absolute inset-0 ${dragActive ? "border-primary" : ""} transition-colors`}
        onClick={() => inputRef.current?.click()}
      >
        {children}
      </div>
    </div>
  )
}

