export const dataBase = `https://test-lucas-594ea.firebaseio.com`;
export const params = { headers: { 'Access-Control-Allow-Origin': '*' } };
export const schema = { name: '', price: '', category: '', desc: '', id: '' };
export const loginSchema = { email: '', password: '' };
const apiKey = 'AIzaSyAGQtn7z7nfZVPKzx6Mf_Mkgyw2wo-Lhr8';
export const endpointAUTH = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
export const checkExpired = () =>
  new Date() / 1000 < localStorage.getItem('expired');
