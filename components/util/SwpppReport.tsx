import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';

interface SWPPPReportProps {
  projectName: string;
  projectLocation: string;
  town: string;
  lat: string;
  long: string;
  agency: string;
  responsibleParty: string;
  emailFrom: string;
  state: string;
  projectDate: string;
  precipitation: string;
  description: string;
  weatherNotes: string;
  fieldConditionNotes: string;
  userEmail: string;
  submitted: boolean;
  resetSubmitted: () => void;
  capturedPhotos: string[];
}

const SWPPPReport: React.FC<SWPPPReportProps> = ({
  projectName,
  projectLocation,
  town,
  lat,
  long,
  agency,
  responsibleParty,
  emailFrom,
  state,
  projectDate,
  precipitation,
  description,
  weatherNotes,
  fieldConditionNotes,
  userEmail,
  submitted,
  resetSubmitted,
  capturedPhotos,
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

        pdf.setFontSize(16);
        pdf.setFont('bold');
        pdf.text(`Daily SWPPP Report For ${projectDate}`, 70, 20, { align: 'center' });

        pdf.setFontSize(12);
        pdf.setFont('normal');
        pdf.text('Overview:', 10, 40);
        pdf.rect(10, 45, 190, 0.1, 'F');

        pdf.text('Project Details:', 10, 100);
        pdf.rect(10, 105, 190, 0.1, 'F');

        const projectDetailsContent = `
          Precipitation: ${precipitation}
          Description: ${description}
          Weather Notes: ${weatherNotes.slice(89, 160)}
           ${weatherNotes.slice(160, 260)}
           ${weatherNotes.slice(260, 362)}
          Field Condition Notes: ${fieldConditionNotes}
        `;

        const overviewContent = `
          Project Name: ${projectName}
          Project Description: ${description}
          Project Location: ${projectLocation} ${town} ${state}
          Project Date: ${projectDate}
          Agency: ${agency}
          Longitude: ${long}
          Lattitude: ${lat}
        `;

        pdf.text(overviewContent, 10, 55);
        pdf.text(projectDetailsContent, 10, 115);

        pdf.setLineWidth(0.1);
        pdf.line(10, 265, 200, 265);
        pdf.text(`${responsibleParty}`, 10, 275);

        let xOffset = 10;
        for (let i = 0; i < capturedPhotos.length; i++) {
          if (capturedPhotos[i]) {
            pdf.addImage(capturedPhotos[i], 'JPEG', xOffset, 210, 40, 40);
          } else {
            pdf.rect(xOffset, 210, 40, 40);
          }
          xOffset += 50;
        }

        sendEmailWithAttachment(pdf.output('blob'));
      });
    }
  };

  const sendEmailWithAttachment = (pdfBlob: Blob) => {
    const emailParams = {
      email_to: userEmail,
      email_from: emailFrom,
      project_name: projectName,
      date: projectDate,
      content: 'fill',
    };

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
            alert(error.text);
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
              {/* Photo Section */}
              <tr>
                <td>Photos:</td>
                <td>
                  {capturedPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Captured Photo ${index + 1}`}
                      style={{ width: '100px', height: '100px', margin: '5px' }}
                    />
                  ))}
                </td>
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