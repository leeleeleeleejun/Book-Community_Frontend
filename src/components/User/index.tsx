import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userKey, editUserInfo } from "@/types";
import EditProfileImage from "./EditProfileImage";
import FormField from "@/components/common/FormField";
import ValidErrorMessage from "@/components/common/ValidErrorMessage";
import FormButton from "@/components/common/FormButton";
import { EditUserInfoValidate } from "@/utils/validate";
import { ModalContainer } from "@/components/common/ModalContainer";
import CloseButton from "@/assets/CloseButton.svg?react";
import { closeModal, setUser } from "./UserSlice";
import { RootState } from "@/store";
import { deleteUser, editUserInfoAPI } from "@/api/userAPI";
import {
  Content,
  Header,
  WithdrawalButton,
  EditUserModalBox,
} from "./EditUser.style";

const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserSlice.userInfo);
  const [editUserInfo, setEditUserInfo] = useState<editUserInfo>({
    nickname: user ? user.nickname : "",
    introduction: user ? user.introduction : "",
    password: "",
    confirmPassword: "",
    phone_number: user ? user.phone_number : "",
  });

  const [validateError, serValidateError] = useState("");

  const { nickname, introduction, password, confirmPassword, phone_number } =
    editUserInfo;

  const setEditUserInfoFunc = useCallback((value: string, key?: userKey) => {
    if (!key) return;
    setEditUserInfo((prev) => ({ ...prev, [key]: value }));
  }, []);

  if (!user) return null;

  const editUserInfoFunc = async () => {
    const validateResult = EditUserInfoValidate(editUserInfo, serValidateError);
    if (validateResult) {
      const editUser = {
        ...user,
        nickname: editUserInfo.nickname || user.nickname,
        introduction: editUserInfo.introduction || user.introduction,
        password: editUserInfo.password || user.password,
        phone_number: editUserInfo.phone_number || user.phone_number,
      };

      delete editUser.confirmPassword;
      dispatch(setUser(editUser));
      const response = await editUserInfoAPI(editUser);
      if (response) {
        dispatch(closeModal());
      }
    }
  };

  const deleteUserFunc = async () => {
    const userAnswer = confirm("회원을 탈퇴하시겠습니까?");

    if (userAnswer && user._id) {
      const response = await deleteUser(user._id);
      if (response?.ok) {
        dispatch(closeModal());
        dispatch(setUser(null));
        localStorage.removeItem("token");
      }
    }
  };

  return (
    <ModalContainer>
      <EditUserModalBox>
        <button
          className="close"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          <CloseButton />
        </button>
        <Header>
          <h3>회원정보 수정</h3>
          <p>프로필과 정보를 변경할 수 있습니다.</p>
        </Header>
        <Content>
          <EditProfileImage />
          <FormField
            name="nickname"
            type="text"
            placeholder="2글자 이상"
            value={nickname}
            onChange={setEditUserInfoFunc}
          />
          <FormField
            name="introduction"
            type="text"
            placeholder="한 줄로 나를 소개해 주세요"
            value={introduction}
            onChange={setEditUserInfoFunc}
          />
          <FormField
            name="password"
            type="password"
            placeholder="특수문자, 문자, 숫자 포함 8~15자"
            value={password}
            onChange={setEditUserInfoFunc}
          />
          <FormField
            name="confirmPassword"
            type="password"
            placeholder="특수문자, 문자, 숫자 포함 8~15자"
            value={confirmPassword}
            onChange={setEditUserInfoFunc}
          />
          <FormField
            name="phone_number"
            type="tel"
            placeholder="01011112222"
            value={phone_number}
            onChange={setEditUserInfoFunc}
          />
          <ValidErrorMessage>{validateError}</ValidErrorMessage>
          <FormButton onClick={editUserInfoFunc}>수정하기</FormButton>
          <WithdrawalButton onClick={deleteUserFunc}>탈퇴하기</WithdrawalButton>
        </Content>
      </EditUserModalBox>
    </ModalContainer>
  );
};

export default EditUser;
