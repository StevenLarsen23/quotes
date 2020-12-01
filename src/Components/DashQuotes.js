const DashQuotes = (props) => {
  const { content, author, source } = props.quote;

  return (
    <li style={{ border: "2px solid black", margin: "5px" }}>
      <h2>"{content}"</h2>
      <br />
      <h3>
        Author: {!author ? "Unknown" : author}
        <br />
        <br />
        Source: {!source ? "Unknown" : source}
      </h3>
    </li>
  );
};

export default DashQuotes;
