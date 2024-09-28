"use client";
import { Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAuth from "@/app/lib/useAuth";

type UpdateFormState = Omit<Item, "id" | "email">;

const UpdateItem = (context: { params: { id: string } }) => {
  const [inputs, setInputs] = useState<UpdateFormState>({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const router = useRouter();
  const loginUserEmail = useAuth();

  useEffect(() => {
    const getSingleItem = async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/readSingle/${id}`,
        { cache: "no-store" }
      );
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      setInputs(singleItem);
    };
    getSingleItem(context.params.id);
  }, [context]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prevState: UpdateFormState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`,
        {
          method: "PUT",
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
      alert("アイテム編集失敗");
    }
  };

  if (loginUserEmail) {
    return (
      <div>
        <h1>アイテム編集</h1>
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
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません。</h1>;
  }
};

export default UpdateItem;
