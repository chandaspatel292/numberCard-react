import React from "react";
import ReactDOM from "react-dom/client";
import InteractiveCard from "./InteractiveCard";
import "./index.css";
import NumberCard from "./NumberCard";

import RecipeReviewCard from "../../RecipeReviewCard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*<InteractiveCard />*/}
    <NumberCard />
    {/*<RecipeReviewCard />*/}
  </React.StrictMode>
);
