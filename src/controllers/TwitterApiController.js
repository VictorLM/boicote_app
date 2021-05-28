const axios = require('axios');

class TwitterApiController {
  //
  async getTweets(req, res) {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json([{
          message: 'Informe a palavra chave.',
        }]);
      }

      const token = process.env.TWITTER_API_TOKEN;

      const options = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          query: `(${query.replace(/,/g, ' OR ')}) -is:retweet -is:reply`,
          'tweet.fields': 'public_metrics,created_at',
          expansions: 'author_id',
          'user.fields': 'name,username,profile_image_url',
        },
      };

      const { data } = await axios.get(
        'https://api.twitter.com/2/tweets/search/recent',
        options,
      );
      //
      return res.status(200).json(data);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  //
}

module.exports = new TwitterApiController();
