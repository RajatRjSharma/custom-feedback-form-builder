import { useEffect } from "react";
import "./notification.css";
import NotificationItem from "./NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../store/genericSlice";

export const Notification = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.generic);

  useEffect(() => {
    if (notification?.active)
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
  }, [notification, dispatch]);

  return (
    <div className="notifications-container">
      {notification?.active && (
        <NotificationItem
          message={notification.message}
          type={notification.type}
          onClose={() => {
            dispatch(clearNotification());
          }}
        />
      )}
    </div>
  );
};

export default Notification;
