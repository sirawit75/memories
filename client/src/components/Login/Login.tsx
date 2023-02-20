import { Formik } from 'formik';
import { PulseLoader } from 'react-spinners';
import { useLoginMutation } from '../../generated/generated-types';
import { toErrorsMap } from '../../utils/funcs/toErrorsMap';


interface MyFormValues {
    username: string;
    password: string;
}


const Login = () => {
    const [{ fetching }, login] = useLoginMutation();
    const initialValues: MyFormValues = { username: '', password: '' };
    return (
        <div data-testid="login-form" className='w-3/4 md:w-1/3 mx-auto   text-center h-full bg-gray-200 shadow-lg rounded mt-6'>
            <div className='pt-3'>
                <h1 className='font-extrabold  text-xl text-gray-800'>Login</h1>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    if (response.data?.login.errors)
                        setErrors(toErrorsMap(response.data.login.errors));
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
                        </div>
                        <div className=''>
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
                                <p
                                    data-testid="login-errors"
                                    className='text-red-500 text-sm font-semibold p-2 text-start'>
                                    *{errors.password}
                                </p>
                            }
                        </div>
                        <br />
                        <button type="submit" disabled={isSubmitting} className={`${!isSubmitting ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600'} w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                            Log in
                        </button>
                        {isSubmitting && (
                            <div className='pt-6' data-testid="login-loading">
                                <PulseLoader color="#36d7b7" size={14} loading={fetching} />
                            </div>
                        )}
                        <div className='text-base font-semibold flex flex-col md:flex-row md:gap-2 mt-2'>
                            <p>Don't have an account?</p> <a className='text-blue-600 active:text-orange-600' href='/register'>  Sign up</a>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Login;