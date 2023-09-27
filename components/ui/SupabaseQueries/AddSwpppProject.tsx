import { useState } from 'react';
import { useRouter } from 'next/router';
//import { supabase } from './supabase'; // Assuming you have a Supabase client set up
import Spinner from '../Common/Spinner'; // You may need to implement a Spinner component
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; // Import your Supabase client instance

const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co'
const supabaseKey: string | undefined  = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.');
  }
const supabase = createClient(supabaseUrl, supabaseKey)


const AddSwpppProject = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    project_name: '',
    project_description: '',
    project_id: 0,
    project_address: '',
    project_town: '',
    project_state: '',
    project_zip_code: 0,
    email_to: '',
    email_from: '',
    latitude: '',
    longitude: '',
    frequency: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
  };

  return (
    <div>
      <h1>Add SWPPP Project</h1>
      <form onSubmit={handleSubmit}>
        {/* Add all your input fields here */}
        <input
          type="text"
          name="project_name"
          value={formData.project_name}
          onChange={handleChange}
          required
        />
                <input
          type="text"
          name="project_description"
          value={formData.project_description}
          onChange={handleChange}
          required
        />
        {/* Add other input fields in a similar manner */}

        <button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner color="linear-gradient(135deg, #FF6B6B 0%, #FFA756 100%)" /> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddSwpppProject;

