export const Moneyline = ({ moneyLine, color }: { moneyLine: number; color: string }) => {
   let svgDistance = Math.min(Math.abs(moneyLine) * 12.22 - 1222.22, 11000);

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
         <div className="flex flex-row items-center">
            <svg width="20" height="180.55" viewBox="0 0 2758 24890" fill="none">
               <rect
                  className={`${moneyLine < 0 ? "invisible" : "visible"}`}
                  width={svgDistance}
                  height="2627"
                  transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 2757 12377)"
                  fill={color}
               />
               <rect
                  className={`${moneyLine > 0 ? "invisible" : "visible"}`}
                  width={svgDistance}
                  height="2627"
                  transform="matrix(-4.37114e-08 1 1 4.37114e-08 1 12445)"
                  fill={color}
               ></rect>

               <path d="M0 12445L2678 12445" stroke="black" strokeWidth="130" />
               <rect x="65" y="24825" width="24760" height="2627" rx="935" transform="rotate(-90 65 24825)" stroke="black" strokeWidth="130" />
            </svg>
         </div>
      </>
   );
};
