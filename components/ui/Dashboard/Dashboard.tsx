import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link'; // Ensure you import Link from next/link

// Register chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the WeatherData type for better type safety
interface WeatherData {
  date: string;
  precipitation: number;
  wind: string;
}

// DashboardCard props definition
interface DashboardCardProps {
  projectName: string | null;
  projectAddress: string | null;
  state: string | null;
  town: string | null;
  weatherData: WeatherData | null;
  weatherDataTwo: WeatherData | null;
  weatherDataThree: WeatherData | null;
  weatherDataFour: WeatherData | null;
  weatherDataFive: WeatherData | null;
  lat: number | null;
  long: number | null;
  propertyId: number | null; // Added propertyId here
}

// Placeholder for the sent report count
const totalReports = 20;
const sentReports = 10;
const percentage = (sentReports / totalReports) * 100;

// DashboardCard component
const DashboardCard: FC<DashboardCardProps> = ({
  projectName,
  projectAddress,
  state,
  town,
  weatherData,
  weatherDataTwo,
  weatherDataThree,
  weatherDataFour,
  weatherDataFive,
  lat,
  long,
  propertyId, // Include propertyId in the props
}) => {
  const precipitationData: number[] = [
    weatherData?.precipitation ?? 0,
    weatherDataTwo?.precipitation ?? 0,
    weatherDataThree?.precipitation ?? 0,
    weatherDataFour?.precipitation ?? 0,
    weatherDataFive?.precipitation ?? 0,
  ];

  const lineData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: precipitationData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 text-black">
      <h2 className="text-lg font-bold mb-2">Project Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Link href={`/projects/${propertyId}`} className="bg-gray-200 text-black text-center py-8 rounded shadow-md hover:bg-gray-300" style={{ aspectRatio: '1 / 1', width: '60%' }}>
          Automate SWPPP Report Sending, Send Reports
        </Link>
        <Link href={`/projects/binder/${propertyId}`} className="bg-gray-200 text-black text-center py-8 rounded shadow-md hover:bg-gray-300" style={{ aspectRatio: '1 / 1', width: '60%' }}>
          Build your SWPPP Binder
        </Link>
        <Link href={`/projects/swpppy/${propertyId}`} className="bg-gray-200 text-black text-center py-8 rounded shadow-md hover:bg-gray-300" style={{ aspectRatio: '1 / 1', width: '60%' }}>
          Talk to Swpppy, your personal SWPPP consultant
        </Link>
      </div>

      <div className="mb-4">
        <p><strong>Project Name:</strong> {projectName || 'N/A'}</p>
        <p><strong>Address:</strong> {projectAddress || 'N/A'}</p>
        <p><strong>Town:</strong> {town || 'N/A'}</p>
        <p><strong>State:</strong> {state || 'N/A'}</p>
      </div>

      {/* Flex container for line graph and circular progress bar */}
      <div className="flex justify-between mb-4">
        <div className="w-3/5">
          <h3 className="text-md font-semibold mb-2">Precipitation Data</h3>
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="w-1/4 flex items-center justify-center">
          <h3 className="text-md font-semibold mb-2">Monthly Reports Sent</h3>
          <div className="w-1/2">
            <CircularProgressbar
              value={percentage}
              text={`${sentReports}/${totalReports}`}
              styles={buildStyles({
                pathColor: percentage >= 50 ? '#4CAF50' : '#f00',
                trailColor: '#f00',
                textColor: '#000',
                textSize: '16px',
              })}
            />
          </div>
        </div>
      </div>

      {/* Map Icon Card with blank map fallback */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-md font-semibold mb-2">Project Location</h3>
        {lat && long ? (
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=300x200&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            alt="Project Location"
            className="rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/blank-map.png'; // Path to blank map image
            }}
          />
        ) : (
          <img
            src="/blank-map.png" // Path to blank map image
            alt="Blank Map Placeholder"
            className="rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
