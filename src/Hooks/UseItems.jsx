import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";

const UseItems = () => {
  // const [items, setItems] = useState([]);
  // const fashionItems = items?.filter((item) => item.category === "fashion");
  // const lifestyleItems = items?.filter((item) => item.category === "lifestyle");
  // const natureItems = items?.filter((item) => item.category === "nature");
  // const portraitsItems = items?.filter((item) => item.category === "portraits");
  // const studioItems = items?.filter((item) => item.category === "studio");

  const { data: items = [], isLoading: isItemsLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      return await axios("http://localhost:3000/items").then((data) => {
        console.log({ data });
        // setItems(data.data);
        return data.data;
      });
    },
  });
  console.log({ items });
  return {
    items,
    isItemsLoading,
  };
};

export default UseItems;
