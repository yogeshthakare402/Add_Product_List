import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPage.css';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router';



function ProductInTable() {

    const [productData, setProductData] = useState([]);
    const [images, setImages] = useState([]);
    const [showImage, setShowImage] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then((res) => { setProductData(res.data.product) })
    }, [])


    const editData = (id) => {
        console.log(id)
        axios.put(`http://localhost:8000/:${id}`, {})

    }
    const deleteData = (id) => {
        console.log(id)

        axios.delete(`http://localhost:8000/:${id}`)
            .then(() => console.log("Data is deleted"))

        axios.get('http://localhost:8000/')
            .then((res) => { setProductData(res.data.product) })

    }

    const showImages = (id) => {
        productData.filter((product) => {
            if (product._id === id) {
                console.log(product.uploadImages)
                setImages(product.uploadImages)
            }
        })
        setShowImage(true)
    }

    return (
        <div id='productTable'>
            <button onClick={() => navigate('/addProduct')}>Add Product</button>

            <div>
                {!showImage &&
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Product Price</th>
                                <th>Product Category</th>
                                <th>Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.map((data, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{data.productName}</td>
                                    <td>{data.productDescription}</td>
                                    <td>{data.productPrice}</td>
                                    <td onClick={() => console.log(data.uploadImages)}>{data.productCategory}</td>
                                    <td onClick={() => { showImages(data._id) }}>Show Images</td>
                                    <td onClick={() => { editData(data._id) }}><FaEdit /></td>
                                    <td onClick={() => { deleteData(data._id) }}><AiFillDelete /></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                }

                {showImage && <div >
                    <div className='images'>
                        {images.map((image, i) => {
                            return <img src={"http://localhost:8000/" + image.path} alt={image.originalname} key={i} className='fetchedimg' />
                        })}
                    </div>
                    <div onClick={() => { setShowImage(false) }} id='cancel'>X</div>
                </div>
                }

            </div>

        </div>
    )
}

export default ProductInTable