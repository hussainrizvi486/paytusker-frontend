import { Button, FormInput, Freeze } from "../../components"
import { useGetUserDetailsQuery, useUpdateUserPasswordMutation } from "../../api"
import { UserSidebar, Header } from "../../layouts"
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


const Profile = () => {
  const urlSearchParams = useSearchParams()[0];
  const userProfileFields = [
    {
      "fieldname": "first_name",
      "label": "First Name",
      "read_only": true,
      "value": ""
    },
    {
      "fieldname": "last_name",
      "label": "Last Name",
      "read_only": true,
      "value": ""
    },
    {
      "fieldname": "username",
      "label": "Username",
      "read_only": true,
      "value": ""
    },
    {
      "fieldname": "email",
      "label": "Email",
      "read_only": true,
      "value": ""
    },
    {
      "fieldname": "phone_number",
      "label": "Phone Number",
      "read_only": true,
      "value": ""
    }
  ];

  const { data, isLoading, isError } = useGetUserDetailsQuery();
  if (isError) return <Navigate to={"/"} />
  if (data) { userProfileFields.map((val) => { val.value = data[val.fieldname || ""] }) }
  if (isLoading) return <Freeze />

  return (
    <div>
      <Header />

      <div className="sidebar-page">
        <UserSidebar />
        <div className="sidebar-page__content profile-page">
          <div>
            {urlSearchParams.get("edit") ?
              <>
                <div className="heading-md">Edit Profile</div>
                <EditProfile />
              </> :
              urlSearchParams.get("change_password") ?
                <>
                  <div className="heading-md">Change Password</div>
                  <ChangePassowrd />
                </> :
                <>
                  <div className="heading-md">My Profile</div>
                  <form className="user-details-grid" >
                    {userProfileFields?.map((val, idx) =>
                      <div className="input-box" key={idx}>
                        <div className="input-box__label">{val.label}</div>
                        <div className="input-box__input">
                          <input type="text" placeholder={val.label} name={val.fieldname}
                            readOnly={val.read_only}
                            defaultValue={val.value}
                          />
                        </div>
                      </div>
                    )}

                  </form>
                  {/* className="flex gap-2" */}
                  <div className="my-8 flex gap-2">
                    <Link className="sm__flex-auto" to="/profile/orders/pending">
                      <button className="btn btn-sm btn-primary sm__w-100 sm__flex-auto">My Orders</button>
                    </Link>

                    <Link className="sm__flex-auto" to={"/profile?change_password=true"}>
                      <button className="btn btn-sm btn-primary sm__w-100 ">Update Password</button>
                    </Link>

                  </div>
                </>

            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile


const EditProfile = () => {
  return (
    <div>

    </div>
  )
}

const ChangePassowrd = () => {
  const [updatePasswordApi, apiResponse] = useUpdateUserPasswordMutation();
  const [loading, setLoading] = useState(apiResponse.isLoading);
  const navigate = useNavigate();
  const currentPassRef = useRef();
  const newPassRef = useRef();

  const passwordObject = {
    "new_password": newPassRef.current?.value || "",
    "current_password": currentPassRef.current?.value || "",
  }


  useEffect(() => {
    if (apiResponse.isLoading) {
      setLoading(apiResponse.isLoading)
    }
  }, [apiResponse.isLoading])

  useEffect(() => {

    if (apiResponse.isError || apiResponse.isSuccess) {
      setLoading(false);
    }
    if (apiResponse.isError) {
      toast.error(apiResponse.error.data?.message || "Something went wrong");
    }
    if (apiResponse.isSuccess) {
      toast.success(apiResponse.data?.message || "Password updated");
      navigate("/profile");
    }
  }, [apiResponse.isError, apiResponse.isSuccess])


  const updatePass = () => {
    updatePasswordApi(passwordObject)
  }
  return (
    <div style={{
      maxWidth: "400px"
    }}>
      <br />

      <FormInput data={{
        mandatory: true,
        label: "Current Password",
        fieldname: "current_password",
        // fieldtype: "password",
      }}
        ref={currentPassRef}
        onChange={(e) => {
          passwordObject["current_password"] = e.target.value
        }}
      /><br />

      <FormInput data={{
        mandatory: true,
        label: "New Password",
        fieldname: "new_password",
        // fieldtype: "password",
      }}
        ref={newPassRef}
        onChange={(e) => {
          passwordObject["new_password"] = e.target.value
        }}


      /><br />

      <Button
        label="Change password"
        className="btn-primary"
        btnLoading={loading}
        onClick={updatePass}

      />
    </div>
  )
}
