// Zenn
chrome.storage.local.get(["zenn"]).then((result) => {
  if (location.hostname !== "zenn.dev") return;
  const muteUsers = result.zenn;
  const articles = document.querySelectorAll("article");

  if (articles && muteUsers) {
    articles.forEach((article) => {
      muteUsers.forEach((muteUser) => {
        // Articles
        const zennArticleRegExp = new RegExp(`/${muteUser}/articles/`);
        if (article.innerHTML.match(zennArticleRegExp)) {
          article.parentNode.remove();
          console.log(`Remove ${muteUser}'s article`);
        }

        // Books
        const zennBookRegExp = new RegExp(`/${muteUser}/books/`);
        if (article.innerHTML.match(zennBookRegExp)) {
          article.remove();
          console.log(`Remove ${muteUser}'s book`);
        }
      });
    });
  }
});

// Qiita
chrome.storage.local.get(["qiita"]).then((result) => {
  if (location.hostname !== "qiita.com") return;
  const muteUsers = result.qiita;
  const articles = document.querySelectorAll("article");

  if (articles && muteUsers) {
    articles.forEach((article) => {
      muteUsers.forEach((muteUser) => {
        // Articles
        const qiitaArticleRegExp = new RegExp(`/${muteUser}/items/`);
        if (article.innerHTML.match(qiitaArticleRegExp)) {
          article.remove();
          console.log(`Remove ${muteUser}'s article`);
        }
      });
    });
  }
});
