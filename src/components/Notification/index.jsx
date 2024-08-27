import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
import { clearNotification } from "../../store/genericSlice";
import "./notification.css";

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
