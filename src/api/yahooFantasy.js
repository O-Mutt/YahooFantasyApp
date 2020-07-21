import YahooFantasy from 'yahoo-fantasy';
import cookieStorage from 'cookie-storage';

const yf = new YahooFantasy(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
if (cookieStorage.getItem('yahooToken') !== null) {
  yf.setUserToken(cookieStorage.getItem('yahooToken'));
}

export default yf;
