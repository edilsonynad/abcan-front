import React from "react";
import { jsPDF,HTMLOptionImage } from "jspdf";



const GeneratePdf = ({ html }) => {
  const generatePdf = () => {
      const doc = new jsPDF();

      let split=doc.splitTextToSize(document.getElementById("text").innerText,200);
      doc.text(document.querySelector(".content > h1").innerHTML,75,5);
      doc.text(split,5,75);
      doc.output("dataurlnewwindow");  

  };

  const generateImage=async ()=>{
    const image = await toPng(html.current,{quality:0.95});
    const doc = new jsPDF();

      doc.addImage(image,'JPEG',5,22,200,160);
      doc.save();


  }

  return (

    <div className="button-container">
      <button onClick={generateImage}>
        Get PDF image
      </button>
      <button onClick={generatePdf}>
        Get PDF as text
      </button>
    </div>

  );
};

export default GeneratePdf;