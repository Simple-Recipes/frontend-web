import TagsManager from "../SearchRecipes/components/TagsManager";
import Home1 from "./components/Home1";
import Home2 from "./components/Home2";
import PopularRecipes from "./components/PopularRecipes";

export const HomePage = () => {
  return (
    <>
      <div>
        <Home1 />
        <Home2 />
        <PopularRecipes/>
        
        {/* <TagsManager /> */}
      </div>
    </>
  );
};
