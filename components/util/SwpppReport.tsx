import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';

interface SWPPPReportProps {
  // Props for project details
  projectName: string;
  projectLocation: string;
  projectDate: string;
  precipitation: string;
  description: string;
  weatherNotes: string;
  fieldConditionNotes: string;
  submitted: boolean;
  userEmail: string;
  resetSubmitted: () => void;
}

interface emailParams {
  [key: string]: any;

}

const SWPPPReport: React.FC<SWPPPReportProps> = ({
  projectName,
  projectLocation,
  projectDate,
  precipitation,
  description,
  weatherNotes,
  fieldConditionNotes,
  userEmail,
  submitted,
  resetSubmitted
}) => {
  const EMAILJS_SERVICE_ID: string = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID: string = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
  const EMAILJS_PUBLIC_ID: string = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

  const divToPrintRef = useRef<HTMLDivElement>(null);

  const printDocument = () => {
    if (divToPrintRef.current) {
      html2canvas(divToPrintRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Define content for the PDF
        const content = `
          Project Name: ${projectName}
          Project Location: ${projectLocation}
          Project Date: ${projectDate}
          Precipitation: ${precipitation}
          Description: ${description}
          Weather Notes: ${weatherNotes}
          Field Condition Notes: ${fieldConditionNotes}
        `;

        //pdf.addImage(imgData, 'JPEG', 0, 50);
        pdf.text(10, 10, 'Daily Report'); // Title
        pdf.text(10, 20, content); // Content

        sendEmailWithAttachment(pdf.output('blob'));
      });
    }}
  
    const sendEmailWithAttachment = (pdfBlob: Blob) => {
      console.log(userEmail, "email here");
      const emailParams = {
        email_to: userEmail,
        email_from: 'ira@amiconstruction.com',
        project_name: projectName,
        date: '10-10-2023',
        content: "fill",
      };
  
      // Read the PDF blob as a base64 encoded string
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const base64Data = event.target.result as string;
          emailParams.content = base64Data.split(',')[1];
          
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_ID).then(
            (result) => {
              console.log(result.text);
              alert('Report was sent');
              resetSubmitted();
            },
            (error) => {
              console.log(error.text);
              resetSubmitted();
            }
          );
        }
      };
  
      reader.readAsDataURL(pdfBlob);
    };

  useEffect(() => {
    if (submitted === true) {
      printDocument();
    }
  }, [submitted]);

  return (
    <div>
    {submitted ? (
      <div ref={divToPrintRef}>
        <h1>Daily Report</h1>
        <table>
    <tbody>
      <tr>
        <td>Project Name:</td>
        <td>{projectName}</td>
      </tr>
      <tr>
        <td>Project Location:</td>
        <td>{projectLocation}</td>
      </tr>
      <tr>
        <td>Project Date:</td>
        <td>{projectDate}</td>
      </tr>
      <tr>
        <td>Precipitation:</td>
        <td>{precipitation}</td>
      </tr>
      <tr>
        <td>Description:</td>
        <td>{description}</td>
      </tr>
      <tr>
        <td>Weather Notes:</td>
        <td>{weatherNotes}</td>
      </tr>
      <tr>
        <td>Field Condition Notes:</td>
        <td>{fieldConditionNotes}</td>
      </tr>
    </tbody>
  </table>
        <p>Generating SWPPP Report...</p>
      </div>
    ) : null}
  </div>
  );
};

export default SWPPPReport;




/*import React, { useEffect } from 'react';
//import { init, send } from 'emailjs';
import emailjs from '@emailjs/browser';
import pdfkit from 'pdfkit';
//import PDFDocument from 'pdfkit';

interface SWPPPReportProps {
  // Props for project details
  projectName: string;
  projectLocation: string;
  projectDate: string;
  precipitation: string;
  description: string;
  weatherNotes: string;
  fieldConditionNotes: string;
  submitted:boolean;

  // Email related props
  userEmail: string;
}

const SWPPPReport: React.FC<SWPPPReportProps> = ({
  projectName,
  projectLocation,
  projectDate,
  precipitation,
  description,
  weatherNotes,
  fieldConditionNotes,
  userEmail,
  submitted
}) => {
  const EMAILJS_SERVICE_ID: any = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID: any = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY: any =process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY


  useEffect(() => {
    // Create a new PDF document
    //const PDFDocument = new pdfkit(); //require('blob-stream');
    const PDFDocument = require('pdfkit');
    const blobStream = require('blob-stream');
    const doc = new PDFDocument();

    // Define your SWPPP report content
    const reportTitle = 'Stormwater Pollution Prevention Plan (SWPPP)';
    const introText = 'Introduction: Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    // Combine provided props into report findings
    const reportFindings = [
      ['Date', 'Precipitation', 'Description', 'Weather Notes', 'Field Condition Notes'],
      [projectDate, precipitation, description, weatherNotes, fieldConditionNotes],
    ];

    // Define function to create a column of text
    function createColumn(data: string[], x: number, y: number) {
      doc.font('Helvetica-Bold').fontSize(12);
      for (let i = 0; i < data.length; i++) {
        doc.text(data[i], x, y + i * 20);
      }
    }

    // Add SWPPP report content
    doc.fontSize(20).text(reportTitle, { align: 'center' }).moveDown();
    doc
      .fontSize(14)
      .text(projectName)
      .text(projectLocation)
      .text(projectDate)
      .moveDown();
    doc.fontSize(12).text(introText).moveDown();
    doc.fontSize(14).text('Report Findings').moveDown();

    // Display information for one day at a time
    createColumn(reportFindings[0], 50, doc.y);
    createColumn(reportFindings[1], 200, doc.y);

    // Generate the PDF as a blob
    const pdfBlob = doc.pipe(blobStream());
    doc.end();

    // Send the email with the PDF as an attachment
    const emailParams = {
      email_to:"iraf333@gmail.com",
      email_from: 'ira@amiconstruction.com',
      project_name: 'Beards Hill',
      date: '10-10-2023',
      data: pdfBlob, 
      file: pdfBlob,
    };

    if(submitted == true){

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          alert("Report was sent")
      }, (error) => {
          console.log(error.text);
      });}

  }, [
    projectName,
    projectLocation,
    projectDate,
    precipitation,
    description,
    weatherNotes,
    fieldConditionNotes,
    userEmail,
    submitted
  ]);

  return (
    <div>
      <p>Generating SWPPP Report...</p>
    </div>
  );
};

export default SWPPPReport;*/
