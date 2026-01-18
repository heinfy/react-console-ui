import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); // 获取路由参数

  return (
    <div>
      <h1>User ID: {id}</h1>
    </div>
  );
};

export default UserProfile;

