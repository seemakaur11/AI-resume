// "use client";

// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // Set worker src for pdfjs
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export const PdfPreview = ({ file }) =>{
//   const [numPages, setNumPages] = useState(null);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   if (!file) return null;

//   return (
//     <div className="border p-2 rounded shadow-md max-w-xl mx-auto mt-6">
//       <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//             width={600}
//           />
//         ))}
//       </Document>
//     </div>
//   );
// }
