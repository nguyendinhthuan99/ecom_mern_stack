import "./featuredInfo.css";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { useEffect, useState } from "react";
import { userRequest } from "../../common/requests";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([])
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get('/order/stats')


        const [prevMonth, thisMonth] = res.data

        setIncome(res.data)

        setPercent(((prevMonth.total - thisMonth.total)/prevMonth.total * 100))
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getIncome()
  }, [])

  console.log(income)

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">This Month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income?.[0]?.total}</span>
          <span className="featuredMoneyRate">
            {percent}%
            { percent > 0 ? (<ArrowUpward className="featuredIcon"/>) : (<ArrowDownward className="featuredIcon negative"/>)}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Last Month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income?.[1]?.total}</span>
        </div>
      </div>
    </div>
  );
}
