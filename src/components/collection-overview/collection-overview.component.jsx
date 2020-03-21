import React from "react";
import "./collection-overview.style.scss";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selector";
import CollectionPreview from "../collection-preview/collection-preview.component";

const CollectionOverview = () => {
  const { collections } = useSelector(
    createStructuredSelector({ collections: selectCollections })
  );
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionOverview;
