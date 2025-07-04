import { KY } from "@/lib/constants/routes";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useQuery";

const lastNotificationAtom = atomWithStorage("last-notification", "");
lastNotificationAtom.debugLabel = "last-user-notification";

export const useUserNotification = () => {
  const [notifying, setNotifying] = useState(false);
  const [latestDate, setLatest] = useAtom(lastNotificationAtom);
  const [count, setCount] = useState<number | null>(null);
  const { data: unseenNotifications } = useFetch(
    [KY.notification, latestDate],
    `${KY.notification}`,
    { after: latestDate },
    10000,
  );

  const { data: allNotifications } = useFetch(
    [KY.notification],
    `${KY.notification}`,
    {},
    100000,
  );

  const oldNotifications = allNotifications?.body
    ?.filter(
      (notice: any) =>
        !unseenNotifications?.body?.some(
          (latestNotice: any) => latestNotice._id === notice._id,
        ),
    )
    ?.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  useEffect(() => {
    if (unseenNotifications?.body?.length > 0) {
      console.log("latest", unseenNotifications);
      setNotifying(true);
      setCount(unseenNotifications?.count);
    }
  }, [unseenNotifications]);

  return {
    oldNotifications,
    unseenNotifications,
    setNotifying,
    setLatest,
    count,
    notifying
  };
};
