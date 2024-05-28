import { createBrowserRouter, Outlet } from "react-router-dom";
import React from "react";
import Me from "../pages/Me";
import Error404 from "../components/Error404";
import Login from "../pages/Login";
import Reading from "../pages/Reading";
import Activities from "../pages/Activities";
import Audio from "../pages/Audio";
import Phonics from "../pages/Phonics";
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
import StudentProfile from "../pages/StudentProfile";
import Act from "../pages/Act";
import CreateQuiz from "../pages/CreateQuiz";
import BalloonGame from "../pages/BalloonGame";
import Speech from "../pages/Speech";
import ChooseGame from "../pages/ChooseGame";
import SpeechRecognitionComponent from "../pages/SpeechRecognitionComponent";
import Contents from "../HomePageLogin/Contents";
import DragGame from "../pages/DragGame";
import Profile from "../pages/Profile";
import WordFind from "../pages/WordFind";
import Error from "../pages/Error";
import Verification from "../pages/Verification";
import EmailVerificationSuccess from "../pages/VerifyEmail";
import VerificationSuccess from "../pages/VerificationSuccess";
import VerificationError from "../pages/VerificationNotification";
import DrawGame from "../pages/DrawGame";
import About2 from "../components/About2";
import Leaderboards from "../pages/Leaderboards";

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
    path: "/GuessTheWord",
    element: <DragGame />,
  },
  {
    path: "/SayTheWord",
    element: <Speech />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/drawgame",
    element: <DrawGame />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signupadmin",
    element: <SignupAdmin />,
  },
  {
    path: "/PopTheBalloon",
    element: <BalloonGame />,
  },
  {
    path: "/signupuser",
    element: <Signupuser />,
  },
  {
    path: "/SpellTheWord",
    element: <SpeechRecognitionComponent />,
  },
  {
    path: "/PickTheWord",
    element: <ChooseGame />,
  },
  {
    path: "/studentprofile",
    element: <StudentProfile />,
  },

  {
    path: "/leaderboards",
    element: <Leaderboards />,
  },
  {
    path: "/createquiz",
    element: <CreateQuiz />,
  },
  {
    path: "/emailverificationsucess",
    element: <EmailVerificationSuccess />,
  },
  {
    path: "/verification-success",
    element: <VerificationSuccess />,
  },
  {
    path: "/verification-notification",
    element: <VerificationError />,
  },
  {
    path: "/act",
    element: <Act />,
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
    path: "/verification",
    element: <Verification />,
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
    path: "contents",
    element: <Contents />,
  },
  {
    path: "about2",
    element: <About2 />,
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
