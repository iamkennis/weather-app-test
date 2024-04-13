import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

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
  weather?: {
    icon: string;
    main: string;
    description: string;
  };
  timezone: string;
  wind?: {
    speed: number;
    deg: number;
    gust: number;
  };
  unit: string;
  recentSearches:any
}

const Weather: React.FC<WeatherData> = ({
  sys,
  name,
  main,
  wind,
  timezone,
  weather,
  unit,
  recentSearches
}) => {
  const temperatureInCurrentUnit = (temperature: number) => {
    if (unit === "celsius") {
      return Math.round(temperature - 273.15);
    } else {
      return Math.round((temperature - 273.15) * 1.8 + 32);
    }
  };

  function convertToFlag(countryCode: any): string {
    const codePoints: number[] = countryCode
      ?.split("")
      ?.map((char: string) => 127397 + char.charCodeAt(0));
    return String?.fromCodePoint(...codePoints);
  }

  function formatDay(dateStr: string | number | Date) {
    return new Intl.DateTimeFormat("en", {
      weekday: "long",
    }).format(new Date(dateStr));
  }

  return (
    <main className="mt-6 md:mt-12">
      <div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
          <h1 className="font-bold text-[2.5rem] md:text-[4rem]">
            {`${name}, ${sys?.country} ${convertToFlag(sys?.country)}`}
          </h1>
          <div className="flex flex-row gap-4">
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${weather?.icon}.png`}
                alt="Weather Icon"
                className="w-32"
              />
            </div>
            <div>
              <p className="font-bold text-[1.8rem] md:text-[3rem]">Weather</p>
              <p className="font-medium text-[0.8em] md:text-[1em]">
                {formatDay(timezone)}
              </p>
              <p className="font-semibold text-[0.7em] md:text-[1em]">
                {weather?.description}
              </p>
            </div>
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-14">
          <div className="max-w-full p-8 bg-[#fceee579] border border-gray-200 rounded-lg shadow">
            <p className="font-bold text-[2rem] md:text-[2.5rem]">
              {" "}
              Current temperature
            </p>

            <div className="flex items-center space-x-4">
              <img
                src={`http://openweathermap.org/img/wn/${weather?.icon}.png`}
                alt="Weather Icon"
                className="w-32"
              />
              <p>{weather?.main}</p>
            </div>

            <h5 className="mb-2 text-[3em] font-semibold tracking-tight text-gray-900">
              {temperatureInCurrentUnit(main?.temp)}{" "}
              {unit === "celsius" ? "°C" : "°F"}
            </h5>
          </div>
          <div className="max-w-full p-4 bg-[#fceee579] border border-gray-200 rounded-lg shadow sm:p-8 ">
            <div className="flex flex-col gap-4 mb-4">
              <p className="font-bold text-[2rem] md:text-[2.5rem]">
                {" "}
                Current Weather
              </p>
             
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-500 ">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-[18px] font-medium text-gray-900 ">
                        Feels Like
                      </p>
                      <p className="text-[18px] font-bold">
                        {temperatureInCurrentUnit(main.feels_like)}{" "}
                        {unit === "celsius" ? "°C" : "°F"}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-[18px] font-medium text-gray-900">
                        Humidity
                      </p>
                      <p className="text-[18px] font-bold">{main.humidity}%</p>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-[18px] font-medium text-gray-900">
                        Pressure
                      </p>
                      <p className="text-[18px] font-bold">{main.pressure}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-full p-4 bg-[#fceee579] border border-gray-200 rounded-lg shadow sm:p-8 ">
            <div className="flex flex-col gap-4 mb-4">
              <p className="font-bold text-[2rem] md:text-[2.5rem]">
                Current Wind
              </p>
              
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-500 ">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-[18px] font-medium text-gray-900 ">
                        Speed
                      </p>
                      <p className="text-[18px] font-bold">{wind?.speed} {unit === "celsius" ? "M/S" : "MPH"}</p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-[18px] font-medium text-gray-900">
                        Degree
                      </p>
                      <p className="text-[18px] font-bold">{wind?.deg}</p>
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-[18px] font-medium text-gray-900">
                        Gust
                      </p>
                      <p className="text-[18px] font-bold">{wind?.gust} {unit === "celsius" ? "M/S" : "MPH"}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-full p-4 bg-[#fceee579] border border-gray-200 rounded-lg shadow sm:p-8 ">
            <div className="flex flex-col gap-4 mb-4">
              <p className="font-bold text-[2rem] md:text-[2.5rem]">
                Recent Search
              </p>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-500 ">
                {recentSearches.map((search: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: number) => (
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center gap-4">
                     
                        <p className="text-[18px] font-medium text-gray-900 ">
                          {index + 1}
                        </p>
                        <p className="text-[18px] font-bold">{search}</p>
                     
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Weather;
