import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleUser from "./SingleUser";

const Content = ({ searchTerm }) => {
  const [users, setUsers] = useState([]); // Başlangıç değeri boş bir dizi
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (currentPage, currentSearchTerm) => {
    setIsLoading(true);
    try {
      let url = "";
      if (currentSearchTerm) {
        // Arama yapıldığında GitHub Search API'sini kullan
        url = `https://api.github.com/search/users?q=${currentSearchTerm}&page=${currentPage}`;
      } else {
        // Arama yapılmadığında genel kullanıcı listesini getir
        url = `https://api.github.com/users?since=${(currentPage - 1) * 30}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // API'den gelen veriyi kontrol et
      const newUsers = currentSearchTerm ? data.items || [] : data || [];
      setUsers((prevUsers) =>
        currentPage === 1 ? newUsers : [...prevUsers, ...newUsers]
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Arama terimi değiştiğinde kullanıcıları yeniden getir
  useEffect(() => {
    setUsers([]); // Önceki kullanıcıları temizle
    setPage(1); // Sayfayı sıfırla
    fetchUsers(1, searchTerm); // API'ye yeni istek at
  }, [searchTerm]);

  // Sayfa değiştiğinde yeni kullanıcıları getir
  useEffect(() => {
    if (page > 1) {
      fetchUsers(page, searchTerm); // API'ye yeni istek at
    }
  }, [page, searchTerm]);

  // "Load More" butonu için sayfayı artır
  const loadMoreUsers = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Sayfanın en üstüne çık
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#ffffff]">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <li key={user.id} className="m-2">
            <Link to={`/users/${user.login}`}>
              <SingleUser user={user} />
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={loadMoreUsers}
        className={`mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md transform transition-all duration-300
    ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "hover:bg-gray-600 hover:scale-105 active:scale-95"
    }
  `}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          "Load More"
        )}
      </button>
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-2 items-center justify-center rounded-full text-5xl bg-transparent text-black"
      >
        <i class="fi fi-ts-angle-circle-up"></i>
      </button>
    </div>
  );
};

export default Content;
