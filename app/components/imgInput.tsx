import React, { Dispatch, SetStateAction, useState } from "react";
import { CreateFormState } from "../item/create/page";

function ImgInput(props: {
  createFormState: CreateFormState;
  setImage: Dispatch<SetStateAction<CreateFormState>>;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleClick = async () => {
    try {
      const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const data = new FormData();
      data.append("file", imageFile!);
      data.append("upload_preset", preset);
      data.append("cloud_name", cloudName);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

        { method: "POST", body: data }
      );
      const jsonData = await response.json();
      console.log("upload", jsonData);
      await props.setImage({ ...props.createFormState, image: jsonData.url });
      alert("画像アップロード成功");
    } catch {
      alert("画像アップロード失敗");
    }
  };
  return (
    <div className="img-input">
      <input
        type="file"
        onChange={(e) => setImageFile(e.target?.files![0])}
        accept="image/png, image/jpg"
      />
      <button onClick={handleClick} disabled={!imageFile}>
        画像アップロード
      </button>
    </div>
  );
}

export default ImgInput;
