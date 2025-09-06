import { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function FavRecipeCard({ recipe }) {
  const { id, preparation, image_url, name } = recipe;

  const { language } = useContext(LanguageContext);

  const navigate = useNavigate();
  const eng = language === "en";
  return (
    <div
      className="flex gap-5 p-8 bg-[var(--BG-BEIGE)] rounded-2xl hover:cursor-pointer"
      onClick={() => navigate(`/recipes/${id}`)}
    >
      <figure className="w-[28%] h-[100px] flex items-center justify-center rounded-xl">
        <img
          src={image_url}
          className="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </figure>

      <section className="w-[70%] pt-2">
        <p className="text-[1.1rem] font-semibold">{eng ? name.en : name.mm}</p>
        <p className="mt-3 line-clamp-2 leading-7">
          {eng ? preparation.en : preparation.mm}
        </p>
      </section>
    </div>
  );
}
