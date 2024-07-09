import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { Footer } from "./components/Footer";
import NewRecipe from "./pages/NewRecipe/NewRecipe";
import RecipeDetails from "./pages/RecipePage/RecipeDetails";
import Login from "./pages/Login/Login";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/assets/style/theme"; // Ensure the custom theme is imported
import CssBaseline from "@mui/material/CssBaseline";
import { SearchPage } from "./pages/SearchRecipes/SearchPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditRecipe from "./pages/RecipePage/EditRecipe";
import Navbar from "./components/Navbar";
import Register from "./pages/Login/Register";
import RequestPasswordReset from "./pages/Login/RequestPasswordReset";
import ResetPassword from "./pages/Login/ResetPassword";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/publish" component={NewRecipe} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/recipes/edit/:id" component={EditRecipe} />
            <Route path="/recipes/:id" component={RecipeDetails} />
            <Route path="/request-password-reset" component={RequestPasswordReset} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
