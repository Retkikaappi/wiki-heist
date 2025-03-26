const LoadingDots = () => (
  <div className='pt-4 pb-20 flex flex-col items-center'>
    <div className='flex space-x-2'>
      <div className='w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]'></div>
      <div className='w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.1s]'></div>
      <div className='w-2 h-2 bg-white rounded-full animate-bounce'></div>
    </div>
  </div>
);

export default LoadingDots;
