export const SEMVER_PARTS = {
  MAJOR: "major",
  MINOR: "minor",
  PATCH: "patch",
};

export const UP_TO_DATE = "ok";

export const SEMVER_COLORS = {
  [SEMVER_PARTS.MAJOR]: "red",
  [SEMVER_PARTS.MINOR]: "orange",
  [SEMVER_PARTS.PATCH]: "yellow",
  [UP_TO_DATE]: "green",
};

export const SEMVER_CLASSES = {
  [SEMVER_PARTS.MAJOR]: "outdated_major",
  [SEMVER_PARTS.MINOR]: "outdated_minor",
  [SEMVER_PARTS.PATCH]: "outdated_patch",
  [UP_TO_DATE]: "ok",
};

export const SEMVER_ICONS = {
  [SEMVER_PARTS.MAJOR]: "❗",
  [SEMVER_PARTS.MINOR]: "⚠️",
  [SEMVER_PARTS.PATCH]: "❔",
  [UP_TO_DATE]: null,
};


export const getSemverDiff = (current, actual) => {
  const currentParts = current.replace("^", "").split(".");
  const latestParts = actual.replace("^", "").split(".");

  if (currentParts[0] !== latestParts[0]) return SEMVER_PARTS.MAJOR;
  if (currentParts[1] !== latestParts[1]) return SEMVER_PARTS.MINOR;
  if (currentParts[2] !== latestParts[2]) return SEMVER_PARTS.PATCH;

  return UP_TO_DATE;
};
