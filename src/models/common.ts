const url = 'http://localhost:8080/api';
 
const parseResponse = (data: any) => {
  return data.message;
};


const parseError = (data: any) => {
  const err = data?.error?.data[0]?.msg?.split('!:::');
  return err ? (err[1] ? err[1] : err[0]) : 'Something went wrong !';
};
 interface ILanguage {
  code:string;
  name:string;
}

const defaultLanguage: ILanguage = {
  code: 'english', 
  name: 'English'
};

export { url, parseResponse, parseError,defaultLanguage };
