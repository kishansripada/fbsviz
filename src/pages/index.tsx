import type { NextPage } from "next";
import Head from "next/head";
import { Moneyline } from "../components/Moneyline";
import { Percentage } from "../components/Percentage";
import { Spread } from "../components/Spread";
import { teams } from "../../public/teams.js";
import { useEffect, useState } from "react";

import michiganStateSpartans from "../../public/michiganstatespartans.svg";

const Home: NextPage = ({ lines }) => {
   const [teamHover, setTeamHover] = useState(false);
   const { clientX, clientY } = useMousePosition();

   lines = lines.filter((line: any) => line.lines[0]?.awayMoneyline);

   const games = lines.map((line: any, index: number) => {
      let homeTeam = teams.find((team: any) => team.school === line.homeTeam);
      let awayTeam = teams.find((team: any) => team.school === line.awayTeam);

      return (
         <Game
            key={index}
            homeMoneyline={line.lines[0].homeMoneyline}
            awayMoneyline={line.lines[0].awayMoneyline}
            awaySpread={parseFloat(line.lines[0].spread)}
            awayPercent={moneylineToImpliedPercent(line.lines[0].homeMoneyline, line.lines[0].awayMoneyline).awayMoneylinePercent}
            homeColor={homeTeam?.color || "black"}
            awayColor={awayTeam?.color || "gray"}
            homeLogo={homeTeam.logos[0]}
            awayLogo={awayTeam.logos[0]}
            homeName={homeTeam.school}
            awayName={awayTeam.school}
            setTeamHover={setTeamHover}
         />
      );
   });

   return (
      <>
         <Head>
            <title>Create T3 App</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         {teamHover ? (
            <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none z-50">
               <div
                  style={{
                     left: clientX,
                     top: clientY + 70,
                     transform: "translate(-50%, -50%)",
                  }}
                  className=" bg-white px-3 ring-1 ring-black  rounded-lg font-semibold absolute min-w-[200px] py-2"
               >
                  <p className="pb-3"> {teamHover}</p>
                  <p className="opacity-60 text-sm">CONF.</p>
                  <hr className="pb-2" />
                  B1G
               </div>
            </div>
         ) : null}

         <div className="grid gap-0 grid-cols-3">{games}</div>
      </>
   );
};

const moneylineToImpliedPercent = (homeMoneyline: number, awayMoneyline: number): { homeMoneylinePercent: number; awayMoneylinePercent: number } => {
   let moneylineToPercent = (moneyline: number) => (moneyline > 0 ? 100 * (100 / (moneyline + 100)) : 100 * (-moneyline / (-moneyline + 100)));

   let homeMoneylinePercent = moneylineToPercent(homeMoneyline);
   let awayMoneylinePercent = moneylineToPercent(awayMoneyline);

   let sum = homeMoneylinePercent + awayMoneylinePercent;
   //  let vig = (100 * (sum - 100)) / sum;
   return {
      homeMoneylinePercent: homeMoneylinePercent / sum,
      awayMoneylinePercent: awayMoneylinePercent / sum,
   };
};

export const Game = ({
   homeMoneyline,
   awayMoneyline,
   awayPercent,
   awaySpread,
   homeColor,
   awayColor,
   homeLogo,
   awayLogo,
   homeName,
   awayName,
   setTeamHover,
}: {
   homeMoneyline: number;
   awayMoneyline: number;
   awayPercent: number;
   awaySpread: number;
   homeColor: string;
   awayColor: string;
   homeLogo: string;
   awayLogo: string;
   homeName: string;
   awayName: string;
   setTeamHover: Function;
}) => {
   return (
      <>
         <div className="flex flex-row justify-center items-center">
            <div className="relative bottom-14 flex flex-row items-center">
               <div
                  className="pr-2 relative"
                  style={{
                     top: Math.sign(-homeMoneyline) * Math.min(0.08777777777778 * Math.abs(homeMoneyline) - 8.78, 79),
                  }}
               >
                  {homeMoneyline > 0 ? "+" + homeMoneyline : homeMoneyline}
               </div>
               <Moneyline color={homeColor} moneyLine={homeMoneyline}></Moneyline>
               <p className="relative left-5 bottom-16">{Math.round((1 - awayPercent) * 100)}%</p>
            </div>
            <div className="flex flex-col items-center">
               <Percentage homeColor={homeColor} awayColor={awayColor} awayPercent={awayPercent} width={200}></Percentage>
               <div className="flex flex-row  items-center relative top-[-135px] ">
                  <img
                     onMouseEnter={() => setTeamHover(homeName)}
                     onMouseLeave={() => setTeamHover(undefined)}
                     className="h-12 "
                     src={homeLogo}
                     alt=""
                  />
                  <p className="text-[50px] mx-1">＠</p>
                  <img
                     onMouseEnter={() => setTeamHover(awayName)}
                     onMouseLeave={() => setTeamHover(undefined)}
                     className="h-12"
                     src={awayLogo}
                     alt=""
                  />
               </div>
               <div className="relative top-[-50px]">
                  <Spread awaySpread={awaySpread} />
               </div>
            </div>

            <div className="relative bottom-14 flex flex-row items-center">
               <p className="relative right-5 bottom-16">{Math.round(awayPercent * 100)}%</p>
               <Moneyline color={awayColor} moneyLine={awayMoneyline}></Moneyline>
               <div
                  className="pl-2 relative"
                  style={{
                     top: Math.sign(-awayMoneyline) * Math.min(0.08777777777778 * Math.abs(awayMoneyline) - 8.78, 79),
                  }}
               >
                  {awayMoneyline > 0 ? "+" + awayMoneyline : awayMoneyline}
               </div>
            </div>
         </div>
      </>
   );
};

// This gets called on every request
export async function getServerSideProps() {
   // Fetch data from external API
   const res = await fetch("https://api.collegefootballdata.com/lines?year=2022&seasonType=regular&week=1&conference=B1G", {
      headers: {
         Accept: "application/json",
         Authorization: "Bearer mnH15cL9zOuEKn7jmSN33+Rz+lKDFx7cHw7HNTcDM819/019HDl+WmNsdAxfrpVh",
      },
   });

   const lines = await res.json();

   // Pass data to the page via props
   return { props: { lines } };
}

const useMousePosition = () => {
   const [position, setPosition] = useState({
      clientX: 0,
      clientY: 0,
   });

   const updatePosition = (event: any) => {
      const { pageX, pageY, clientX, clientY } = event;

      setPosition({
         clientX,
         clientY,
      });
   };

   useEffect(() => {
      document.addEventListener("mousemove", updatePosition, false);
      document.addEventListener("mouseenter", updatePosition, false);

      return () => {
         document.removeEventListener("mousemove", updatePosition);
         document.removeEventListener("mouseenter", updatePosition);
      };
   }, []);

   return position;
};

export default Home;
