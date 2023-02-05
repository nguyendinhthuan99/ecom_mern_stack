import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { userRequest } from "../../common/requests";
import { useEffect } from "react";

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest('/user/?sort=y')
        setUsers(res.data)
      }
      catch (err){
        console.log(err.message)
      }
    }
    getUsers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
          <li className="widgetSmListItem">
            <img
              src='imgs/no-avatar.png'
              alt=''
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">haha</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
          {users.map((user, index) => {
            return (
              <li className="widgetSmListItem" key={index}>
                <img
                  src={user.img}
                  alt=''
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
            )
          })}
      </ul>
    </div>
  );
}
