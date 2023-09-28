// Import your Supabase client instance
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
//import HardhatSpinner from '../Common/HardhatSpinner'; // You may need to implement a Spinner component
import { redirect } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co';
const supabaseKey: string | undefined =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.'
  );
}
const supabase = createClient(supabaseUrl, supabaseKey);
const superbase = createClientComponentClient();

const AddSwpppProject = () => {
  const [formData, setFormData] = useState({
    user: 'user.id',
    project_name: '',
    project_description: '',
    project_id: 0,
    project_address: '',
    project_town: '',
    project_state: '',
    project_zip_code: 0,
    email_to: '',
    email_from: '',
    frequency: ''
  });

  const spinnerStyles = {
    animation: 'spin 1s linear infinite',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    borderTop: '3px solid rgba(192, 57, 43, 1)', // Burnt orange color
    borderBottom: '3px solid rgba(192, 57, 43, 1)' // Burnt orange color
  };

  const updateFormData = (user: any, value: any) => {
    setFormData({
      ...formData,
      [user]: value
    });
    console.log('updated form with', value);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const afunctiontocall = async () => {
      const { data, error } = await superbase.auth.getSession();
      if (data) {
        console.log(data, data?.session?.user);
        if (data?.session?.user) {
          updateFormData('user', data?.session?.user?.id);
        }
      } else {
        console.log('false ities');
      }
    };
    afunctiontocall();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.user.length > 10) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .insert([formData])
          .select();

        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully:', data);
          redirect('/success'); // Redirect to the success page
        }
      } catch (error) {
        console.error('API call failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Not authenticated to post');
    }
  };

  return (
    <div className="form-container">
      <h1>Add SWPPP Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project Description:</label>
          <input
            type="text"
            name="project_description"
            value={formData.project_description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project Id:</label>
          <input
            type="number"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project Address:</label>
          <input
            type="text"
            name="project_address"
            value={formData.project_address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project Town:</label>
          <input
            type="text"
            name="project_town"
            value={formData.project_town}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project State:</label>
          <input
            type="text"
            name="project_state"
            value={formData.project_state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project Zip Code:</label>
          <input
            type="text"
            name="project_zip_code"
            value={formData.project_zip_code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project Report Emailed To:</label>
          <input
            type="text"
            name="email_to"
            value={formData.email_to}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project Report Emailed From:</label>
          <input
            type="text"
            name="email_from"
            value={formData.email_from}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Report Frequency?:</label>
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          />
        </div>
        <div>{/* Add other input fields in a similar manner */}</div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div style={spinnerStyles}></div>
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
      <style jsx>{`
        .form-container {
          background: linear-gradient(
            white,
            gray
          ); /* Gray/White gradient background */
          border-radius: 10px; /* Rounded corners */
          padding: 20px; /* Add some spacing around the form */
          color: black; /* Set text color to black */
        }

        .form-container h1 {
          text-align: center;
        }

        .form-container form {
          display: flex;
          flex-direction: column;
          gap: 10px; /* Spacing between form elements */
        }

        .submit-button {
          background-color: black;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
        }

        .submit-button:disabled {
          background-color: gray;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default AddSwpppProject;
