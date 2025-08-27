import { useState, useEffect } from "react";
import { db } from "../../firebase";

import { ref, get, child } from "firebase/database";

export default function getRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "recipes"));
        if (snapshot.exists()) {
          setRecipes(snapshot.val());
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { loading, recipes };
}
