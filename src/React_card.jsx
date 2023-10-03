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
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
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

  return (
    <div style={{ maxWidth: "1500px" }}>
      <Grid container spacing={3} justify="center" margin={"8px"}>
        {cardDetails.map((item, ind) => (
          <Grid key={item.card_id} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                {item.editing ? (
                  <div>
                    <ReactQuill
                      key={`title-${ind}`}
                      theme="snow"
                      value={item.card_title}
                      onChange={(content) => handleTitleChange(ind, content)}
                      modules={modules}
                      formats={formats}
                      style={{ margin: "4px", width: "100%" }}
                    />
                    <ReactQuill
                      key={`description-${ind}`} // Use a unique key for each ReactQuill component
                      value={item.card_description}
                      onChange={(value) => handleDescriptionChange(ind, value)}
                      modules={modules}
                      formats={formats}
                      style={{ margin: "4px", width: "100%" }}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.card_title,
                      }}
                    />
                    <br />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.card_description,
                      }}
                    />
                  </>
                )}
              </CardContent>
              <CardActions>
                {item.editing ? (
                  <IconButton onClick={() => handleToggleEditing(ind)}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleToggleEditing(ind)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton
                  className="card-delete"
                  onClick={() => handleCardDelete(ind)}
                >
                  <DeleteIcon />
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
