"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import React from "react";
// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function Spinner() {
  return (
    <svg
      width="24"
      height="24"
      stroke="#fff"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
              .spinner_V8m1 {
                transform-origin: center;
                animation: spinner_zKoa 2s linear infinite;
              }
              .spinner_V8m1 circle {
                stroke-linecap: round;
                animation: spinner_YpZS 1.5s ease-in-out infinite;
              }
              @keyframes spinner_zKoa {
                100% {
                  transform: rotate(360deg);
                }
              }
              @keyframes spinner_YpZS {
                0% {
                  stroke-dasharray: 0 150;
                  stroke-dashoffset: 0;
                }
                47.5% {
                  stroke-dasharray: 42 150;
                  stroke-dashoffset: -16;
                }
                95%,
                100% {
                  stroke-dasharray: 42 150;
                  stroke-dashoffset: -59;
                }
              }
            `}
      </style>
      <g className="spinner_V8m1">
        <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" />
      </g>
    </svg>
  );
}

export const SimpleUploadButton = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);
  const router = useRouter();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      setIsUploading(true);
    },
    onClientUploadComplete() {
      setIsUploading(false);
      setIsUploaded(true);
    },
  });
  return (
    <div className="flex">
      <div className="flex w-full items-center gap-1.5">
        <Label
          htmlFor="upload-button"
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 border-white"
        >
          {isUploaded ? (
            "Загружено"
          ) : isUploading ? (
            <span className="flex items-center gap-2">
              <Spinner /> Загрузка...
            </span>
          ) : (
            "Загрузить"
          )}
        </Label>
        <Input
          className="hidden"
          type="file"
          id="upload-button"
          {...inputProps}
        />
      </div>
    </div>
  );
};
