import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { zipObject as _zipObject, map as _map } from "lodash";
import Info from "../../components/Info";
import { useController, useFormContext } from "react-hook-form";

const ChoiceWidget = (props) => {
  const name = props.fieldName;
  const { control, errors } = useFormContext();
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: props.required },
    defaultValue: props.schema.value || "",
  });
  const className = classNames([
    "form-group",
    { "has-error": isTouched && invalid },
  ]);
  const options = props.schema.enum;
  const optionNames = props.schema.enum_titles || options;

  const selectOptions = _zipObject(options, optionNames);
  return (
    <div className={className}>
      {props.showLabel && (
        <label className="control-label" htmlFor={"field-" + name}>
          {props.label} {props.schema.required ? "*" : ""}
        </label>
      )}

      <select
        {...inputProps}
        ref={ref}
        className="form-control"
        id={"field-" + name}
        required={props.required}
        multiple={props.multiple}
      >
        {!props.required && !props.multiple && (
          <option key={""} value={""}>
            {props.placeholder}
          </option>
        )}
        {_map(selectOptions, (name, value) => {
          return (
            <option key={value} value={value}>
              {name}
            </option>
          );
        })}
      </select>

      {isTouched && invalid && (
        <div className="help-block">{errors[name].message}</div>
      )}

      {props.schema.description && (
        <Info
          title={props.schema.label ? props.schema.label : name}
          description={props.schema.description}
        />
      )}
    </div>
  );
};

// const ChoiceWidget = props => {
//   return (
//     <Field
//       component={renderSelect}
//       label={props.label}
//       name={props.fieldName}
//       required={props.required}
//       id={"field-" + props.fieldName}
//       placeholder={props.schema.default}
//       description={props.schema.description}
//       schema={props.schema}
//       multiple={props.multiple}
//       {...props}
//     />
//   );
// };

ChoiceWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
};

export default ChoiceWidget;
