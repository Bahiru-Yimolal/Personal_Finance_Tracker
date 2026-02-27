// features/forms/components/FieldRenderer.jsx
import React from "react";
import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import SelectField from "./fields/SelectField";
import DateField from "./fields/DateField";
import FileUpload from "./fields/FileUpload";
import PhotoUpload from "./fields/PhotoUpload";
import AudioUpload from "./fields/AudioUpload";
import VideoUpload from "./fields/VideoUpload";
import PdfUpload from "./fields/PdfUpload";
import RepeatableGroup from "./fields/RepeatableGroup";

/**
 * FieldRenderer
 * Props:
 * - type: string (text, number, select, date, photo, video, audio, file, pdf, repeatable)
 * - name: string (Formik field name)
 * - label: string
 * - options: array (for select)
 * - fields: array (for repeatable group)
 * - ...rest: any other props passed to the field
 */
const FieldRenderer = ({ type, name, label, options, fields, ...rest }) => {
  switch (type) {
    case "text":
    case "email":
    case "phone":
      return <TextField name={name} label={label} {...rest} />;

    case "number":
      return <NumberField name={name} label={label} {...rest} />;

    case "select":
      return <SelectField name={name} label={label} options={options} {...rest} />;

    case "date":
      return <DateField name={name} label={label} {...rest} />;

    case "file":
      return <FileUpload name={name} label={label} accept={rest.accept} />;

    case "photo":
      return <PhotoUpload name={name} label={label} />;

    case "audio":
      return <AudioUpload name={name} label={label} />;

    case "video":
      return <VideoUpload name={name} label={label} />;

    case "pdf":
      return <PdfUpload name={name} label={label} />;

    case "repeatable":
      return <RepeatableGroup name={name} fields={fields} label={label} />;

    default:
      return <div>Unknown field type: {type}</div>;
  }
};

export default FieldRenderer;
