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
import "react-quill/dist/quill.bubble.css";

const InitialCardDetails = {
  card_id: 1,
  card_title: "Untitled",
  card_description: "The card description",
  card_delete: true,
  editing: true,
};

const React_Card = () => {
  const [cardDetails, setCardDetails] = useState([InitialCardDetails]);

  const handleAddCard = () => {
    const newCard = {
      card_id: cardDetails.length + 1,
      card_title: "Untitled",
      card_description: "The card description",
      card_delete: true,
      editing: true,
    };
    setCardDetails([...cardDetails, newCard]);
  };

  const handleCardDelete = (id) => {
    const updatedCards = cardDetails.filter((item, index) => index !== id);
    setCardDetails(updatedCards);
  };

  const handleToggleEditing = (id) => {
    const updatedCards = cardDetails.map((item, index) =>
      index === id ? { ...item, editing: !item.editing } : item
    );
    setCardDetails(updatedCards);
  };

  const handleTitleChange = (id, value) => {
    const updatedCards = cardDetails.map((item, index) =>
      index === id ? { ...item, card_title: value } : item
    );
    setCardDetails(updatedCards);
  };

  const handleDescriptionChange = (id, value) => {
    const updatedCards = cardDetails.map((item, index) =>
      index === id ? { ...item, card_description: value } : item
    );
    setCardDetails(updatedCards);
  };

  return (
    <Grid container spacing={3}>
      {cardDetails.map((item, ind) => (
        <Grid key={item.card_id} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              {item.editing ? (
                <div>
                  <TextField
                    label="Title"
                    fullWidth
                    value={item.card_title}
                    onChange={(e) => handleTitleChange(ind, e.target.value)}
                    style={{ margin: "4px" }}
                  />
                  <TextField
                    label="Description"
                    fullWidth
                    value={item.card_description}
                    onChange={(e) =>
                      handleDescriptionChange(ind, e.target.value)
                    }
                    style={{ margin: "4px" }}
                  />
                </div>
              ) : (
                <>
                  <Typography
                    variant="h3"
                    component="div"
                    style={{ minWidth: "300px" }}
                  >
                    {item.card_title}
                  </Typography>
                  <br />
                  <Typography /* variant="h6" */ component="div">
                    {item.card_description}
                  </Typography>
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
  );
};

export default React_Card;
