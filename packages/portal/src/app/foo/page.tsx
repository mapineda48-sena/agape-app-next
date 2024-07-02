"use client";

import { useState } from "react";

export default function HelloWorld() {
  const [state, setState] = useState();
  return (
    <div
      onClick={() => {
        fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            objeto1: { key1: "value1" },
            objeto2: { key2: "value2" },
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }}
    >
      Hello World
    </div>
  );
}
