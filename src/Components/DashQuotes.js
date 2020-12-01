const DashQuotes = (props) => {
  const { id, content, author, source } = props.quote;

  return (
    <li style={{ border: "2px solid black", margin: "5px" }}>
      <h2>"{content}"</h2>
      <h3>
        Author: {!author ? 'Unknown' : author}
        <br />
        Source: {!source ? 'Unknown' : source}
      </h3>
    </li>
  );
};

export default DashQuotes;
