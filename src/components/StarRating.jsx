// import '../App.css'
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const startContainerStyle = {
    display: 'flex',
    gap: '4px'
}
const textStyle = {
    lineHeight: "1",
    margin: "0"
}
const StarRating = ({maxRating=5}) => { //default value of maxRating will be 5 if no value for maxRatings is provided in the props
  return (
    <div style={containerStyle}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>S{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
};

export default StarRating;
