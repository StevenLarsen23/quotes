import "./Quotes.css";

const DashQuotes = (props) => {
  const { content, author, source } = props.quote;

  return (
    <div className="quote-box" style={{ border: "2px solid black" }}>
      <div>
        <h2 className="quote">"{content}"</h2>
        <br />
        <br />
        <br />
        <h3 className="quote-info">Author: {!author ? "Unknown" : author}</h3>
        <h3 className="quote-info">Source: {!source ? "Unknown" : source}</h3>
      </div>
    </div>
  );
};

export default DashQuotes;
