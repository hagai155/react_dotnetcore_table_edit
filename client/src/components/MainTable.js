import React from "react";
import configData from "../config.json";
import { TableCell } from "../components/TableCell.js";
import { Input } from "../components/Input.js";

export const MainTable = ({
  orderData,
  onEdit,
  inEditMode,
  editcell,
  handleKeyDown,
}) => {
   
  return (
    <table className="tblmain tbl1">
      <thead>
        <tr>
          <th>order id</th>
          <th>customer name</th>
          <th>shipping address</th>
          <th>shipping city</th>
          <th>shipping area</th>
          <th>shipping cost</th>
        </tr>
      </thead>
      <tbody>
        {orderData &&
          orderData.map((item) => (
            <tr key={item.orderID}>
              <TableCell>{item.orderID}</TableCell>
              <TableCell
                onClickHandler={() =>
                  onEdit({
                    id: item.orderID,
                    cellname: "companyName",
                  })
                }
              >
                {inEditMode.status &&
                inEditMode.rowKey === item.orderID &&
                inEditMode.cellname === "companyName" ? (
                  <Input
                    name="companyName"
                    type="text"
                    maxLength="30"
                    value={item.companyName}
                    onChangeHandler={(event) =>
                      editcell({
                        id: item.orderID,
                        cellval: event.target.value,
                        cellname: event.target.name,
                      })
                    }
                    onKeyDownHandler={(event) =>
                      handleKeyDown({
                        id: item.orderID,
                        cellval: event.target.value,
                        key: event.key,
                      })
                    }
                  />
                ) : (
                  item.companyName
                )}
              </TableCell>
              <TableCell>{item.shipAddress}</TableCell>
              <TableCell>{item.shipCity}</TableCell>
              <TableCell>{item.shipRegion}</TableCell>
              <TableCell
                onClickHandler={() =>
                  onEdit({
                    id: item.orderID,
                    cellname: "freight",
                  })
                }
              >
                {" "}
                {inEditMode.status &&
                inEditMode.rowKey === item.orderID &&
                inEditMode.cellname === "freight" ? (
                  <Input
                    name="freight"
                    type="number"
                    min="1"
                    max="99"
                    value={item.freight}
                    onChangeHandler={(event) =>
                      editcell({
                        id: item.orderID,
                        cellval: event.target.value,
                        cellname: event.target.name,
                      })
                    }
                    onKeyDownHandler={(event) =>
                      handleKeyDown({
                        id: item.orderID,
                        cellval: event.target.value,
                        key: event.key,
                      })
                    }
                  />
                ) : (
                  item.freight.toFixed(configData.NUMBER_FORMAT)
                )}
              </TableCell>
            </tr>
          ))}
      </tbody>
    </table>
  );
};