import { useMemo } from "react";

const useDecBookObj = (book) => {
  const obj = useMemo(() => {
    if (book) {
      const access = book?.ebook_access;
      const link = book?.lending_identifier_s;
      const isbn = book?.isbn?.[0] || book?.bn || book?.isbn;
      const oclc = book?.oclc?.[0] || book?.oclc;
      const rating = Math.ceil(book?.ratings_average);
      const count = book[`ratings_count_${rating}`];
      const key = book?.key?.split("/works/")?.[1]
      const title = book?.title
      const author = book?.author_name?.length > 0 ? book?.author_name : ""
      const want_to_read_count = book?.want_to_read_count
      const publish_year = book?.first_publish_year
      const image = book?.cover_i

      return {
        rating,
        access,
        link,
        isbn,
        oclc,
        count,
        key,
        title,
        author,
        want_to_read_count,
        publish_year,
        image
      };
    }
  }, [book]);
  return obj;
};

export default useDecBookObj;
