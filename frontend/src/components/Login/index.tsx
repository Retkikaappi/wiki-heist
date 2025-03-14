const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className='flex flex-col justify-center items-center p-4'>
      <p className='mb-4'>Admin login</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input
          type='text'
          className='bg-white placeholder-gray-700 text-black  rounded-xs p-1 text-center'
          placeholder='username'
        />
        <input
          type='password'
          className='bg-white placeholder-gray-700 text-black rounded-xs p-1 text-center'
          placeholder='password'
        />
        <button className='bg-bazaarBtn rounded-xs p-1 cursor-pointer hover:bg-blue-500 transition'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
