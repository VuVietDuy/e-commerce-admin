import React, { useEffect, useState } from "react";
import fetcher from "../api/fetcher";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await fetcher.get("/api/products");
      setList(response.data.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await fetcher.delete(`/api/products/${id}`);
      toast.success(response.data.message);
      fetchList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <p className="text-sm font-medium text-gray-500">ID</p>
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="text-sm font-medium text-gray-500">Category</p>
          <p className="text-sm font-medium text-gray-500">Price</p>
          <p className="text-sm text-center font-medium text-gray-500">
            Actions
          </p>
        </div>
        {/* Product List */}
        {list &&
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 gap-2 text-sm border"
            >
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}$</p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg"
              >
                X
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
