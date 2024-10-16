"use client";

import React, { useState } from "react";

interface WishFormProps {
  onSubmit: (name: string, message: string) => Promise<boolean>;
}

const WishForm: React.FC<WishFormProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("姓名和祝福语不能为空");
      return;
    }
    try {
      const success = await onSubmit(name, message);
      if (success) {
        setIsOpen(false);
        setName("");
        setMessage("");
        setError("");
        window.alert("提交成功, 感谢祝福");
      } else {
        setError("提交失败，请稍后再试");
      }
    } catch (error) {
      setError("提交失败，请稍后再试");
    }
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
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="您的姓名"
                className="w-full p-2 mb-4 border rounded"
                required
                maxLength={10}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="您的祝福语"
                className="w-full p-2 mb-4 border rounded h-32"
                required
                maxLength={30}
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
                  disabled={isLoading}
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
