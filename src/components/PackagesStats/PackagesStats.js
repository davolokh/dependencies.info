import { useContext, useMemo } from "react";
import { PieChart } from "react-minimal-pie-chart";
import DataContext from "store/DataContext";
import {
  SEMVER_PARTS,
  SEMVER_COLORS,
  UP_TO_DATE,
  getSemverDiff,
} from "utils/semver.utils";

import { vulnerabilitiesStubData } from "samples/vulnerabilitiesStubData";

import "./PackagesStats.css";

const PackagesStats = () => {
  const { packageJson, packagesData, includeDevDependencies } =
    useContext(DataContext);

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
        <h1>Packages stats</h1>
        <div className="chart">
          <PieChart data={pieChartData} animate={true} paddingAngle={1} />
        </div>
        <div className="legend">
          <p className="major-legend">
            MAJOR outdated: {statsData[SEMVER_PARTS.MAJOR]}
          </p>
          <p className="minor-legend">
            MINOR outdated: {statsData[SEMVER_PARTS.MINOR]}
          </p>
          <p className="patch-legend">
            PATCH outdated: {statsData[SEMVER_PARTS.PATCH]}
          </p>
          <p className="uptodate-legend">Up to date: {statsData[UP_TO_DATE]}</p>
        </div>
      </div>
      <div className="column disabled">
        <h1>Vulnerabilities stats</h1>
        <span className="coming-soon">coming soon...</span>
        <div className="chart">
          <PieChart
            data={vulnerabilitiesStubData}
            animate={true}
            paddingAngle={1}
          />
        </div>
        <div className="legend">
          <p className="major-legend">
            Critical: {statsData[SEMVER_PARTS.MAJOR]}
          </p>
          <p className="minor-legend">
            High: {statsData[SEMVER_PARTS.MINOR]}
          </p>
          <p className="patch-legend">
            Medium: {statsData[SEMVER_PARTS.PATCH]}
          </p>
          <p className="uptodate-legend">Low: {statsData[UP_TO_DATE]}</p>
        </div>
      </div>
    </div>
  );
};

export default PackagesStats;
