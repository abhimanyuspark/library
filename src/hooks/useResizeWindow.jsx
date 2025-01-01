import { useEffect, useState } from 'react'

const useResizeWindow = () => {
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  
    // Function to determine items per page based on screen width
    function getItemsPerPage() {
      if (window.innerWidth <= 480) {
        return 1; // Mobile
      } else if (window.innerWidth <= 768) {
        return 2; // Tablet (e.g., iPad)
      } else {
        return 5; // Desktop
      }
    }
  
    // Update `itemsPerPage` on window resize
    useEffect(() => {
      const handleResize = () => setItemsPerPage(getItemsPerPage());
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return itemsPerPage;
}

export default useResizeWindow
