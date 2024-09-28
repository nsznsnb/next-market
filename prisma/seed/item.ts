import { Item } from "@prisma/client";
import prisma from "../../app/lib/prisma";

const items: Omit<Item, "id">[] = [
  {
    title: "メガネ",
    image: "/img1.jpg",
    price: "5500",
    description:
      "使いやすいメガネです。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus est tellus, eget porta leo tristique a. Donec hendrerit massa leo, id tempus dolor vulputate et. Pellentesque consectetur dolor placerat euismod pellentesque. Integer scelerisque, augue ac ullamcorper sodales, neque lectus tristique turpis, id luctus lectus lorem eu tortor. In imperdiet semper accumsan. Etiam pellentesque libero et scelerisque vehicula. Nam quis justo mi. Cras erat ex, rhoncus id blandit id, commodo ac leo. In hac habitasse platea dictumst.",
    email: "dummy@gmail.com",
  },
  {
    title: "色えんぴつ",
    image: "/img2.jpg",
    price: "1500",
    description:
      "使いやすい色えんぴつです。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus est tellus, eget porta leo tristique a. Donec hendrerit massa leo, id tempus dolor vulputate et. Pellentesque consectetur dolor placerat euismod pellentesque. Integer scelerisque, augue ac ullamcorper sodales, neque lectus tristique turpis, id luctus lectus lorem eu tortor. In imperdiet semper accumsan. Etiam pellentesque libero et scelerisque vehicula. Nam quis justo mi. Cras erat ex, rhoncus id blandit id, commodo ac leo. In hac habitasse platea dictumst.",
    email: "dummy2@gmail.com",
  },
  {
    title: "リング",
    image: "/img3.jpg",
    price: "2200",
    description:
      "使いやすいリングです。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus est tellus, eget porta leo tristique a. Donec hendrerit massa leo, id tempus dolor vulputate et. Pellentesque consectetur dolor placerat euismod pellentesque. Integer scelerisque, augue ac ullamcorper sodales, neque lectus tristique turpis, id luctus lectus lorem eu tortor. In imperdiet semper accumsan. Etiam pellentesque libero et scelerisque vehicula. Nam quis justo mi. Cras erat ex, rhoncus id blandit id, commodo ac leo. In hac habitasse platea dictumst.",
    email: "dummy3@gmail.com",
  },
  {
    title: "フライパン",
    image: "/img4.jpg",
    price: "2500",
    description:
      "使いやすいフライパンです。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus est tellus, eget porta leo tristique a. Donec hendrerit massa leo, id tempus dolor vulputate et. Pellentesque consectetur dolor placerat euismod pellentesque. Integer scelerisque, augue ac ullamcorper sodales, neque lectus tristique turpis, id luctus lectus lorem eu tortor. In imperdiet semper accumsan. Etiam pellentesque libero et scelerisque vehicula. Nam quis justo mi. Cras erat ex, rhoncus id blandit id, commodo ac leo. In hac habitasse platea dictumst.",
    email: "dummy4@gmail.com",
  },
  {
    title: "マックブック",
    image: "/img5.jpg",
    price: "35000",
    description:
      "使いやすいマックブックです。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus est tellus, eget porta leo tristique a. Donec hendrerit massa leo, id tempus dolor vulputate et. Pellentesque consectetur dolor placerat euismod pellentesque. Integer scelerisque, augue ac ullamcorper sodales, neque lectus tristique turpis, id luctus lectus lorem eu tortor. In imperdiet semper accumsan. Etiam pellentesque libero et scelerisque vehicula. Nam quis justo mi. Cras erat ex, rhoncus id blandit id, commodo ac leo. In hac habitasse platea dictumst.",
    email: "dummy@gmail.com",
  },
  {
    title: "ノート",
    image: "/img6.jpg",
    price: "1200",
    description:
      "使いやすいノートです。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus est tellus, eget porta leo tristique a. Donec hendrerit massa leo, id tempus dolor vulputate et. Pellentesque consectetur dolor placerat euismod pellentesque. Integer scelerisque, augue ac ullamcorper sodales, neque lectus tristique turpis, id luctus lectus lorem eu tortor. In imperdiet semper accumsan. Etiam pellentesque libero et scelerisque vehicula. Nam quis justo mi. Cras erat ex, rhoncus id blandit id, commodo ac leo. In hac habitasse platea dictumst.",
    email: "dummy2@gmail.com",
  },
];

export const item = async () => {
  await prisma.item.createMany({
    data: items,
  });
};
