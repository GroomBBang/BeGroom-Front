import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function TextInput({ label, type = 'text', placeholder, required = false }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-[#5f0080] focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
