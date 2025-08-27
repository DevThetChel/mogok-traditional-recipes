import { useNavigate } from "react-router-dom";
import WarmTofu from "../../src/assets/images/home/tofu.jpeg";
import Mixed from "../../src/assets/images/mixed.jpg";
import { PopularDishes } from "../components/PopularDishes";
import { SearchBar } from "../components/SearchBar";
import { useTranslation } from "react-i18next";

export default function Home() {
  function handleSearch(query) {
    console.log(query);
  }

  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <main>
      {/* Intro Section */}

      <section className="intro p-15 mt-30 ">
        <h1 className="text-[var(--TITLE-COLOR)] text-3xl md:text-4xl font-semibold md:ml-5  whitespace-nowrap">
          Mogoke Traditional Recipes
        </h1>
        <div className="description  flex flex-row py-5 md:px-5">
          <p className="mt-7 mb-7 w-[100%] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            asperiores sunt adipisci quasi ut quod Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ratione incidunt sit impedit rerum
            deleniti praesentium.
          </p>

          <figure className="w-full ml-20 mt-3 ">
            <img
              src={WarmTofu}
              alt=""
              className="object-contain rounded-full transition-transform rotate-[180deg]"
            />
          </figure>
        </div>
        <button
          onClick={() => navigate("/recipes")}
          className="shadow border-2 px-6 py-3 bg-[var(--BUTTON-BROWN)] rounded-2xl text-[var(--LIGHT-CREAM)] hover:text-white"
        >
          {t("home.desc.explore")}
        </button>
      </section>

      {/*   Search bar and Signature recipes*/}
      <section className="bg-[var(--LIGHT-CREAM)]">
        <SearchBar onSearch={handleSearch} />

        <div className="w-[70%] sm:w-[90%] md:w-[90%] lg:w-[85%] my-0 mx-auto min-h-[100vh]">
          <h2 className="text-[var(--TITLE-COLOR)] text-2xl ml-15 mt-10 ">
            {t("home.popular.subtitle")}
          </h2>
          <PopularDishes />
        </div>
      </section>
    </main>
  );
}
