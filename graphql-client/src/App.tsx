import { useQuery, gql } from "@apollo/client";
import React from "react";

import Form from "./Form"
import Button from "./Button"


const GET_LOCATIONS = gql`
 query ExampleQuery {
  layout(page: "Home") {
    page
    components {
      type_
      label
      action {
        id_
        action
      }
      ... on Form {
        name
        value
      }
    }
  }
}

`;

function Layout() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.layout.components.map((uiElement) => (
    <div key={uiElement.action.id_}>
      {uiElement.type_ === "Form" ? <Form {...uiElement} /> : <Button {...uiElement} />}
    </div>
  ));
}

export default function App() {
  return (
    <div>
      <h2>
        My first Apollo app
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h2>
      <br />
      <Layout />
    </div>
  );
}
