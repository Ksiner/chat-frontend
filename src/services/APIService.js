import axios from 'axios';

export class APIService {
  baseURl = 'http://localhost:8000';

  async getAnswer(question) {
    const url = new URL('/chat/answer', this.baseURl);
    url.searchParams.append('question', question);

    const response = await axios.get(url.href);

    return response.data;
  }
}

export default new APIService();
