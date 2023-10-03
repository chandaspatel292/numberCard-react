// Import necessary dependencies and components from Material-UI and React-Quill
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Define initial card details for a single card
const InitialCardDetails = {
  card_id: 1,
  card_title: "000",
  card_description: "The card description",
  card_delete: true,
  editing: true,
};

const React_Card = () => {
  // State variables for card details, title values, and description values
  const [cardDetails, setCardDetails] = useState([InitialCardDetails]);
  const [titleValues, setTitleValues] = useState([
    InitialCardDetails.card_title,
  ]);
  const [descriptionValues, setDescriptionValues] = useState([
    InitialCardDetails.card_description,
  ]);

  // Function to add a new card
  const handleAddCard = () => {
    const newCard = {
      card_id: cardDetails.length + 1,
      card_title: "000",
      card_description: "The card description",
      card_delete: true,
      editing: true,
    };
    setCardDetails([...cardDetails, newCard]);
    setTitleValues([...titleValues, newCard.card_title]);
    setDescriptionValues([...descriptionValues, newCard.card_description]);
  };

  // Function to delete a card by its ID
  const handleCardDelete = (id) => {
    const updatedCards = cardDetails.filter((item, index) => index !== id);
    setCardDetails(updatedCards);
    setTitleValues((prev) => prev.filter((_, index) => index !== id));
    setDescriptionValues((prev) => prev.filter((_, index) => index !== id));
  };

  // Function to toggle editing mode for a card by its ID
  const handleToggleEditing = (id) => {
    const updatedCards = cardDetails.map((item, index) =>
      index === id ? { ...item, editing: !item.editing } : item
    );
    setCardDetails(updatedCards);
  };

  // Function to handle title change for a card by its ID
  const handleTitleChange = (id, value) => {
    const updatedValues = [...titleValues];
    updatedValues[id] = value;
    setTitleValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_title = value;
    setCardDetails(updatedCards);
  };

  // Function to handle description change for a card by its ID
  const handleDescriptionChange = (id, value) => {
    const updatedValues = [...descriptionValues];
    updatedValues[id] = value;
    setDescriptionValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_description = value;
    setCardDetails(updatedCards);
  };

  // Function to handle key press events for title input
  const handleTitleKeyDown = (id, e) => {
    // Get the current content of the editor
    const currentContent = titleValues[id];

    // Check if the pressed key is a number or a control key
    if (
      (e.key >= "0" && e.key <= "9") ||
      ["Backspace", "ArrowLeft", "ArrowRight", "Control", "Shift"].includes(
        e.key
      )
    ) {
      // Allow the input
      return;
    } else {
      // Prevent any other keypress and restore the previous content
      e.preventDefault();
      const updatedValues = [...titleValues];
      updatedValues[id] = currentContent;
      setTitleValues(updatedValues);
    }
  };

  // Define toolbar options for the ReactQuill editor
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link"],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  // Function to display card details in the console
  const showDetails = () => {
    var temparray = [...cardDetails];
    console.log(temparray);
  };

  // State variables for hovered title and description
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

  // Function to delete the title of a card by its ID
  const handleDeleteTitle = (id) => {
    const updatedValues = [...titleValues];
    updatedValues[id] = ""; // Clear the title
    setTitleValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_title = "";
    setCardDetails(updatedCards);
  };

  // Function to add a title to a card by its ID
  const handleAddTitle = (id) => {
    const updatedValues = [...titleValues];
    updatedValues[id] = "000";
    setTitleValues(updatedValues);

    const updatedCards = [...cardDetails];
    updatedCards[id].card_title = "000";
    setCardDetails(updatedCards);
  };

  // Function to delete the description of a card by its ID
  const handleDeleteDescription = (id) => {
    const updatedValues = [...descriptionValues];
    updatedValues[id] = ""; // Clear the description
    setDescriptionValues(updatedValues);

    // Also update the corresponding cardDetails
    const updatedCards = [...cardDetails];
    updatedCards[id].card_description = "";
    setCardDetails(updatedCards);
  };

  // Function to add a default description to a card by its ID
  const handleAddDescription = (id) => {
    const updatedValues = [...descriptionValues];
    updatedValues[id] = "The card description";
    setDescriptionValues(updatedValues);

    const updatedCards = [...cardDetails];
    updatedCards[id].card_description = "The card description";
    setCardDetails(updatedCards);
  };

  return (
    <Container>
      <Grid container spacing={3} justify="center">
        {cardDetails.map((item, ind) => (
          <Grid key={item.card_id} item xs={4} sm={4} md={4}>
            <Card sx={{ minWidth: 300, minHeight: 300 }}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minWidth: "100%",
                  }}
                >
                  <div
                    onMouseOver={() => handleTitleMouseOver(ind)}
                    onMouseOut={handleTitleMouseOut}
                    onKeyDown={(e) => handleTitleKeyDown(ind, e)}
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
                          placeholder="Enter Number here"
                          modules={modules}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
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
                          placeholder="Enter description here"
                          modules={modules}
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
          <Grid item xs={4} sm={4} md={4}>
            <Card
              sx={{
                minHeight: 300,
                minWidth: 650,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "inherit",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  minHeight: "300px",
                  backgroundColor: "white",
                  minWidth: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.querySelector(
                    ".icon-wrapper"
                  ).style.transform = "scale(1.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.querySelector(
                    ".icon-wrapper"
                  ).style.transform = "scale(1)";
                }}
                onClick={handleAddCard}
              >
                <div
                  className="icon-wrapper"
                  style={{ transition: "transform 0.3s ease" }}
                >
                  <AddBoxIcon fontSize="large" />
                </div>
              </div>
            </Card>
          </Grid>
        ) : null}
      </Grid>
      <Button
        color="primary"
        variant="contained"
        onClick={showDetails}
        style={{ margin: "16px" }}
      >
        Save
      </Button>
    </Container>
  );
};

export default React_Card;
