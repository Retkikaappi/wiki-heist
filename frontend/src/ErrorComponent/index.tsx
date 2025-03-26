const ErrorComponent = ({
  msg,
  failReason,
}: {
  msg: string;
  failReason: Error | null;
}) => {
  if (failReason?.name === 'SyntaxError') {
    return (
      <div className='m-4'>
        <p className=''>Server not responding</p>
      </div>
    );
  }
  return (
    <div className='m-4'>
      <p className=''>{msg}</p>
    </div>
  );
};

export default ErrorComponent;
