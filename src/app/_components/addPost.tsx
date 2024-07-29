import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ImageUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { UploadDropzone } from "~/utils/uploadthing";
import { SimpleUploadButton } from "./simple-upload-button";
import { AddPostForm } from "./addPostForm";

export default function AddPost() {
  return (
    <Dialog>
      <DialogTrigger>
        <ImageUp />
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>Add a post to your profile</DialogDescription>
          <SimpleUploadButton />
          <AddPostForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
