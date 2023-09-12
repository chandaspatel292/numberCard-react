import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import EdiText from 'react-editext';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Poppins", "Montserrat", "Lato", "Mulish"];
Quill.register(Font, true);

const initialCard = {
  card_num: 123,
  card_title: "Lorem ipsum",
  card_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere venenatis ex, et sagittis massa mollis ut.",
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

  const handleCardDelete = (id) => {
    const updatedCards = cardDetails.filter((card) => card.card_id !== id);
    setCardDetails(updatedCards);
  };

  const handleEditCard = (id, field, value) => {
    const updatedCards = cardDetails.map((card) =>
      card.card_id === id ? { ...card, [field]: value } : card
    );
    setCardDetails(updatedCards);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {cardDetails.map((item) => (
          <div key={item.card_id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <EdiText
                    type="text"
                    value={item.card_title}
                    onSave={(value) => handleEditCard(item.card_id, 'card_title', value)}
                    className="custom-edit-text"
                    viewProps={{
                      className: 'my-react-header',
                      style: { borderRadius: 3 }
                    }}
                  />
                </h5>
                <ReactQuill
                  value={item.card_description}
                  onChange={(value) => handleEditCard(item.card_id, 'card_description', value)}
                />
                {item.card_delete ? (
                  <button className="btn btn-danger" onClick={() => handleCardDelete(item.card_id)}>Delete</button>
                ) : (
                  <button className="btn btn-success" onClick={() => handleEditCard(item.card_id, 'card_delete', true)}>Undo Delete</button>
                )}
              </div>
            </div>
          </div>
        ))}
        {cardDetails.length < 9 && (
          <div className="col-md-4 mb-3">
            <button className="btn btn-primary" onClick={handleAddCard}>Add Card</button>
          </div>
        )}
      </div>
    </div>
  );
}
