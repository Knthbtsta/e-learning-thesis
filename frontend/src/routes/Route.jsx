import { createBrowserRouter, Outlet } from "react-router-dom";
import React from "react";
import Me from "../pages/Me";
import Error404 from "../components/Error404";
import Login from "../pages/Login";
import Reading from "../pages/Reading";
import Activities from "../pages/Activities";
import Audio from "../pages/Audio";
import Phonics from "../pages/Phonics";
import User from "../pages/User";
import Signupuser from "../pages/Signupuser";
import Temporary from "../database/Temporary";
import EasyShorta from "../easypage/EasyShorta";
import EasyLonga from "../easypage/EasyLonga";
import AddNewStudent from "../pages/AddNewStudent";
import SignupAdmin from "../pages/SignupAdmin";
import ActivityContents from "../pages/ActivityContents";
import About from "../components/About";
import LevelMap from "../pages/LevelMap";
import RoadmapLevel from "../pages/RoadmapLevel";
import Tropical from "../Stages/Tropical";
import Ice from "../Stages/Ice";
import Lava from "../Stages/Lava";
import Space from "../Stages/Space";
import IceLevel from "../Levels/IceLevel";
import StudentProfile from "../pages/StudentProfile";
import Act from "../pages/Act";

const pages = [
  {
    path: "/",
    element: <Me />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "signupadmin",
    element: <SignupAdmin />,
  },
  {
    path: "/signupuser",
    element: <Signupuser />,
  },
  {
    path: "/studentprofile",
    element: <StudentProfile />,
  },
  {
    path: "/act",
    element: <Act />,
  },
  {
    path: "/reading",
    element: <Reading />,
  },
  {
    path: "phonics",
    element: <Phonics />,
  },
  {
    path: "easyshorta",
    element: <EasyShorta />,
  },
  {
    path: "easylonga",
    element: <EasyLonga />,
  },

  {
    path: "audio",
    element: <Audio />,
  },
  {
    path: "activities",
    element: <Activities />,
  },
  {
    path: "/temporary",
    element: <Temporary />,
  },
  {
    path: "/addnewstudent",
    element: <AddNewStudent />,
  },

  {
    path: "activitycontents",
    element: <ActivityContents />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "levelmap",
    element: <LevelMap />,
  },
  {
    path: "roadmaplevel",
    element: <RoadmapLevel />,
  },
  {
    path: "tropical",
    element: <Tropical />,
  },
  {
    path: "ice",
    element: <Ice />,
  },
  {
    path: "lava",
    element: <Lava />,
  },
  {
    path: "space",
    element: <Space />,
  },
  {
    path: "icelevel",
    element: <IceLevel />,
  },
];

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error404 />,
    children: pages,
  },
]);

export default Route;
