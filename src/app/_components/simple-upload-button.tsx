"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { ImageUp } from "lucide-react";
import { toast } from "sonner";

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
  const router = useRouter();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast(
        <span className="flex items-center gap-2">
          <Spinner /> Загрузка...
        </span>,
        {
          duration: 50000,
          position: "top-center",
          id: "image-upload",
        },
      );
    },
    onClientUploadComplete() {
      toast.dismiss("image-upload");
      toast.success("Загружено!", {
        position: "top-center",
        duration: 1000,
      });
      router.refresh();
    },
  });
  return (
    <div className="flex">
      <label htmlFor="upload-button" className="cursor-pointer">
        <ImageUp />
      </label>
      <input
        type="file"
        name="Upload"
        id="upload-button"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
};
