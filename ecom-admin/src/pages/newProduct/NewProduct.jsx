import { useState } from "react"
import { useDispatch } from 'react-redux'

import upload from '../../common/firebase'
import { addProduct } from '../../redux/callApis'

import "./newProduct.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({})

  const [file, setFile] = useState(null)

  const [categories, setCategories] = useState([])

  const dispatch = useDispatch()

  const handleTyping = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCategories = (e) => {
    setCategories(e.target.value.split(','))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const img = await upload(file)

    console.log(img)

    const product = await {...inputs, categories, img}

    console.log(product)

    addProduct(product, dispatch)
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} required/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Name of T-Shirt" onChange={handleTyping} required/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="description" onChange={handleTyping} required/>
        </div>
        <div className="addProductItem">
          <label>Price ($)</label>
          <input name="price" type="number" placeholder="49" onChange={handleTyping} required/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name="categories" type="text" placeholder="men, anime, sport, etc..." onChange={handleCategories} required/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" required>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
