'use client';

import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';

interface SupabaseFormProps {
  onSuccess: () => void;
}

const SupabaseProjectAdd: React.FC<SupabaseFormProps> = ({ onSuccess }) => {
  const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co';
  const supabaseKey: string | undefined =
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.'
    );
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
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
    frequency: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        // Perform the Supabase API call here
        const { data, error } = await supabase
          .from('projects')
          .insert([formData])
          .select();

        if (error) {
          throw error;
        }

        // API call was successful
        setLoading(false);
        onSuccess();
        router.push('/success'); // Redirect to a success page
      } catch (error) {
        console.error('Error submitting form:', error);
        setLoading(false);
      }
    },
    [formData, onSuccess, router]
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <input
        type="text"
        name="project_name"
        value={formData.project_name}
        onChange={handleInputChange}
        placeholder="Project Name"
        required
      />
      {/* Add similar inputs for other fields */}

      {/* Spinner */}
      {loading && <div>Loading...</div>}

      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};

export default SupabaseProjectAdd;
