import { useContext, useCallback } from "react";
import DataContext from "store/DataContext";
import { samplePackageJson } from "samples/samplePackageJSON";

import "./UploadFile.css";

const UploadFile = () => {
  const { setPackageJson, includeDevDependencies, setIncludeDevDependencies } =
    useContext(DataContext);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];

      var reader = new FileReader();
      reader.onload = (readEvent) => {
        const data = readEvent.target.result;
        setPackageJson(JSON.parse(data));
      };
      reader.readAsText(file);
    },
    [setPackageJson]
  );

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onSampleSelect = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setPackageJson(samplePackageJson);
    },
    [setPackageJson]
  );

  const onChangeCallback = useCallback(
    () => setIncludeDevDependencies(!includeDevDependencies),
    [setIncludeDevDependencies, includeDevDependencies]
  );

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="drop-file" onDrop={onDrop} onDragOver={onDragOver}>
          <div className="drop-file-text">
            <p>
              <p>📄 Drop package.json file here to start</p>
              Or use{" "}
              <span className="sample-link" onClick={onSampleSelect}>
                sample package.json
              </span>{" "}
              to see how app works
            </p>
            <p>
              Settings:<br></br>
              <input
                type="checkbox"
                checked={includeDevDependencies}
                onChange={onChangeCallback}
              />
              including devDependencies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
