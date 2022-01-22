import { useContext, useMemo } from "react";
import JSONTree from "react-json-tree";
import DataContext from "store/DataContext";
import PackageValue from "./PackageValue";

import "./PackagesView.css";

const theme = {
  scheme: 'monokai',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};
const PackagesView = () => {
  const { packageJson, packagesData, includeDevDependencies, setActivePackage } =
    useContext(DataContext);

  const expandList = useMemo(
    () =>
      includeDevDependencies
        ? ["root", "dependencies", "devDependencies"]
        : ["root", "dependencies"],
    [includeDevDependencies]
  );

  return (
    <div className="package-view">
      <h1>Package.json</h1>
      <JSONTree
        theme={theme}
        data={packageJson}
        getItemString={() => null}
        valueRenderer={(displayValue, value, key, parent) => (
          <PackageValue
            displayValue={displayValue}
            current={value}
            name={key}
            parent={parent}
            latest={packagesData[key]?.latestVersion}
            onClick={setActivePackage}
          />
        )}
        shouldExpandNode={(keyPath) => expandList.includes(keyPath[0])}
      />
    </div>
  );
};

export default PackagesView;
