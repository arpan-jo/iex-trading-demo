import React, { useState } from "react";
import { getData } from "../helper/helper";
import "./sample.css";

const Sample = () => {
   const [id, setID] = useState("");
   const [data, setData] = useState({});
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleOnPress = (e) => {
      console.log(e);
      if (e.charCode === 13) {
         getData(id, setData, setError, setLoading);
      }
   };

   const unitchanger = (num) => {
      var units = ["M", "B", "T", "Q"];
      var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
      var r = unit % 3;
      var x = Math.abs(Number(num)) / Number("1.0e+" + (unit - r)).toFixed(2);
      return x.toFixed(2) + " " + units[Math.floor(unit / 3) - 2];
   };
   return (
      <main class="main-section">
         <section class="input-section">
            <div>
               <input
                  onKeyPress={handleOnPress}
                  type="text"
                  class="input-search"
                  placeholder="Enter your keywords"
                  onChange={(e) => setID(e.target.value)}
               />
            </div>
            <div>
               <button
                  onClick={() => {
                     getData(id, setData, setError, setLoading);
                  }}
                  class="seacrh-btn"
               >
                  SEARCH
               </button>
            </div>
         </section>
         {error && (
            <p
               style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "27px",
               }}
            >
               Invalid ticker symbol.
            </p>
         )}

         {loading && <div class="loader" style={{ margin: "0 auto" }}></div>}
         {data?.symbol && (
            <section class="table-section">
               <div class="table-head">
                  <div>
                     <p class="heading-p">{data?.symbol}</p>
                     <p class="sub-head" style={{ color: " #888888" }}>
                        {data?.companyName}
                     </p>
                  </div>
                  <div>
                     <p class="heading-p">{data?.latestPrice}</p>
                     <p class="sub-head" style={{ color: "#27ae60" }}>
                        ({data?.change})({data?.changePercent}%)
                        <span>&#8593;</span>
                     </p>
                  </div>
               </div>
               <hr />
               <div>
                  <table>
                     <tr>
                        <td>Mkt Cap</td>
                        <td class="text-end">
                           {
                              // data?.marketCap
                              unitchanger(data?.marketCap)
                           }
                        </td>
                        <td class="text-start">Prev close</td>
                        <td class="text-end">{data?.previousClose}</td>
                     </tr>
                     <tr>
                        <td>P/E ratio</td>
                        <td class="text-end">{data?.peRatio}</td>
                        <td class="text-start">52-wk high</td>
                        <td class="text-end">{data?.week52High}</td>
                     </tr>
                     <tr>
                        <td>Avg. volume</td>
                        <td class="text-end">
                           {unitchanger(data?.avgTotalVolume)}
                        </td>
                        <td class="text-start">52-wk low</td>
                        <td class="text-end">{data?.week52Low}</td>
                     </tr>
                  </table>
               </div>
            </section>
         )}
      </main>
   );
};

export default Sample;
