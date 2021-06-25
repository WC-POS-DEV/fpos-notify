const sendBoardNotif = async (host, port, saleId) => {
  try {
    let notifRes = await fetch(
      `http://${host}:${port}/fpos/notify/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saleId }),
      }
    );
    return await notifRes.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

const sendPhoneNotif = async (host, port, saleId, phone) => {
  try {
    let notifRes = await fetch(
      `http://${host}:${port}/fpos/notify/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saleId, phoneNumber: phone }),
      }
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
