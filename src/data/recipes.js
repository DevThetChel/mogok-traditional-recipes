import { useState, useEffect } from "react";
import { db } from "../../firebase";

import { ref, get, child } from "firebase/database";

export default function getRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "recipes"));
        if (snapshot.exists()) {
          setRecipes(snapshot.val());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return recipes;
}
