import { useNavigate } from "react-router-dom";
import WarmTofu from "../../src/assets/images/home/tofu.jpeg";
import Logo from "../../src/assets/images/home/Logo.jpg";

import { PopularDishes } from "../components/PopularDishes";
import { SearchBar } from "../components/SearchBar";
import { useTranslation } from "react-i18next";

export default function Home() {
  // function handleSearch(query) {
  //   console.log(query);
  // }

  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <main>
      {/* Intro Section */}

      <section className="intro w-[99%] md:w-full lg:w-[80%] xl:w-[75%] mx-auto px-10 p-15 mt-20 md:mt-30 ">
        <h1 className="text-[var(--TITLE-COLOR)] text-[1.5rem]  sm:text-4xl md:ml-5 mb-5 font-semibold sm:mb-6   whitespace-nowrap">
          Thandar Aung's Little Kitchen
        </h1>
        <h2 className="text-[var(--TITLE-COLOR)] text-[1.1rem] sm:text-2xl md:ml-5 mb-5 sm:mb-6 md:mb-0  font-semibold whitespace-nowrap">
          {t("home.introTitle")}
        </h2>

        <div className="description gap-10 flex flex-col md:flex-row py-5 md:pl-5 md:items-start">
          <p
            className="sm:mt-6 lg:mt-9 mb-7 w-[100%] order-2 md:order-1 md:w-[50%] xl:w-[45%]
    text-[1rem] leading-7"
          >
            {t("home.desc.introText")}
          </p>
          <figure className="order-1 md:order-2 flex justify-center">
            <img
              src={Logo}
              alt="Thandar Aung's Little Kitchen Logo"
              className="w-[250px] sm:w-[300px] object-contain rounded-full"
            />
          </figure>
        </div>
        <button
          onClick={() => navigate("/recipes")}
          className=" md:ml-5  shadow border-2 px-4 py-2 md:px-6 md:py-3  bg-[var(--BUTTON-BROWN)] rounded-2xl text-[var(--LIGHT-CREAM)] hover:text-white"
        >
          {t("home.desc.explore")}
        </button>
      </section>

      {/*   Search bar and Signature recipes*/}
      <section className="bg-[var(--LIGHT-CREAM)]">
        <SearchBar />

        <div className="w-[87%] sm:w-[90%] md:w-[90%] lg:w-[85%] my-0 mx-auto min-h-[100vh]">
          <h2 className="text-[var(--TITLE-COLOR)] text-2xl text-center mt-10 ">
            {t("home.popular.subtitle")}
          </h2>
          <PopularDishes />
        </div>
      </section>
    </main>
  );
}
