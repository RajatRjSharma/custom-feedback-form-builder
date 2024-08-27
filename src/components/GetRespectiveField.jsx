import Category from "./Category";
import FieldElement from "./FieldElement";
import Input from "./Input";
import NumericRating from "./NumericRating";
import RadioCollection from "./RadioCollection";
import SmileyRating from "./SmileyRating";
import StarRating from "./StarRating";
import TextArea from "./TextArea";

const GetRespectiveField = ({
  data,
  handleDelete,
  handleEdit,
  isEditOn = false,
  hideActions = false,
  formResponse,
  setFormResponse,
}) => {
  const getFormFieldValue = (id) => formResponse?.[id]?.value || "";

  const getFormFieldError = (id) => formResponse?.[id]?.error || "";

  const setFormFieldValue = (id, value) => {
    if (setFormResponse)
      setFormResponse((_) => ({
        ..._,
        [id]: {
          ...(_?.[id] || {}),
          value,
        },
      }));
  };

  switch (data?.type) {
    case "textarea": {
      return (
        <FieldElement
          title={data?.title || ""}
          handleEdit={() => handleEdit(data)}
          handleDelete={() => handleDelete(data?.id)}
          isEditOn={isEditOn}
          hideActions={hideActions}
        >
          <TextArea
            label={""}
            rows={4}
            onChange={(value) => data?.id && setFormFieldValue(data?.id, value)}
            value={getFormFieldValue(data?.id) || ""}
            error={getFormFieldError(data?.id) || ""}
            disabled={!hideActions}
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
          hideActions={hideActions}
        >
          <NumericRating
            length={10}
            onChange={(value) => data?.id && setFormFieldValue(data?.id, value)}
            value={getFormFieldValue(data?.id) || null}
            error={getFormFieldError(data?.id) || ""}
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
          hideActions={hideActions}
        >
          <StarRating
            length={5}
            onChange={(value) => data?.id && setFormFieldValue(data?.id, value)}
            value={getFormFieldValue(data?.id) || null}
            error={getFormFieldError(data?.id) || ""}
          />
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
          hideActions={hideActions}
        >
          <SmileyRating
            onChange={(value) => data?.id && setFormFieldValue(data?.id, value)}
            value={getFormFieldValue(data?.id) || null}
            error={getFormFieldError(data?.id) || ""}
          />
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
          hideActions={hideActions}
        >
          <RadioCollection
            name={data?.title + data?.id || ""}
            options={data?.options || []}
            onChange={(value) => data?.id && setFormFieldValue(data?.id, value)}
            value={getFormFieldValue(data?.id) || null}
            error={getFormFieldError(data?.id) || ""}
            disabled={!hideActions}
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
          hideActions={hideActions}
        >
          <Input
            label={""}
            type={"text"}
            onChange={(value) => data?.id && setFormFieldValue(data?.id, value)}
            value={getFormFieldValue(data?.id) || ""}
            error={getFormFieldError(data?.id) || ""}
            disabled={!hideActions}
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
          hideActions={hideActions}
        >
          <Category
            options={data?.options || []}
            onChange={(value) => data?.id && setFormFieldValue(data?.id, value)}
            value={getFormFieldValue(data?.id) || null}
            error={getFormFieldError(data?.id) || ""}
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
