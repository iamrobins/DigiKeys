import React, { useEffect, useState } from "react";
import "./styles.components/AddProduct.css";
import {useSelector} from "react-redux";
import axios from "axios";
import firebase from "firebase";

const AddProduct = ({setSelect}) => {
  const [addProductResponse, setAddProductResponse] = useState(false);
  const [updateStockResponse, setUpdateStockResponse] = useState(false);
  const [product, setProduct] = useState({});
  const authLogin = useSelector(state => state.authLogin);
  const {userInfo} = authLogin;

  //Related to add product
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState({});
  const [category, setCategory] = useState("games");
  const [price, setPrice] = useState(1);
  const [description, setDescription] = useState("");
  const [warning, setWarning] = useState("");

  //Related to addKeys
  const [stockCount, setStockCount] = useState(1);

  useEffect(()=> {
    if(updateStockResponse) {
      setSelect("Products View");
    }
  }, [updateStockResponse, setSelect]);

  const uploadImageToStorage = async () => {
    let uploadedImgLink = "";

    //uploading file
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(`/uploads/products/${image.name}`);

    await fileRef.put(image);
    uploadedImgLink = await fileRef.getDownloadURL();

    return uploadedImgLink;
  }

  const createProductHandler = async (e) => {
    e.preventDefault();
    if(warning) {
      return;
    }
    const productDetails = {};
    productDetails.image = await uploadImageToStorage();
    productDetails.seller = userInfo._id;
    productDetails.name = productName;
    productDetails.category = category;
    productDetails.description = description;
    productDetails.price = price;
    
    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${userInfo.token}`,
          "Content-Type": "application/json"
        }
      }
      const {data} = await axios.post("api/products/create", productDetails, config);
      setProduct(data);
      setAddProductResponse(true);
      setProductName("");
      setImage({});
      setCategory("");
      setPrice(1);
      setDescription("");
    }catch(error) {
      setAddProductResponse(false);
    }
  }

  const addStockHandler = async(e) => {
    e.preventDefault();
    let stockKeys = e.target.getElementsByClassName("stock-key");
    stockKeys = Array.from(stockKeys).map(i=> ({key: i.value}) );
    console.log(stockKeys);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }; 
      await axios.put("api/products/updateKeys", {productId: product._id, serialKeys: stockKeys}, config);
      setUpdateStockResponse(true);
    }catch(error) {
      setUpdateStockResponse(false);
    }
  }

  const imageValidation = (e) => {
    if(e.target.files[0].type.split("/")[0] === "image") {
      if(e.target.files[0].size > 2 * 1024 * 1024) {
        setImage({});
        setAddProductResponse(false);
        setWarning("Please upload an image less than 2MB");
      } else {
        setWarning("");
        setImage(e.target.files[0]);
      }
    } else {
      setImage({});
      setAddProductResponse(false);
      setWarning("Please upload a valid image file");
    }
  }

  return (
    <>
      <div id="addproduct">
        <h1>Add Product</h1>
        <div className="addproduct-forms">
          <div className="addproduct-form__first">
            <form onSubmit={createProductHandler} encType="multipart/form-data">
              <h2>Product Details</h2>
              {warning && <small style={{color: "#9e9900"}}>{warning}</small>}
              <label htmlFor="name">Name</label>
              <input className="form-input" placeholder="Product Name" type="text" required minLength="3" value={productName} onChange={e => setProductName(e.target.value)}/>

              <label htmlFor="Image">Image</label>
              <input className="form-input" type="file" name="file" required onChange={imageValidation}></input>

              <label htmlFor="category">Category</label>
              <select name="category" value={category} onChange={e => setCategory(e.target.value)}> 
                <option value="games" defaultValue>Games</option>
                <option value="softwares">Softwares</option>
              </select>

              <label htmlFor="price">Price</label>
              <input className="form-input" type="number" required value={price} onChange={e => setPrice(e.target.value)}/>

              <label htmlFor="description">Description</label>
              <input className="form-input" type="text" required maxLength="200" value={description} onChange={e => setDescription(e.target.value)}/>

              <button type="submit" className="btn-l">Add Product</button>
            </form>
          </div>
          {addProductResponse && <div className="addproduct-form__second">
          <form onSubmit={addStockHandler}>
            <h2>Create Stock Fields</h2>
            <input className="form-input" placeholder="Stock Count" type="number" required maxLength="20" value={stockCount} onChange={e => Number(e.target.value) > 25 ? setStockCount(1) : setStockCount(Number(e.target.value)) }/>
            <h3>Add Serial Keys</h3>
            {stockCount > 0 &&
              [...Array(stockCount).keys()].map((q) => (
                <div key={q+1}>
                  <label htmlFor="name">{q+1} </label>
                  <input className="form-input stock-key" placeholder="key" type="text" required maxLength="30" />
                </div>
              ))
            }
            <button type="submit" className="btn-l">Add Stock</button>
          </form>
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default AddProduct;