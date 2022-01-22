import { useContext, useMemo } from "react";
import { PieChart } from "react-minimal-pie-chart";
import DataContext from "store/DataContext";
import {
  SEMVER_PARTS,
  SEMVER_COLORS,
  UP_TO_DATE,
  getSemverDiff,
} from "utils/semver.utils";

import "./PackagesStats.css";

const PackagesStats = () => {
  const {
    packageJson,
    packagesData,
    includeDevDependencies,
    vulnerabilitiesData,
  } = useContext(DataContext);

  const statsData = useMemo(
    () =>
      Object.keys({
        ...(packageJson.dependencies || {}),
        ...(includeDevDependencies ? packageJson.devDependencies : {}),
      }).reduce(
        (stats, packageName) => {
          const currentVersion =
            packageJson.dependencies[packageName] ||
            packageJson.devDependencies[packageName];
          const latestAvailableVersion =
            packagesData[packageName].latestVersion;
          const diffName = getSemverDiff(
            currentVersion,
            latestAvailableVersion
          );
          return { ...stats, [diffName]: stats[diffName] + 1 };
        },
        {
          [SEMVER_PARTS.MAJOR]: 0,
          [SEMVER_PARTS.MINOR]: 0,
          [SEMVER_PARTS.PATCH]: 0,
          [UP_TO_DATE]: 0,
        }
      ),
    [packageJson, packagesData, includeDevDependencies]
  );

  const pieChartData = useMemo(
    () =>
      Object.entries(statsData).reduce(
        (chartData, [title, value]) => [
          ...chartData,
          { title, value, color: SEMVER_COLORS[title] },
        ],
        []
      ),
    [statsData]
  );

  return (
    <div className="stats">
      <div className="column">
        <h1>Packages Stats</h1>
        <div className="chart">
          <PieChart data={pieChartData} animate={true} paddingAngle={1} />
        </div>
        <div className="legend">
          <p className="major-legend">
            MAJOR outdated: <b>{statsData[SEMVER_PARTS.MAJOR]}</b>
          </p>
          <p className="minor-legend">
            MINOR outdated: <b>{statsData[SEMVER_PARTS.MINOR]}</b>
          </p>
          <p className="patch-legend">
            PATCH outdated: <b>{statsData[SEMVER_PARTS.PATCH]}</b>
          </p>
          <p className="uptodate-legend">
            Up to date: <b>{statsData[UP_TO_DATE]}</b>
          </p>
        </div>
      </div>
      <div className="column">
        <h1>Direct Vulnerabilities Stats</h1>
        <div className="legend">
          <p className="major-legend">
            Critical: <b>{vulnerabilitiesData?.stats?.critical}</b>
          </p>
          <p className="minor-legend">
            High: <b>{vulnerabilitiesData?.stats?.high}</b>
          </p>
          <p className="patch-legend">
            Moderate: <b>{vulnerabilitiesData?.stats?.moderate}</b>
          </p>
          <p className="uptodate-legend">
            Low: <b>{vulnerabilitiesData?.stats?.low}</b>
          </p>
          <p className="info-legend">
            Info: <b>{vulnerabilitiesData?.stats?.info}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackagesStats;
