//import React from 'react'
import { Navigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/require-auth";
import "./Pages/styles/styles.css";

//---------------- Menus ---------------------//
import Nav from "./Pages/menus/nav";
import Menu_sidebar from "./Pages/menus/Menu_sidebar";
import Home from "./Pages/Home";
import Footer from "./Pages/Footer";
import Icone from "./Pages/Icone";

//---------------- User ---------------------//
import Login from "./Pages/User/Login";
import Logout from "./Pages/User/Logout";
import Profile from "./Pages/User/Profile";
import Register from "./Pages/User/Register";
import Forgot from "./Pages/User/Forgot";
import Boutiques from "./Pages/User/Boutiques";
import Boutique_Add from "./Pages/User/Boutique_Add";
import Boutique_Edit from "./Pages/User/Boutique_Edit";
import DraggableTest from "./Pages/User/DraggableTest";


function App() {
  return (
    <>
      <Nav />
      <div id="main">
        <article>
          <section id="right">
            <Routes>
              <Route exact path="/" element={<RequireAuth child={Home} auth={true} />} />
              <Route exact path="/Icone" element={<RequireAuth child={Icone} auth={false} />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Login/:Validate" element={<Login />} />
              <Route exact path="/Logout" element={<Logout />} />
              <Route exact path="/Profile" element={<RequireAuth child={Profile} auth={true} />} />
              <Route exact path="/Register" element={<Register />} />
              <Route exact path="/Forgot" element={<Forgot />} />
              <Route exact path="/Boutiques" element={<Boutiques />} />
              <Route exact path="/Boutique_Add" element={<RequireAuth child={Boutique_Add} auth={true} />} />
              <Route exact path="/Boutique_Edit/:id" element={<RequireAuth child={Boutique_Edit} auth={true} />} />

              <Route exact path="/DraggableTest/:id" element={<DraggableTest />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </section>
        </article>
        <Menu_sidebar />
      </div>
      <Footer />
    </>
  );
}

export default App;
