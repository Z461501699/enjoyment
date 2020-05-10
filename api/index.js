import GApi from './gapi';
import ZApi from './zapi';
console.log(Object.keys({ ...GApi, ...ZApi }))
export default Object.assign(GApi, ZApi);
