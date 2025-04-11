"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
}) => {
    return <div className="pt-2">
        <label className="block mb-2 
         dark:text-gray-100 text-md font-medium text-gray-900">{label}</label>
        
        <input onChange={(e) => onChange(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 dark:border-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 focus:text-white dark:text-white bg-[#fff]" placeholder={placeholder} />
    </div>
}