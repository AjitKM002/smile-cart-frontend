import { useState, useEffect } from "react";

import i18n from "i18next";
import { Toastr, Spinner } from "neetoui";
import { keys } from "ramda";
import productsApi from "src/api/Products";
import WithTitle from "src/common/WithTitle";
import useCartItemsStore from "stores/useCartItemsStore";

import { MRP, OFFER_PRICE } from "./CONSTANTS";
import { Header } from "./Header";
import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";
import { cartTotalOf } from "./utils";

const Cart = () => {
  const { cartItems, setSelectedQuantity } = useCartItemsStore();

  const slugs = keys(cartItems);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );

      setProducts(responses);

      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(
            `${name} is no longer available and has been removed from cart`,
            {
              autoClose: 2000,
            }
          );
        }
      });
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header title="My Cart" />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default WithTitle(Cart, i18n.t("cart.title"));
