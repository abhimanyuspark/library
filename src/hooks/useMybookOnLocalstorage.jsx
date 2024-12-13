import { useCallback } from "react";

const useMybookOnLocalstorage = (book) => {
  const onSave = useCallback(() => {
    if (book) {
      try {
        const { rating, access, link, isbn, oclc, count, title, key, image } = book
        const obj = {
          rating,
          access,
          link,
          isbn,
          oclc,
          count,
          title,
          key,
          image
        }

        localStorage.setItem("userbook", JSON.stringify(obj));
      } catch (error) {
        console.error("Error saving book to local storage:", error);
      }
    }
  }, [book]);

  return onSave;
};

export default useMybookOnLocalstorage;
