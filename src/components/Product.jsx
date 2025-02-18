import { useEffect, useState } from "react";

import useSelectedQuantity from "hooks/useSelectedQuantity";
import { LeftArrow } from "neetoicons";
import { Spinner, Button } from "neetoui";
import { useParams, useHistory } from "react-router-dom";
import productsApi from "src/api/Products";

import AddToCart from "./AddToCart";
import { Carousel } from "./Carousel";

export const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsApi.show(slug);
        setProduct(response);
      } catch (err) {
        console.error("Error fetching API data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const {
    name = "",
    description = "",
    imageUrl = "",
    imageUrls = [],
    mrp = 0,
    offerPrice = 0,
    availableQuantity,
  } = product;
  const discount = mrp > 0 ? (((mrp - offerPrice) / mrp) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <LeftArrow
          className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
          onClick={history.goBack}
        />
        <p className="py-2 text-4xl font-semibold">{name}</p>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <Carousel
            image={
              Array.isArray(imageUrls) && imageUrls.length > 0
                ? imageUrls
                : [imageUrl]
            }
          />
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: {mrp}</p>
          <p className="font-semibold">Offer price: {offerPrice}</p>
          <p className="font-semibold text-green-600">{discount}% off</p>
        </div>
      </div>
      <div className="flex space-x-10">
        <AddToCart availableQuantity={availableQuantity} slug={slug} />
        <Button
          className="bg-neutral-800 hover:bg-neutral-950"
          label="Buy now"
          size="large"
          to="/checkout"
          onClick={() => setSelectedQuantity(selectedQuantity || 1)}
        />
      </div>
    </div>
  );
};
