import { useDispatch } from "react-redux"
import { Freeze } from "../../components"
import { useGetUserDetailsQuery } from "../../api"
import { UserSidebar, Header } from "../../layouts"
import { LogOut } from "../../redux/slices/authSlice"
import { useSearchParams } from "react-router-dom"

const Profile = () => {
  const dispatch = useDispatch();
  const urlSearchParams = useSearchParams()[0]

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
  ]

  const { data, isLoading } = useGetUserDetailsQuery();

  if (data) { userProfileFields.map((val) => { val.value = data[val.fieldname || ""] }) }
  if (isLoading) return <Freeze />

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="sidebar-page">
        <UserSidebar />

        <div className="sidebar-page__content profile-page">
          <div>

            {
              urlSearchParams.get("edit") ?
                <>       <div className="heading-md">Edit Profile</div>
                  <EditProfile />
                </>

                :
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
                </>

            }
            <br />
            <br />
            <div>
              <button
                style={{
                  color: "#fff",
                  backgroundColor: "#ff5a5a"
                }}
                onClick={() => {
                  dispatch(LogOut())
                  window.location.reload()
                }}
                className="btn btn-sm">Logout</button>
            </div>
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