export const Percentage = ({
   awayPercent,
   width,
   homeColor,
   awayColor,
}: {
   awayPercent: number;
   width: number;
   homeColor: string;
   awayColor: string;
}) => {
   return (
      <>
         <style jsx>{`
            @keyframes ${"rotateRight" + Math.round(awayPercent * 100).toString()} {
               from {
                  stroke-dashoffset: 301.59289474462014;
               }
               to {
                  stroke-dashoffset: ${301.59289474462014 - awayPercent * 301.59289474462014};
               }
            }

            @keyframes ${"rotateLeft" + Math.round(awayPercent * 100).toString()} {
               from {
                  stroke-dashoffset: ${-301.59289474462014};
               }
               to {
                  stroke-dashoffset: ${-awayPercent * 301.59289474462014};
               }
            }

            .enterRight {
               animation: ${"rotateRight" + Math.round(awayPercent * 100).toString()} 2s ease-in-out;
            }
            .enterLeft {
               animation: ${"rotateLeft" + Math.round(awayPercent * 100).toString()} 2s ease-in-out;
            }
         `}</style>

         <svg fill="none" strokeLinejoin="round" viewBox="11 11 106 106" width={width} height={width} className=" ">
            <g shapeRendering="geometricPrecision">
               <circle cx="64" cy="64" r="48" stroke="white" strokeWidth="10"></circle>
               <circle
                  className="-rotate-90 enterRight"
                  cx="64"
                  cy="64"
                  r="48"
                  stroke={awayColor}
                  strokeDasharray="301.59289474462014,301.59289474462014"
                  strokeDashoffset={301.59289474462014 - awayPercent * 301.59289474462014}
                  style={{
                     transformOrigin: "64px 64px",
                  }}
                  // strokeLinecap="round"
                  // strokeLinejoin="round"
                  strokeWidth="10"
               ></circle>

               <circle
                  className="-rotate-90 enterLeft"
                  cx="64"
                  cy="64"
                  r="48"
                  stroke={homeColor}
                  strokeDasharray="301.59289474462014,301.59289474462014"
                  strokeDashoffset={-(301.59289474462014 - (1 - awayPercent) * 301.59289474462014)}
                  style={{
                     transformOrigin: "64px 64px",
                  }}
                  // strokeLinecap="round"
                  // strokeLinejoin="round"
                  strokeWidth="10"
               ></circle>
            </g>
         </svg>
      </>
   );
};
