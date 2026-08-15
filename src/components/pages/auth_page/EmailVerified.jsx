import {
    Link,
    useSearchParams,
} from "react-router-dom";

import './emailVerified.css'
const EmailVerified = () => {

    const [
        searchParams
    ] = useSearchParams();

    const status =
        searchParams.get("status");

    const isSuccess =
        status === "success";

    return (
        <div className="email-verified-page">

            <div className="email-verified-card">

                {isSuccess ? (

                    <>
                        <div
                            className="
                                email-verified-icon
                                email-success-icon
                            "
                        >
                            ✓
                        </div>

                        <h1>
                            Email Verified!
                        </h1>

                        <p>
                            Your email address has
                            been verified successfully.
                            Your account is now ready
                            to use.
                        </p>

                        <Link
                            to="/login"
                            className="
                                email-verified-button
                            "
                        >
                            Go to Login
                        </Link>
                    </>

                ) : (

                    <>
                        <div
                            className="
                                email-verified-icon
                                email-failed-icon
                            "
                        >
                            !
                        </div>

                        <h1>
                            Verification Failed
                        </h1>

                        <p>
                            This verification link is
                            invalid or has expired.
                            Please request a new
                            verification email.
                        </p>

                        <Link
                            to="/login"
                            className="
                                email-verified-button
                            "
                        >
                            Back to Login
                        </Link>
                    </>

                )}

            </div>

        </div>
    );
};

export default EmailVerified;