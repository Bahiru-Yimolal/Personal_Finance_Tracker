// features/forms/components/fields/AudioUpload.jsx
import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { Typography } from "@mui/material";

const AudioUpload = ({ label, name }) => {
  const [field, meta, helpers] = useField(name);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (field.value) {
      const objectUrl = URL.createObjectURL(field.value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [field.value]);

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
        accept="audio/*"
        onChange={handleChange}
        style={{ display: "block", marginTop: "0.5rem" }}
      />
      {preview && (
        <audio controls style={{ marginTop: "0.5rem", width: "100%" }}>
          <source src={preview} />
          Your browser does not support the audio element.
        </audio>
      )}
      {meta.touched && meta.error && (
        <Typography color="error" variant="caption">{meta.error}</Typography>
      )}
    </div>
  );
};

export default AudioUpload;
