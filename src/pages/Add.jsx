import React, { useState } from "react";
import { assets } from "../assets/assets";
import fetcher from "../api/fetcher";
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const handleAddSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);
      if (image1) formData.append("images", image1);
      if (image2) formData.append("images", image2);
      if (image3) formData.append("images", image3);
      if (image4) formData.append("images", image4);

      // Send data to the server using fetcher.post() method.
      const response = await fetcher.post("/api/products", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setCategory("");
        setSubCategory("");
        setPrice("");
        setDescription("");
        setSizes([]);
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div>
          <p className="mb-2">Product category</p>
          <select
            value={category}
            className="w-full px-3 py-2 "
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2 "
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 sm:w-[164px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product sizes</p>
        <div className="flex gap-2">
          <div onClick={() => handleAddSize("S")}>
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              S
            </p>
          </div>
          <div onClick={() => handleAddSize("M")}>
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              M
            </p>
          </div>
          <div onClick={() => handleAddSize("L")}>
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              L
            </p>
          </div>
          <div onClick={() => handleAddSize("XL")}>
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              XL
            </p>
          </div>
          <div onClick={() => handleAddSize("XXL")}>
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
          id="bestseller"
          checked={bestseller}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="uppercase w-28 py-3 mt-4 bg-black text-white"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
