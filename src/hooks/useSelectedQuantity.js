import { path } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const useSelectedQuantity = slug => {
  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    state => [path(["cartItems", slug], state), state.setSelectedQuantity],
    shallow
  );

  const updateSelectedQuantity = quantity =>
    setSelectedQuantity(slug, quantity);

  return { selectedQuantity, setSelectedQuantity: updateSelectedQuantity };
};

export default useSelectedQuantity;
