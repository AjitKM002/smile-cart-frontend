import React from "react";

import { Typography } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom";

import AddToCart from "./AddToCart";

const ProductListItem = ({
  imageUrl,
  name,
  offerPrice,
  slug,
  availableQuantity,
}) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
    to={`/products/${slug}`}
  >
    <img alt={name} className="h-40 w-40" src={imageUrl} />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
    <AddToCart availableQuantity={availableQuantity} slug={slug} />
  </Link>
);

ProductListItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  offerPrice: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};

export default ProductListItem;
