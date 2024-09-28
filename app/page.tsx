import { Item } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall", {
    cache: "no-store",
  });
  const jsonData = await response.json();
  const allItems: Item[] = jsonData.allItems;
  return allItems;
};

const ReadAllItems = async () => {
  const allItems = await getAllItems();
  return (
    <div className="grid-container-in">
      {allItems.map((item) => (
        <Link href={`/item/readSingle/${item.id}`} key={item.id}>
          <Image
            src={item.image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <h2>{item.price}</h2>
          <h3>{item.title}</h3>
          <p>{item.description.substring(0, 80)}</p>
        </Link>
      ))}
    </div>
  );
};

export default ReadAllItems;
