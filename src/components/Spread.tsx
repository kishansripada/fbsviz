export const Spread = ({ awaySpread }: { awaySpread: number }) => {
   let svgDistance = Math.min(3326 * Math.log(Math.abs(awaySpread) + 1), 11000);
   let pxDistance = svgDistance * (112.5 / 11000) + 112.5;

   return (
      <>
         <style jsx>{`
            @keyframes ${"slide" + Math.floor(svgDistance).toString()} {
               from {
                  width: 0;
               }
               to {
                  width: ${svgDistance};
               }
            }

            .slideIn {
               animation: ${"slide" + Math.floor(svgDistance).toString()} 1s ease-in-out;
            }
         `}</style>

         <div className="flex flex-col">
            <svg width="248.90" height="27.57" viewBox="0 0 24890 2757" fill="none">
               {/* <rect width="11000" height="2757" transform="matrix(-1 0 0 1 18355 0)" fill="#D9D9D9" /> */}
               <rect
                  className="slideIn"
                  x="-65"
                  y="65"
                  width={svgDistance}
                  height="2627"
                  transform="matrix(-1 0 0 1 12383 0)"
                  stroke="black"
                  strokeWidth="130"
               />
               <rect
                  className="slideIn"
                  x="65"
                  y="-65"
                  width={svgDistance}
                  height="2627"
                  transform="matrix(1 0 0 -1 12379 2627)"
                  stroke="black"
                  strokeWidth="130"
               />
               <path d="M12445 0V2678" stroke="black" strokeWidth="130" />
               <rect x="65" y="65" width="24760" height="2627" rx="935" stroke="black" strokeWidth="130" />
            </svg>

            <div className="w-full h-5  flex flex-row item-center justify-center">
               <p
                  className="absolute"
                  style={{
                     right: pxDistance,
                  }}
               >
                  {awaySpread * -1}
               </p>
               <p
                  className="absolute"
                  style={{
                     left: pxDistance,
                  }}
               >
                  {awaySpread}
               </p>
            </div>
         </div>
      </>
   );
};
