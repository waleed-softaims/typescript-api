export const getAirtableDatas = async (url: string) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, config);
    const datas = await response.json();
    return datas;
  } catch (err) {
    return err;
  }
};

export default getAirtableDatas;
