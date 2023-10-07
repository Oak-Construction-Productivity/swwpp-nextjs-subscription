import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SWPPPReport from '@/components/util/SwpppReport';

interface TemplateParams {
  [key: string]: any;
}
type AnyType = string | null | any;

interface CallbackProps {
  weatherData: any; // Define the type of weatherData as per your data structure
  // ... other props
  updateFormData: (newWeatherData: any) => void; // Callback function to update formData
}

const EmailForm = (props: any & CallbackProps) => {
  const [formData, setFormData] = useState({
    date: '',
    precipitation: '',
    description: '',
    emailTo: '',
    emailFrom:'',
    weatherNotes: '',
    fieldConditionsNotes: '',
  });
  const [submitted, setSubmitted] = useState<AnyType>(false);

  useEffect(() => {
    // When props.weatherData changes, update the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: props.weatherData?.date || '',
      precipitation: JSON.stringify(props.weatherData?.precipitation) || '',
      weatherNotes: JSON.stringify(props.weatherData) || "",
      emailTo: props.emailTo || "",
      emailFrom: props.emailFrom || "",
      // Update other formData fields as needed
    }));
  }, [props.weatherData]);

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

  const resetSubmitted = () => {
    setSubmitted(false);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    /*
    const templateParams: TemplateParams = {
      date: '10-10-2023',
      project_name: 'Beards Hill',
      email_from: 'ira@amiconstruction.com',
      email_to:"iraf333@gmail.com"
    };
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });*/
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
        <label className="font-bold">Lattitude:</label>
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
      <div className="mb-4">
        <label className="font-bold">Emailing From:</label>
        <span className="ml-2">{props.emailFrom}</span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-bold">Date:</label>
          <input
            type="text"
            name="date"
            placeholder={JSON.stringify(props.weatherData?.date)}
            defaultValue={JSON.stringify(props.weatherData?.date)}
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
            placeholder={JSON.stringify(props.weatherData?.precipitation)}
            defaultValue={JSON.stringify(props.weatherData?.precipitation)}
            value={formData.precipitation}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Description:</label>
          <textarea
            name="description"
            defaultValue={props.description}
            placeholder={props.description}
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
            defaultValue={props.emailTo}
            placeholder={props.emailTo}
            value={formData.emailTo}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Email From:</label>
          <input
            type="text"
            name="emailTo"
            defaultValue={props.emailFrom}
            placeholder={props.emailFrom}
            value={formData.emailTo}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Weather Notes:</label>
          <textarea
            name="weatherNotes"
            placeholder={JSON.stringify(props.weatherData)}
            defaultValue={JSON.stringify(props.weatherData)}
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
        <SWPPPReport projectName={props.projectName}
          projectLocation ={props.projectAddress}
          town={props.town}
          lat={props.lattitude}
          long={props.longitude}
          agency={props.agency}
          responsibleParty={props.responsibleParty}
          state={props.state}
          projectDate ={formData.date}
          precipitation={formData.precipitation}
          description={formData.description}
          weatherNotes={formData.weatherNotes}
          fieldConditionNotes={formData.fieldConditionsNotes}
          userEmail={formData.emailTo}
          emailFrom={formData.emailFrom}
          submitted={submitted}
          resetSubmitted={resetSubmitted}/>
      </form>
    </div>
  );
};

export default EmailForm;
