import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ILoginData } from '@back-end/types';
import { useAppDispatch, useAppSelector, useTrans } from '@back-end/hooks';
import { Link } from 'react-router-dom';
import { config } from '@back-end/configs';
import { authApi } from '@back-end/apis';
import Form from '@back-end/components/Form';
import { authActions, selectAccessToken } from '@back-end/store/auth';

export const RegisterForm = () => {
  const trans = useTrans();

  const accessToken = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveError, setSaveError] = useState('');

  const methods = useForm<ILoginData>();
  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit((formData) => {
    if (isSubmitting) {
      return;
    }
    setSaveError('');
    setIsSubmitting(true);

    // authApi.sendRegister(formData).then(({ accessToken, errors, error }) => {
    //   setIsSubmitting(false);
    //   if (error) {
    //     setSaveError(error);
    //   }
    //   if (errors) {
    //     Object.entries(errors).map(([field, message]) => {
    //       return setError(field as keyof ILoginData, {
    //         type: 'manual',
    //         message,
    //       });
    //     });
    //   }
    //   if (accessToken?.length) {
    //     dispatch(authActions.setToken(accessToken));
    //   }
    // });
  });

  return (
    <div className="form-membership">
      <div className="d-flex justify-content-center">
        <div className="login-box mt-2 mb-4 container">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <Link to="/" className="h2 grid-max-1fr">
                <img
                  src="/assets/logo/fav.png"
                  alt={config.siteName}
                  className="brand-image img-circle elevation-3 bg-dark mr-2"
                  height={50}
                />
                <span className="font-weight-light">
                  <b>{config.siteName}</b>
                </span>
              </Link>
            </div>
            <div className="card-body">
              <div className="login-box-msg p-1 mb-1">
                <h3>{trans('create_account')}</h3>
              </div>
              {accessToken?.length ? (
                <div className="text-center">
                  <div className="h5 callout callout-success text-success">{trans('registration_was_successful')}</div>
                  <i className="fa fa-check-circle text-success fa-4x"></i>
                  <div className="text-success">
                    {trans('thanks_for_registering_to_complete_registration_follow_link')}
                  </div>
                  <Link to="/" className="btn btn-success mt-4">
                    {trans('return_to_the_home_page')}
                  </Link>
                </div>
              ) : (
                <FormProvider {...methods}>
                  <form onSubmit={onSubmit}>
                    {saveError?.length > 0 && (
                      <div className="callout callout-danger text-danger p-2 small">{saveError}</div>
                    )}

                    <Form.Row name="fullName" isRequired className="col-12">
                      <Form.InputGroup name="fullName" append={<i className="fas fa-user"></i>}>
                        <Form.InputBox name="fullName" disabled={isSubmitting} isRequired />
                      </Form.InputGroup>
                    </Form.Row>

                    <Form.Row name="email" isRequired className="col-12">
                      <Form.InputGroup name="email" append={<i className="fas fa-envelope"></i>}>
                        <Form.InputBox type="email" name="email" disabled={isSubmitting} isRequired />
                      </Form.InputGroup>
                    </Form.Row>

                    <Form.Row name="password" isRequired className="col-12">
                      <Form.InputGroup name="password" append={<i className="fas fa-lock"></i>}>
                        <Form.InputBox type="password" name="password" disabled={isSubmitting} isRequired />
                      </Form.InputGroup>
                    </Form.Row>

                    <Form.Row name="passwordConfirm" isRequired className="col-12">
                      <Form.InputGroup name="passwordConfirm" append={<i className="fas fa-lock"></i>}>
                        <Form.InputBox type="password" name="passwordConfirm" disabled={isSubmitting} isRequired />
                      </Form.InputGroup>
                    </Form.Row>

                    <Form.Row name="phone" className="col-12">
                      <Form.InputGroup name="phone" append={<i className="fas fa-phone"></i>}>
                        <Form.InputBox name="phone" disabled={isSubmitting} />
                      </Form.InputGroup>
                    </Form.Row>

                    <Form.Button
                      isSubmitting={isSubmitting}
                      label={trans('create_account')}
                      icon={<i className="fa fa-sign-in mr-1"></i>}
                      className="btn btn-primary btn-block mt-2 mb-3"
                    />

                    <div className="mt-2">
                      <div className="text-center">
                        <div className="text-muted">{trans('already_have_an_account')}?</div>
                        <Link to="/login" className="btn btn-outline-primary m-1">
                          {trans('sign_in')}
                        </Link>
                      </div>
                    </div>
                  </form>
                </FormProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
