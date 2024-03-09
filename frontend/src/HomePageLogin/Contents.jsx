import React from "react";
import Balloon from "../assets/img/BallonGame.png";
import Speech from "../assets/img/Speech.png";
import Phonics from "../assets/img/Aa.png";

const Contents = () => {
  const games = ["Balloon", "Speech", "Phonics"];
  const getPageTitle = (gameName) => {
    switch (gameName) {
      case "Balloon":
        return {
          title: "Balloon Game",
          image: Balloon,
        };
      case "Speech":
        return {
          title: "Speech Recognition",
          image: Speech,
        };
      case "Phonics":
        return {
          title: "Phonics Game",
          image: Balloon,
        };
      default:
        return "";
    }
  };

  return (
    <section className="bg-[url('/cbg.png')] min-h-screen bg-cover bg-no-repeat ">
      <div className="flex justify-center items-center pt-12">
        <h2 className="sm:text-5xl text-2xl mx-4 text-center py-3 px-4 font-bold rounded-2xl shadow-lg bg-[#ED1944] text-[#F0F0F0]">
          WELCOME TO OUR E-LEARNING WEB BASED FOR PHONETIC READING
        </h2>
      </div>
      <div className="flex justify-center rounded-2xl  text-center">
        <div className="md:grid grid-cols-3 mt-6   sm:gap-32 ">
          {games.map((game) => {
            const { title, image } = getPageTitle(game);
            return (
              <div
                key={game}
                className=" mb-8  p-4 bg-[#BCD431] h-[400px] w-[500px]   rounded-lg  shadow-lg"
              >
                <h3 className="text-xl py-4 mx-4 rounded-2xl shadow-lg px-4 bg-[#ED1944] font-semibold mb-2">
                  {title}
                </h3>
                {/* Add content based on the game if needed */}
                <div className=" mt-6">
                  {image && (
                    <img
                      src={image}
                      alt={`${game} Game`}
                      className="rounded-2xl border-full border-2 shadow-lg border-[#110F0F]"
                    />
                  )}
                  <button></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contents;
