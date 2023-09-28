'use client'
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

type UserType = string | null;
type ProjectType = any;

export default function Page({ params }: { params: { slug: string } }) {
  const [user, setUser] = useState<UserType>(null)
  const [error, setError] = useState<UserType>(null);
  const [weatherData, setWeatherData] = useState<UserType>(null);
  const [long, setLong] = useState<UserType>(null);
  const [lat, setLat] = useState<UserType>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  function getPreviousDayDate(): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const previousDayDate = getPreviousDayDate();

  //useEffect to retrieve the user info, make sure it matches the user.id of the project number
  // return the project information to render, pass the latitude coordinates to the weather api function
  useEffect(() => {
    const afunctiontocall = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data) {
        console.log(data, data?.session?.user);
        if (data?.session?.user) {
          setUser(data?.session?.user?.id)
          //setLat()
          //setLong()
        }
      } else {
        console.log('false ities');
      }
    };
    afunctiontocall();
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let { data: projects, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', params.slug);

        if (error) {
          setError(error.message);
        } else {
          setProjects(projects || [] || null);
          console.log(projects);
          console.log(error);
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
    console.log(projects, 'data displayed here');
    fetchProjects();
  }, []);

/*
  useEffect(() => {
    // Construct the URL for the API call
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&tz=${tz}&appid=${apiKey}`;

    // Make the API call using the fetch API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [long]); */

  return (
    <>
      <div>My Post: {params.slug}</div>
      <div>Yesterdays Date: {previousDayDate}</div>
      <div>Yesterdays weather: {previousDayDate}</div>
      <div>My Id: {user}</div>
    </>
  );
}

//pull user.id
//make sure it matches the uuid before rendering
//pull in project data
//pull in rain and weather data
//http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
//
//create dashboard
//create google map
//edit information form button
//reporting status
