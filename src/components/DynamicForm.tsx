import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface DynamicFormProps {
  formId: number;
  fields: FormField[];
  onSubmit: (values: any) => Promise<void>;
  initialValues?: Record<string, any>;
  submitButtonText?: string;
}

const DynamicForm = ({
  formId,
  fields,
  onSubmit,
  initialValues = {},
  submitButtonText = 'Submit'
}: DynamicFormProps) => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Generate Yup validation schema dynamically based on fields
  const generateValidationSchema = () => {
    const schema: Record<string, any> = {};

    fields.forEach(field => {
      let fieldSchema = Yup.string();

      if (field.required) {
        fieldSchema = fieldSchema.required(`${field.label} is required`);
      }

      // Add specific validations based on field type
      if (field.type === 'email') {
        fieldSchema = fieldSchema.email('Please enter a valid email address');
      } else if (field.type === 'number') {
        fieldSchema = Yup.number()
          .typeError('Please enter a valid number')
          .nullable();
        if (field.required) {
          fieldSchema = fieldSchema.required(`${field.label} is required`);
        }
      }

      schema[field.id] = fieldSchema;
    });

    return Yup.object().shape(schema);
  };

  // Create default initial values if not provided
  const getInitialValues = () => {
    const defaultValues: Record<string, any> = {};

    fields.forEach(field => {
      if (initialValues.hasOwnProperty(field.id)) {
        defaultValues[field.id] = initialValues[field.id];
      } else {
        // Set default values based on field type
        switch (field.type) {
          case 'number':
            defaultValues[field.id] = '';
            break;
          case 'checkbox':
            defaultValues[field.id] = false;
            break;
          case 'select':
            defaultValues[field.id] = field.options && field.options.length > 0 
              ? field.options[0].value 
              : '';
            break;
          default:
            defaultValues[field.id] = '';
        }
      }
    });

    return defaultValues;
  };

  const handleFormSubmit = async (
    values: Record<string, any>,
    { setSubmitting, resetForm }: FormikHelpers<Record<string, any>>
  ) => {
    try {
      await onSubmit({ ...values, formId });
      setSubmitStatus({
        type: 'success',
        message: 'Form submitted successfully!'
      });
      resetForm();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error submitting form. Please try again.'
      });
    } finally {
      setSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    }
  };

  return (
    <div>
      {submitStatus.type && (
        <Alert variant={submitStatus.type === 'success' ? 'success' : 'danger'}>
          {submitStatus.message}
        </Alert>
      )}

      <Formik
        initialValues={getInitialValues()}
        validationSchema={generateValidationSchema()}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} noValidate>
            {fields.map(field => (
              <Form.Group className="mb-3" key={field.id}>
                <Form.Label>{field.label}</Form.Label>

                {field.type === 'textarea' ? (
                  <Field
                    as="textarea"
                    id={field.id}
                    name={field.id}
                    className="form-control"
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : field.type === 'select' ? (
                  <Field
                    as="select"
                    id={field.id}
                    name={field.id}
                    className="form-select"
                  >
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ) : field.type === 'checkbox' ? (
                  <div className="form-check">
                    <Field
                      type="checkbox"
                      id={field.id}
                      name={field.id}
                      className="form-check-input"
                    />
                  </div>
                ) : (
                  <Field
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    className="form-control"
                    placeholder={field.placeholder}
                  />
                )}

                <ErrorMessage
                  name={field.id}
                  component="div"
                  className="text-danger mt-1"
                />
              </Form.Group>
            ))}

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="mt-3"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;