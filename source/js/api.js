let photos;

const getData = async (onSuccess, onError) => {
  try {
    const response = await fetch('https://23.javascript.pages.academy/kekstagram/data');
    const data = await response.json();

    onSuccess(data);
    photos = data;
  } catch (error) {
    onError(error);
  }
};

const sendData = async (onSuccess, onError, body) => {
  try {
    const response = await fetch( 'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },);

    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
};

export {getData, sendData, photos};
