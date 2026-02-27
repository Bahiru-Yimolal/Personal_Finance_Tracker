// features/forms/components/fields/FileUpload.jsx
import React from "react";
import { useField } from "formik";
import { Button, Typography } from "@mui/material";

const FileUpload = ({ label, name, accept = "*/*" }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    helpers.setValue(file);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Typography variant="subtitle1">{label}</Typography>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: "block", marginTop: "0.5rem" }}
      />
      {field.value && <Typography variant="body2">{field.value.name}</Typography>}
      {meta.touched && meta.error && (
        <Typography color="error" variant="caption">{meta.error}</Typography>
      )}
    </div>
  );
};

export default FileUpload;
