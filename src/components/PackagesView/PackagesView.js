import { useContext, useMemo, useCallback } from "react";
import JSONTree from "react-json-tree";
import DataContext from "store/DataContext";
import PackageValue from "./PackageValue";
import PackageLabel from "./PackageLabel";
import ActivePackage from "./ActivePackage";

import "./PackagesView.css";

const PackagesView = () => {
  const {
    packageJson,
    packagesData,
    includeDevDependencies,
    setActivePackage,
  } = useContext(DataContext);

  const expandList = useMemo(
    () =>
      includeDevDependencies
        ? ["root", "dependencies", "devDependencies"]
        : ["root", "dependencies"],
    [includeDevDependencies]
  );

  const onClickCallback = useCallback(
    (pckg) => () => setActivePackage(pckg),
    [setActivePackage]
  );

  return (
    <>
      <div className="package-view">
        <h1>Package.json</h1>
        <JSONTree
          data={packageJson}
          getItemString={() => null}
          labelRenderer={([name, parent]) => (
            <PackageLabel
              displayValue={name}
              parent={parent}
              onClick={onClickCallback(name)}
            />
          )}
          valueRenderer={(displayValue, value, key, parent) => (
            <PackageValue
              displayValue={displayValue}
              current={value}
              name={key}
              parent={parent}
              latest={packagesData[key]?.latestVersion}
            />
          )}
          shouldExpandNode={(keyPath) => expandList.includes(keyPath[0])}
        />
      </div>
      <ActivePackage />
    </>
  );
};

export default PackagesView;
