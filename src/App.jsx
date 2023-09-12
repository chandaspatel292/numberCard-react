import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import EdiText from 'react-editext';
import ReactQuill from "react-quill";
const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
//Font.whitelist = ["Sans-Serif","Monospace","Serif", "Poppins", "Montserrat", "Lato", "Mulish"];
Font.whitelist = ["Poppins", "Montserrat", "Lato", "Mulish"];
Quill.register(Font, true);

const arrayList = [{
  card_num: 123,
  card_title: "Lorem ipsum",
  card_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere venenatis ex, et sagittis massa mollis ut. Etiam imperdiet fermentum consectetur. Vivamus sagittis, enim quis ullamcorper iaculis",
  card_button: "Save",
  card_delete: true,
  card_id: 1,
}];

export default function App() {
  const [cardDetails, setCardDetails] = useState(arrayList);
  const [editing, setEditing] = useState(false);

  const handleAddCard = (id) => {
    var temparray = [...cardDetails];
    temparray.push({
      card_num: 123,
      card_header: "Lorem ipsum",
      card_sub_header: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere venenatis ex, et sagittis massa mollis ut. Etiam imperdiet fermentum consectetur. Vivamus sagittis, enim quis ullamcorper iaculis",
      card_button: "Save",
      card_header_edit: true,
      card_sub_header_edit: true,
      card_header_add: true,
      card_sub_header_add: true,
      card_delete: true,
      card_id: 1,
    });
    console.log(temparray);
    setCardDetails(temparray);
  }
  const handleCardDelete = (id) => {
    var temparray = [...cardDetails];
    var myArray = temparray.splice(id, 1);
    console.log(temparray);
    setCardDetails(temparray);
  }

  const handleCardDeleteButton = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_delete = false;
    setCardDetails(temparray);
  }

  const handleAddCardButton = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_delete = true;
    setCardDetails(temparray);
  }
  const handleSaveFirst = (id, value) => {
    var temparray = [...cardDetails];
    temparray[id].card_header = value;
    setCardDetails(temparray);
  }
  const handleClickHFFFirst = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_header_edit = true;
    if (temparray[id].card_header === "" || temparray[id].card_header === "<p><br></p>") {
      temparray[id].card_header_add = false;
    } else {
      temparray[id].card_header_add = true;
    }
    setCardDetails(temparray);
  }

  const handleClickHFFSecond = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_sub_header_edit = true;
    if (temparray[id].card_sub_header === "" || temparray[id].card_sub_header === "<p><br></p>") {
      temparray[id].card_sub_header_add = false;
    } else {
      temparray[id].card_sub_header_add = true;
    }
    setCardDetails(temparray);
  }

  const setShowHeaderTextEdit = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_header_edit = false;
    setCardDetails(temparray);
  }

  const setShowSubHeaderTextEdit = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_sub_header_edit = false;
    setCardDetails(temparray);
  }
  const handleSaveSecond = (id, value) => {
    var temparray = [...cardDetails];
    temparray[id].card_sub_header = value;
    setCardDetails(temparray);
  }

  const handleSaveButton = (value, id) => {
    var temparray = [...cardDetails];
    temparray[id].card_button = value;
    setCardDetails(temparray);
  }

  return (
    <div className='Whole-card'>

    </div>
  )
}

