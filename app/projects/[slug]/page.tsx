import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
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
  console.log(previousDayDate); // Example output: "2023-09-27"

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <>
      <div>My Post: {params.slug}</div>
      <div>Yesterdays Date: {previousDayDate}</div>
      <div>Yesterdays weather: {previousDayDate}</div>
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
