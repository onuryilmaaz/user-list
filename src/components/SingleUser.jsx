import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SingleUser = ({ user }) => {
  return (
    <motion.div
      className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-6 m-4 hover:shadow-xl transition-shadow flex justify-center items-center border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        rotate: 1,
        transition: { duration: 0.3 },
      }}
    >
      <div className="p-4 text-center">
        <Link to={`/users/${user.login}`}>
          {/* Avatar */}
          <img
            className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-gray-300 shadow-sm"
            src={user.avatar_url}
            alt="User Avatar"
          />
          {/* User Details */}
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {user.login}
            </h3>
            <p className="text-gray-600 text-sm truncate">Email: {user.url}</p>
            <p className="text-gray-600 text-sm">ID: {user.id}</p>
            <p className="text-gray-500 text-xs">{user.node_id}</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default SingleUser;
