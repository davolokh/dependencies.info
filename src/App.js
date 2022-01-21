import { useContext, useEffect, useMemo } from "react";
import DataContext from "store/DataContext";
import UploadFile from "components/UploadFile/UploadFile";
import PackagesStats from "components/PackagesStats/PackagesStats";
import PackagesView from "components/PackagesView/PackagesView";
import Loading from "components/Loading/Loading";
import Footer from "components/Footer/Footer";
import { fetchPackagesData } from "utils/fetch.uitls";
import { isEmpty } from "utils/basic.utils";

import "./App.css";

const App = () => {
  const { packageJson, packagesData, setPackagesData, includeDevDependencies } =
    useContext(DataContext);

  useEffect(() => {
    !isEmpty(packageJson) &&
      fetchPackagesData(packageJson, {
        devDependencies: includeDevDependencies,
      })
        .then((res) => res.json())
        .then((response) => setPackagesData(response.packagesData));
  }, [packageJson, setPackagesData, includeDevDependencies]);

  const packageJsonUploaded = useMemo(
    () => !isEmpty(packageJson),
    [packageJson]
  );

  const packagesMetaDataReady = useMemo(
    () => !isEmpty(packagesData),
    [packagesData]
  );

  return (
    <div className="App">
      {packageJsonUploaded ? (
        packagesMetaDataReady ? (
          <>
              <PackagesStats />
              <PackagesView />
              <Footer />
          </>
        ) : (
          <Loading />
        )
      ) : (
        <UploadFile />
      )}
    </div>
  );
};

export default App;
