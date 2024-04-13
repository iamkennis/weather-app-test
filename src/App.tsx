import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Input from "./components/input";
import Weather from "./components/Weather";
import bgImage from "./assets/bg-pic.jpg";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  sys?: {
    country: string;
  };
  weather?: any;
  timezone: string;
  wind?: {
    speed: number;
    deg: number;
    gust: number;
  };
}

interface Weather {
  icon: string;
  main: string;
  description: string;
}

interface Props {
  data?: WeatherData;
  unit: string;
}

const App: React.FC<Props> = () => {
  const [location, setLocation] = React.useState<string>("");
  const [data, setData] = React.useState<WeatherData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [unit, setUnit] = React.useState<string>("celsius");
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  React.useEffect(() => {
    const storedRecentSearches = localStorage.getItem("recentSearches");
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }
  }, []);

  const fetchWeather = async () => {
    if (!location.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=75b14270aa16462a44e3db60c7a1c62d`
      );
      if (!response.ok) {
        toast.error("City not found");
      }
      const data = await response.json();
      setData(data);
      updateRecentSearches(location);
    } catch (error) {
      toast.error("Error fetching weather data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchWeather();
    if (location.trim() === '') {
      setErrorMessage('Search query cannot be empty');
    } else {
      setErrorMessage('');
    }
    
  };
 
  const toggleUnit = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };

  const updateRecentSearches = (city: string) => {
    const updatedRecentSearches = [
      city,
      ...recentSearches.filter((item) => item !== city).slice(0, 4),
    ];
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );
  };

  const WeatherDisplay: React.FC<{
    data?: WeatherData | null;
    unit: string;
  }> = ({ data, unit }) => {
    const isDataValid =
      data && data.main && data.name && data.weather && data.weather.length > 0;

    if (!isDataValid) {
      return null;
    }

    const weatherData = {
      sys: data.sys,
      name: data.name,
      timezone: data.timezone,
      weather: data.weather.at(0),
      main: data.main,
      wind: data.wind,
      unit,
      recentSearches,
    };

    return <Weather {...weatherData} />;
  };

  return (
    <div
      className="px-8 md:px-12 pt-8 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <header className="grid grid-cols-1 place-self-center">
        <div>
          <h1 className="text-[1.8em] md:text-[2.4em] text-center md:text-left font-bold">
            Weather App
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-8 mb-4 md:flex-row sm:gap-x-6"
        >
        
         <Input
            type="text"
            errorMessage={errorMessage}
            value={location}
            onChange={(e: any) => setLocation(e.target.value)}
            placeholder="Enter city name..."
          />
          
          <button
            type="submit"
            className="p-2.5 min-w-full h-[42px] md:min-w-[60px] text-[16px] font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:outline-none bg-white rounded-lg border border-gray-200"
          >
            {isLoading ? (
              <span>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>{" "}
                Searching...
              </span>
            ) : (
             <span>Search</span>
            )}
          </button>
         
        </form>
      </header>
      <div className=" float-none md:float-right">
        <button
          onClick={toggleUnit}
          type="button"
          className="p-2.5 min-w-full md:min-w-[45px] text-[16px] font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:outline-none bg-white rounded-lg border border-gray-200"
        >
          {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>
      <main className="py-14">
        <div className="flex items-center justify-center">
          {isLoading && <p>Loading...</p>}
        </div>
        {!isLoading && <WeatherDisplay data={data} unit={unit} />}
      </main>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default App;
