import { useContext, useMemo, useCallback } from "react";
import DataContext from "store/DataContext";

import "./PackagesView.css";

const PackagesView = () => {
  const { activePackage, setActivePackage, packagesData } =
    useContext(DataContext);

  const activePackageInfo = useMemo(
    () => activePackage && packagesData[activePackage],
    [activePackage, packagesData]
  );

  const closeActivePackageView = useCallback(
    () => setActivePackage(null),
    [setActivePackage]
  );

  return activePackage && activePackageInfo ? (
    <div className="info">
      <h1>Package Info</h1>
      <span className="closer" onClick={closeActivePackageView}>
        x
      </span>
      <ul>
        <li>Package: {activePackage}</li>
        <li>
          Homepage:{" "}
          {activePackageInfo.homepage ? (
            <a
              href={activePackageInfo.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activePackageInfo.homepage}
            </a>
          ) : '-'}
        </li>
        <li>Description: {activePackageInfo.description || '-'}</li>
        <li>License: {activePackageInfo.license || '-'}</li>
        <li>
          Author:{" "}
          {activePackageInfo.author?.name ? activePackageInfo.author?.name : "-"}{" "}
          {activePackageInfo.author?.email ? (
            <a href={`mailto: ${activePackageInfo.author?.email}`}>
              {activePackageInfo.author?.email}
            </a>
          ) : (
            ""
          )}
        </li>
        <li>
          GitHub:{" "}
          {activePackageInfo.gitRepo ? (
            <a
              href={activePackageInfo.gitRepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activePackageInfo.gitRepo}
            </a>
          ) : '-'}
        </li>
        <li>Latest Version: {activePackageInfo.latestVersion}</li>
        <li>
          Latest Version Released:{" "}
          {new Date(activePackageInfo.latestVersionReleaseTime).toGMTString()}
        </li>
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default PackagesView;
