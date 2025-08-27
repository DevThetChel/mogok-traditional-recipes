import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavLayout from "./Layouts/NavLayout";
import "../src/css/Home.css";
import { Recipes } from "./pages/Recipes";
import { Favorites } from "./pages/Favorites";
import { Contact } from "./pages/Contact";
import { CookLater } from "./pages/CookLater";
import { LanguageContextProvider } from "./contexts/LanguageContext";
import i18n from "./utils/i18n";
import { RecipeDetails } from "./pages/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <LanguageContextProvider>
        <Routes>
          <Route path="/" element={<NavLayout />}>
            <Route index element={<Home />} />

            <Route path="/recipes" element={<Recipes />} />

            <Route path="recipes/:id" element={<RecipeDetails />} />

            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cook-later" element={<CookLater />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </LanguageContextProvider>
    </BrowserRouter>
  );
}

export default App;
