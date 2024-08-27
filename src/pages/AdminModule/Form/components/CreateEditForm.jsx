import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import GetRespectiveField from "../../../../components/GetRespectiveField";
import {
  clearEditField,
  setEditField,
  setListOfFields,
} from "../../../../store/adminSlice";
import backSvg from "../../../../assets/back.svg";
import editSvg from "../../../../assets/edit.svg";

const CreateEditForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, editField } = useSelector((state) => state.admin);

  const handleDelete = (id) => {
    const index = form?.listOfFields?.findIndex((_) => _?.id === id);
    if (index !== -1 && id) {
      const updatedList = [...(form?.listOfFields || [])];
      updatedList?.splice(index, 1);
      dispatch(setListOfFields(updatedList));
      if (editField?.active && editField?.data?.id === id)
        dispatch(clearEditField());
    }
  };

  const handleEdit = (data) => {
    if (data?.id) dispatch(setEditField({ active: true, type: "field", data }));
  };

  const handleFormTitleEdit = () => {
    if (form?.active)
      dispatch(
        setEditField({
          active: true,
          type: "form-title",
          data: { title: form?.title || "" },
        })
      );
  };

  const onDragEnd = (result) => {
    const sourceIndex = result?.source?.index ?? -1;
    const destinationIndex = result?.destination?.index ?? -1;
    const fieldListLength = form?.listOfFields?.length ?? -1;
    if (
      sourceIndex >= 0 &&
      destinationIndex >= 0 &&
      sourceIndex < fieldListLength &&
      destinationIndex < fieldListLength
    ) {
      const tempFieldList = [...form?.listOfFields];
      const dragItemField = tempFieldList[sourceIndex];
      if (dragItemField.id === result.draggableId) {
        let tempUpdateFieldList = [...tempFieldList];
        if (sourceIndex < destinationIndex) {
          tempUpdateFieldList = [
            ...tempFieldList.slice(0, sourceIndex),
            ...tempFieldList.slice(sourceIndex + 1, destinationIndex + 1),
            dragItemField,
            ...tempFieldList.slice(destinationIndex + 1, fieldListLength),
          ];
        } else if (sourceIndex > destinationIndex) {
          tempUpdateFieldList = [
            ...tempFieldList.slice(0, destinationIndex),
            dragItemField,
            ...tempFieldList.slice(destinationIndex, sourceIndex),
            ...tempFieldList.slice(sourceIndex + 1, fieldListLength),
          ];
        }
        dispatch(setListOfFields(tempUpdateFieldList));
      }
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "fit-content",
        minHeight: window.innerHeight - 130 + "px",
        width: "500px",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          height: "65px",
          width: "100%",
          backgroundColor: "#5578F4",
          paddingY: 1,
          paddingX: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          alt="back-svg"
          src={backSvg}
          sx={{
            height: "25px",
            width: "17px",
            borderRadius: "0",
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin")}
        />
        <Typography
          sx={{ fontSize: "24px", color: "#FFFFFF", fontWeight: 500 }}
        >
          {form?.title || ""}
        </Typography>
        <Avatar
          alt="edit-title-svg"
          src={editSvg}
          sx={{
            height: "25px",
            width: "25px",
            borderRadius: "0",
            cursor: "pointer",
          }}
          onClick={handleFormTitleEdit}
        />
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <CardContent
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                width: "100%",
                height: "auto",
                justifyContent: "start",
                display: "flex",
                flexDirection: "column",
                paddingY: 1.5,
                "&:last-child": {
                  paddingBottom: 1.5,
                },
                gap: 2,
              }}
            >
              {form?.listOfFields?.length ? (
                form?.listOfFields?.map((_, index) => (
                  <Draggable
                    key={_?.id || index}
                    draggableId={_?.id || index}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          height: "100%",
                          width: "100%",
                          ...provided.dragHandleProps.style,
                        }}
                      >
                        <GetRespectiveField
                          data={_}
                          key={_?.id || index}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          isEditOn={_?.id && _?.id === editField?.data?.id}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))
              ) : (
                <Box
                  sx={{
                    height: window.innerHeight - 240 + "px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "36px", color: "#5C5858", fontWeight: 500 }}
                  >
                    Add Fields
                  </Typography>
                </Box>
              )}
              {provided.placeholder}
            </CardContent>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
};

export default CreateEditForm;
