// features/forms/components/fields/RepeatableGroup.jsx
import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { Box, Button, Typography, Divider } from "@mui/material";
import FieldRenderer from "../FieldRenderer";

/**
 * RepeatableGroup
 * Props:
 * - name: Formik array field name (e.g., "children")
 * - fields: Array of field schemas for each item
 * - label: Optional section label
 */
const RepeatableGroup = ({ name, fields, label }) => {
  const { values } = useFormikContext();
  const items = values[name] || [];

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <Box mb={3}>
          {label && <Typography variant="h6">{label}</Typography>}

          {items.length > 0 &&
            items.map((item, index) => (
              <Box
                key={index}
                mb={2}
                p={2}
                border="1px solid #ddd"
                borderRadius={2}
                position="relative"
              >
                {fields.map((field) => (
                  <FieldRenderer
                    key={field.name}
                    {...field}
                    name={`${name}[${index}].${field.name}`}
                  />
                ))}

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => arrayHelpers.remove(index)}
                  style={{ marginTop: "1rem" }}
                >
                  Remove
                </Button>
              </Box>
            ))}

          <Button
            variant="contained"
            color="primary"
            onClick={() => arrayHelpers.push({})} // push empty object, can prefill defaults
          >
            Add {label || "Item"}
          </Button>
        </Box>
      )}
    />
  );
};

export default RepeatableGroup;
