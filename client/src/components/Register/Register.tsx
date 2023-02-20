import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { PulseLoader } from 'react-spinners';
import { useRegisterMutation } from '../../generated/generated-types';
import { toErrorsMap } from '../../utils/funcs/toErrorsMap';

interface MyFormValues {
    username: string;
    password: string;
    confirmPassword: string;
}

interface ErrorsProps {
    username?: string;
    password?: string;
    confirmPassword?: string;
}


const Register = () => {

    const [, register] = useRegisterMutation();
    const router = useRouter();
    const initialValues: MyFormValues = { username: '', password: '', confirmPassword: '' };
    const btn = 'bg-sky-400  hover:bg-sky-600';
    return (
        <div data-testid="register-form" className=' w-3/4 md:w-1/3 mx-auto   text-center h-full bg-gray-200 shadow-lg rounded mt-6'>
            <div className='pt-3'>
                <h1 className='font-extrabold  text-xl text-gray-800'>Register</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validate={values => {
                    const errors: ErrorsProps = {};
                    if (values.username.length < 3 && values.username.length) {
                        errors.username = 'Username must be at least 3 characters';
                    } else if (values.username.length > 9 && values.username.length) {
                        errors.username = 'Username must less than 9 characters';
                    } else if (values.password.length < 3 && values.password.length) {
                        errors.password = 'Password must be at least 3 characters';
                    } else if (values.confirmPassword !== values.password && values.confirmPassword.length) {
                        errors.confirmPassword = 'Password does not match';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values);
                    if (response.data?.register.errors)
                        setErrors(toErrorsMap(response.data.register.errors));
                    else if (response.data?.register.user)
                        router.replace('/login');
                }}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4'>
                        <div className='mb-4'>
                            <div className='text-start font-bold p-2 text-base text-gray-600'>
                                <label htmlFor="username" className=''>Username</label>
                            </div>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                placeholder="Username"
                                required
                                className='w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                autoFocus
                            />
                            {
                                errors.username &&
                                <p data-testid="register-errors" className='text-red-500 text-sm font-semibold p-2 text-start'>
                                    *{errors.username}
                                </p>
                            }

                        </div>
                        <div className='mb-4'>
                            <div className='text-start font-bold p-2 text-base text-gray-600'>
                                <label htmlFor="password" className=''>Password</label>
                            </div>
                            <input
                                type='password'
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                required
                                className='w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                            {
                                errors.password &&
                                <p data-testid="register-errors" className='text-red-500 text-sm font-semibold p-2 text-start'>
                                    *{errors.password}
                                </p>
                            }
                        </div>
                        <div>
                            <div className='text-start font-bold p-2 text-base text-gray-600'>
                                <label htmlFor="confirmPassword" className=''>Confirm password</label>
                            </div>
                            <input
                                type='password'
                                name="confirmPassword"
                                placeholder="Confirm password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                required
                                className='w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                            {
                                errors.confirmPassword &&
                                <p data-testid="register-errors" className='text-red-500 text-sm font-semibold p-2 text-start'>
                                    *{errors.confirmPassword}
                                </p>
                            }
                        </div>
                        <br />
                        <button type="submit" disabled={isSubmitting} className={`${Object.keys(errors).length ? "bg-gray-600" : btn} w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                            Register
                        </button>
                        {isSubmitting && (

                            <div className='pt-6' data-testid="register-loading">
                                <PulseLoader color="#36d7b7" size={14} loading={isSubmitting} />
                            </div>
                        )}
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Register;