import { useState } from "react";

const Switch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </div>
  );
};

export default Switch;
