import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="cursor-pointer  rounded-lg shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 bg-[#fdf2e9]">
      <LazyLoadImage
        effect="blur"
        className="w-full h-48 object-cover"
        src={recipe.image}
        alt={recipe.label}
        width="100%"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {recipe.label}
        </h3>

        <ul className="text-gray-600 text-sm space-y-1">
          {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
