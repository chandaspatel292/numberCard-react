import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const InitialCardDetails = {
  card_id: 1,
  card_title: "Untitled",
  card_description: "The card description",
  card_delete: true,
  editing: true,
};

const React_Card = () => {
  const [cardDetails, setCardDetails] = useState([InitialCardDetails]);
  const [titleValues, setTitleValues] = useState([
    InitialCardDetails.card_title,
  ]);
  const [descriptionValues, setDescriptionValues] = useState([
    InitialCardDetails.card_description,
  ]);

  const handleAddCard = () => {
    const newCard = {
      card_id: cardDetails.length + 1,
      card_title: "Untitled",
      card_description: "The card description",
      card_delete: true,
      editing: true,
    };
    setCardDetails([...cardDetails, newCard]);
    setTitleValues([...titleValues, newCard.card_title]);
    setDescriptionValues([...descriptionValues, newCard.card_description]);
  };

  const handleCardDelete = (id) => {
    const updatedCards = cardDetails.filter((item, index) => index !== id);
    setCardDetails(updatedCards);
    setTitleValues((prev) => prev.filter((_, index) => index !== id));
    setDescriptionValues((prev) => prev.filter((_, index) => index !== id));
  };

  const handleToggleEditing = (id) => {
    const updatedCards = cardDetails.map((item, index) =>
      index === id ? { ...item, editing: !item.editing } : item
    );
    setCardDetails(updatedCards);
  };

  const handleTitleChange = (id, value) => {
    const updatedValues = [...titleValues];
    updatedValues[id] = value;
    setTitleValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_title = value;
    setCardDetails(updatedCards);
  };

  const handleDescriptionChange = (id, value) => {
    const updatedValues = [...descriptionValues];
    updatedValues[id] = value;
    setDescriptionValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_description = value;
    setCardDetails(updatedCards);
  };

  const modules = {
    toolbar: [
      /* [{ size: [] } { font: [] }], */
      ["bold", "italic", "underline" /* "strike" */],
      [{ color: [] } /* , { background: [] }, { align: [] } */],
      ["link"],
    ],
  };

  const showDetails = () => {
    var temparray = [...cardDetails];
    console.log(temparray);
  };

  const formats = [
    /* "align", */
    /* "background", */
    "bold",
    "color",
    "font",
    /* "strike", */
    "italic",
    "link",
    "size",
    "underline",
  ];

  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredDescription, setHoveredDescription] = useState(null);

  // Functions to handle hover events for title and description
  const handleTitleMouseOver = (id) => {
    setHoveredTitle(id);
  };

  const handleTitleMouseOut = () => {
    setHoveredTitle(null);
  };

  const handleDescriptionMouseOver = (id) => {
    setHoveredDescription(id);
  };

  const handleDescriptionMouseOut = () => {
    setHoveredDescription(null);
  };

  const handleDeleteTitle = (id) => {
    const updatedValues = [...titleValues];
    updatedValues[id] = ""; // Clear the title
    setTitleValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_title = "";
    setCardDetails(updatedCards);
  };

  const handleAddTitle = (id) => {
    const updatedValues = [...titleValues];
    updatedValues[id] = "Untitled";
    setTitleValues(updatedValues);

    const updatedCards = [...cardDetails];
    updatedCards[id].card_title = "Untitled";
    setCardDetails(updatedCards);
  };

  // Function to delete the description of a card
  const handleDeleteDescription = (id) => {
    const updatedValues = [...descriptionValues];
    updatedValues[id] = ""; // Clear the description
    setDescriptionValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_description = "";
    setCardDetails(updatedCards);
  };

  const handleAddDescription = (id) => {
    const updatedValues = [...descriptionValues];
    updatedValues[id] = "The card description";
    setDescriptionValues(updatedValues);

    const updatedCards = [...cardDetails];
    updatedCards[id].card_description = "The card description";
    setCardDetails(updatedCards);
  };

  return (
    <div style={{ maxWidth: "1500px" }}>
      <Grid container spacing={3} justify="center" margin={"8px"}>
        {cardDetails.map((item, ind) => (
          <Grid key={item.card_id} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    onMouseOver={() => handleTitleMouseOver(ind)}
                    onMouseOut={handleTitleMouseOut}
                  >
                    {
                      /* item.editing || */ ind === hoveredTitle ? (
                        <ReactQuill
                          key={`title-${ind}`}
                          theme="snow"
                          value={titleValues[ind]}
                          onChange={(content) =>
                            handleTitleChange(ind, content)
                          }
                          modules={modules}
                          formats={formats}
                          style={{ margin: "4px", width: "100%" }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: titleValues[ind],
                          }}
                        />
                      )
                    }
                  </div>
                  {titleValues[ind] !== "" ? (
                    <IconButton
                      onClick={() => handleDeleteTitle(ind)} // Delete the title
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleAddTitle(ind)}>
                      <AddIcon />
                    </IconButton>
                  )}
                </div>
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    onMouseOver={() => handleDescriptionMouseOver(ind)}
                    onMouseOut={handleDescriptionMouseOut}
                  >
                    {
                      /* item.editing || */ ind === hoveredDescription ? (
                        <ReactQuill
                          key={`description-${ind}`}
                          value={descriptionValues[ind]}
                          onChange={(value) =>
                            handleDescriptionChange(ind, value)
                          }
                          modules={modules}
                          formats={formats}
                          style={{ margin: "4px", width: "100%" }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: descriptionValues[ind],
                          }}
                        />
                      )
                    }
                  </div>
                  {descriptionValues[ind] !== "" ? (
                    <IconButton
                      onClick={() => handleDeleteDescription(ind)} // Delete the description
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleAddDescription(ind)}>
                      <AddIcon />
                    </IconButton>
                  )}
                </div>
              </CardContent>
              <CardActions>
                {/* {item.editing ? (
                  <IconButton onClick={() => handleToggleEditing(ind)}>
                    <SaveIcon />
                  </IconButton>
                ) : null} */}
                <IconButton
                  className="card-delete"
                  onClick={() => handleCardDelete(ind)}
                >
                  <DeleteIcon color="red" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {cardDetails.length < 9 ? (
          <Grid item xs={4}>
            <Card
              sx={{
                minHeight: 300,
                minWidth: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={handleAddCard}
            >
              <AddBoxIcon fontSize="large" />
            </Card>
          </Grid>
        ) : null}
      </Grid>
      <Button
        color="primary"
        variant="contained"
        onClick={showDetails} // Attach the saveCardDetails function to the button's onClick event
        style={{ marginTop: "16px" }}
      >
        Save
      </Button>
    </div>
  );
};

export default React_Card;
