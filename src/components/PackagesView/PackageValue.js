import { getSemverDiff, SEMVER_CLASSES, UP_TO_DATE } from "utils/semver.utils";

export const SHOWN_FOR = ["dependencies", "devDependencies"];

const PackageValue = ({ name, displayValue, current, latest, parent }) => {
  if (!SHOWN_FOR.includes(parent) || !current || !latest)
    return <em>{displayValue}</em>;

  const diff = getSemverDiff(current, latest);
  const className = SEMVER_CLASSES[diff];

  return (
    <>
      <span className="packageVersion">
        <span>{current}</span>,<span className={className}>&#9632;</span>
        {diff !== UP_TO_DATE && (
          <span className="comment">{` // available update to ${latest} `}</span>
        )}
      </span>
    </>
  );
};

export default PackageValue;
