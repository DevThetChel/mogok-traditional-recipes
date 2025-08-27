import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const SearchBar = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    console.log(searchItem);
    onSearch(searchItem);
    setSearchItem("");
  }

  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSearch}
      action=""
      className="flex relative w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto"
    >
      <FontAwesomeIcon
        className="absolute top-[41px] left-5 z-2"
        icon={faSearch}
      />
      <input
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        type="text"
        placeholder={t("search.placeholder")}
        className="block w-full mt-7 bg-[var(--BG-BEIGE)] px-12 py-2 rounded-2xl mx-[auto] my-0 shadow-lg"
      />
    </form>
  );
};
