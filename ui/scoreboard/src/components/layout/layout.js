import React from "react";
import { Container, Row, Col, setConfiguration } from "react-grid-system";

setConfiguration({
  gutterWidth: 0,
  gridColumns: 96,
  breakpoints: [576, 720, 1280, 1200],
  containerWidths: [540, 710, 1280, 1280]
});

const Layout = () => {
  const cols = new Array(100).fill(100);
  const rows = new Array(100).fill(100).map((row, index) => (
    <tr key={`row-${index}`}>
      {cols.map((col, colIdx) => (
        <td
          key={`col-${index}-${colIdx}`}
          style={{
            height: "50px",
            width: "50px",
            backgroundColor: "white"
          }}
        >
          a
        </td>
      ))}
    </tr>
  ));

  return (
    <table
      style={{
        padding: "5px",
        paddingBottom: "0px",
        tableLayout: "fixed",
        width: "6000px",
        backgroundColor: "black"
      }}
    >
      {rows}
    </table>
  );
};

export default Layout;
