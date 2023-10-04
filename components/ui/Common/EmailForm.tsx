import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface TemplateParams {
  [key: string]: any;
}

const EmailForm = (props:any) => {
  const [formData, setFormData] = useState({
    date: '',
    precipitation: '',
    description: '',
    emailTo: '',
    weatherNotes: '',
    fieldConditionsNotes: '',
  });

  const EMAILJS_SERVICE_ID: any = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID: any = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY: any =process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  // Assume you have useEffect data for the following fields
  //const projectName = 'Project Name Data';
  //const projectAddress = 'Project Address Data';
  //const lattitude = 'Latitude Data';
  //const longitude = 'Longitude Data';
  //const projectDescription = 'Project Description Data';
  //const projectNumber = 'Project Number Data';
  //const agency = 'Agency Data';
  //const responsibleParty = 'Responsible Party Data';

  useEffect(() => {
    // You can fetch and set the data here if needed
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const templateParams: TemplateParams = {
    date: '10-10-2023',
    project_name: 'Beards Hill',
    email_from: 'ira@amiconstruction.com',
    email_to:"iraf333@gmail.com"
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-200 p-6 rounded-lg text-black">
      <h1 className="text-center text-2xl font-bold mb-4">Report Generator: Send SWPPP Report Via Email Now</h1>
      <div className="mb-4">
        <label className="font-bold">Project Name:</label>
        <span className="ml-2">{props.projectName}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Project Address:</label>
        <span className="ml-2">{props.projectAddress}</span>
        <span className="ml-2">{props.town}</span>
        <span className="ml-2">{props.state}</span>
      </div>

      <div className="mb-4">
        <label className="font-bold">Latitude:</label>
        <span className="ml-2">{props.lattitude}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Longitude:</label>
        <span className="ml-2">{props.longitude}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Project Description:</label>
        <span className="ml-2">{props.projectDescription}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Project Number:</label>
        <span className="ml-2">{props.projectNumber}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Agency:</label>
        <span className="ml-2">{props.agency}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Responsible Party:</label>
        <span className="ml-2">{props.responsibleParty}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold">Date Submitted:</label>
        <span className="ml-2">{props.dateSubmitted}</span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-bold">Date:</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Precipitation:</label>
          <input
            type="text"
            name="precipitation"
            value={formData.precipitation}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Email To:</label>
          <input
            type="text"
            name="emailTo"
            value={formData.emailTo}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Weather Notes:</label>
          <textarea
            name="weatherNotes"
            value={formData.weatherNotes}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Field Conditions Notes:</label>
          <textarea
            name="fieldConditionsNotes"
            value={formData.fieldConditionsNotes}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg cursor-pointer"
        >
          Send Email and PDF Report
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
