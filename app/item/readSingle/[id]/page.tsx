import { Item } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getSingleItem = async (id: string): Promise<Item> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
    { cache: "no-store" }
  );
  console.log(process.env.NEXT_PUBLIC_URL);
  const jsonData = await response.json();
  console.log(JSON.stringify(jsonData));
  return jsonData.singleItem;
};

const ReadSingleItem = async (context: { params: { id: string } }) => {
  const singleItem = await getSingleItem(context.params.id);
  console.log(singleItem);
  return (
    <div className="grid-container-si">
      <div>
        <Image
          src={singleItem.image}
          width={750}
          height={500}
          alt="item-image"
          priority
        />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>\{singleItem.price}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem.id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${singleItem.id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;
