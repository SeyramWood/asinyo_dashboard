import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import axios from "axios";

const RecentSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/data")
      .then((res) => {
        setProducts((p) => (p = [...res.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const header = (
    <div className="table-header">
      Products
      <Button icon="pi pi-refresh" />
    </div>
  );
  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;

  return (
    <DataTable
      value={products}
      sortMode="multiple"
      paginator
      rows={5}
      responsiveLayout="scroll"
      height='inherit'
    >
      <Column field="image" header="Image" body={imageBodyTemplate}></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column
        field="price"
        header="Price"
        body={priceBodyTemplate}
        sortable
      ></Column>
      <Column header="Status" body={statusBodyTemplate}></Column>
    </DataTable>
  );
};

export default RecentSale;
