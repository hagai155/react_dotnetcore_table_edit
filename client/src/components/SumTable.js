import React from "react";
import configData from "../config.json";
import { TableCell } from "../components/TableCell.js";

export const SumTable = ({ totalOrders, totalShip, oavgShip }) => {
  return (
    <table className="tblmain tbl2">
      <tbody>
        <tr>
          <TableCell>total orders</TableCell>
          <TableCell>{totalOrders}</TableCell>
        </tr>
        <tr>
          <TableCell>total ship</TableCell>
          <TableCell>{totalShip.toFixed(configData.NUMBER_FORMAT)}</TableCell>
        </tr>
        <tr>
          <TableCell>shipping cost average</TableCell>
          <TableCell>{oavgShip.toFixed(configData.NUMBER_FORMAT)}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
