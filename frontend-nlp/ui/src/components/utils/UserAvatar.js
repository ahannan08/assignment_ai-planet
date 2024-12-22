import React from 'react';
import '../../styles/UserAvatar.css';

const UserAvatar = ({ name }) => {
  const initial = name ? name[0].toUpperCase() : '?';
  
  return (
    <div className="user-avatar">
      {initial}
    </div>
  );
};

export default UserAvatar;