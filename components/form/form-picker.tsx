"use client";
import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplesh";
import { cn } from "@/lib/utils";
import { CheckIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FromPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageID, setSelectedImageID] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // throw new Error("intentional error usinf default images");
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"], //TODO sho trello request might e thet=y use this Collection ID
          count: 9,
        });
        if (result && result?.response) {
          const newImages = result?.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("failed to get images from unsplash");
        }
      } catch (error) {
        console.error(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2Icon className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageID(image.id);
            }}
          >
            <>
              <input
                type="radio"
                id={id}
                name={id}
                className="hidden"
                checked={selectedImageID === image.id}
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image
                fill
                alt="unsplash image"
                className="object-cover rounded-sm"
                src={image.urls.thumb}
              />
              {selectedImageID === image.id && (
                <div className="h-full w-full absolute inset-y-0 flex justify-center items-center bg-black/30">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
              >
                {image?.user?.name}
              </Link>
            </>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
