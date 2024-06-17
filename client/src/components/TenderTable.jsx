// import { Card, Typography } from "@material-tailwind/react";
// import { useSelector } from "react-redux";
// import { convertToIST } from "../../utils/Time";

// export const TenderTable = () => {
//   const { error, loading, tender } = useSelector((state) => state?.tender);

//   // Define keys to be excluded
//   const excludedKeys = ["__v", "createdAt", "updatedAt"];

//   // Filter out the excluded keys from the table headers
//   const tableHeaders =
//     tender.length > 0
//       ? Object.keys(tender[0]).filter((key) => !excludedKeys.includes(key))
//       : [];

//   return (
//     <div>
//       {error && <h2 className="flex justify-center ">{error.message}</h2>}
//       {loading ? (
//         <h2 className="flex justify-center py-2">Loading...</h2>
//       ) : (
//         tender && (
//           <Card className=" relative h-screen w-full overflow-scroll">
//             <table className="w-full min-w-max table-auto text-left">
//               <thead>
//                 <tr>
//                   <th
//                     key="startTimeIST"
//                     className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//                   >
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal leading-none opacity-70 text-semibold uppercase text-gray-900"
//                     >
//                       No
//                     </Typography>
//                   </th>
//                   {tableHeaders?.map((head) => (
//                     <th
//                       key={head}
//                       className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//                     >
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal leading-none opacity-70 text-semibold uppercase text-gray-900"
//                       >
//                         {head}
//                       </Typography>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {tender.map((tenderItem, index) => (
//                   <tr key={tenderItem._id}>
//                     <td className="border-b">
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="px-6 py-4 whitespace-nowrap font-normal text-left"
//                       >
//                         {index + 1}
//                       </Typography>
//                     </td>
//                     {tableHeaders.map((header) => (
//                       <>
//                         <td key={header} className="border-b">
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="px-6 py-4 whitespace-nowrap font-normal text-left"
//                           >
//                             {header === "startTime"
//                               ? convertToIST(tenderItem[header])
//                               : header === "endTime"
//                               ? convertToIST(tenderItem[header])
//                               : tenderItem[header]}
//                           </Typography>
//                         </td>
//                       </>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className=" absolute bottom-0 left-0 bg-gray-300 p-1 px-3">
//                 <span className="text-gray-800">Total Tender : {tender.length} </span>
//             </div>
//           </Card>
//         )
//       )}
//     </div>
//   );
// };
