interface UserData {
    // Пока будет any тк на сервере еще не реализовано
}

export interface AuthContextType {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    handleChangeUserData: boolean;
    setHandleChangeUserData: React.Dispatch<React.SetStateAction<boolean>>;
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    statusAuthLoading: 'starting' | 'completed';
}
