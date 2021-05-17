const sendBoardNotif = async (saleID) => {
  try {
    let notifRes = await fetch(
      `http://192.168.1.11:8000/fpos/notify/${saleID}/`
    );
    return await notifRes.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

const sendPhoneNotif = async (saleID, phone) => {
  try {
    let notifRes = await fetch(
      `http://192.168.1.11:8000/fpos/phone/${saleID}/${phone}/`
    );
    return await notifRes.json();
  } catch (err) {
    console.log(err);
  }
};

const useNotify = () => {
  return { sendBoardNotif, sendPhoneNotif };
};

export default useNotify;
