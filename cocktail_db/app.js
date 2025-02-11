import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//app.set("view engine", "ejs"); -//this allowas you to render ejs files without adding the .ejs extension






app.get("/", async (req, res) => {
    try {
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
  
      // ✅ Accessing the correct API response structure
      const cocktail = response.data.drinks[0];
  
      // ✅ Extract data properly
      const cocktailData = {
        name: cocktail.strDrink,
        image: cocktail.strDrinkThumb,
        isAlcoholic: cocktail.strAlcoholic,
        glassType: cocktail.strGlass,
        instructions: cocktail.strInstructions,
        category: cocktail.strCategory,
        ingredients: [
          cocktail.strIngredient1,
          cocktail.strIngredient2,
          cocktail.strIngredient3,
        ].filter(Boolean), // Remove null values
        measures: [
          cocktail.strMeasure1,
          cocktail.strMeasure2,
          cocktail.strMeasure3,
        ].filter(Boolean),
      };
  
      console.log(cocktailData);
  
      res.render("home.ejs", { cocktail: cocktailData });
    } catch (error) {
      console.error(error.message);
      res.send("Error fetching data.");
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

/*
   -what we want to do is to make a request to the cocktail db api
   - we will get a random cocktail and display it with the image and recipe
   -we will make the request with axios
   -we will add features like searching and filtering
   -we will work on the display too(css,bootstrap,etc)
 */
