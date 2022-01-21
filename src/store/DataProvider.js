import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import DataContext from "./DataContext";

const Provider = ({ children }) => {
  const [includeDevDependencies, setIncludeDevDependencies] = useState(false);
  const [packageJson, setPackageJson] = useState({});
  const [packagesData, setPackagesData] = useState({});
  const [vulnerabilitiesData, setVulnerabilitiesData] = useState([]);

  const value = useMemo(
    () => ({
      packageJson,
      setPackageJson,
      packagesData,
      setPackagesData,
      vulnerabilitiesData,
      setVulnerabilitiesData,
      includeDevDependencies,
      setIncludeDevDependencies,
    }),
    [
      packageJson,
      setPackageJson,
      packagesData,
      setPackagesData,
      vulnerabilitiesData,
      setVulnerabilitiesData,
      includeDevDependencies,
      setIncludeDevDependencies,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
