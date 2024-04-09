import apiUser from "../../services/apiUser";
import { generateAndSaveDeviceId, getDeviceId } from "../../utils/asyncStoreFunctions";
import { getToken, getUserId, saveUserId } from "../../utils/secureStoreFunctions";

async function getUserData() {
    const token = await getToken();
    let idUser = await getUserId();
    if (!idUser) {
        await saveUserId('userId');
        idUser = 'userId';
    }
    await generateAndSaveDeviceId();
    const deviceId = await getDeviceId();
    // Получить данные о пользователе и проверить авторизацию
    const userData = await apiUser.getSelfUser(token, deviceId);
    return userData;
}

export { getUserData }