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
import CreateQuiz from "../pages/CreateQuiz";
import TropicalLevel from "../Levels/TropicalLevel";
import LavaLevel from "../Levels/LavaLevel";
import BalloonGame from "../pages/BalloonGame";
import LetterLinesPage from "../pages/LetterLinesPage";
import Speech from "../pages/Speech";
import ChooseGame from "../pages/ChooseGame";
import SpeechRecognitionComponent from "../pages/SpeechRecognitionComponent";
import Contents from "../HomePageLogin/Contents";
import Wewe from "../pages/wewe";
import DragGame from "../pages/DragGame";

import WordFind from "../pages/WordFind";

const pages = [
  {
    path: "/",
    element: <Me />,
  },
  {
    path: "/wordfind",
    element: <WordFind />,
  },
  {
    path: "/draggame",
    element: <DragGame />,
  },
  {
    path: "/speech",
    element: <Speech />,
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
    path: "/balloongame",
    element: <BalloonGame />,
  },
  {
    path: "/letterlinespage",
    element: <LetterLinesPage />,
  },
  {
    path: "/signupuser",
    element: <Signupuser />,
  },
  {
    path: "/speechrecognitioncomponent",
    element: <SpeechRecognitionComponent />,
  },
  {
  path: "/wewe",
  element: <Wewe />,
  },
  {
    path: "/choosegame",
    element: <ChooseGame />,
  },
  {
    path: "/studentprofile",
    element: <StudentProfile />,
  },

  {
    path: "/createquiz",
    element: <CreateQuiz />,
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
  {
    path: "tropicallevel",
    element: <TropicalLevel />,
  },
  {
    path: "lavalevel",
    element: <LavaLevel />,
  },
  {
    path: "contents",
    element: <Contents />
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
