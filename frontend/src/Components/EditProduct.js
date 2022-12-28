import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './ProductPage.css';
import axios from 'axios'

function EditProduct() {
    let location = useLocation();
console.log(location.state)
    const [data, setData] = useState({
        productName: location.state.name,
        productDescription: location.state.description,
        productPrice: location.state.price,
        productCategory: location.state.category
    })

    const [uploadImages, setUploadImages] = useState([])

    const navigate = useNavigate();
    const postData = (e) => {
        e.preventDefault();
        console.log(data);
        console.log(uploadImages);
        let formData = new FormData();
        formData.append('productName', data.productName)
        formData.append('productDescription', data.productDescription)
        formData.append('productPrice', data.productPrice)
        formData.append('productCategory', data.productCategory)

        Array.from(uploadImages).forEach((image) => {
            formData.append('items', image)
        })
        console.log(formData)

        axios.put(`http://localhost:8000/${location.state.id}`, formData)
            .then((result) => console.log(result))
            .catch((err) => console.log(err))
            .then(() => navigate('/'))

    }


    const saveData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const saveImages = (e) => {
        // console.log(e.target.files)
        setUploadImages(e.target.files)
    }

    return (

        <form onSubmit={(e) => { postData(e) }} id="dataPage">
            <div className="elements">
                <label htmlFor="productName">Product Name :-</label>
                <input type="text"
                    name="productName"
                    id="productName"
                    value={data.productName}
                    onChange={(e) => saveData(e)}
                    placeholder='  Product Name'
                    required />
            </div>

            <div className="elements">
                <label htmlFor="productDescription">Product Description :-</label>
                <input type="text"
                    name="productDescription"
                    id="productDescription"
                    value={data.productDescription}
                    onChange={(e) => saveData(e)}
                    placeholder='  Product Price'
                    required />
            </div>

            <div className="elements">
                <label htmlFor="productPrice">Product Price :-</label>
                <input type="text"
                    name="productPrice"
                    id="productPrice"
                    value={data.productPrice}
                    onChange={(e) => saveData(e)}
                    placeholder='  Product Price'
                    required />
            </div>

            <div className="elements">
                <label htmlFor="productCategory">Product Category :-</label>
                <input type="text"
                    name="productCategory"
                    id="productCategory"
                    value={data.productCategory}
                    onChange={(e) => saveData(e)}
                    placeholder='  Product Category'
                    required />
            </div>

            <div className="elements">
                <label htmlFor="uploadImage">Upload Images :-</label>
                <input type="file"
                    name="uploadImages"
                    id="uploadImages"
                    onChange={(e) => saveImages(e)}
                    multiple />
            </div>

            <div className="elements">
                <button type="submit">Submit</button>
            </div>
        </form>

    )
}

export default EditProduct