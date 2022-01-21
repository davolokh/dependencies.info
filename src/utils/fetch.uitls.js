export const fetchPackagesData = (packageJson, params) =>
  fetch("/upload-package-json", {
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
