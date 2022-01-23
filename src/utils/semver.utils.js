export const SEMVER_PARTS = {
  MAJOR: "major",
  MINOR: "minor",
  PATCH: "patch",
};

export const UP_TO_DATE = "ok";

export const SEMVER_COLORS = {
  [SEMVER_PARTS.MAJOR]: "#ef233c",
  [SEMVER_PARTS.MINOR]: "#fb8500",
  [SEMVER_PARTS.PATCH]: "#ffb703",
  [UP_TO_DATE]: "#a7c957",
};

export const SEMVER_CLASSES = {
  [SEMVER_PARTS.MAJOR]: "outdated_major",
  [SEMVER_PARTS.MINOR]: "outdated_minor",
  [SEMVER_PARTS.PATCH]: "outdated_patch",
  [UP_TO_DATE]: "ok",
};

export const getSemverDiff = (current, actual) => {
  const currentParts = current.replace("^", "").split(".");
  const latestParts = actual.replace("^", "").split(".");

  if (currentParts[0] !== latestParts[0]) return SEMVER_PARTS.MAJOR;
  if (currentParts[1] !== latestParts[1]) return SEMVER_PARTS.MINOR;
  if (currentParts[2] !== latestParts[2]) return SEMVER_PARTS.PATCH;

  return UP_TO_DATE;
};
