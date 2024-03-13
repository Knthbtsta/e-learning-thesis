import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ChooseGame = () => {
  const location = useLocation();
  const { item } = location.state;
  const [all, setAll] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const [words, setWords] = useState([]);
  const [user, setUser] = useState({});
  const [stars, setStars] = useState(0);
  console.log(stars);

  useEffect(() => {
    fetchStarsCount();
    if (item && Array.isArray(item.gameimage && item.minigame)) {
      setAll(item.gameimage);
    }
  }, [item]); // useEffect will run whenever 'item' changes
  useEffect(() => {
    const fetch = async () => {
      try {
        const userDetailResponse = await axios.get(
          `http://localhost:8800/api/user/${id}`
        );
        console.log(userDetailResponse);
        if (userDetailResponse.status === 200) setUser(userDetailResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const updateStarsCount = async (newStars) => {
    try {
      await axios.patch(`http://localhost:8800/api/user/${id}`, {
        stars: newStars,
      });
    } catch (error) {
      console.error("Error updating stars count:", error);
    }
  };
  const fetchStarsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/user/${id}`);
      const initialStars = response.data.stars;
      setStars(initialStars);
    } catch (error) {
      console.error("Error fetching stars count:", error);
    }
  };

  const handleImageClick = (gameimage) => {
    // Extract the first letter of the game image name
    const firstLetterOfGameName = gameimage.charAt(0);

    // Check if the first letter of the game name is included in the letter array in the item array
    if (item.letter.includes(firstLetterOfGameName)) {
      // Perform your action here, for example, set the selected game
      const newStars = stars + 1;
      setStars(newStars);
      updateStarsCount(newStars);
      setShowModal(true);
      // Example navigation code:
      // history.push(`/game/${gameName}`);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate(
      `/speechrecognitioncomponent?id=${id}&dungeonName=${dungeonName}`,
      {
        state: { words: words, item: item },
      }
    ); // Navigate to the other page with URL parameters
  };

  return (
    <div className="h-screen bg-[url('/minigamebg.png')] bg-no-repeat bg-cover">
      <div className="text-[50px] text-black pl-10 pt-5">
        <FontAwesomeIcon
          icon={faStar}
          style={{
            color: "#FFD43B",
            fontSize: "4rem",
            paddingTop: "10px",
          }}
          bounce
        />
        {user.stars}
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          {all.map((gameimage, idx) => (
            <div key={idx}>
              {/* Adjust margin to get images closer */}
              <button onClick={() => handleImageClick(gameimage)}>
                <img src={`/images/${gameimage}`} className="h-[500px]" />
              </button>
              <div className="flex items-center justify-center text-black text-[100px]">
                {item.minigame[idx]}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div
          id="modal"
          className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 modal-open"
        >
          <div className="flex p-8 rounded-lg relative fade-up">
            <div className="relative">
              <img src="/welldone.png" alt="" />
            </div>
            <div className="z-0">
              <img src="/star.png" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-10">
            <button
              type="button"
              className="rounded-[100px] text-[50px] py-5 px-5 inline-flex justify-center items-center gap-x-2 font-semibold border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={handleCancel}
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseGame;
