import { useEffect, useState } from "react";

const UseItems = () => {
  const [items, setItems] = useState([]);
  const fashionItems = items?.filter((item) => item.category === "fashion");
  const lifestyleItems = items?.filter((item) => item.category === "lifestyle");
  const natureItems = items?.filter((item) => item.category === "nature");
  const portraitsItems = items?.filter((item) => item.category === "portraits");
  const studioItems = items?.filter((item) => item.category === "studio");
  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  return {
    items,
    fashionItems,
    lifestyleItems,
    natureItems,
    portraitsItems,
    studioItems,
  };
};

export default UseItems;
