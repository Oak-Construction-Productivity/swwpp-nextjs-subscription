import React, { useState, ChangeEvent, FormEvent } from 'react';

const EmailForm =() => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    description: '',
    emailTo: '',
    weatherNotes: '',
    fieldConditionsNotes: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // ... (submit logic)
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-200 p-6 rounded-lg text-black">
      <h1 className="text-center text-2xl font-bold mb-4">Send SWPPP Report Via Email Now</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-bold">Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Message:</label>
          <textarea
            name="message"
            value={formData.message}
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
          Send Email
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
