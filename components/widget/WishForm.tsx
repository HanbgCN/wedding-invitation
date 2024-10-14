import React, { useState } from "react";

interface WishFormProps {
  onSubmit: (name: string, message: string) => void;
}

const WishForm: React.FC<WishFormProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, message);
    setIsOpen(false);
    setName("");
    setMessage("");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-3 text-left bg-white bg-opacity-30 rounded-xl shadow-md focus:outline-none"
      >
        点击留言...❤️
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-2xl p-6 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4">留下您的祝福</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="您的姓名"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="您的祝福语"
                className="w-full p-2 mb-4 border rounded h-32"
                required
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 mr-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out shadow-md"
                >
                  提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishForm;
