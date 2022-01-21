const baseURL = 'https://aykuv74hr9.execute-api.us-east-2.amazonaws.com/production'

export const fetchPackagesData = (packageJson, params) =>
  fetch(baseURL + "/upload-package-json", {
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
