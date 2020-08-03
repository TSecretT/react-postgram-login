import React from "react";
import styled from "styled-components";
import { Button, Layout, Input, message } from "antd";
import { useFirebase } from "../firebase/useFirebase";
import { Link } from "@reach/router";

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

function MainPage() {
  const { user, signout, changePassword } = useFirebase();
  const [changingPassword, setChangingPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState();

  const onLogoutClick = () => {
    try {
      signout();
      message.success('Signed out');
    } catch (error) {
      message.error(error.message);
    }
  };

  const onPasswordChangeClick = (text) => {
    if (changingPassword){
      try {
        changePassword(newPassword);
        message.success("Password changed");
      } catch (error) {
        message.error(error.message);
      }
    }
    setChangingPassword(!changingPassword);
  }

  if (!user) {
    return (
      <MainLayout>
        <div>
          Please login in <Link to="/login">here</Link>
        </div>
        <div>
          or register <Link to="/register">here</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {changingPassword? (
        <>
          <Input onChange={(e) => {setNewPassword(e.target.value); console.log(e.target.value)}} placeholder="New Password" />
          <Button onClick={onPasswordChangeClick}>Change Password</Button>
        </>
      ):(
        <Button onClick={onPasswordChangeClick}>Change Password</Button>
      )}
      
      <Button onClick={onLogoutClick}>Logout</Button>
    </MainLayout>
  );
}

export default MainPage;
