'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import EmailForm from '@/components/ui/Common/EmailForm';

const supabase = createClientComponentClient();
const supabaseUrl = 'https://eggvjyydqfibdrgfyyny.supabase.co';
const supabaseKey: string | undefined =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY is not set in the environment variables.'
  );
}
const superbase = createClient(supabaseUrl, supabaseKey);

type UserType = string | null | any;
type ProjectType = any;

export default function Page({ params }: { params: { slug: string } }) {
  const [user, setUser] = useState<UserType>(null)
  const [error, setError] = useState<UserType>(null);
  const [weatherData, setWeatherData] = useState<UserType>(null);
  const [weatherDataTwo, setWeatherDataTwo] = useState<UserType>(null);
  const [weatherDataThree, setWeatherDataThree] = useState<UserType>(null);
  const [weatherDataFour, setWeatherDataFour] = useState<UserType>(null);
  const [weatherDataFive, setWeatherDataFive] = useState<UserType>(null);
  const [projectName, setProjectName] = useState<UserType>(null);
  const [projectAddress, setProjectAddress] = useState<UserType>(null);
  const [state, setState] = useState<UserType>(null);
  const [town, setTown] = useState<UserType>(null);
  const [projectDescription, setProjectDescription] = useState<UserType>(null);
  const [projectNumber, setProjectNumber] = useState<UserType>(null);
  const [emailTo, setEmailTo] = useState<UserType>(null);
  const [emailFrom, setEmailFrom] = useState<UserType>(null);
  const [dateSubmitted, setDateSubmitted] = useState<UserType>(null);
  const [agency, setAgency] = useState<UserType>(null);
  const [responsibleParty, setResponsibleParty] = useState<UserType>(null);
  const [long, setLong] = useState<UserType>(null);
  const [lat, setLat] = useState<UserType>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  function getPreviousDayDate(dayBehind:number): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - dayBehind);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const previousDayDate = getPreviousDayDate(1);
  const twoDaysDate = getPreviousDayDate(2);
  const threeDaysDate = getPreviousDayDate(3);
  const fourDaysDate = getPreviousDayDate(4);
  const fiveDaysDate = getPreviousDayDate(5);

  //useEffect to retrieve the user info, make sure it matches the user.id of the project number
  // return the project information to render, pass the latitude coordinates to the weather api function
  useEffect(() => {
    const afunctiontocall = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data) {
        console.log(data, data?.session?.user);
        console.log("here", user);
        if (data?.session?.user) {
          setUser(data?.session?.user?.id);
          console.log("here now", user);
          try {
            let { data: projects, error } = await superbase
              .from('projects')
              .select('*')
              .eq('id', params.slug);
    
            if (error) {
              setError(error.message);
            } else {
              setProjects(projects || []);
              setProjectName(projects?.[0].project_name)
              setProjectDescription(projects?.[0].project_description)
              setProjectNumber(projects?.[0].project_id)
              setProjectAddress(projects?.[0].project_address)
              setAgency(projects?.[0].agency)
              setResponsibleParty(projects?.[0].responsible_party)
              setState(projects?.[0].project_state)
              setTown(projects?.[0].project_town)
              setLat(projects?.[0].lattitude)
              setLong(projects?.[0].longitude)
              setEmailFrom(projects?.[0].email_from);
              setEmailTo(projects?.[0].email_to);
              console.log(projects?.[0].project_name)
              console.log(projects?.[0].lattitude)
              console.log(projects?.[0].longitude)
              const apiUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${projects?.[0].lattitude}&lon=${projects?.[0].longitude}&date=${previousDayDate}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP}`;
              const apiUrlTwo =  `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${projects?.[0].lattitude}&lon=${projects?.[0].longitude}&date=${twoDaysDate}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP}`;
              const apiUrlThree =  `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${projects?.[0].lattitude}&lon=${projects?.[0].longitude}&date=${threeDaysDate}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP}`;
              const apiUrlFour =  `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${projects?.[0].lattitude}&lon=${projects?.[0].longitude}&date=${fourDaysDate}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP}`;
              const apiUrlFive =  `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${projects?.[0].lattitude}&lon=${projects?.[0].longitude}&date=${fiveDaysDate}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP}`;
              console.log(lat, long)
          // Make the API call using the fetch API
              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  setWeatherData(data);
                  console.log(data)
                })
                .catch((error) => {
                  console.error('Error fetching weather data:', error);
                });
                fetch(apiUrlTwo)
                .then((response) => response.json())
                .then((data) => {
                  setWeatherDataTwo(data);
                  console.log(data)
                })
                .catch((error) => {
                  console.error('Error fetching weather data:', error);
                });
                console.log(weatherData)
                fetch(apiUrlThree)
                .then((response) => response.json())
                .then((data) => {
                  setWeatherDataThree(data);
                  console.log(data)
                })
                .catch((error) => {
                  console.error('Error fetching weather data:', error);
                });
                fetch(apiUrlFour)
                .then((response) => response.json())
                .then((data) => {
                  setWeatherDataFour(data);
                  console.log(data)
                })
                .catch((error) => {
                  console.error('Error fetching weather data:', error);
                });
                fetch(apiUrlFive)
                .then((response) => response.json())
                .then((data) => {
                  setWeatherDataFive(data);
                  console.log(data)
                })
                .catch((error) => {
                  console.error('Error fetching weather data:', error);
                });


            }
          } catch (error: any) {
            setError(error.message);
          }
        }
      } else {
        console.log('false ities');
      }
    };
    afunctiontocall();
  }, []);
  
  
  return (
    <>
    <div className="flex justify-between">
        <div className="w-3/4 p-4">
            <div>Choose a day to fill into the report generator</div>
            <div className="day-box bg-gradient-to-r from-gray-200 to-gray-100 p-4 rounded-lg shadow-md">
            <div className="text-black">Yesterdays Date: {previousDayDate}</div>
            <div className="text-black">Yesterdays weather: {JSON.stringify(weatherData)}</div>
            <div className="text-black">Yesterdays precipitation: {JSON.stringify(weatherData?.precipitation)}</div>
            <div className="text-black">Yesterdays wind: {JSON.stringify(weatherData?.wind)}</div>
                <div>
                <button className="bg-black text-white py-2 px-4 rounded">Fill</button>
                </div>
            </div>
            <div className="day-box bg-gradient-to-r from-gray-200 to-gray-100 p-4 rounded-lg shadow-md">
            <div className="text-black">Two Days Previous Date: {twoDaysDate}</div>
            <div className="text-black">Two Days Previous Date Weather: {JSON.stringify(weatherDataTwo)}</div>
            <div className="text-black">Two Days Previous Date Precipitation: {JSON.stringify(weatherDataTwo?.precipitation)}</div>
            <div className="text-black">Two Days Previous Date Wind: {JSON.stringify(weatherDataTwo?.wind)}</div>
                <div>
                  <button className="bg-black text-white py-2 px-4 rounded">Fill</button>
                </div>
            </div>
            <div className="day-box bg-gradient-to-r from-gray-200 to-gray-100 p-4 rounded-lg shadow-md">
            <div className="text-black">Three Days Previous Date: {threeDaysDate}</div>
            <div className="text-black">Three Days Previous Date Weather: {JSON.stringify(weatherDataThree)}</div>
            <div className="text-black">Three Days Previous Date Precipitation: {JSON.stringify(weatherDataThree?.precipitation)}</div>
            <div className="text-black">Three Days Previous Date Wind: {JSON.stringify(weatherDataThree?.wind)}</div>
                <div>
                  <button className="bg-black text-white py-2 px-4 rounded">Fill</button>
                </div>
            </div>
            <div className="day-box bg-gradient-to-r from-gray-200 to-gray-100 p-4 rounded-lg shadow-md">
            <div className="text-black">Four Days Previous Date: {fourDaysDate}</div>
            <div className="text-black">Four Days Previous Date Weather: {JSON.stringify(weatherDataFour)}</div>
            <div className="text-black">Four Days Previous Date Precipitation: {JSON.stringify(weatherDataFour?.precipitation)}</div>
            <div className="text-black">Four Days Previous Date Wind: {JSON.stringify(weatherDataFour?.wind)}</div>
            <div>
                  <button className="bg-black text-white py-2 px-4 rounded">Fill</button>
                </div>
            </div>
            <div className="day-box bg-gradient-to-r from-gray-200 to-gray-100 p-4 rounded-lg shadow-md">
            <div className="text-black">Five Days Previous Date: {fiveDaysDate}</div>
            <div className="text-black">Five Days Previous Date Weather: {JSON.stringify(weatherDataFive)}</div>
            <div className="text-black">Five Days Previous Date Precipitation: {JSON.stringify(weatherDataFive?.precipitation)}</div>
            <div className="text-black">Five Days Previous Date Wind: {JSON.stringify(weatherDataFive?.wind)}</div>
            <div>
                  <button className="bg-black text-white py-2 px-4 rounded">Fill</button>
                </div>
            </div>
        </div>
        <div className="w-1/4 p-4">
            <EmailForm     
              projectName={projectName}
              projectAddress={projectAddress}
              state={state}
              dateSubmitted={dateSubmitted}
              emailTo={emailTo}
              emailFrom={emailFrom}
              town={town}
              lattitude={lat}
              longitude={long}
              projectDescription={projectDescription}
              projectNumber={projectNumber}
              agency={agency}
              responsibleParty={responsibleParty}/>
        </div>
    </div>
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


  /*useEffect(() => {
    const afunctiontocall = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data) {
        console.log(data, data?.session?.user);
        console.log("here", user)
        if (data?.session?.user) {
          setUser(data?.session?.user?.id)
          console.log("here now", user)
          //setLat()
          //setLong()
        }
      } else {
        console.log('false ities');
      }
    };
    afunctiontocall();
    const bfunctiontocall = async function fetchProjects() {
      try {
        let { data: projects, error } = await supabase
          .from('projects').select('*')
          .eq('id',params.slug);

        if (error) {
          setError(error.message);
        } else {
          setProjects(projects||[]);
          console.log(projects);
          console.log(params.slug)
          console.log(error);
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
    bfunctiontocall();
  }, []);*/
 /*
  useEffect(() => {
    async function fetchProjects() {
      try {
        let { data: projects, error } = await supabase
          .from('projects').select('*')
          .eq('id',params.slug);

        if (error) {
          setError(error.message);
        } else {
          setProjects(projects||[]);
          console.log(projects);
          console.log(params.slug)
          console.log(error);
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
    console.log(projects, 'data displayed here');
    fetchProjects();
  }, [JSON.stringify(user)]);*/

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