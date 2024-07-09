/* eslint-disable */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import styled from "styled-components";

import { useState } from "react";

import { nanoid } from "nanoid";

import Fuse from "fuse.js";

import IconButton from "./components/IconButton.jsx";

/* ARRAY BAŞLIYOR  */

const shops = [
  {
    id: 1,
    name: "Migros",
  },
  {
    id: 2,
    name: "BİM",
  },
  {
    id: 3,
    name: "ŞOK",
  },
  {
    id: 4,
    name: "A101",
  },
];

const categories = [
  {
    id: 1,
    name: "Elektronik",
  },
  {
    id: 2,
    name: "Dekorasyon",
  },
  {
    id: 3,
    name: "Fırın",
  },
  {
    id: 4,
    name: "Bakliyat",
  },
];
/* ARRAY SON */

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 12px;
`;

function App() {
  const [products, setProducts] = useState([]);
  const [productName, SetProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState(shops[0].id);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [filterShop, setFilterShop] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterIsBought, setFilterIsBought] = useState("all");
  const [filterProductName, setFilterProductName] = useState("");

  const filteredProducts = products.filter((product) => {
    let result = true;

    let myProductBought = product.isBought;

    if (filterIsBought === true) {
      result = result && myProductBought === true;
    }
    if (filterIsBought === false) {
      result = result && myProductBought !== true;
    }

    if (filterProductName !== "") {
      const fuse = new Fuse(products, { keys: ["name"] });
      const isIncluded = fuse
        .search(filterProductName)
        .find((p) => p.item.id === product.id);
      result = result && !!isIncluded;
    }

    if (filterShop !== "all") {
      result = result && product.shop == filterShop;
    }

    if (filterCategory !== "all") {
      result = result && product.category == filterCategory;
    }

    return result;
  });

  return (
    <>
      <Container className="py-4">
        <h2>Ürün Ekle</h2>
        <Form>
          <ContentWrapper>
            <Form.Control
              placeholder="Ürünü Giriniz"
              onChange={(e) => {
                SetProductName(e.target.value);
              }}
            />
            {/* Marketleri listeleyen form select */}
            <Form.Select
              onChange={(e) => {
                setSelectedShop(e.target.value);
              }}
              value={selectedShop}
              aria-label="Market"
            >
              {shops.map((shop) => (
                <option value={shop.id} key={shop.id}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>
            {/* Kategorileri listeleyen form select */}
            <Form.Select
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              value={selectedCategory}
              aria-label="Kategori"
            >
              {categories.map((categorie) => (
                <option value={categorie.id} key={categorie.id}>
                  {categorie.name}
                </option>
              ))}
            </Form.Select>
            {/* Form'u  submit eden button */}
            <Button
              onClick={() => {
                const product = {
                  name: productName,
                  category: selectedCategory,
                  shop: selectedShop,
                  id: nanoid(),
                  isBought: false,
                };
                setProducts([...products, product]);
              }}
              variant="primary"
            >
              Ekle
            </Button>
          </ContentWrapper>
        </Form>
        <div className="py-4">
          <h2>Ürün Filtreleme</h2>
          <Form>
            {/*Form elemanlarını tuttuğumuz kısım */}
            <ContentWrapper>
              <div className="d-flex align-items-center">
                <Form.Check
                  className="d-flex py-2 gap-2"
                  type={"radio"}
                  id={"default-radio1"}
                  label={"Tümünü Listele"}
                  name="isbought"
                  checked={filterIsBought === "all"}
                  onChange={() => {
                    setFilterIsBought("all");
                  }}
                />
                <Form.Check
                  className="d-flex align-items-start py-2 gap-2"
                  type={"radio"}
                  id={"default-radio2"}
                  label={"Satın Alınanlar"}
                  name="isbought"
                  checked={filterIsBought === true}
                  onChange={() => {
                    setFilterIsBought(true);
                  }}
                />
                <Form.Check
                  className="d-flex align-items-startpy-2 gap-2"
                  type={"radio"}
                  id={"default-radio3"}
                  label={"Satın Alınmayanlar"}
                  name="isbought"
                  checked={filterIsBought === false}
                  onChange={() => {
                    setFilterIsBought(false);
                  }}
                />
              </div>
              {/* Girilen ürünü takip eden form control */}
              <Form.Control
                style={{ width: "300px" }}
                placeholder="Ürünü Ara"
                onChange={(e) => {
                  setFilterProductName(e.target.value);
                }}
              />
              {/* Marketleri listeleyen form select */}
              <Form.Select
                style={{ width: "300px" }}
                onChange={(e) => {
                  setFilterShop(e.target.value);
                }}
                value={filterShop}
                aria-label="Market"
              >
                <option value={"all"}>Tüm Marketler</option>
                {shops.map((shop) => (
                  <option value={shop.id} key={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </Form.Select>
              {/* Kategorileri listeleyen form select */}
              <Form.Select
                style={{ width: "300px" }}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                }}
                value={filterCategory}
                aria-label="Kategori"
              >
                <option value={"all"}>Tüm Kategoriler</option>
                {categories.map((categorie) => (
                  <option value={categorie.id} key={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </Form.Select>
            </ContentWrapper>
          </Form>
        </div>
        {/* Tablo ve products content */}
        <div className="py-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ürün İsmi</th>
                <th>Ürün Marketi</th>
                <th>Ürün Kategori</th>
                <th>Ürün Sil</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  style={{
                    textDecoration: product.isBought ? "line-through" : "unset",
                  }}
                  onClick={() => {
                    let copyProducts = [...products];
                    copyProducts = copyProducts.map((copyProduct) => {
                      if (copyProduct.id === product.id) {
                        copyProduct.isBought = !copyProduct.isBought;
                      }
                      return copyProduct;
                    });
                    // Eğer Hepsi Satın Alındıysa Alert! 
                    if (
                      copyProducts.every((product) => product.isBought === true)
                    ) {
                      alert("Alışveriş Tamamlandı!");
                    }
                    setProducts(copyProducts);
                  }}
                  key={product.id}
                >
                  <td>{product.name}</td>
                  <td>{shops.find((shop) => shop.id == product.shop)?.name}</td>
                  <td>
                    {
                      categories.find(
                        (category) => category.id == product.category
                      )?.name
                    }
                  </td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      const filteredProducts = products.filter(
                        (currentProduct) => currentProduct.id !== product.id
                      );
                      setProducts(filteredProducts);
                    }}
                  >
                    <IconButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default App;
