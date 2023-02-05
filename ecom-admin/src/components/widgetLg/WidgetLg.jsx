import { useEffect, useState } from "react";
import { userRequest } from "../../common/requests";

import "./widgetLg.css";

export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest('/order/?sort=y')
        setOrders(res.data)
      }
      catch (err){
        console.log(err.message)
      }
    }
    getOrders()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order, index) => {
          return (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{(new Date(order.createdAt)).toLocaleString()}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}
