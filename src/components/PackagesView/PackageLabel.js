export const SHOWN_FOR = ["dependencies", "devDependencies"];

const PackageLabel = ({ displayValue, parent, onClick }) => {
  if (!SHOWN_FOR.includes(parent)) return <em>{displayValue}:</em>;

  return <em className="clickable" onClick={onClick}>{displayValue}:</em>;
};

export default PackageLabel;
