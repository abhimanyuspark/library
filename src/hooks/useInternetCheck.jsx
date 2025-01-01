import { useEffect, useState } from "react";

const useInternetCheck = () => {
  const [isOnline, set_isOnline] = useState(true);

  useEffect(() => {
    set_isOnline(navigator.onLine === true);
  }, []);

  return isOnline;
};

export default useInternetCheck;
