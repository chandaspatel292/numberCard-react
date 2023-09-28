import React from "react";
import ReactDOM from "react-dom/client";
import InteractiveCard from "./InteractiveCard";
import "./index.css";
import NumberCard from "./NumberCard";
import React_Card from "./React_card";

import RecipeReviewCard from "../../RecipeReviewCard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <InteractiveCard /> */}
    <React_Card />
    {/*  <NumberCard /> */}
    {/*<RecipeReviewCard />*/}
  </React.StrictMode>
);
