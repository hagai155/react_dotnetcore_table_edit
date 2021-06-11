import React, { useState, useEffect } from "react";
import { SumTable } from "../components/SumTable.js";
import { MainTable } from "../components/MainTable.js";
import { GetAllOrders } from "../services/OrderService.js";

function Home() {
  const [orderData, setorderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCalcInfo, setorderCalcInfo] = useState({
    totalOrders: 0,
    totalShip: 0,
    avgShip: 0,
  });

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
    cellname: null,
  });

  useEffect(() => {
    setIsLoading(true);

    GetAllOrders()
      .then((res) => {
        if (!res) {
          return;
        }

        setorderData(res.data);
        setorderCalcInfo({
          totalOrders: res.totalOrders,
          totalShip: res.totalShip,
          avgShip: res.avgShip,
        });
      })
      .then(function () {
        setIsLoading(false);
      });
  }, []);

  const onEdit = ({ id, cellname }) => {
    setInEditMode({
      status: true,
      rowKey: id,
      cellname: cellname,
    });
  };

  const editcell = (event_values) => {
    setorderData(
      orderData.map((item) => {
        if (item.orderID === event_values.id) {
          if (event_values.cellname === "companyName") {
            return { ...item, companyName: event_values.cellval };
          } else if (event_values.cellname === "freight") {
            return { ...item, freight: Number(event_values.cellval) };
          }
          return item;
        } else {
          return item;
        }
      })
    );
  };

  const handleKeyDown = (event_values) => {
    if (event_values.key === "Enter") {
      setInEditMode({
        status: false,
        rowKey: null,
        cellname: null,
      });

      //calc sum table
      let temparr = [...orderData];
      //console.log(temparr);
      let sum_of_freight = temparr.reduce((n, { freight }) => n + freight, 0);

      setorderCalcInfo({
        totalOrders: temparr.length,
        totalShip: sum_of_freight,
        avgShip: sum_of_freight / temparr.length,
      });
    }
  };

  return (
    <main>
      <h1>React orders table edit</h1>
      {isLoading && "loading data..."}
      <div className="row">
        <div className="column1">
          <MainTable
            orderData={orderData}
            onEdit={onEdit}
            inEditMode={inEditMode}
            editcell={editcell}
            handleKeyDown={handleKeyDown}
          />
        </div>
        <div className="column2">
          <SumTable
            totalOrders={orderCalcInfo.totalOrders}
            totalShip={orderCalcInfo.totalShip}
            oavgShip={orderCalcInfo.avgShip}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
