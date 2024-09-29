"use client";
import ImgInput from "@/app/components/imgInput";
import useAuth from "@/app/lib/useAuth";
import { Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

export type CreateFormState = Omit<Item, "id" | "email">;

const CreateItem = () => {
  const [inputs, setInputs] = useState<CreateFormState>({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prevState: CreateFormState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...inputs, email: loginUserEmail }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("アイテム作成失敗");
    }
  };
  if (loginUserEmail) {
    return (
      <div>
        <h1 className="page-title">アイテム作成</h1>
        <ImgInput setImage={setInputs} createFormState={inputs} />
        <form onSubmit={handleSubmit}>
          <input
            value={inputs.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={inputs.price}
            onChange={handleChange}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={inputs.image}
            onChange={handleChange}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={inputs.description}
            onChange={handleChange}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          />
          <button>作成</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
