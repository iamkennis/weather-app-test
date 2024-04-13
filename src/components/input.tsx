interface Props {
  value?: string;
  onChange?: any;
  type?: string;
  placeholder?: string;
  errorMessage: any;
}

export default function Input({
  value,
  onChange,
  type,
  placeholder,
  errorMessage,
}: Props) {
  return (
    <div className="flex flex-col">
    <div className="relative flex items-center">
      
        <div className="absolute inset-y-0 start-0 flex items-center px-2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <input
          type={type}
          id="search-icon"
          className="bg-white border border-gray-300 text-gray-900 font-semibold text-[0.6em] rounded-md placeholder-gray-600 block h-[4rem] min-w-full lg:w-[40rem] ps-12 p-5"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {errorMessage && (
        <p className="pt-2 text-[14px] font-bold text-red-600 dark:text-red-500">
          <span className="font-bold">Oops!</span> {errorMessage}
        </p>
      )}
    </div>
  );
}
