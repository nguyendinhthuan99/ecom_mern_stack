import { useEffect, useMemo, useState } from "react";

import "./home.css";
import Chart from "../../components/chart/Chart";
import { userRequest } from "../../common/requests";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

export default function Home() {
  const [usersStats, setUsersStats] = useState([])
  const MONTHS = useMemo(() =>
    [
     'Jan',
     'Feb',
     'Mar',
     'Apr',
     'May',
     'Jun',
     'Jul',
     'Aug',
     'Sep',
     'Oct',
     'Nov',
     'Dec'
    ],
    []
  )

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/user/stats')
        console.log(res)
        res.data.map((item) =>
          setUsersStats(prev => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              'Active User': item.total
            }
          ])
        )
      }
      catch (err) {
        console.log(err.message)
      }
    }

    getStats()
  }, [MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={usersStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
