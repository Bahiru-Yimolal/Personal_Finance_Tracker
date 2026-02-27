// features/forms/components/fields/PdfUpload.jsx
import React from "react";
import { useField } from "formik";
import { Typography, Button } from "@mui/material";

const PdfUpload = ({ label, name }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      helpers.setValue(file);
    }
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Typography variant="subtitle1">{label}</Typography>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        style={{ display: "block", marginTop: "0.5rem" }}
      />
      {field.value && (
        <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
          {field.value.name}
        </Typography>
      )}
      {meta.touched && meta.error && (
        <Typography color="error" variant="caption">{meta.error}</Typography>
      )}
    </div>
  );
};

export default PdfUpload;
