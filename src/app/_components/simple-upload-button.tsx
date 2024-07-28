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

export const SimpleUploadButton = () => {
  const router = useRouter();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast.info("Загрузка...", {
        duration: 50000,
        position: "top-center",
        id: "image-upload",
      });
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
