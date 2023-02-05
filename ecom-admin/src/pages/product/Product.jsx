import { useSelector } from "react-redux";
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

import "./product.css";
import Chart from "../../components/chart/Chart"
import { userRequest } from "../../common/requests";

export default function Product() {
	const [productStats, setProductStats] = useState([])

	const location = useLocation()

	const productId = location.pathname?.split('/')?.[2]

	const product = useSelector(state =>
		state?.product?.products?.find(item => item._id === productId)
	)

	const MONTHS = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [])

	useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/order/stats?pid=' + productId)

        res.data.map((item) =>
					setProductStats(prev => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              'Sales': item.total
            }
          ])
        )
        console.log(res.data)
      }
      catch (err) {
        console.log(err.message)
      }
    }

    getStats()

  }, [MONTHS, productId])

  console.log(productStats)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productStats}
            dataKey="Sales"
            title="Sales Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
            src={product.img}
            alt={product.title}
            className="productInfoImg"
          />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id: </span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales: </span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In stock: </span>
              <span className="productInfoValue">{product.inStock ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} />
            <label>Product Description</label>
            <input type="text" placeholder={product.desc} />
            <label>Product Price</label>
            <input type="text" placeholder={product.price} />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                <label for="file">
                    <Publish/>
                </label>
                <input type="file" id="file" style={{display:"none"}} />
              </div>
              <button className="productButton">Update</button>
            </div>
        </form>
      </div>
    </div>
  );
}
