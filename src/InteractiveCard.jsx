import React, { useState } from "react";
import EdiText from "react-editext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
//import './App.css';

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
//Font.whitelist = ["Sans-Serif","Monospace","Serif", "Poppins", "Montserrat", "Lato", "Mulish"];
Font.whitelist = ["Poppins", "Montserrat", "Lato", "Mulish"];
Quill.register(Font, true);

const initialCard = {
  card_num: 123,
  card_title: "Lorem ipsum",
  card_description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere venenatis ex, et sagittis massa mollis ut.",
  card_button: "Save",
  card_delete: true,
  card_id: 1,
};

export default function InteractiveCard() {
  const [cardDetails, setCardDetails] = useState([initialCard]);

  const handleAddCard = () => {
    if (cardDetails.length < 9) {
      const newCard = {
        ...initialCard,
        card_id: cardDetails.length + 1,
      };
      setCardDetails([...cardDetails, newCard]);
    }
  };

  // Delete a card by ID
  const handleCardDelete = (id) => {
    const updatedCards = [...cardDetails];
    const index = updatedCards.findIndex((card) => card.card_id === id);
    if (index !== -1) {
      updatedCards.splice(index, 1);
      setCardDetails(updatedCards);
    }
  };

  const handleEditCard = (id, field, value) => {
    const updatedCards = cardDetails.map((card) =>
      card.card_id === id ? { ...card, [field]: value } : card
    );
    setCardDetails(updatedCards);
  };

  const modules = {
    toolbar: [
      //[{ font: Font.whitelist }],
      [{ size: ["small", false, "large", "huge"] }],

      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  };

  return (
    <Container className="body" mt={5}>
      <Grid container spacing={3}>
        {cardDetails.map((item) => (
          <Grid key={item.card_id} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  <EdiText
                    type="text"
                    value={item.card_title}
                    onSave={(value) =>
                      handleEditCard(item.card_id, "card_title", value)
                    }
                    // Use the className prop to apply custom styles
                    className="custom-edit-text"
                    // You can also use inputProps to apply styles to the input field
                    inputProps={{
                      style: {
                        background: "#1d2225",
                        color: "#f4c361",
                        fontWeight: "bold",
                        borderRadius: "5px",
                      },
                    }}
                  />
                </Typography>
                <div className="quill-overlay-container">
                  <ReactQuill
                    value={item.card_description}
                    onChange={(value) =>
                      handleEditCard(item.card_id, "card_description", value)
                    }
                    modules={modules}
                  />
                </div>
                {item.card_delete ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCardDelete(item.card_id)}
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      handleEditCard(item.card_id, "card_delete", true)
                    }
                  >
                    Undo Delete
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {cardDetails.length < 9 && (
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="primary" onClick={handleAddCard}>
              Add Card
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
