import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecipeCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <SkeletonTheme baseColor="#FDE7BB" highlightColor="#999" key={index}>
        <div className="cursor-pointer rounded-lg shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 bg-[#fdf2e9]">
          {/* Skeleton for Image */}
          <Skeleton height={192} />

          <div className="p-4">
            {/* Skeleton for Title (Label) */}
            <Skeleton width={360} height={24} className="mb-2" />

            {/* Skeleton for Ingredients List */}
            <ul className="text-gray-600 text-sm space-y-1">
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <Skeleton width="95%" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SkeletonTheme>
    ));
};

export default RecipeCardSkeleton;
