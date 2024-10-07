import AllRecipes from "../RecipePage/AllRecipes";
import SearchRecipes from "./components/SearchRecipes";
import TagsManager from "./components/TagsManager";


export const SearchPage = () => {
  return (
    <>
      <div>
        <SearchRecipes/>
        {/* <TagsManager/> */}
        <AllRecipes/>
        {/* 明天讨论这个思路 */}
        
      </div>
    </>
  );
};
