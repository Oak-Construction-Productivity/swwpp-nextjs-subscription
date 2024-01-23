import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SWPPPReport from '@/components/util/SwpppReport';
import CameraButton from '@/components/ui/Button/CameraButton';

interface TemplateParams {
  [key: string]: any;
}
type AnyType = string | null | any;

interface CallbackProps {
  weatherData: any;
  updateFormData: (newWeatherData: any) => void;
}

interface ThumbnailProps {
  photoUrl: string;
  onRemove: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ photoUrl, onRemove }) => {
  return (
    <div className="relative">
      {/* Added 'cursor-pointer' class to make it clear that it's clickable */}
      <div
        onClick={onRemove}
        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full cursor-pointer"
      >
        X
      </div>
      <img
        src={photoUrl}
        alt="Captured Photo"
        className="w-24 h-24 rounded-lg" // Set the size to twice the original
      />
    </div>
  );
};

const EmailForm = (props: any & CallbackProps) => {
  const [formData, setFormData] = useState({
    date: '',
    precipitation: '',
    description: '',
    emailTo: '',
    emailFrom: '',
    weatherNotes: '',
    fieldConditionsNotes: '',
    capturedPhotos: [] as string[],
  });
  const [submitted, setSubmitted] = useState<AnyType>(false);
  const [allowFormSubmission, setAllowFormSubmission] = useState<AnyType>(false);


  const capturePhoto = async (onCapture: (photoDataUrl: string) => void) => {
    try {
      const file = await selectImageFile();
      const photoDataUrl = await convertImageToDataURL(file);
      onCapture(photoDataUrl);
      
    } catch (error) {
      console.error(error);
    }
  };

  const selectImageFile = (): Promise<File> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          resolve(file);
        } else {
          reject(new Error('No file selected.'));
        }
      };
      input.click();
    });
  };

  const convertImageToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target) {
          const dataURL = event.target.result as string;
          resolve(dataURL);
        } else {
          reject(new Error('Failed to read the file.'));
        }
      };
  
      reader.onerror = () => {
        reject(new Error('Error reading the file.'));
      };
  
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: props.weatherData?.date || '',
      precipitation: JSON.stringify(props.weatherData?.precipitation) || '',
      weatherNotes: JSON.stringify(props.weatherData) || '',
      emailTo: props.emailTo || '',
      emailFrom: props.emailFrom || '',
      description: props.projectDescription || '',
      capturedPhotos: prevFormData.capturedPhotos || [],
    }));
  }, [props.weatherData]);

  const EMAILJS_SERVICE_ID: any = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID: any = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY: any = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

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
  };

  
  const handlePhotoCapture = (photoDataUrl: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      capturedPhotos: [...prevFormData.capturedPhotos, photoDataUrl],
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (allowFormSubmission) {
      setSubmitted(true);
      setAllowFormSubmission(false);
      // Additional form submission logic if needed
    }
  };

  const handleFormSubmit = () => {
    setAllowFormSubmission(true);
  };
  

  return (
    <div className="bg-gradient-to-b from-white to-gray-200 p-6 rounded-lg text-black">
      <h1 className="text-center text-2xl font-bold mb-4">
        Report Generator: Send SWPPP Report Via Email Now
      </h1>

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
            name="emailFrom"
            defaultValue={props.emailFrom}
            placeholder={props.emailFrom}
            value={formData.emailFrom}
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

        <div className="flex flex-col">
          <label className="font-bold">Captured Photos:</label>
          <div className="flex flex-wrap gap-2">
          {formData.capturedPhotos.map((photoUrl, index) => (
          <Thumbnail
            key={index}
            photoUrl={photoUrl}
            onRemove={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                capturedPhotos: prevFormData.capturedPhotos.filter(
                  (_, i) => i !== index
                ),
              }))
            }
          />
            ))}
          </div>
          <CameraButton onClick={() => capturePhoto(handlePhotoCapture)} />
        </div>

        <button
          onClick={handleFormSubmit}
          className="bg-black text-white py-2 px-4 rounded-lg cursor-pointer"
        >
          Send Email and PDF Report
        </button>
        </form>
        <SWPPPReport
          projectName={props.projectName}
          projectLocation={props.projectAddress}
          town={props.town}
          lat={props.lattitude}
          long={props.longitude}
          agency={props.agency}
          responsibleParty={props.responsibleParty}
          state={props.state}
          projectDate={formData.date}
          precipitation={formData.precipitation}
          description={formData.description}
          weatherNotes={formData.weatherNotes}
          fieldConditionNotes={formData.fieldConditionsNotes}
          userEmail={formData.emailTo}
          emailFrom={formData.emailFrom}
          submitted={submitted}
          resetSubmitted={resetSubmitted}
          capturedPhotos={formData.capturedPhotos}
        />
    </div>
  );
};

export default EmailForm;