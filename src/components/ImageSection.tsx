import { useState } from "react";
import Input from "./Input";

type ImageSectionProp = {
  onImageAdded: (image: Image) => void;
}
export const ImageSection = ({ onImageAdded }: ImageSectionProp) => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
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
    <div>
      <span>Add images</span>
      <div className="flex flex-col md:flex-row gap-2">
        <Input 
          placeholder="Image Name"
          label=""
          type="text"
          name="image-name"
          value={imageName}
          onChange={e => setImageName(e.target.value)}
        />
        <Input 
          placeholder="Image URL"
          label=""
          type="text"
          name="image-url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <button type="button" onClick={handleAddImage} className="outline-btn">Add Image</button>
      </div>
    </div>
  )
};