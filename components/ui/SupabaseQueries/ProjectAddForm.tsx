// components/SupabaseForm.tsx
import { useState } from 'react';
import { redirect } from 'next/navigation'; // Import the redirect function
import { createClient } from '@supabase/supabase-js'; // Import your Supabase client instance

const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co'
const supabaseKey: string | undefined  = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.');
  }
const supabase = createClient(supabaseUrl, supabaseKey)

const ProjectAddForm: React.FC = () => {
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
  
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const { data, error } = await supabase.from('projects').insert([formData]).select();
  
        if (error) {
          throw error;
        }
  
        // Redirect to success page using the redirect function
        await redirect('/success-page');
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error as needed
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="project_name" placeholder="Project Name" onChange={handleChange} required />
        {/* Add other input fields here */}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    );
  };
export default ProjectAddForm;