"use client";
import { Item } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import useAuth from "@/app/lib/useAuth";

type DeleteFormState = Omit<Item, "id">;

const DeleteItem = (context: { params: { id: string } }) => {
  const [inputs, setInputs] = useState<DeleteFormState>({
    title: "",
    price: "",
    image: "",
    description: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginUserEmail = useAuth();

  useEffect(() => {
    const getSingleItem = async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
        { cache: "no-store" }
      );
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      setInputs(singleItem);
      setLoading(true);
    };
    getSingleItem(context.params.id);
  }, [context]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email: loginUserEmail }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("アイテム削除失敗");
    }
  };

  if (loading) {
    if (loginUserEmail === inputs.email) {
      return (
        <div>
          <h1 className="page-title">アイテム削除</h1>
          <form onSubmit={handleSubmit}>
            <h2>{inputs.title}</h2>
            <Image
              src={inputs.image}
              width={750}
              height={500}
              alt="item-image"
              priority
            />
            <h3>\{inputs.price}</h3>
            <p>{inputs.description}</p>
            <button>削除</button>
          </form>
        </div>
      );
    } else {
      return <h1>権限がありません。</h1>;
    }
  } else {
    return <h1>ローディング中...</h1>;
  }
};

export default DeleteItem;
