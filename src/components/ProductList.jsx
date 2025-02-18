import { useEffect, useState, useCallback } from "react";

import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, Spinner } from "neetoui";
import { without } from "ramda";
import productsApi from "src/api/Products";

import { Header } from "./Header";
import ProductListItem from "./productListItem";

export const ProductList = () => {
  const [cartItem, setCartItem] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const debouncedSearchKey = useDebounce(searchKey);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const { products } = await productsApi.fetchProduct({
        searchTerm: debouncedSearchKey,
      });
      console.log("Products:", products);
      setProduct(products);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchKey]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ Correct dependencies

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const toggleIsInCart = slug =>
    setCartItem(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], prevCartItems) // ✅ Fix incorrect variable name
        : [slug, ...prevCartItems]
    );

  return (
    <div className="flex flex-col">
      <Header
        cartItemCount={cartItem.length}
        shouldShowBackButton={false}
        title="Smile cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {product.map(product => (
          <ProductListItem
            key={product.slug}
            {...product}
            isInCart={cartItem.includes(product.slug)}
            toggleIsInCart={() => toggleIsInCart(product.slug)}
          />
        ))}
      </div>
    </div>
  );
};
