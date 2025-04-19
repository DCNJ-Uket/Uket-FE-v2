"use client";

import { Button } from "@ui/components/ui/button";
import {
  AlertCircleIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from "@ui/components/ui/icon";
import { useFileUpload } from "@ui/hooks/use-file-upload";
import Image from "next/image";

interface ImageUploaderProps {
  maxSizeMB?: number;
  maxFiles?: number;
}

export default function ImageUploader({
  maxSizeMB = 5,
  maxFiles = 1,
}: ImageUploaderProps) {
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/png,image/jpeg,image/jpg",
    maxSize,
    multiple: true,
    maxFiles,
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        <div className="w-full text-[#8989A1] text-sm text-left mb-2">
          최대 {maxFiles}개 업로드 가능합니다.
        </div>
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            {files.length < maxFiles && (
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={files.length >= maxFiles}
              >
                <UploadIcon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                추가하기
              </Button>
            )}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {files.map(file => (
                <div
                  key={file.id}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <Image
                    src={file.preview!}
                    alt={file.file.name}
                    className="size-full rounded-[inherit] object-cover"
                    width={100}
                    height={100}
                    unoptimized
                  />
                  <Button
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                    aria-label="Remove image"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">이미지 드랍하기</p>
            <p className="text-muted-foreground text-xs">
              PNG, JPG or JPEG (최대 {maxSizeMB}MB)
            </p>
            <Button
              variant="outline"
              className="mt-4 text-sm space-x-2"
              onClick={openFileDialog}
            >
              <UploadIcon
                className="-ms-1 opacity-60 size-4"
                aria-hidden="true"
              />
              <span>이미지 선택하기</span>
            </Button>
          </div>
        )}
      </div>
      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
