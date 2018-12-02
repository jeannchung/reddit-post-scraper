const inquirer = require('inquirer')
const axios = require('axios')
const cheerio = require('cheerio')

const pmpt = inquirer.createPromptModule()

pmpt({
  type: 'input',
  name: 'subreddit',
  message: 'Enter a subreddit you wish to browse',
}).then(r => {
    const subreddit = r.subreddit
    axios.get(`https://www.reddit.com/r/${subreddit}/`)
      .then(r => {
        const $ = cheerio.load(r.data)
        $('div.scrollerItem').children('div').children('div').children('span').each((i, elem) => {
          if(i <= 4) { 
            console.log(`
            Post #${i+1}
            Title: ${$(elem).children('a').children('h2.imors3-0.iuScIP').text()}
            Link: https://www.reddit.com${$(elem).children('a').attr('href')}`)
          }
        })
      })
      .catch(e => console.log(e))
})
  .catch(e => console.log(e))


