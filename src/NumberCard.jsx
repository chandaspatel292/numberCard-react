import React, { useState } from "react";
import EdiText from "react-editext";
import ReactQuill from "react-quill";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CardActions,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Poppins", "Montserrat", "Lato", "Mulish"];
Quill.register(Font, true);

const InitialCardDetails = {
  card_id: 1,
  card_title: "Hello",
  card_title_edit: true,
  card_description: "Hello world",
  card_description_edit: true,
  card_button: "save",
  card_delete: true,
  card_title_add: true,
  card_description_add: true,
};

const NumberCard = () => {
  const [cardDetails, setCardDetails] = useState([InitialCardDetails]);
  const [editing, setEditing] = useState(false);

  const handleAddCard = (id) => {
    var temparray = [...cardDetails];
    temparray.push({
      card_id: id + 1,
      card_title: "Hello",
      card_title_edit: true,
      card_description: "Hello World",
      card_description_edit: true,
      card_button: "save",
      card_delete: true,
      card_title_add: true,
      card_description_add: true,
    });
    setCardDetails(temparray);
    console.log(temparray);
  };

  const handleCardDelete = (id) => {
    var temparray = [...cardDetails];
    var myArray = temparray.splice(id, 1);
    console.log(temparray);
    setCardDetails(temparray);
  };

  /* const handleCardDeleteButton = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_delete = false;
    setCardDetails(temparray);
  }; */

  const handleAddCardButton = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_delete = true;
    setCardDetails(temparray);
  };

  const handleSaveFirst = (id, value) => {
    var temparray = [...cardDetails];
    temparray[id].card_title = value;
    setCardDetails(temparray);
  };

  const handleClickHFFFirst = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_title_edit = true;
    if (
      temparray[id].card_title === "" ||
      temparray[id].card_title === "<p><br></p>"
    ) {
      temparray[id].card_title_add = false;
    } else {
      temparray[id].card_title_add = true;
    }
    setCardDetails(temparray);
  };
  const handleClickHFFSecond = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_description_edit = true;
    if (
      temparray[id].card_description === "" ||
      temparray[id].card_description === "<p><br></p>"
    ) {
      temparray[id].card_description_add = false;
    } else {
      temparray[id].card_description_add = true;
    }
    setCardDetails(temparray);
  };

  const setShowTitleTextEdit = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_title_edit = false;
    setCardDetails(temparray);
  };

  const setShowDescriptionTextEdit = (id) => {
    var temparray = [...cardDetails];
    temparray[id].card_description_edit = false;
    setCardDetails(temparray);
  };

  const handleSaveSecond = (id, value) => {
    var temparray = [...cardDetails];
    temparray[id].card_description = value;
    setCardDetails(temparray);
  };

  const handleSaveButton = (value, id) => {
    var temparray = [...cardDetails];
    temparray[id].card_button = value;
    setCardDetails(temparray);
  };
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Grid container spacing={12}>
      {cardDetails.map((item, ind) => (
        <Grid item xs={4} sm={4} style={{ maxWidth: "50%" }} key={ind}>
          <Card sx={{ minHeight: 300, minWidth: 300 }}>
            <CardContent>
              {item.card_title_edit ? (
                <>
                  {item.card_title_add ? (
                    <div
                      onClick={() => setShowTitleTextEdit(ind)}
                      className="editable-content"
                    >
                      <div className="edit_btn">
                        <i className="fa-solid fa-pen"></i>
                      </div>
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: item.card_title }}
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          minHeight: "50px",
                          minWidth: "60px",
                          marginTop: "8px",
                          marginBottom: "8px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ) : (
                    <Card>
                      <IconButton onClick={() => setShowHeaderTextEdit(ind)}>
                        <Icon>add</Icon>
                      </IconButton>
                    </Card>
                  )}
                </>
              ) : (
                <>
                  <div
                    onClick={() => handleClickHFFFirst(ind)}
                    className="save-btn"
                    style={{ float: "right", position: "unset" }}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                  </div>
                  <ReactQuill
                    // className={classes.editor}
                    theme="snow"
                    id={ind}
                    onChange={(content) => handleSaveFirst(ind, content)}
                    value={item.card_title}
                    modules={modules}
                    formats={formats}
                    placeholder="Type here..."
                  />
                </>
              )}
              {item.card_description_edit ? (
                <>
                  {item.card_description_add ? (
                    <div
                      onClick={() => setShowDescriptionTextEdit(ind)}
                      className="editable_content"
                    >
                      <div className="edit_btn">
                        <i className="fa-solid fa-pen"></i>
                      </div>
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{
                          __html: item.card_description,
                        }}
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          minHeight: "50px",
                          marginTop: "16px",
                          marginBottom: "16px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ) : (
                    <Card>
                      <IconButton onClick={() => setShowSubHeaderTextEdit(ind)}>
                        <Icon>add</Icon>
                      </IconButton>
                    </Card>
                  )}
                </>
              ) : (
                <>
                  <div
                    onClick={() => handleClickHFFSecond(ind)}
                    className="save_btn"
                    style={{ float: "right", position: "unset" }}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                  </div>
                  <ReactQuill
                    // className={classes.editor}
                    theme="snow"
                    id={ind}
                    onChange={(content) => handleSaveSecond(ind, content)}
                    value={item.card_description}
                    modules={modules}
                    formats={formats}
                    placeholder="Type here..."
                    style={{ minWidth: "60px" }}
                  />
                </>
              )}

              {item.card_delete ? (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleSaveButton(item.card_button, ind)}
                    style={{ marginTop: "16px" }}
                  >
                    {item.card_button}
                  </Button>
                  {/* <IconButton
                    className="ml-2"
                    onClick={() => handleCardDeleteButton(ind)}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </>
              ) : (
                <IconButton onClick={() => handleAddCardButton(ind)}>
                  <Icon>add</Icon>
                </IconButton>
              )}
            </CardContent>
            <CardActions>
              <IconButton
                className="ml-2"
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleAddCard(cardDetails.length)}
          >
            <AddBoxIcon
              fontSize="large"
              style={{
                transition: "transform 0.3s ease",
                transform: hovered ? "scale(1.2)" : "scale(1)",
              }}
            />
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
};
const formats = [
  "align",
  "background",
  "bold",
  "blockquote",
  "bullet",
  "color",
  "code",
  "code-block",
  "clean",
  "direction",
  /* "font", */
  "header",
  "italic",
  "indent",
  "list",
  "link",
  "size",
  "strike",
  "script",
  "underline",
];

const modules = {
  toolbar: [
    /* [{ font: Font.whitelist }], */
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    /* [{ header: [1, 2, 3, 4, 5, 6, false] }], */

    ["bold", "italic", "underline", "strike"], // toggled buttons

    //[{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    /*  ["image"], */

    /*  [{ header: 1 }, { header: 2 }], // custom button values */
    /* [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction */

    /* ["clean"], */
    [
      /* "blockquote", "code-block",  "link"*/
    ],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};

export default NumberCard;
