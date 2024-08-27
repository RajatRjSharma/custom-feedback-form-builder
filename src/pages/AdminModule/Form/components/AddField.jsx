import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import AddFieldElement from "../elements/AddFieldElement";
import BasedOnElement from "../elements/BasedOnElement";
import { setListOfFields } from "../../../../store/adminSlice";
import textSVG from "../../../../assets/textarea_icon.svg";
import categorySVG from "../../../../assets/category_icon.svg";
import inputSVG from "../../../../assets/input_icon.svg";
import numericSVG from "../../../../assets/numeric_icon.svg";
import radioSVG from "../../../../assets/radio_icon.svg";
import smileySVG from "../../../../assets/smiley_icon.svg";
import starSVG from "../../../../assets/star_icon.svg";

/**
 * Add field component to list all the form fields types and based on fields.
 */
const AddField = ({ showBasedOn, setShowBasedOn }) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.admin);
  /**
   * List of fields
   */
  const addFields = [
    {
      image: textSVG,
      title: "Textarea",
      isSmallSize: false,
      initialData: {
        title: "Update your field...",
        isRequired: false,
        error: "",
        type: "textarea",
      },
    },
    {
      image: numericSVG,
      title: "Numeric Rating",
      isSmallSize: false,
      initialData: {
        title: "Update your field...",
        isRequired: false,
        error: "",
        type: "numeric-rating",
      },
    },
    {
      image: starSVG,
      title: "Star Rating",
      isSmallSize: false,
      initialData: {
        title: "Update your field...",
        isRequired: false,
        error: "",
        type: "star-rating",
      },
    },
    {
      image: smileySVG,
      title: "Smiley Rating",
      isSmallSize: false,
      initialData: {
        title: "Update your field...",
        isRequired: false,
        error: "",
        type: "smiley-rating",
      },
    },
    {
      image: inputSVG,
      title: "Single Line Input",
      isSmallSize: false,
      initialData: {
        title: "Update your field...",
        isRequired: false,
        error: "",
        type: "single-input",
      },
    },
    {
      image: radioSVG,
      title: "Radio Button",
      isSmallSize: true,
      initialData: {
        title: "Update your field...",
        isRequired: false,
        error: "",
        type: "radio",
        options: [],
      },
    },
    {
      image: categorySVG,
      title: "Categories",
      isSmallSize: true,
      initialData: {
        title: "Update your field...",
        isRequired: false,
        error: "",
        type: "category",
        options: [],
      },
    },
  ];

  /**
   * Addition of new field
   */
  const handleFieldAddition = (_) => {
    _.id = uuidv4();
    dispatch(setListOfFields([...(form?.listOfFields || []), _]));
  };

  return (
    <>
      <Typography sx={{ fontSize: "20px", color: "#000000", fontWeight: 600 }}>
        Add Fields
      </Typography>
      {addFields?.map((_, index) => (
        <AddFieldElement
          key={index}
          image={_?.image}
          title={_?.title}
          isSmallSize={_?.isSmallSize}
          initialData={_?.initialData || {}}
          handleClick={(_) => handleFieldAddition(_)}
        />
      ))}
      <Box sx={{ marginTop: 2, width: "100%" }}></Box>
      <BasedOnElement
        title={"Show based on URL conditions"}
        showBasedOn={showBasedOn}
        setShowBasedOn={setShowBasedOn}
        basedOnSwitchKey={"basedOnURL"}
        basedOnValueKey={"url"}
        label={"http://"}
        type={"url"}
      />
      <BasedOnElement
        title={"Show on a specific date"}
        showBasedOn={showBasedOn}
        setShowBasedOn={setShowBasedOn}
        basedOnSwitchKey={"basedOnDate"}
        basedOnValueKey={"date"}
        label={"Select Date"}
        type={"date"}
        shrink={{ shrink: true }}
      />
      <BasedOnElement
        title={"Show on a specific time"}
        showBasedOn={showBasedOn}
        setShowBasedOn={setShowBasedOn}
        basedOnSwitchKey={"basedOnTime"}
        basedOnValueKey={"time"}
        label={"Select Time"}
        type={"time"}
        shrink={{ shrink: true }}
      />
    </>
  );
};

AddField.propTypes = {
  showBasedOn: PropTypes.object.isRequired,
  setShowBasedOn: PropTypes.func.isRequired,
};

export default AddField;
