import React from 'react'

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile





// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { sendPasswordResetEmail, signOut } from "firebase/auth";
// import { fireauth } from "../../firebase";

// import Header from "../../Components/Header/Header";
// import ProfileCard from "../../Components/ProfileCard/ProfileCard"
// import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
// import { logout } from "../../Components/Slices/authSlice"
// import ResetPassword from "../../Components/ResetPassword/ResetPassword";

// const Profile = () => {
//   const [resetPasswordEmail, setResetPasswordEmail] = useState("");
//   const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
//     string | null
//   >(null);
//   const [resetPasswordError, setResetPasswordError] = useState<string | null>(
//     null
//   );
//   const [resetPassword, setResetPassword] = useState(false);

//   const { user } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await signOut(fireauth);
//     dispatch(logout());
//   };

//   const handlePasswordReset = async () => {
//     if (!resetPasswordEmail.length) return;
//     try {
//       await sendPasswordResetEmail(fireauth, resetPasswordEmail);
//       setResetPasswordSuccess(
//         "Password reset email sent. Please check your inbox."
//       );
//       setResetPasswordError(null);
//     } catch (error: any) {
//       setResetPasswordError(error.message);
//       setResetPasswordSuccess(null);
//     }
//   };

//   // useEffect(() => {
//   //   if (Boolean(!user)) {
//   //     navigate("/auth");
//   //   }
//   // }, [navigate, user]);

//   return (
//     <>
//       <Header />
//       <ResetPassword
//         handlePasswordReset={handlePasswordReset}
//         isOpen={resetPassword}
//         onClose={() => setResetPassword(false)}
//         resetPasswordEmail={resetPasswordEmail}
//         resetPasswordError={resetPasswordError}
//         resetPasswordSuccess={resetPasswordSuccess}
//         setResetPasswordEmail={setResetPasswordEmail}
//       />
//       {user && (
//         <ProfileCard
//           setResetPassword={() => setResetPassword(true)}
//           user={user}
//           handleLogout={handleLogout}
//         />
//       )}
//     </>
//   );
// };

// export default Profile;