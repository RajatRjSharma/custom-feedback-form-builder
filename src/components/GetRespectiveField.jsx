import { useState } from "react";
import Category from "./Category";
import FieldElement from "./FieldElement";
import Input from "./Input";
import NumericRating from "./NumericRating";
import RadioCollection from "./RadioCollection";
import SmileyRating from "./SmileyRating";
import StarRating from "./StarRating";
import TextArea from "./TextArea";

const GetRespectiveField = ({ data, handleDelete, handleEdit, isEditOn }) => {
  const [state, setState] = useState(null);

  switch (data?.type) {
    case "textarea": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
        >
          <TextArea
            label={""}
            rows={4}
            onChange={setState}
            value={state || ""}
            error={""}
          />
        </FieldElement>
      );
    }
    case "numeric-rating": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
        >
          <NumericRating
            value={state}
            onChange={setState}
            length={10}
            error={""}
          />
        </FieldElement>
      );
    }
    case "star-rating": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
        >
          <StarRating value={state} onChange={setState} length={5} error={""} />
        </FieldElement>
      );
    }
    case "smiley-rating": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
        >
          <SmileyRating value={state} onChange={setState} error={""} />
        </FieldElement>
      );
    }
    case "radio": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
        >
          <RadioCollection
            name={data?.title + data?.id || ""}
            value={state}
            onChange={setState}
            options={data?.options || []}
            error={""}
          />
        </FieldElement>
      );
    }
    case "single-input": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
        >
          <Input
            label={""}
            type={"text"}
            onChange={setState}
            value={state || ""}
            error={""}
          />
        </FieldElement>
      );
    }
    case "category": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
        >
          <Category
            value={state}
            onChange={setState}
            options={data?.options || []}
            error={""}
          />
        </FieldElement>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default GetRespectiveField;
