import { useState } from "react";

type ImageSectionProp = {
  onImageAdded: (image: Image) => void;
}
export const ImageSection = ({ onImageAdded }: ImageSectionProp) => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = ({ }) => {
    if (imageName && imageUrl) {
      const newImageData: Image = {
        name: imageName,
        url: imageUrl,
      }
      onImageAdded(newImageData);
      setImageName("");
      setImageUrl("");
    }
  };

  return (
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        placeholder="Image Name"
        value={imageName}
        onChange={e => setImageName(e.target.value)}
        className="border px-2 py-1 rounded w-1/2"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        className="border px-2 py-1 rounded w-1/2"
      />
      <button
        type="button"
        onClick={handleAddImage}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add Image
      </button>
    </div>
  )
}