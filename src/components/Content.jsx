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
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More"}
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
