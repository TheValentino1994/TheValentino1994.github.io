import React from "react";

export const newLine = (line: string) =>
  line.split("\n").map((item, index, arr) => (
    <React.Fragment key={index}>
      {item} {index !== arr.length - 1 && <br />}
    </React.Fragment>
  ));
