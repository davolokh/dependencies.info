import { useCallback } from "react";
import {
  getSemverDiff,
  SEMVER_CLASSES,
  SEMVER_ICONS,
} from "utils/semver.utils";

export const SHOWN_FOR = ["dependencies", "devDependencies"];

const PackageValue = ({ displayValue, current, latest, parent, onClick }) => {
  const onClickCallback = useCallback(() => onClick(displayValue), [displayValue, onClick]);

  if (!SHOWN_FOR.includes(parent) || !current || !latest)
    return <em>{displayValue}</em>;

  const diff = getSemverDiff(current, latest);
  const className = SEMVER_CLASSES[diff];
  const icon = SEMVER_ICONS[diff];

  return (
    <>
      <span className={className} onClick={onClickCallback}>
        <span>
          <span>{current}</span>
        </span>
        <span>{icon ? `(${icon} ${latest})` : ""}</span>
      </span>
    </>
  );
};

export default PackageValue;
