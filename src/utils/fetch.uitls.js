export const fetchPackagesData = (packageJson, params) =>
  fetch(process.env.REACT_APP_BASE_URL + "/upload-package-json", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      packageJson,
      origin: "ui",
      params,
    }),
  });
