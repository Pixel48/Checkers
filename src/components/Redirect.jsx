const Redirect = ({ to }) => {
  return (
    <head>
      <meta http-equiv="refresh" content={`0; url=${to}`} />
    </head>
  );
};

export default Redirect;
